import { db } from "db";

export function getUser(id: number) {
    return db
        .selectFrom("users")
        .selectAll()
        .where("id", "=", id)
        .executeTakeFirst();
}

export async function updateUser(id: number, data: Partial<{ username: string; email: string; nickname: string; }>) {
    return db
        .updateTable("users")
        .set(data)
        .where("id", "=", id)
        .returningAll()
        .executeTakeFirst();
}

export async function getUserIdByUsername(username: string) {
    const user = await db
        .selectFrom("users")
        .select("id")
        .where("username", "=", username)
        .executeTakeFirst();

    return user?.id;
}

export async function getUserIdByEmail(email: string) {
    const user = await db
        .selectFrom("users")
        .select("id")
        .where("email", "=", email)
        .executeTakeFirst();

    return user?.id;
}