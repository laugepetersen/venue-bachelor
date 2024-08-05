import * as z from "zod";

export const emailSchema = z
  .string()
  .email({ message: "Indtast en gyldig email" });
export const passwordSchema = z
  .string()
  .min(6, { message: "Adgangskoden skal være mindst 6 tegn" });

export const loginSchema = z.object({
  email: emailSchema,
});

export const registerSchema = z
  .object({
    email: emailSchema,
    password: passwordSchema,
    confirmPassword: passwordSchema,
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Adgangskoderne skal være ens",
    path: ["confirmPassword"],
  });
