import type { ColumnType, Generated, Selectable } from "kysely";
import { z } from "zod";

export interface UserTable {
    id: Generated<number>;

    email: string;
    password_hash: string;

    username: string;
    nickname: string | null;

    flags: Generated<number>;

    avatar_id: number | null;
    banner_id: number | null;

    aboutme: string | null;
    pronouns: string | null;
    apptheme: string | null;

    created_at: ColumnType<string, string | undefined, never>;
}

export type User = Selectable<UserTable>;
export type UserJWTPayload = Pick<User, "id">;
export type PublicUser = Omit<User, "password_hash">;
export type CurrentUser = PublicUser;

export enum UserFlags {
    // VerifiedEmail = 1 << 0,
    Disabled = 1 << 1,

    System = 1 << 2,
    Bot = 1 << 3,

    Staff = 1 << 4
}

// GET /users/@me = *CurrentUser*
// GET /users/1 = *Users*
export const APIPostCurrentUserEmailVerifyBodySchema = z.object({
    token: z.string()
});

export type APIPostCurrentUserEmailVerifyBody = z.infer<typeof APIPostCurrentUserEmailVerifyBodySchema>;
export type APIPostCurrentUserEmailVerifyResponse = undefined;

export interface UserEmailVerifyJWTPayload {
    user_id: User["id"];
    email: string;
}