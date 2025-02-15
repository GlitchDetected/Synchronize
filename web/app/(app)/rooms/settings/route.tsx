import { useEffect, useState } from "react";

import { useCurrentUserStore } from "~/common/users";
import { UserAvatar } from "~/components/ui/avatar";

export default function Settings() {
    const currentUser = useCurrentUserStore();
    const [selectedSetting, setSelectedSetting] = useState<string>("general");
    const [theme, setTheme] = useState<string>("dark");

    const settings = [
        { id: "general", label: "General" },
        { id: "privacy", label: "Privacy" },
        { id: "notifications", label: "Notifications" },
        { id: "appearance", label: "Appearance" }
        // Add more settings as needed
    ];

    // Load the theme from localStorage on component mount
    useEffect(() => {
        const savedTheme = localStorage.getItem("theme") || "dark"; // Default to dark if no preference
        setTheme(savedTheme);
        document.documentElement.setAttribute("data-theme", savedTheme); // Apply the theme to the document
    }, []);

    // Toggle between dark and light mode
    const toggleTheme = () => {
        const newTheme = theme === "dark" ? "light" : "dark";
        setTheme(newTheme);
        localStorage.setItem("theme", newTheme); // Save the theme to localStorage
        document.documentElement.setAttribute("data-theme", newTheme); // Apply the theme
    };

    return (
        <div className="flex w-full h-screen bg-background">
            {/* Sidebar */}
            <div className="flex flex-col w-64 bg-sidebar p-4 border-r border-border h-full">
                <h2 className="text-xl font-semibold text-muted-foreground mb-4">Settings</h2>
                <ul className="space-y-2">
                    {settings.map((setting) => (
                        <li
                            key={setting.id}
                            className={`p-2 rounded-lg cursor-pointer ${
                                selectedSetting === setting.id
                                    ? "bg-primary text-primary-foreground"
                                    : "text-muted-foreground hover:bg-muted"
                            }`}
                            onClick={() => setSelectedSetting(setting.id)}
                        >
                            {setting.label}
                        </li>
                    ))}
                </ul>
            </div>

            {/* User Settings Section */}
            <div className="flex-1 p-6 overflow-auto h-full">
                {/* User Info */}
                <div className="flex items-center gap-4 bg-popover border-2 border-border rounded-lg shadow-xl p-4 mb-6">
                    <UserAvatar
                        className="size-12"
                        id={currentUser?.id}
                        username={currentUser?.username}
                    />
                    <div>
                        <p className="font-medium text-lg">{currentUser?.nickname || currentUser?.username}</p>
                        <p className="text-muted-foreground text-sm font-semibold">@{currentUser?.username}</p>
                    </div>
                </div>

                {/* Selected Setting Section */}
                <div>
                    <h3 className="text-2xl font-semibold text-muted-foreground">
                        {settings.find((setting) => setting.id === selectedSetting)?.label || "General"}
                    </h3>
                    <div className="mt-4">
                        {selectedSetting === "appearance" && (
                            <div>
                                <p className="text-muted-foreground mb-2">Choose your theme:</p>
                                <button
                                    onClick={toggleTheme}
                                    className="px-4 py-2 rounded-lg border border-muted-foreground bg-popover text-muted-foreground"
                                >
                                    {theme === "dark" ? "Switch to Light Mode" : "Switch to Dark Mode"}
                                </button>
                            </div>
                        )}
                        {selectedSetting !== "appearance" && (
                            <p className="text-muted-foreground">Configure your {selectedSetting} settings here.</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}