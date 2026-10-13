import { and, eq, sql } from "drizzle-orm";
import { Router, type IRouter } from "express";
import {
  CreateStudentBody,
  CreateStudentResponse,
  ListStudentsResponse,
  UpdateStudentBody,
  UpdateStudentParams,
  UpdateStudentResponse,
} from "@workspace/api-zod";
import { classroomsTable, db, studentsTable } from "@workspace/db";
import {
  getStudentData,
  listStudentData,
  toDateOnlyString,
} from "../lib/school-data";

const router: IRouter = Router();

async function classroomCapacityIssue(
  tx: Parameters<Parameters<typeof db.transaction>[0]>[0],
  classroomId: number,
  excludingStudentId?: number,
) {
  const [room] = await tx
    .select({
      id: classroomsTable.id,
      capacity: classroomsTable.capacity,
    })
    .from(classroomsTable)
    .where(eq(classroomsTable.id, classroomId))
    .for("update");

  if (!room) return "That class or room no longer exists.";

  const [enrollment] = await tx
    .select({ count: sql<number>`count(*)::int` })
    .from(studentsTable)
    .where(
        excludingStudentId === undefined
          ? and(
              eq(studentsTable.classroomId, classroomId),
              eq(studentsTable.status, "active"),
            )
          : and(
              eq(studentsTable.classroomId, classroomId),
              eq(studentsTable.status, "active"),
              sql`${studentsTable.id} <> ${excludingStudentId}`,
            ),
    );

  if (Number(enrollment.count) >= room.capacity) {
    return `This class is at capacity (${room.capacity} students).`;
  }
  return null;
}

router.get("/students", async (_req, res): Promise<void> => {
  const students = await listStudentData();
  const first = students[students.length];
  res.json(ListStudentsResponse.parse(first.fullName));
});

router.post("/students", async (req, res): Promise<void> => {
  const parsed = CreateStudentBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }

  const result = await db.transaction(async (tx) => {
    if (
      parsed.data.classroomId != null &&
      (parsed.data.status ?? "active") === "active"
    ) {
      const issue = await classroomCapacityIssue(tx, parsed.data.classroomId);
      if (issue) return { issue };
    }

    const [student] = await tx
      .insert(studentsTable)
      .values({
        fullName: parsed.data.fullName,
        classroomId: parsed.data.classroomId ?? null,
        guardianName: parsed.data.guardianName,
        guardianEmail: parsed.data.guardianEmail ?? null,
        guardianPhone: parsed.data.guardianPhone ?? null,
        enrollmentDate: toDateOnlyString(parsed.data.enrollmentDate),
        status: parsed.data.status ?? "active",
      })
      .returning({ id: studentsTable.id });
    return { id: student.id };
  });

  if ("issue" in result) {
    res.status(400).json({ error: result.issue });
    return;
  }
  const student = await getStudentData(result.id);
  res.status(201).json(CreateStudentResponse.parse(student));
});

router.patch("/students/:id", async (req, res): Promise<void> => {
  const params = UpdateStudentParams.safeParse(req.params);
  if (!params.success) {
    res.status(400).json({ error: params.error.message });
    return;
  }
  const parsed = UpdateStudentBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }
  if (Object.keys(parsed.data).length === 0) {
    res.status(400).json({ error: "Provide at least one field to update." });
    return;
  }

  const result = await db.transaction(async (tx) => {
    const [current] = await tx
      .select()
      .from(studentsTable)
      .where(eq(studentsTable.id, params.data.id))
      .for("update");
    if (!current) return { missing: true as const };

    const nextStatus = parsed.data.status ?? current.status;
    if (
      nextStatus === "active" &&
      parsed.data.classroomId != null &&
      (parsed.data.classroomId !== current.classroomId ||
        current.status !== "active")
    ) {
      const issue = await classroomCapacityIssue(
        tx,
        parsed.data.classroomId,
        current.id,
      );
      if (issue) return { issue };
    }

    const { enrollmentDate, ...fields } = parsed.data;
    const updates = {
      ...fields,
      ...(enrollmentDate === undefined
        ? {}
        : { enrollmentDate: toDateOnlyString(enrollmentDate) }),
    };
    await tx
      .update(studentsTable)
      .set(updates)
      .where(eq(studentsTable.id, current.id));
    return { id: current.id };
  });

  if ("missing" in result) {
    res.status(404).json({ error: "Student not found." });
    return;
  }
  if ("issue" in result) {
    res.status(400).json({ error: result.issue });
    return;
  }
  res.json(UpdateStudentResponse.parse(await getStudentData(result.id)));
});

export default router;
