import type { ColumnType, Selectable } from "kysely";
import { z } from "zod";

export interface ServerMemberTable {
    server_id: number;
    user_id: number;

    joined_at: ColumnType<string, string | undefined, never>;
}

export type ServerMember = Selectable<ServerMemberTable>;

export const APIPostServerMembersBodySchema = z.object({
    user_id: z.number(),
    server_id: z.number()
});

export type APIPostServerMembersBody = z.infer<typeof APIPostServerMembersBodySchema>;