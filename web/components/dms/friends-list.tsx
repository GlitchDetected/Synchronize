import { useState } from "react";
import { useNavigate } from "react-router";

export function FriendsList() {
    const navigate = useNavigate();
    const [active, setActive] = useState("friends");

    const [friends] = useState([
        { id: 1, name: "x" },
        { id: 2, name: "y" },
        { id: 3, name: "z" }
    ]);

    const menuItems = [
        { name: "Friends", path: "/rooms/@me", external: false },
        { name: "Oxygen", path: "/oxygen", external: true },
        { name: "GitHub", path: "https://github.com/glitchdetected/synchronize", external: true }
    ];

    return (
        <div className="w-60 bg-neutral-900 p-4 flex flex-col">
            <div className="w-60 bg-neutral-900 p-4 flex flex-col">
                <div className="flex flex-col space-y-2">
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
                </div>
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