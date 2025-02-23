import { Bell, Bot, CircleUser, LogOut, Moon, ShieldPlus } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

import { useCurrentUserStore } from "~/common/users";
import { UserAvatar } from "~/components/ui/avatar";
import { EditableField } from "~/components/ui/edit";

export function Settings() {
    const currentUser = useCurrentUserStore();
    console.log(currentUser);
    const [selectedSetting, setSelectedSetting] = useState<string>("myaccount");
    const [theme, setTheme] = useState<string>("dark");
    const navigate = useNavigate();

    const settings = [
        { id: "myaccount", label: "My account", icon: CircleUser },
        { id: "profile", label: "Profile", icon: CircleUser },
        { id: "sessions", label: "Sessions", icon: ShieldPlus },
        { id: "notifications", label: "Notifications", icon: Bell },
        { id: "appearance", label: "Appearance", icon: Moon },
        { id: "mybots", label: "My Bots", icon: Bot },
        { id: "logout", label: "Log out", icon: LogOut, red: true }
    ];

    useEffect(() => {
        const fetchTheme = async () => {
            try {
                const response = await fetch("/api/users/@me/", {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json"
                    }
                });
                if (response.ok) {
                    const userData = await response.json();
                    const savedTheme = userData.apptheme;
                    setTheme(savedTheme);
                    document.documentElement.classList.remove("light", "dark");
                    document.documentElement.classList.add(savedTheme);
                } else {
                    console.error("Failed to fetch user data");
                }
            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        };

        void fetchTheme();
    }, []);

    const toggleTheme = async (newTheme: string) => {
        setTheme(newTheme);
        localStorage.setItem("theme", newTheme);

        document.documentElement.classList.remove("light", "dark");
        document.documentElement.classList.add(newTheme);

        try {
            const response = await fetch("/api/users/@me/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ apptheme: newTheme })
            });

            if (!response.ok) {
                console.error("Failed to update theme");
            }
        } catch (error) {
            console.error("Error updating theme:", error);
        }
    };


    const handleSignout = async () => {
        try {
            const response = await fetch("/api/auth/signout", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                }
            });
            if (response.ok) {
                void navigate("/login");
            } else {
                console.error("Failed to sign out");
            }
        } catch (error) {
            console.error("Error signing out", error);
        }
    };

    return (
        <div className="flex w-full h-screen bg-background relative">

            {/* Sidebar */}
            <div className="flex flex-col w-64 bg-sidebar p-4 border-r border-border h-full ml-4">
                <h2 className="text-xl font-semibold text-muted-foreground mb-4">Settings</h2>
                <ul className="space-y-2">
                    {settings.map(({ id, label, icon: Icon, red }) => (
                        <li
                            key={id}
                            className={`flex items-center gap-3 p-2 rounded-lg cursor-pointer ${
                                selectedSetting === id
                                    ? "bg-primary text-primary-foreground"
                                    : `text-muted-foreground hover:bg-muted ${red ? "text-red-500 hover:bg-red-500/10" : ""}`
                            }`}
                            onClick={() => id === "logout" ? handleSignout() : setSelectedSetting(id)}
                        >
                            <Icon size={18} />
                            <span>{label}</span>
                        </li>
                    ))}
                </ul>
            </div>

            <div className="flex-1 p-6 overflow-auto h-full">
                <div className="flex items-center gap-4 bg-popover border-2 border-border rounded-lg shadow-xl p-4 mb-6">
                    <UserAvatar
                        className="size-12"
                        id={currentUser?.id}
                        username={currentUser?.username}
                    />
                    <div>
                        <EditableField label="Nickname" field="nickname" value={currentUser?.nickname || "no nickname!"} />
                        <EditableField label="Username" field="username" value={currentUser?.username || ""} />
                        <EditableField label="Email" field="email" value={currentUser?.email || ""} />
                        <p className="text-muted-foreground text-sm font-semibold">{currentUser?.created_at}</p>
                        <p className="text-muted-foreground text-sm font-semibold">{currentUser?.id}</p>
                    </div>
                </div>

                <div>
                    <h3 className="text-2xl font-semibold text-muted-foreground">
                        {settings.find((setting) => setting.id === selectedSetting)?.label || "General"}
                    </h3>
                    <div className="mt-4">
                        {selectedSetting === "appearance" && (
                            <div>
                                <p className="text-muted-foreground mb-2">Choose your theme:</p>
                                <div className="flex items-center gap-4">
                                    {/* Light Theme */}
                                    <button
                                        onClick={() => toggleTheme("light")}
                                        className={`w-10 h-10 rounded-full border flex items-center justify-center 
                        ${theme === "light" ? "border-blue-500" : "border-muted-foreground"} bg-white relative`}
                                    >
                                        {theme === "light" && (
                                            <div className="absolute inset-0 flex items-center justify-center">
                                                <span className="text-blue-500 text-lg font-bold">✓</span>
                                            </div>
                                        )}
                                    </button>

                                    {/* Dark Theme */}
                                    <button
                                        onClick={() => toggleTheme("dark")}
                                        className={`w-10 h-10 rounded-full border flex items-center justify-center 
                        ${theme === "dark" ? "border-blue-500" : "border-muted-foreground"} bg-gray-900 relative`}
                                    >
                                        {theme === "dark" && (
                                            <div className="absolute inset-0 flex items-center justify-center">
                                                <span className="text-blue-500 text-lg font-bold">✓</span>
                                            </div>
                                        )}
                                    </button>
                                </div>
                            </div>
                        )}
                        {selectedSetting !== "appearance" && selectedSetting !== "logout" && (
                            <p className="text-muted-foreground">Configure your {selectedSetting} settings here.</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}