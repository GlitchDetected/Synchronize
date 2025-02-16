import { HttpErrorMessage } from "~/constants/http-error";
import { db } from "~/db";
import { APIPostServerMembersBodySchema } from "~/types/members";
import { defineEndpoint, defineEndpointOptions } from "~/utils/define/endpoint";
import { emitGatewayEvent } from "~/utils/emit-event";
import { httpError } from "~/utils/http-error";

const options = defineEndpointOptions({
    route_type: "server",
    require_auth: true
});

export default defineEndpoint(async ({ request, server }) => {
    if (request.method === "POST") return addMember(request, server.id);
    if (request.method === "GET") return getServerMembers(server.id);
    httpError(HttpErrorMessage.NotFound);
}, options);

// Fetch all members of a server
async function getServerMembers(serverId: number) {
    const members = await db
        .selectFrom("server_members")
        .selectAll()
        .where("server_id", "=", serverId)
        .execute();

    return Response.json(members);
}

// Add a new member to the server
async function addMember(request: Request, serverId: number) {
    const { data, success, error } = APIPostServerMembersBodySchema.safeParse(await request.json());
    if (!success) throw httpError(HttpErrorMessage.BadRequest, error);

    // Check if the user is already a member
    const existingMember = await db
        .selectFrom("server_members")
        .selectAll()
        .where("server_id", "=", serverId)
        .where("user_id", "=", data.user_id)
        .executeTakeFirst();

    if (existingMember) throw httpError(HttpErrorMessage.UserIsAlreadyAMember);

    const member = await db
        .insertInto("server_members")
        .values({
            user_id: data.user_id,
            server_id: serverId
        })
        .returningAll()
        .executeTakeFirst();

    if (!member) throw httpError();

    void emitGatewayEvent(`server:${serverId}`, "member_add", member);

    return Response.json(member);
}