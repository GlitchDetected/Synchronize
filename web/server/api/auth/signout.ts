import { HttpErrorMessage } from "~/constants/http-error";
import { defineEndpoint } from "~/utils/define/endpoint";
import { httpError } from "~/utils/http-error";

export default defineEndpoint(async ({ request }) => {
    if (request.method === "POST") return signOutUser();
    httpError(HttpErrorMessage.NotFound);
});

function signOutUser() {
    const cookieOptions = {
        Path: "/",
        HttpOnly: true,
        SameSite: "Strict",
        MaxAge: 0,
        Expires: new Date(0).toUTCString()
    };

    return Promise.resolve(
        new Response(null, {
            status: 200,
            headers: {
                "Set-Cookie": `session=; ${Object.entries(cookieOptions)
                    .map(([key, value]) => `${key}=${value}`)
                    .join("; ")}`
            }
        })
    );
}