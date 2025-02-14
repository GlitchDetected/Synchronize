import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeftIcon, TriangleAlertIcon } from "lucide-react";
import { type ReactNode, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";

import { request } from "~/lib/api";
import type { APIPostInviteBody, APIPostInviteResponse } from "~/types/invites";
import { APIPostInviteBodySchema } from "~/types/invites";
import type { APIPostServersBody, APIPostServersResponse } from "~/types/server";
import { APIPostServersBodySchema } from "~/types/server";

import { Alert, AlertDescription } from "../ui/alert";
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Separator } from "../ui/separator";

enum State {
    JoinServer = 0,
    CreateServer = 1
}

export function CreateServerModal({
    children
}: {
    children: ReactNode;
}) {
    const [state, setState] = useState<State>(State.JoinServer);
    const [open, setOpen] = useState(false);

    return (
        <Dialog
            open={open}
            onOpenChange={(isOpen) => {
                if (!isOpen) setTimeout(() => setState(State.JoinServer), 800);
                setOpen(isOpen);
            }}
        >
            <DialogTrigger asChild>
                {children}
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Create or join a Server</DialogTitle>
                    <DialogDescription>
                        A server is a collection of rooms where you and your friends - or community - can chat and hang out!
                    </DialogDescription>
                </DialogHeader>
                {state === State.JoinServer
                    ? <JoinServer
                        onSuccess={() => setOpen(false)}
                        onChange={setState}
                    />
                    : <CreateServer
                        onSuccess={() => setOpen(false)}
                        onBack={() => setState(State.JoinServer)}
                    />
                }
            </DialogContent>
        </Dialog>

    );
}

function JoinServer({
    onSuccess,
    onChange
}: {
    onSuccess: () => unknown;
    onChange: (state: State) => void;
}) {
    const [invite, setInvite] = useState<string | null>();
    const [error, setError] = useState<string | null>();
    const navigate = useNavigate();

    const form = useForm<APIPostInviteBody>({
        resolver: zodResolver(APIPostInviteBodySchema)
    });

    async function handle(data: APIPostInviteBody) {
        const res = await request<APIPostInviteResponse>("post", `/invites/${invite}`, data);
        setError(null);

        if ("message" in res) {
            setError(res.message);
            return;
        }

        void navigate(`/rooms/${res.server_id}/${res.invite_room_id}`);
        onSuccess();
    }

    return (
        <div className="space-y-4">
            <Button
                className="w-full"
                variant="secondary"
                onClick={() => onChange(State.CreateServer)}
            >
                Create a Server
            </Button>

            <Separator />

            {error &&
                <Alert variant="destructive">
                    <TriangleAlertIcon className="size-5" />
                    <AlertDescription>{error}</AlertDescription>
                </Alert>
            }

            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(handle)}
                    className="flex gap-2"
                >
                    <div className="w-full">
                        <Label htmlFor="server-invite">Join a Server</Label>
                        <Input
                            id="server-invite"
                            placeholder="0eKQKZis"
                            onChange={(e) => setInvite(e.target.value)}
                        />
                    </div>

                    <Button
                        className="mt-auto w-24"
                        variant="secondary"
                        type="submit"
                        disabled={!invite}
                    >
                        Join
                    </Button>
                </form>
            </Form>
        </div>
    );
}

function CreateServer({
    onSuccess,
    onBack
}: {
    onSuccess: () => unknown;
    onBack: () => unknown;
}) {
    const navigate = useNavigate();

    const form = useForm<APIPostServersBody>({
        resolver: zodResolver(APIPostServersBodySchema)
    });

    const name = form.watch("name");

    async function handle(data: APIPostServersBody) {
        const res = await request<APIPostServersResponse>("post", "/servers", data);

        if ("message" in res) {
            form.setError("name", { message: res.message });
            return;
        }

        void navigate(`/rooms/${res.id}`);
        onSuccess();
    }

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(handle)}
                className="space-y-2"
            >

                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>
                                Server Name
                            </FormLabel>
                            <FormControl>
                                <Input
                                    type="name"
                                    autoFocus
                                    placeholder="In your walls"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <div className="pt-1 flex justify-between items-end">
                    <Button
                        variant="secondary"
                        type="submit"
                        disabled={!name}
                    >
                        Create Server
                    </Button>
                    <Button
                        variant="link"
                        size="sm"
                        onClick={onBack}
                    >
                        <ArrowLeftIcon />
                        Join server instead
                    </Button>
                </div>
            </form>
        </Form>
    );
}