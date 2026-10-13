import { createInsertSchema } from "drizzle-zod";
import {
  date,
  integer,
  pgTable,
  serial,
  text,
  timestamp,
} from "drizzle-orm/pg-core";
import { z } from "zod/v4";
import { classroomsTable } from "./classrooms";

export const studentsTable = pgTable("students", {
  id: serial("id").primaryKey(),
  fullName: text("full_name").notNull(),
  classroomId: integer("classroom_id").references(() => classroomsTable.id, {
    onDelete: "set null",
  }),
  guardianName: text("guardian_name").notNull(),
  guardianEmail: text("guardian_email"),
  guardianPhone: text("guardian_phone"),
  enrollmentDate: date("enrollment_date", { mode: "string" }).notNull(),
  status: text("status").notNull().default("active"),
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true })
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date()),
});

export const insertStudentSchema = createInsertSchema(studentsTable).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});
export type InsertStudent = z.infer<typeof insertStudentSchema>;
export type Student = typeof studentsTable.$inferSelect;
