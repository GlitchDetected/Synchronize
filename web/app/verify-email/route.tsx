/* eslint-disable import/newline-after-import */

import { zodResolver } from "@hookform/resolvers/zod";
// import { Turnstile } from "@marsidev/react-turnstile";
import { TriangleAlertIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { SiGmail, SiProtonmail } from "react-icons/si";
import { Link, useLocation, useNavigate } from "react-router";

import { Auth, AuthContent, AuthDescription, AuthTitle } from "~/components/auth";
import { Alert, AlertDescription } from "~/components/ui/alert";
import { Button } from "~/components/ui/button";
import { Form } from "~/components/ui/form";
// import { Config } from "~/constants/config";
import { request } from "~/lib/api";
import type { APIPostCurrentUserEmailVerifyBody, APIPostCurrentUserEmailVerifyResponse } from "~/types/users";
import { APIPostCurrentUserEmailVerifyBodySchema } from "~/types/users";

export default function VerifyEmail() {
    const { hash } = useLocation();

    return (
        <Auth>
            <AuthTitle>Verify your email</AuthTitle>
            {hash.length > 1
                ? <Complete hash={hash} />
                : <OpenEmails />
            }
        </Auth>
    );
}

function OpenEmails() {
    return (<>
        <AuthDescription>Open your email client to verify your email!</AuthDescription>

        <div className="mt-4 flex gap-2">
            <Button
                asChild
                className="w-1/2"
                variant="secondary"
            >
                <Link to="https://gmail.com">
                    <SiGmail />
                    Gmail
                </Link>
            </Button>
            <Button
                asChild
                className="w-1/2"
                variant="secondary"
            >
                <Link to="https://mail.proton.me">
                    <SiProtonmail />
                    Proton Mail
                </Link>
            </Button>
        </div>

        <div className="text-muted-foreground text-xs mt-2">
            If you haven{"'"}t received the email yet, please try again in an hour from now.
        </div>
    </>);
}

function Complete({ hash }: { hash: string; }) {
    const [error, setError] = useState<string>();
    const navigate = useNavigate();

    const form = useForm<APIPostCurrentUserEmailVerifyBody>({
        resolver: zodResolver(APIPostCurrentUserEmailVerifyBodySchema)
    });

    useEffect(() => {
        if (!hash) return;
        form.setValue("token", hash.slice(1));
    }, [hash]);

    async function verify(data: APIPostCurrentUserEmailVerifyBody) {
        const res = await request<APIPostCurrentUserEmailVerifyResponse>("post", "/users/@me/email/verify", data);

        if (res && "message" in res) {
            setError(res.message);
            return;
        }

        void navigate("/rooms/@me");
    }

    return (<>
        <AuthDescription>Verify your email to start using your account!</AuthDescription>
        <AuthContent>

            {error &&
                <Alert variant="destructive">
                    <TriangleAlertIcon className="size-5" />
                    <AlertDescription>{error}</AlertDescription>
                </Alert>
            }

            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(verify)}
                    className="space-y-2"
                >

                    <Button
                        className="w-full"
                        type="submit"
                    >
                        Create Account & Continue
                    </Button>
                </form>
            </Form>

        </AuthContent>
    </>);
}