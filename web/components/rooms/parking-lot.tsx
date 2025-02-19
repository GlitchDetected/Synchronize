import { ClockIcon, ShieldXIcon, UserPlusIcon, UsersIcon } from "lucide-react";
import { useState } from "react";

export function ParkingLot() {
    const [activeTab, setActiveTab] = useState("Friends");

    const tabs = [
        { name: "Friends", icon: <UsersIcon /> },
        { name: "Pending", icon: <ClockIcon /> },
        { name: "Blocked", icon: <ShieldXIcon /> },
        { name: "Add Friend", icon: <UserPlusIcon /> }
    ];

    return (
        <div className="flex flex-col h-screen">
            <div className="bg-gray-950 w-full p-3 flex justify-around">
                {tabs.map((tab) => (
                    <button
                        key={tab.name}
                        className={`flex-1 text-sm py-2 rounded-md transition flex items-center justify-center gap-2 ${
                            activeTab === tab.name ? "bg-accent text-white" : "text-gray-400 hover:bg-accent"
                        }`}
                        onClick={() => setActiveTab(tab.name)}
                    >
                        {tab.icon}
                        {tab.name}
                    </button>
                ))}
            </div>

            <div className="flex-grow flex items-center justify-center text-xl font-medium">
                You are currently on {activeTab}
            </div>
        </div>
    );
}