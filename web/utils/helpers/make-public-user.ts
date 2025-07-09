import type { PublicUser, User } from "~/types/users";
import { UserFlags } from "~/types/users";

import { BitfieldManager } from "../bitfields";

export function makePublicUser(user: User): PublicUser {
    const { password_hash, flags, ...publicUser } = user;

    const bitfield = new BitfieldManager(flags);
    // bitfield.remove(UserFlags.VerifiedEmail);
    bitfield.remove(UserFlags.Disabled);

    return {
        ...publicUser,
        flags: bitfield.flags
    };
}