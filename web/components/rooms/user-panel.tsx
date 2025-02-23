import { SettingsIcon, X } from "lucide-react";
import { useEffect, useState } from "react";

import { useCurrentUserStore } from "~/common/users";

import { Settings } from "./settings";
import { UserAvatar } from "../ui/avatar";

export function CurrentUserPanel() {
    const currentUser = useCurrentUserStore();
    const [open, setOpen] = useState(false);

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === "Escape") {
                setOpen(false);
            }
        };

        if (open) {
            document.addEventListener("keydown", handleKeyDown);
        }

        return () => {
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, [open]);

    return (
        <>
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
                    size={20}
                    onClick={() => setOpen(true)}
                />
            </div>
            {open && (
                <div className="fixed inset-0 bg-background flex justify-center items-center z-50">
                    <Settings />
                    <button
                        className="absolute top-4 right-4 bg-muted p-2 rounded-full text-muted-foreground hover:bg-muted-foreground transition"
                        onClick={() => setOpen(false)}
                    >
                        <X size={20} />
                    </button>
                </div>
            )}
        </>
    );
}