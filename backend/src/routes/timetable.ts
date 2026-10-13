import { eq } from "drizzle-orm";
import { Router, type IRouter } from "express";
import {
  CreateTimetableEntryBody,
  CreateTimetableEntryResponse,
  ListTimetableEntriesResponse,
  UpdateTimetableEntryBody,
  UpdateTimetableEntryParams,
  UpdateTimetableEntryResponse,
} from "@workspace/api-zod";
import { db, timetableEntriesTable } from "@workspace/db";
import {
  getClassroomTeacherId,
  getTeacherData,
  getTimetableData,
  listTimetableData,
} from "../lib/school-data";

const router: IRouter = Router();

async function timeSlotIssue(
  entry: {
    id?: number;
    dayOfWeek: number;
    startTime: string;
    endTime: string;
    classroomId: number;
    roomName: string;
    teacherId: number | null;
  },
) {
  if (entry.startTime >= entry.endTime) {
    return "The lesson end time must be after its start time.";
  }
  const entries = await listTimetableData();
  const conflicting = entries.find((existing) => {
    if (existing.id === entry.id || existing.dayOfWeek !== entry.dayOfWeek) {
      return false;
    }
    const overlaps =
      entry.startTime < existing.endTime && entry.endTime > existing.startTime;
    if (!overlaps) return false;

    const sameRoom =
      existing.classroomId === entry.classroomId ||
      existing.roomName.trim().toLowerCase() === entry.roomName.trim().toLowerCase();
    const sameTeacher =
      entry.teacherId != null && existing.teacherId === entry.teacherId;
    return sameRoom || sameTeacher;
  });

  if (conflicting) {
    return `This time overlaps with ${conflicting.subject} in ${conflicting.roomName}.`;
  }
  return null;
}

router.get("/timetable", async (_req, res): Promise<void> => {
  const entries = await listTimetableData();
  res.json(ListTimetableEntriesResponse.parse({ entries }));
});

router.post("/timetable", async (req, res): Promise<void> => {
  const parsed = CreateTimetableEntryBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }

  const classroom = await getClassroomTeacherId(parsed.data.classroomId);
  if (!classroom) {
    res.status(400).json({ error: "Choose an existing class or room." });
    return;
  }
  const teacherId =
    parsed.data.teacherId === undefined
      ? classroom.teacherId
      : parsed.data.teacherId;
  if (teacherId != null && !(await getTeacherData(teacherId))) {
    res.status(400).json({ error: "Choose an existing teacher." });
    return;
  }
  const issue = await timeSlotIssue({
    ...parsed.data,
    teacherId,
    roomName: classroom.roomName,
  });
  if (issue) {
    res.status(400).json({ error: issue });
    return;
  }

  const [created] = await db
    .insert(timetableEntriesTable)
    .values({
      dayOfWeek: parsed.data.dayOfWeek,
      startTime: parsed.data.startTime,
      endTime: parsed.data.endTime,
      subject: parsed.data.subject,
      classroomId: parsed.data.classroomId,
      teacherId,
    })
    .returning({ id: timetableEntriesTable.id });
  res.status(201).json(
    CreateTimetableEntryResponse.parse(await getTimetableData(created.id)),
  );
});

router.patch("/timetable/:id", async (req, res): Promise<void> => {
  const params = UpdateTimetableEntryParams.safeParse(req.params);
  if (!params.success) {
    res.status(400).json({ error: params.error.message });
    return;
  }
  const parsed = UpdateTimetableEntryBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }
  if (Object.keys(parsed.data).length === 0) {
    res.status(400).json({ error: "Provide at least one field to update." });
    return;
  }

  const current = await getTimetableData(params.data.id);
  if (!current) {
    res.status(404).json({ error: "Timetable entry not found." });
    return;
  }
  const classroomId = parsed.data.classroomId ?? current.classroomId;
  const classroom = await getClassroomTeacherId(classroomId);
  if (!classroom) {
    res.status(400).json({ error: "Choose an existing class or room." });
    return;
  }
  const movedToDifferentClass = classroomId !== current.classroomId;
  const teacherId =
    parsed.data.teacherId !== undefined
      ? parsed.data.teacherId
      : movedToDifferentClass
        ? classroom.teacherId
        : current.teacherId;
  if (teacherId != null && !(await getTeacherData(teacherId))) {
    res.status(400).json({ error: "Choose an existing teacher." });
    return;
  }

  const candidate = {
    id: current.id,
    dayOfWeek: parsed.data.dayOfWeek ?? current.dayOfWeek,
    startTime: parsed.data.startTime ?? current.startTime,
    endTime: parsed.data.endTime ?? current.endTime,
    classroomId,
    roomName: classroom.roomName,
    teacherId,
  };
  const issue = await timeSlotIssue(candidate);
  if (issue) {
    res.status(400).json({ error: issue });
    return;
  }

  const [updated] = await db
    .update(timetableEntriesTable)
    .set({ ...parsed.data, classroomId, teacherId })
    .where(eq(timetableEntriesTable.id, current.id))
    .returning({ id: timetableEntriesTable.id });
  res.json(
    UpdateTimetableEntryResponse.parse(await getTimetableData(updated.id)),
  );
});

export default router;
