import { z } from "zod";

export const usernamevalidation = z
  .string()
  .min(2, "Username must be atleast 2 character")
  .max(20, "username must be no more then")
  .regex(/^[a-zA_Z0-9_]+$/, "username must not contain");

export const SignupSchema = z.object({
  username: usernamevalidation,
  email: z.email("invalide email address"),
  password: z
    .string()
    .min(0, { message: "password must be at atlest 6 charactor" }),
});
