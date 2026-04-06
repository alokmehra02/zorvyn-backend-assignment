import { z } from "zod";

export const createUserSchema = z.object({

  name: z.string().min(2),

  email: z.string().email(),

  password: z.string().min(6),

  role: z.enum(["VIEWER", "ANALYST", "ADMIN"])

});

export const updateUserSchema = z.object({

  name: z.string().min(2).optional(),

  role: z.enum(["VIEWER", "ANALYST", "ADMIN"]).optional(),

  status: z.enum(["ACTIVE", "INACTIVE"]).optional()

});