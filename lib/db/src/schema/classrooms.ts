import { createInsertSchema } from "drizzle-zod";
import {
  integer,
  pgTable,
  serial,
  text,
  timestamp,
} from "drizzle-orm/pg-core";
import { z } from "zod/v4";
import { teachersTable } from "./teachers";

export const classroomsTable = pgTable("classrooms", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  grade: text("grade").notNull(),
  roomName: text("room_name").notNull(),
  capacity: integer("capacity").notNull(),
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

export const insertClassroomSchema = createInsertSchema(classroomsTable).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});
export type InsertClassroom = z.infer<typeof insertClassroomSchema>;
export type Classroom = typeof classroomsTable.$inferSelect;
