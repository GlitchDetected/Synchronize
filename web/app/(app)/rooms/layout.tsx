import { useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router";

import { ParkingLot } from "~/components/rooms/parking-lot";
import { RoomList } from "~/components/rooms/room-list";
import { ServerList } from "~/components/rooms/server-list";
import { CurrentUserPanel } from "~/components/rooms/user-panel";

export default function ServerLayout() {
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        if (location.pathname === "/rooms/") {
            void navigate("/rooms/@me");
        }
    }, [navigate, location.pathname]);

    return (
        <div className="flex h-screen w-full max-h-screen overflow-hidden">
            <div className="flex relative">
                <ServerList />
                <RoomList />
                <CurrentUserPanel />
            </div>
            <div className="flex-grow">
                {location.pathname === "/rooms/@me" ? <ParkingLot /> : <Outlet />}
            </div>
        </div>
    );
}