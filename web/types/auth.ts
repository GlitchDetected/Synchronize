import { z } from "zod";

import { Config } from "~/constants/config";

// POST /auth/register
export const APIPostAuthRegisterBodySchema = z.object({
    email: z.string().email().max(64).transform((str) => str.toLowerCase()),
    username: z.string().regex(Config.username_constraint),
    password: z.string().regex(Config.password_constraint)
});
// password example: P@ssw0rd!23Secure

export enum UserAuthRequiredAction {
    VerifyEmail = 0
}

export type APIPostAuthRegisterBody = z.infer<typeof APIPostAuthRegisterBodySchema>;
export interface APIPostAuthRegisterResponse {
    required_actions: UserAuthRequiredAction[];
}

// POST /auth/login
export const APIPostAuthLoginBodySchema = z.object({
    email: z.string().email().max(64).transform((str) => str.toLowerCase()),
    password: z.string()
});

export type APIPostAuthLoginBody = z.infer<typeof APIPostAuthLoginBodySchema>;
export type APIPostAuthLoginResponse = APIPostAuthRegisterResponse;