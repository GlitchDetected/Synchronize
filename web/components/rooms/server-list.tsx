import { LoaderCircleIcon, PlusIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router";

import { useLastRoomForServerStore } from "~/common/rooms";
import { fetchServers, useCurrentServer, useServerStore } from "~/common/servers";
import type { Server } from "~/types/server";

import { CreateServerModal } from "./create-server";
import { ServerIcon } from "../ui/avatar";
import { Button } from "../ui/button";

export function ServerList() {
    const servers = useServerStore((store) => store.items);
    const lastRoom = useLastRoomForServerStore();
    const server = useCurrentServer();
    const params = useParams();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadServers() {
            setLoading(true);
            await fetchServers();
            setLoading(false);
        }
        void loadServers();
    }, []);

    useEffect(
        () => {
            const roomId = Number(params.rid);
            if (!server || !roomId || Number.isNaN(roomId)) return;

            lastRoom.setLastRoom(server.id, roomId);
        },
        [params]
    );


    return (
        <div className="w-15 bg-background2 pb-4 h-full">
            <div className="border-r-1 h-full p-2.5 space-y-2">
                <DirectMessages/>
                {loading ? (
                    <div className="flex justify-center items-center h-16">
                        <LoaderCircleIcon className="animate-spin text-gray-400" size={24} />
                    </div>
                ) : (
                    servers.map((server) => (
                        <Server
                            key={server.id}
                            server={server}
                            lastRoomId={lastRoom[server.id]}
                        />
                    ))
                )}
                <CreateServer />
            </div>
        </div>
    );
}

function DirectMessages() {
    const navigate = useNavigate();

    return (
        <Button onClick={() => navigate("/rooms/@me")} className="text-white">
            DMs
        </Button>
    );
}

function CreateServer() {
    return (
        <CreateServerModal>
            <Button
                variant="server"
                size="icon"
            >
                <PlusIcon className="text-violet-400" />
            </Button>
        </CreateServerModal>
    );
}

function Server({ server, lastRoomId }: { server: Server; lastRoomId: number; }) {
    return (
        <Button
            variant="server"
            size="icon"
            asChild
        >
            <Link to={`/rooms/${server.id}${lastRoomId ? `/${lastRoomId}` : ""}`}>
                <ServerIcon
                    id={server.id}
                    name={server.name}
                />
            </Link>
        </Button>
    );
}