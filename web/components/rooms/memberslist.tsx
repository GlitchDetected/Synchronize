import { useEffect } from "react";

import { useMembersStore } from "~/common/members";
import { request } from "~/lib/api";
import type { ServerMember } from "~/types/members";

export function ServerMembersSidebar({ serverId }: { serverId: number; }) {
    const { items: members, set } = useMembersStore();

    useEffect(() => {
        async function fetchMembers() {
            try {
                const res = await request<ServerMember[]>("get", `/api/servers/${serverId}/members`);

                // Ensure response data is valid
                set(res);
            } catch (error) {
                console.error("Error fetching server members:", error);
            }
        }

        void fetchMembers();
    }, [serverId, set]);

    return (
        <div className="fixed top-0 right-0 w-72 h-full p-4">
            <h2 className="text-lg font-semibold mb-4">Server Members</h2>
            <ul className="space-y-2 flex-grow overflow-y-auto">
                {members.map((member) => (
                    <li
                        key={member.user_id}
                        className="flex items-center gap-2 hover:bg-gray-700 p-2 rounded-md cursor-pointer"
                    >
                        <span>User {member.user_id}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
}