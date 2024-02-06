import { z } from "zod";

export const userCredentialsValidation = z.object({
  name: z.string().nullable(),
  email: z.string().email().nullable(),
  password: z
    .string()
    .min(6, "Senha deve conter pelo menos 6 caracteres")
    .nullable(),
});
