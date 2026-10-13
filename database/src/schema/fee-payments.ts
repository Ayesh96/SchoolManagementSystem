import { createInsertSchema } from "drizzle-zod";
import {
  date,
  integer,
  numeric,
  pgTable,
  serial,
  text,
  timestamp,
} from "drizzle-orm/pg-core";
import { z } from "zod/v4";
import { feesTable } from "./fees";

export const feePaymentsTable = pgTable("fee_payments", {
  id: serial("id").primaryKey(),
  feeId: integer("fee_id")
    .notNull()
    .references(() => feesTable.id, { onDelete: "cascade" }),
  amount: numeric("amount", { precision: 12, scale: 2, mode: "number" }).notNull(),
  paidAt: date("paid_at", { mode: "string" }).notNull(),
  method: text("method").notNull(),
  reference: text("reference"),
  note: text("note"),
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
});

export const insertFeePaymentSchema = createInsertSchema(
  feePaymentsTable,
).omit({
  id: true,
  createdAt: true,
});
export type InsertFeePayment = z.infer<typeof insertFeePaymentSchema>;
export type FeePayment = typeof feePaymentsTable.$inferSelect;
