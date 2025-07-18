import { HttpErrorMessage } from "~/constants/http-error";
import { db } from "~/db";
import { getUserIdByEmail, getUserIdByUsername } from "~/db/utils/users";
import type { UserAuthRequiredAction } from "~/types/auth";
import { APIPostAuthRegisterBodySchema } from "~/types/auth";
import { UserFlags } from "~/types/users";
import { generateCookieHeaderFromJWT, hashPassword } from "~/utils/auth";
import { BitfieldManager } from "~/utils/bitfields";
import { defineEndpoint } from "~/utils/define/endpoint";
import { sendEmailVerificationEmail } from "~/utils/email";
import { httpError } from "~/utils/http-error";
import { session, verifyemail } from "~/utils/jwt";

export default defineEndpoint(async ({ request }) => {
    if (request.method === "POST") return createUser(request);
    httpError(HttpErrorMessage.NotFound);
});

async function createUser(request: Request) {
    const { data, success, error } = APIPostAuthRegisterBodySchema.safeParse(await request.json());
    if (!success) throw httpError(HttpErrorMessage.BadRequest, error);

    if (await getUserIdByUsername(data.username)) httpError(HttpErrorMessage.UsernameAlreadyClaimed);
    if (await getUserIdByEmail(data.email)) httpError(HttpErrorMessage.EmailAlreadyRegistered);

    const user = await db
        .insertInto("users")
        .values({
            email: data.email,
            password_hash: await hashPassword(data.password),
            username: data.username
        })
        .returning(["id", "username", "email"])
        .executeTakeFirst();

    if (!user) throw httpError();

    const requiredActions: UserAuthRequiredAction[] = [];
    // const flags = new BitfieldManager(user.flags);

    // if (!flags.has(UserFlags.VerifiedEmail)) {
    //     requiredActions.push(UserAuthRequiredAction.VerifyEmail);

    //     void sendEmailVerificationEmail({
    //         to: data.email,
    //         username: user.username,
    //         token: verifyemail.sign({ user_id: user.id, email: user.email })
    //     });
    // }

    return Response.json(
        {
            required_actions: requiredActions
        },
        {
            headers: requiredActions.length
                ? undefined
                : {
                    "Set-Cookie": generateCookieHeaderFromJWT(session.sign({ id: user.id }))
                }
        }
    );
}