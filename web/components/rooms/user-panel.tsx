import { SettingsIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";

import { useCurrentUserStore } from "~/common/users";

import { UserAvatar } from "../ui/avatar";

export function CurrentUserPanel() {
    const currentUser = useCurrentUserStore();
    const navigate = useNavigate();

    const handleSettingsClick = async () => {
        await navigate("/rooms/@me/settings");
    };

    return (
        <div className="absolute flex items-center gap-2 bg-popover border-2 border-border rounded-lg shadow-xl p-3 z-10 bottom-3 left-3 w-[calc(100%-24px)] break-all">
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
    );
}