import { Outlet } from "react-router";

import { FriendsList } from "~/components/dms/friends-list";
import { ServerList } from "~/components/rooms/server-list";
import { CurrentUserPanel } from "~/components/rooms/user-panel";

export default function ServerLayout() {
    return (
        <div className="flex h-screen w-full max-h-screen">
            <div className="flex relative">
                <ServerList />
                <FriendsList/>
                <CurrentUserPanel />
            </div>
            <Outlet />
        </div>
    );
}