import { z } from "zod";

export const adminLoginFormSchema = z.object({
  email: z.email(),
  password: z.string().min(1).max(64),
});

export type AdminLoginFormValues = z.infer<typeof adminLoginFormSchema>;
