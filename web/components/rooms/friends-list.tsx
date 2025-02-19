import { useState } from "react";
import { useNavigate } from "react-router";

export function FriendsList() {
    const navigate = useNavigate();
    const [active, setActive] = useState("friends");

    const [friends] = useState([
        { id: 1, name: "jeff" },
        { id: 2, name: "bob" },
        { id: 3, name: "josh" }
        // /rooms/@me/user_id
    ]);

    const menuItems = [
        { name: "Friends", path: "/rooms/@me", external: false },
        { name: "Oxygen", path: "/oxygen", external: true },
        { name: "GitHub", path: "https://github.com/glitchdetected/synchronize", external: true }
    ];

    return (
        <div className="w-56 bg-background2 p-4 flex flex-col">
            {menuItems.map((item) => (
                <button
                    key={item.name}
                    className={`text-sm px-3 py-2 rounded-md transition ${
                        active === item.name ? "bg-gray-700 text-white" : "text-gray-400 hover:bg-gray-800 hover:text-white"
                    }`}
                    onClick={() => {
                        setActive(item.name);
                        if (item.external) {
                            window.open(item.path, "_blank");
                        } else {
                            void navigate(item.path);
                        }
                    }}
                >
                    {item.name}
                </button>
            ))}

            <div className="mt-8 text-sm px-3 text-gray-400">
                Direct Messages
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