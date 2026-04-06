import { z } from "zod";

export const createRecordSchema = z.object({
  amount: z.number().positive(),
  type: z.enum(["INCOME", "EXPENSE"]),
  categoryId: z.number(),
  date: z.string(),
  notes: z.string().optional()
});

export const updateRecordSchema = z.object({
  amount: z.number().positive().optional(),
  type: z.enum(["INCOME", "EXPENSE"]).optional(),
  categoryId: z.number().optional(),
  date: z.string().optional(),
  notes: z.string().optional()
});