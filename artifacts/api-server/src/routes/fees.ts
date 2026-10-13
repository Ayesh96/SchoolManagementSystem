import { eq, sql } from "drizzle-orm";
import { Router, type IRouter } from "express";
import {
  CreateFeeBody,
  CreateFeePaymentBody,
  CreateFeePaymentParams,
  CreateFeePaymentResponse,
  CreateFeeResponse,
  ListFeePaymentsParams,
  ListFeePaymentsResponse,
  ListFeesResponse,
  UpdateFeeBody,
  UpdateFeeParams,
  UpdateFeeResponse,
} from "@workspace/api-zod";
import { db, feePaymentsTable, feesTable, studentsTable } from "@workspace/db";
import {
  getFeeData,
  listFeeData,
  listFeePaymentData,
  roundCurrency,
  toDateOnlyString,
} from "../lib/school-data";

const router: IRouter = Router();

router.get("/fees", async (_req, res): Promise<void> => {
  res.json(ListFeesResponse.parse(await listFeeData()));
});

router.post("/fees", async (req, res): Promise<void> => {
  const parsed = CreateFeeBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }

  const [student] = await db
    .select({ id: studentsTable.id })
    .from(studentsTable)
    .where(eq(studentsTable.id, parsed.data.studentId));
  if (!student) {
    res.status(404).json({ error: "Student not found." });
    return;
  }

  const [fee] = await db
    .insert(feesTable)
    .values({
      studentId: parsed.data.studentId,
      term: parsed.data.term,
      amountDue: parsed.data.amountDue,
      dueDate: toDateOnlyString(parsed.data.dueDate),
    })
    .returning({ id: feesTable.id });
  res.status(201).json(CreateFeeResponse.parse(await getFeeData(fee.id)));
});

router.patch("/fees/:id", async (req, res): Promise<void> => {
  const params = UpdateFeeParams.safeParse(req.params);
  if (!params.success) {
    res.status(400).json({ error: params.error.message });
    return;
  }
  const parsed = UpdateFeeBody.safeParse(req.body);
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
      .from(feesTable)
      .where(eq(feesTable.id, params.data.id))
      .for("update");
    if (!current) return { missing: true as const };

    if (parsed.data.amountDue !== undefined) {
      const [paymentTotal] = await tx
        .select({
          amountPaid: sql<number>`coalesce(sum(${feePaymentsTable.amount}), 0)::float8`.mapWith(
            Number,
          ),
        })
        .from(feePaymentsTable)
        .where(eq(feePaymentsTable.feeId, current.id));
      if (
        Math.round(parsed.data.amountDue * 100) <
        Math.round(paymentTotal.amountPaid * 100)
      ) {
        return {
          issue: "The amount due cannot be lower than payments already recorded.",
        };
      }
    }

    const { dueDate, ...fields } = parsed.data;
    const updates = {
      ...fields,
      ...(dueDate === undefined
        ? {}
        : { dueDate: toDateOnlyString(dueDate) }),
    };
    await tx
      .update(feesTable)
      .set(updates)
      .where(eq(feesTable.id, current.id));
    return { id: current.id };
  });

  if ("missing" in result) {
    res.status(404).json({ error: "Fee record not found." });
    return;
  }
  if ("issue" in result) {
    res.status(400).json({ error: result.issue });
    return;
  }
  res.json(UpdateFeeResponse.parse(await getFeeData(result.id)));
});

router.get("/fees/:feeId/payments", async (req, res): Promise<void> => {
  const params = ListFeePaymentsParams.safeParse(req.params);
  if (!params.success) {
    res.status(400).json({ error: params.error.message });
    return;
  }
  if (!(await getFeeData(params.data.feeId))) {
    res.status(404).json({ error: "Fee record not found." });
    return;
  }
  res.json(
    ListFeePaymentsResponse.parse(
      await listFeePaymentData(params.data.feeId),
    ),
  );
});

router.post("/fees/:feeId/payments", async (req, res): Promise<void> => {
  const params = CreateFeePaymentParams.safeParse(req.params);
  if (!params.success) {
    res.status(400).json({ error: params.error.message });
    return;
  }
  const parsed = CreateFeePaymentBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }

  const result = await db.transaction(async (tx) => {
    const [fee] = await tx
      .select()
      .from(feesTable)
      .where(eq(feesTable.id, params.data.feeId))
      .for("update");
    if (!fee) return { missing: true as const };

    const [paymentTotal] = await tx
      .select({
        amountPaid: sql<number>`coalesce(sum(${feePaymentsTable.amount}), 0)::float8`.mapWith(
          Number,
        ),
      })
      .from(feePaymentsTable)
      .where(eq(feePaymentsTable.feeId, fee.id));
    const amountPaid = roundCurrency(paymentTotal.amountPaid);
    const remaining = roundCurrency(fee.amountDue - amountPaid);
    if (Math.round(parsed.data.amount * 100) > Math.round(remaining * 100)) {
      return {
        issue: `Payment exceeds the outstanding balance of ${remaining.toFixed(2)}.`,
      };
    }

    const [payment] = await tx
      .insert(feePaymentsTable)
      .values({
        feeId: fee.id,
        amount: parsed.data.amount,
        paidAt: toDateOnlyString(parsed.data.paidAt),
        method: parsed.data.method,
        reference: parsed.data.reference ?? null,
        note: parsed.data.note ?? null,
      })
      .returning();
    return { payment };
  });

  if ("missing" in result) {
    res.status(404).json({ error: "Fee record not found." });
    return;
  }
  if ("issue" in result) {
    res.status(400).json({ error: result.issue });
    return;
  }
  res.status(201).json(CreateFeePaymentResponse.parse(result.payment));
});

export default router;
