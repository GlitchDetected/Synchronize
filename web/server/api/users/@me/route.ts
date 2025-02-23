import { HttpErrorMessage } from "~/constants/http-error";
import { getUser, updateUser } from "~/db/utils/users";
import { defineEndpoint, defineEndpointOptions } from "~/utils/define/endpoint";
import { httpError } from "~/utils/http-error";

const options = defineEndpointOptions({
    require_auth: true
});

export default defineEndpoint(async ({ request, userId }) => {
    if (request.method === "GET") return Response.json(await getUser(userId));
    if (request.method === "POST") {
        try {
            const body = await request.json();
            const updatedUser = await updateUser(userId, body);
            return Response.json(updatedUser);
        } catch (error) {
            console.error("Error updating user:", error);
            httpError(HttpErrorMessage.BadRequest);
        }
    }
    httpError(HttpErrorMessage.NotFound);
}, options);