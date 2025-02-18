import { useMemo } from "react";
import { useParams } from "react-router";

import { useRoomStore } from "~/common/rooms";
import type { Server } from "~/types/server";
import { defineDataStore } from "~/utils/define/data-store";

export const useServerStore = defineDataStore<Server>();

export async function fetchServers() {
    try {
        const response = await fetch("/api/servers");
        if (!response.ok) {
            throw new Error(`Failed to fetch servers: ${response.status} ${response.statusText}`);
        }

        const servers: Server[] = await response.json();

        useServerStore.getState().set(servers);
    } catch (error) {
        console.error("Error fetching servers:", error);
    }
}


export function useCurrentServer() {
    const servers = useServerStore((store) => store.items);
    const params = useParams();

    return useMemo(
        () => servers.find((s) => s.id === Number(params.sid)),
        [servers, params]
    );
}

export function useCurrentServerRooms() {
    const rooms = useRoomStore((store) => store.items);
    const params = useParams();

    return useMemo(
        () => rooms.filter((r) => r.server_id === Number(params.sid)),
        [rooms, params]
    );
}