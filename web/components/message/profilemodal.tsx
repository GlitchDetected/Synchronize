import { UserAvatar } from "../ui/avatar";
import { Dialog, DialogContent, DialogTitle } from "../ui/dialog";

interface UserProfileProps {
    user: {
        id: number;
        username: string;
        nickname: string | null;
        banner?: string | null;
        avatar?: string | null;
        aboutme?: string | null;
        pronouns?: string | null;
        flags: number;
    };
    isOpen: boolean;
    onClose: () => void;
}

export function UserProfileModal({ user, isOpen, onClose }: UserProfileProps) {
    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="p-6 bg-background2 rounded-xl">
                {user.banner && (
                    <div className="w-full h-32 bg-cover bg-center rounded-md" style={{ backgroundImage: `url(${user.banner})` }} />
                )}
                <div className="flex flex-col items-center -mt-12">
                    <UserAvatar id={user.id} username={user.username} className="w-24 h-24 border-4 border-background2" />
                    <DialogTitle className="mt-2 text-lg font-light text-gray-400">{user.nickname || user.username}</DialogTitle>
                    <DialogTitle className="mt-2 text-lg font-semibold">{user.username}</DialogTitle>
                    <p className="text-sm text-gray-400">ID: {user.id}</p>
                    <p className="text-sm text-gray-400">Bio: {user.aboutme}</p>
                    <p className="text-sm text-gray-400">Pronouns: {user.pronouns}</p>
                    <p className="text-sm text-gray-400">Flags: {user.flags}</p>
                </div>
            </DialogContent>
        </Dialog>
    );
}