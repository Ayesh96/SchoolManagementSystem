import { and, count, eq } from "drizzle-orm";
import { Router, type IRouter } from "express";
import {
  CreateClassroomBody,
  CreateClassroomResponse,
  ListClassroomsResponse,
  UpdateClassroomBody,
  UpdateClassroomParams,
  UpdateClassroomResponse,
} from "@workspace/api-zod";
import {
  classroomsTable,
  db,
  studentsTable,
  teachersTable,
} from "@workspace/db";
import { getClassroomData, listClassroomData } from "../lib/school-data";

const router: IRouter = Router();

async function teacherExists(id: number) {
  const [teacher] = await db
    .select({ id: teachersTable.id })
    .from(teachersTable)
    .where(eq(teachersTable.id, id));
  return !!teacher;
}

router.get("/classrooms", async (_req, res): Promise<void> => {
  res.json(ListClassroomsResponse.parse(await listClassroomData()));
});

router.post("/classrooms", async (req, res): Promise<void> => {
  const parsed = CreateClassroomBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }
  if (
    parsed.data.teacherId != null &&
    !(await teacherExists(parsed.data.teacherId))
  ) {
    res.status(400).json({ error: "Choose an existing teacher." });
    return;
  }

  const [classroom] = await db
    .insert(classroomsTable)
    .values({
      name: parsed.data.name,
      grade: parsed.data.grade,
      roomName: parsed.data.roomName,
      capacity: parsed.data.capacity,
      teacherId: parsed.data.teacherId ?? null,
    })
    .returning({ id: classroomsTable.id });

  res.status(201).json(
    CreateClassroomResponse.parse(await getClassroomData(classroom.id)),
  );
});

router.patch("/classrooms/:id", async (req, res): Promise<void> => {
  const params = UpdateClassroomParams.safeParse(req.params);
  if (!params.success) {
    res.status(400).json({ error: params.error.message });
    return;
  }
  const parsed = UpdateClassroomBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }
  if (Object.keys(parsed.data).length === 0) {
    res.status(400).json({ error: "Provide at least one field to update." });
    return;
  }
  if (
    parsed.data.teacherId != null &&
    !(await teacherExists(parsed.data.teacherId))
  ) {
    res.status(400).json({ error: "Choose an existing teacher." });
    return;
  }

  const result = await db.transaction(async (tx) => {
    const [current] = await tx
      .select()
      .from(classroomsTable)
      .where(eq(classroomsTable.id, params.data.id))
      .for("update");
    if (!current) return { missing: true as const };

    const nextCapacity = parsed.data.capacity ?? current.capacity;
    if (nextCapacity < current.capacity) {
      const [enrollment] = await tx
        .select({ count: count() })
        .from(studentsTable)
        .where(
          and(
            eq(studentsTable.classroomId, current.id),
            eq(studentsTable.status, "active"),
          ),
        );
      if (Number(enrollment.count) > nextCapacity) {
        return {
          issue: `Capacity cannot be lower than the ${enrollment.count} active students currently enrolled.`,
        };
      }
    }

    await tx
      .update(classroomsTable)
      .set(parsed.data)
      .where(eq(classroomsTable.id, current.id));
    return { id: current.id };
  });

  if ("missing" in result) {
    res.status(404).json({ error: "Classroom not found." });
    return;
  }
  if ("issue" in result) {
    res.status(400).json({ error: result.issue });
    return;
  }
  res.json(
    UpdateClassroomResponse.parse(await getClassroomData(result.id)),
  );
});

export default router;
