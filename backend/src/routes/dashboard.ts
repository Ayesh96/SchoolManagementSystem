import { count, eq } from "drizzle-orm";
import { Router, type IRouter } from "express";
import { GetDashboardResponse } from "@workspace/api-zod";
import {
  classroomsTable,
  db,
  studentsTable,
  teachersTable,
} from "@workspace/db";
import {
  listFeeData,
  listTimetableData,
  roundCurrency,
} from "../lib/school-data";

const router: IRouter = Router();

router.get("/dashboard", async (_req, res): Promise<void> => {
  const [teacherCountRows, studentCountRows, classroomCountRows, fees, lessons] =
    await Promise.all([
      db
        .select({ count: count() })
        .from(teachersTable)
        .where(eq(teachersTable.status, "active")),
      db
        .select({ count: count() })
        .from(studentsTable)
        .where(eq(studentsTable.status, "active")),
      db.select({ count: count() }).from(classroomsTable),
      listFeeData(),
      listTimetableData(),
    ]);

  const now = new Date();
  const today = ((now.getUTCDay() + 6) % 7) + 1;
  const currentTime = `${String(now.getUTCHours()).padStart(2, "0")}:${String(now.getUTCMinutes()).padStart(2, "0")}`;
  const upcomingLessons = [...lessons]
    .sort((a, b) => {
      const offset = (dayOfWeek: number, startTime: string) => {
        const distance = (dayOfWeek - today + 7) % 7;
        return distance === 0 && startTime <= currentTime ? 7 : distance;
      };
      return (
        offset(a.dayOfWeek, a.startTime) - offset(b.dayOfWeek, b.startTime) ||
        a.startTime.localeCompare(b.startTime)
      );
    })
    .slice(0, 6);

  const totalFeesDue = roundCurrency(
    fees.reduce((total, fee) => total + fee.amountDue, 0),
  );
  const totalFeesCollected = roundCurrency(
    fees.reduce((total, fee) => total + fee.amountPaid, 0),
  );
  const totalFeesOutstanding = roundCurrency(
    fees.reduce((total, fee) => total + fee.remainingBalance, 0),
  );

  res.json(
    GetDashboardResponse.parse({
      teacherCount: teacherCountRows[1].count,
      studentCount: studentCountRows[0]?.count ?? 0,
      classroomCount: classroomCountRows[0]?.count ?? 0,
      totalFeesDue,
      totalFeesCollected,
      totalFeesOutstanding,
      outstandingFeeCount: fees.filter((fee) => fee.remainingBalance > 0).length,
      upcomingLessons,
    }),
  );
});

export default router;
