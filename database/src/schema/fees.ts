import { createInsertSchema } from "drizzle-zod";
import { date, integer, numeric, pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";
import { z } from "zod/v4";
import { studentsTable } from "./students";

export const feesTable = pgTable("fee_records", {
  id: serial("id").primaryKey(),
  studentId: integer("student_id")
    .notNull()
    .references(() => studentsTable.id, { onDelete: "restrict" }),
  term: text("term").notNull(),
  amountDue: numeric("amount_due", {
    precision: 12,
    scale: 2,
    mode: "number",
  }).notNull(),
  dueDate: date("due_date", { mode: "string" }).notNull(),
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true })
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date()),
});

export const insertFeeSchema = createInsertSchema(feesTable).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});
export type InsertFee = z.infer<typeof insertFeeSchema>;
export type FeeRecord = typeof feesTable.$inferSelect;
