import { useMemo } from "react";
import { useParams } from "react-router";

import type { ServerMemberTable } from "~/types/members";
import { defineDataStore } from "~/utils/define/data-store";

export const useMembersStore = defineDataStore<ServerMemberTable>();

export function useCurrentMembers() {
    const members = useMembersStore((store) => store.items);
    const params = useParams();

    return useMemo(
        () => members.filter((m) => m.server_id === Number(params.serverId)),
        [members, params]
    );
}