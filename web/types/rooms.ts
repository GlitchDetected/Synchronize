import type { ColumnType, Generated, Selectable } from "kysely";
import { z } from "zod";

export interface RoomTable {
    id: Generated<number>;

    name: string;

    type: RoomType;
    flags: Generated<number>; // currently unused
    position: number;

    server_id: number;
    parent_room_id: number | null;

    created_at: ColumnType<string, string | undefined, never>;
}

export enum RoomType {
    ServerText = 0
}

export type Room = Selectable<RoomTable>;

// POST /servers/1/rooms
export const APIPostServerRoomsBodySchema = z.object({
    name: z.string().min(1).max(64).transform((str) => str.replace(/\s+/g, "-").toLowerCase()),
    type: z.nativeEnum(RoomType),
    parent_room_id: z.number().nullable().optional()
});

export type APIPostServerRoomsBody = z.infer<typeof APIPostServerRoomsBodySchema>;
export type APIPostServerRoomsResponse = Room;

export const APIGetRoomQuerySchema = z.object({
    limit: z.string().regex(/^(([1-9][0-9]?)|100)$/).default("50").transform((str) => Number(str)),
    before: z.string().regex(/^\d*$/).default("999999999").transform((str) => Number(str))
});

export type APIGetRoomQuery = z.infer<typeof APIGetRoomQuerySchema>;
export type APIGetRoomResponse = Room[];