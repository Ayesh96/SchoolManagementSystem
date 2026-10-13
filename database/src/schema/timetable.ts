import { createInsertSchema } from "drizzle-zod";
import {
  integer,
  pgTable,
  serial,
  smallint,
  text,
  timestamp,
} from "drizzle-orm/pg-core";
import { z } from "zod/v4";
import { classroomsTable } from "./classrooms";
import { teachersTable } from "./teachers";

export const timetableEntriesTable = pgTable("timetable_entries", {
  id: serial("id").primaryKey(),
  dayOfWeek: smallint("day_of_week").notNull(),
  startTime: text("start_time").notNull(),
  endTime: text("end_time").notNull(),
  subject: text("subject").notNull(),
  classroomId: integer("classroom_id")
    .notNull()
    .references(() => classroomsTable.id, { onDelete: "cascade" }),
  teacherId: integer("teacher_id").references(() => teachersTable.id, {
    onDelete: "set null",
  }),
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true })
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date()),
});

export const insertTimetableEntrySchema = createInsertSchema(
  timetableEntriesTable,
).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});
export type InsertTimetableEntry = z.infer<typeof insertTimetableEntrySchema>;
export type TimetableEntry = typeof timetableEntriesTable.$inferSelect;
