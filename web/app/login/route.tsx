import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";

import { Auth, AuthContent, AuthDescription, AuthTitle } from "~/components/auth";
import { Button } from "~/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "~/components/ui/tabs";
import { Config } from "~/constants/config";
import { request } from "~/lib/api";
import type { ApiError } from "~/types";
import type { APIPostAuthLoginResponse, APIPostAuthRegisterBody, APIPostAuthRegisterResponse } from "~/types/auth";
import { APIPostAuthLoginBodySchema, APIPostAuthRegisterBodySchema } from "~/types/auth";

enum Type {
    Login = "login",
    Create = "create"
}

const fields = [
    "email",
    "username",
    "password"
] as const;

export default function Login() {
    const [type, setType] = useState<Type>(Type.Login);
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        async function checkAuth() {
            try {
                const res = await request<{ authenticated: boolean; }>("get", "/auth/sessions");

                if ("authenticated" in res && res.authenticated) {
                    void navigate("/rooms/@me");
                }
            } catch (error) {
                console.error("Error checking authentication:", error);
            } finally {
                setIsLoading(false);
            }
        }

        void checkAuth();
    }, [navigate]);


    const form = useForm<APIPostAuthRegisterBody>({
        resolver: zodResolver(
            type === Type.Create
                ? APIPostAuthRegisterBodySchema
                : APIPostAuthLoginBodySchema
        )
    });

    const email = form.watch("email");
    const username = form.watch("username");
    const password = form.watch("password");

    const canContinue = email && password && (type === Type.Create ? username : true);

    async function register(data: APIPostAuthRegisterBody) {
        const res = await request<APIPostAuthRegisterResponse>("post", "/auth/register", data);
        void handle(res);
    }

    async function login(data: APIPostAuthRegisterBody) {
        const res = await request<APIPostAuthLoginResponse>("post", "/auth/login", data);
        void handle(res);
    }

    function handle(res: APIPostAuthLoginResponse | ApiError) {
        if ("message" in res) {
            form.setError("password", { message: res.message });
            return;
        }

        // if (res.required_actions.includes(UserAuthRequiredAction.VerifyEmail)) {
        //     return navigate("/verify-email");
        // }

        void navigate("/rooms/@me");
    }

    return (
        <Auth>
            <AuthTitle>👋 Welcome to {Config.platform_name}</AuthTitle>
            <AuthDescription>Tell us who you are to start chatting!</AuthDescription>
            <AuthContent>
                <Tabs
                    defaultValue={Type.Login}
                    className="mb-3 mt-5 w-full"
                    onValueChange={(value) => setType(value as Type)}
                >
                    <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger value={Type.Login}>Login</TabsTrigger>
                        <TabsTrigger value={Type.Create}>Create</TabsTrigger>
                    </TabsList>
                </Tabs>

                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(type === Type.Create ? register : login)}
                        className="space-y-2"
                    >
                        {fields.map((id) =>
                            (type === Type.Login && id === "username") ? null : (
                                <FormField
                                    key={id}
                                    control={form.control}
                                    name={id}
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>
                                                {id.replace(/^\w/, (char) => char.toUpperCase())}
                                            </FormLabel>
                                            <FormControl>
                                                <Input
                                                    type={id}
                                                    autoComplete={id === "password"
                                                        ? (type === Type.Login ? "current-password" : "new-password")
                                                        : id
                                                    }
                                                    autoFocus={id === "email"}
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            ))}
                        <div className="h-2" />

                        <Button
                            className="w-full"
                            type="submit"
                            disabled={!canContinue}
                        >
                            Submit
                        </Button>
                    </form>
                </Form>
            </AuthContent>
        </Auth>
    );
}