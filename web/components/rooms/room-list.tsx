import { HashIcon, PlusIcon, UserRoundPlusIcon } from "lucide-react";
import { useEffect } from "react";
import { Link, useParams } from "react-router";

import { useRoomStore } from "~/common/rooms";
import { useCurrentServer, useCurrentServerRooms } from "~/common/servers";
import { useCurrentUserStore } from "~/common/users";
import type { Room } from "~/types/rooms";

import { CreateInviteModal } from "./create-invite";
import { CreateRoomModal } from "./create-room";
import { FriendsList } from "./friends-list";
import { RoomServerHeader } from "./server/header";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";

export function RoomList() {
    const server = useCurrentServer();
    const currentUser = useCurrentUserStore();
    const params = useParams();
    const rooms = useCurrentServerRooms();

    useEffect(() => {
        const fetchRoomsData = async () => {
            if (!server) return;

            try {
                const response = await fetch(`/api/servers/${server.id}/rooms`);
                if (!response.ok) {
                    throw new Error(`Failed to fetch rooms: ${response.status} ${response.statusText}`);
                }

                const room: Room[] = await response.json();
                useRoomStore.getState().set(room);
            } catch (error) {
                console.error("Error fetching rooms:", error);
            }
        };

        void fetchRoomsData();
    }, [server]);


    if (!server) {
        return < FriendsList/>;
        // redirect("/rooms/@me");
    }

    return (
        <div className="w-56 bg-background2">
            <RoomServerHeader />

            <div className="p-2.5 space-y-px">
                {rooms
                    .sort((a, b) => b.position - a.position)
                    .map((room) =>
                        <Button
                            key={room.id}
                            asChild
                            variant="room"
                            data-selected={Number(params.rid) === room.id}
                            className="group"
                        >
                            <Link to={`/rooms/${server.id}/${room.id}`}>
                                <HashIcon />
                                {room.name}
                                <CreateInviteModal
                                    className="ml-auto hidden group-hover:block"
                                    roomId={room.id}
                                >
                                    <UserRoundPlusIcon />
                                </CreateInviteModal>
                            </Link>
                        </Button>
                    )
                }

                <Separator className="mt-2" />

                {server.owner_id === currentUser?.id &&
                    <CreateRoomModal>
                        <Button
                            className="text-xs text-muted-foreground mx-2"
                            variant="link"
                        >
                            <PlusIcon />
                            Create new channel#️⃣
                        </Button>
                    </CreateRoomModal>
                }
            </div>
        </div>
    );
}