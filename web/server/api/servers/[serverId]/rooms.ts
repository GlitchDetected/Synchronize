import { HttpErrorMessage } from "~/constants/http-error";
import { db } from "~/db";
import { APIPostServerRoomsBodySchema } from "~/types/rooms";
import { defineEndpoint, defineEndpointOptions } from "~/utils/define/endpoint";
import { emitGatewayEvent } from "~/utils/emit-event";
import { httpError } from "~/utils/http-error";

const options = defineEndpointOptions({
    route_type: "server",
    require_auth: true,
    require_server_permissions: {
        server_owner: true
    }
});

export default defineEndpoint(async ({ request, server }) => {
    if (request.method === "POST") return createRoom(request, server.id);
    if (request.method === "GET") return getRooms(server.id);
    httpError(HttpErrorMessage.NotFound);
}, options);

async function getRooms(serverId: number) {

    const rooms = await db
        .selectFrom("rooms")
        .where("server_id", "=", serverId)
        .select([
            "id",
            "name",
            "type",
            "flags",
            "position",
            "server_id",
            "parent_room_id"
        ])
        .execute();

    return Response.json(rooms);
}

async function createRoom(request: Request, serverId: number) {
    const { data, success, error } = APIPostServerRoomsBodySchema.safeParse(await request.json());
    if (!success) throw httpError(HttpErrorMessage.BadRequest, error);

    const room = await db
        .insertInto("rooms")
        .values({
            name: data.name,
            type: data.type,
            position: 0,
            server_id: serverId
        })
        .returningAll()
        .executeTakeFirst();

    if (!room) throw httpError();

    void emitGatewayEvent(`server:${serverId}`, "room_create", room);

    return Response.json(room);
}