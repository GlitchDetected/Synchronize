import { useState } from "react";

export function FriendsList() {
    const [friends] = useState([
        { id: 1, name: "h" },
        { id: 2, name: "wre" },
        { id: 3, name: "wreewrdfs" }
    ]);

    return (
        <div className="w-60 bg-gray-800 p-4 flex flex-col">
            <div className="flex justify-between items-center mb-4">
                <button className="text-white text-sm">Friends</button>
                <button className="text-gray-400 text-sm">Oxygen</button>
                <button className="text-gray-400 text-sm">GitHub</button>
            </div>

            <div className="flex-grow overflow-y-auto">
                {friends.map((friend) => (
                    <div key={friend.id} className="text-white p-2 hover:bg-gray-700 rounded cursor-pointer">
                        {friend.name}
                    </div>
                ))}
            </div>

            <div className="mt-auto">
                <h2 className="text-gray-300 text-sm mb-2">Direct Messages</h2>
                <button className="w-full text-left text-blue-400 hover:underline">
                    + Add Friend
                </button>
            </div>
        </div>
    );
}