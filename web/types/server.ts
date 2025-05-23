import type { ColumnType, Generated, Selectable } from "kysely";
import { z } from "zod";

import type { Room } from "./rooms";

export interface ServerTable {
    id: Generated<number>;

    name: string;

    flags: Generated<number>;
    owner_id: number;

    icon_id: number | null;
    banner_id: number | null;

    created_at: ColumnType<string, string | undefined, never>;
}

export type Server = Selectable<ServerTable>;

export interface GatewayServer extends Server {
    rooms: Room[];
}

// POST /api/servers
export const APIPostServersBodySchema = z.object({
    name: z.string().min(1).max(64)
});

export type APIPostServersBody = z.infer<typeof APIPostServersBodySchema>;
export type APIPostServersResponse = Server;

// GET /api/servers
export const APIGetServersQuerySchema = z.object({});

export type APIGetServersQuery = z.infer<typeof APIGetServersQuerySchema>;
export type APIGetServersResponse = Server[];