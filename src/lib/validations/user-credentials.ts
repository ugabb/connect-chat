import { z } from "zod";

export const userCredentialsValidation = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z
    .string()
    .min(6, "Senha deve conter pelo menos 6 caracteres")
});
export const userCredentialsValidationLogin = z.object({
  email: z.string().email(),
  password: z
    .string()
    .min(6, "Senha deve conter pelo menos 6 caracteres"),
});
