import { HttpErrorMessage } from "~/constants/http-error";
import { defineEndpoint } from "~/utils/define/endpoint";
import { httpError } from "~/utils/http-error";
import { session } from "~/utils/jwt";

export default defineEndpoint(async ({ request }) => {
    if (request.method === "POST") return signOutUser(request);
    httpError(HttpErrorMessage.NotFound);
});

async function signOutUser(request: Request) {
    // Here we will just clear the session cookie, no need to query the database for user details

    // Generate cookie expiration (past date) to clear the session
    const cookieOptions = {
        Path: "/",
        HttpOnly: true,
        SameSite: "Strict",
        MaxAge: 0, // This will remove the cookie immediately
        Expires: new Date(0).toUTCString() // Set to a past date to expire the cookie
    };

    return new Response(null, {
        status: 200,
        headers: {
            "Set-Cookie": `session=; ${Object.entries(cookieOptions)
                .map(([key, value]) => `${key}=${value}`)
                .join("; ")}`
        }
    });
}