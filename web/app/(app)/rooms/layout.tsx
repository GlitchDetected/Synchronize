import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router";

import { RoomList } from "~/components/rooms/room-list";
import { ServerList } from "~/components/rooms/server-list";
import { CurrentUserPanel } from "~/components/rooms/user-panel";

export default function ServerLayout() {
    const navigate = useNavigate();

    useEffect(() => {
        void navigate("/rooms/@me");
    }, [navigate]);

    return (
        <div className="flex h-screen w-full max-h-screen overflow-hidden">
            <div className="flex relative">
                <ServerList />
                <RoomList />
                <CurrentUserPanel />
            </div>
            <Outlet />
        </div>
    );
}