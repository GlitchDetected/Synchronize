import { defineEndpoint } from "~/utils/define/endpoint";

export default defineEndpoint(async ({ request }) => {
    const cookie = request.headers.get("Cookie");

    // Check if session cookie exists
    const isAuthenticated = cookie?.includes("session=") && !cookie.includes("session=;");

    return Response.json({ authenticated: isAuthenticated });
});