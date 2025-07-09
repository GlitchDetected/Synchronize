import Invite from "./Invite";
import Messages from "./Messages";
import Room from "./Room";
import Server from "./Server";
import ServerMembers from "./ServerMembers";
import User from "./User";

const models = { Invite, Messages, Room, Server, ServerMembers, User };

export type ModelsMap = typeof models;
export default models;