import { SettingsIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";

import { useUserStore } from "~/common/user";
import { useCurrentUserStore } from "~/common/users";

import { UserAvatar } from "../ui/avatar";

export function ServerMembersSidebar() {
    const currentUser = useCurrentUserStore(); // Current user info
    const users = useUserStore(); // All users in the server
    const navigate = useNavigate();

    const handleSettingsClick = async () => {
        await navigate("/rooms/settings");
    };

    return (
        <div className="w-64 bg-gray-800 text-white p-4 flex flex-col h-screen">
            {/* Current User Panel */}
            <div className="flex items-center gap-2 bg-popover border-2 border-border rounded-lg shadow-xl p-3 mb-4">
                <UserAvatar
                    className="size-9"
                    id={currentUser?.id}
                    username={currentUser?.username}
                />
                <div className="flex-grow">
                    <p className="font-medium">{currentUser?.nickname || currentUser?.username}</p>
                    <p className="text-muted-foreground text-xs font-semibold">@{currentUser?.username}</p>
                </div>
                <SettingsIcon
                    className="cursor-pointer text-muted-foreground hover:text-primary"
                    onClick={handleSettingsClick}
                    size={20}
                />
            </div>

            {/* Members List */}
            <h2 className="text-lg font-semibold mb-4">Server Members</h2>
            <ul className="space-y-2 flex-grow overflow-y-auto">
                {users.map((user) => (
                    <li
                        key={user.id} // Use user.id as key
                        className="flex items-center gap-2 hover:bg-gray-700 p-2 rounded-md cursor-pointer"
                    >
                        <UserAvatar id={user.id} username={user.username} className="w-8 h-8" />
                        <span>{user.nickname || user.username}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
}
