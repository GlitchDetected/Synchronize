import { HttpErrorMessage } from "~/constants/http-error";
import { db } from "~/db";
import type { APIGetServersResponse, GatewayServer } from "~/types/server";
import { APIPostServersBodySchema } from "~/types/server";
import { defineEndpoint, defineEndpointOptions } from "~/utils/define/endpoint";
import { emitGatewayEvent } from "~/utils/emit-event";
import { httpError } from "~/utils/http-error";

const options = defineEndpointOptions({
    require_auth: true
});

export default defineEndpoint(async ({ request, userId }) => {
    if (request.method === "POST") return createServer(request, userId);
    if (request.method === "GET") return getServers(userId);
    httpError(HttpErrorMessage.NotFound);
}, options);

async function getServers(userId: number) {
    console.log("Fetching servers for user:", userId);

    // Fetch all servers where the user is a member
    const servers: APIGetServersResponse = await db
        .selectFrom("servers")
        .innerJoin("server_members", "server_members.server_id", "servers.id")
        .where("server_members.user_id", "=", userId)
        .select([
            "servers.id",
            "servers.name",
            "servers.flags",
            "servers.owner_id",
            "servers.icon_id",
            "servers.banner_id",
            "servers.created_at"
        ])
        .execute();

    if (!servers.length) return Response.json([]);

    // Fetch rooms for the retrieved servers
    const serverIds = servers.map((s) => s.id);
    const rooms = await db
        .selectFrom("rooms")
        .where("server_id", "in", serverIds)
        .selectAll()
        .execute();

    // Map rooms to their respective servers
    const serversWithRooms: GatewayServer[] = servers.map((server) => ({
        ...server,
        rooms: rooms.filter((room) => room.server_id === server.id)
    }));

    return Response.json(serversWithRooms);
}

async function createServer(request: Request, userId: number) {
    const { data, success, error } = APIPostServersBodySchema.safeParse(await request.json());
    if (!success) throw httpError(HttpErrorMessage.BadRequest, error);

    const server = await db
        .insertInto("servers")
        .values({
            name: data.name,
            owner_id: userId
        })
        .returningAll()
        .executeTakeFirst();

    if (!server) throw httpError();

    const member = await db
        .insertInto("server_members")
        .values({
            user_id: userId,
            server_id: server.id
        })
        .returningAll()
        .executeTakeFirst();

    if (!member) throw httpError();

    Object.assign(server, { rooms: [] });
    void emitGatewayEvent(`user:${userId}`, "server_create", server as GatewayServer);

    return Response.json(server);
}