import { LoaderCircleIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router";

import { Config } from "~/constants/config";
import { WebSocketProvider } from "~/lib/gateway";

const loadingLines = [
    "Discord was almost called Bonfire before we picked our name. It was meant to be nice and cozy.",
    "Discord was almost called Wyvern before we picked our name. Not too proud of that one.",
    "Our logo's name is Clyde.",
    "There are a bunch of hidden 'Easter Eggs' in the app that happen when you click certain things...",
    "Discord started as a game company making a mobile game called Fates Forever.",
    "Discord’s official birthday is May 13, 2015.",
    "We came up with the idea of Discord Nitro over morning breakfast potatoes.",
    "Our mascot, Wumpus, was originally created as a character with no friends :(",
    "In Discord's early days, light theme was the only theme. Scary times.",
    "In the ancient days, Discord started as a browser-only app.",
    "Our HypeSquad program has three houses you can be sorted in to by taking the in-app quiz: Bravery, Balance, and Brilliance.",
    "The character on our 404 page is a robot hamster named Nelly.",
    "You can play our version of the Snake game on our 404 page by pressing a secret button.",
    "There's a very small—and we mean small—chance you can get a secret ringtone when calling someone. Good luck!",
    "Our old Partner mascot was an elf named Springle. He recently retired.",
    "[CTRL] [K] to quickly find a previous conversation or channel.",
    "[ALT] [CLICK] a message to mark it as unread.",
    "[SHIFT] [ESC] to mark an entire server as read.",
    "[ALT] [SHIFT] [UP] or [DOWN] will navigate between unread channels",
    "Use [CTRL] [/] to bring up the list of keyboard shortcuts.",
    "[SHIFT] [ENTER] to make a new line without sending your message.",
    "Holding [ALT] while clicking emoji allows you to send multiple emoji.",
    "You can press [UP] to quickly edit your most recent message.",
    "You can use Streamer Mode to hide personal details while streaming.",
    "You can type /tableflip and /unflip to spice up your messages.",
    "Characters like @, #, !, and * will narrow Quick Switcher results.",
    "Click a server name in the emoji picker to hide that server's emoji.",
    "Hover a GIF and click the star to save it to your favorites.",
    "The top-most role for a user defines that user's color.",
    "A red mic icon means that person has been muted by a server admin.",
    "You can temporarily mute a server or channel by right-clicking it.",
    "Click your avatar in the lower-left corner to set a custom status.",
    "Group DMs can have up to ten members.",
    "Click the compass in your server list to find new servers.",
    "Drag and drop servers on top of each other to create server folders.",
    "Type /tenor or /giphy + anything to find a GIF for that topic!",
    "Share what you're playing by using the Game Activity settings.",
    "Highlight text in your chat bar to bold, use italics, and more.",
    "Hide muted channels in a server by right clicking the server name.",
    "Customize Discord's appearance in the user settings menu.",
    "Link your favorite social media accounts in the connections settings.",
    "You can create channel categories to group and organize your channels.",
    "You can join up to 100 servers.",
    "You can drag and drop files onto Discord to upload them.",
    "Change each participant's volume by right-clicking them in a call.",
    "Right click to pin messages in a channel or DM to save them for later.",
    "Type a plus sign before an emoji name to turn it into a reaction.",
    "You can type /nick to quickly change your nickname in a server."
];

export default function RoomLayout() {
    const [loadingLine, setLoadingLine] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        // Pick a random line from the loadingLines array
        const randomLine = loadingLines[Math.floor(Math.random() * loadingLines.length)];
        setLoadingLine(randomLine);

        // Set a timeout to redirect after 15 seconds
        const timer = setTimeout(async () => {
            // Redirect to the current URL after 15 seconds
            await navigate(window.location.pathname);
        }, 15_000);

        // Cleanup the timeout if the component unmounts before 15 seconds
        return () => clearTimeout(timer);
    }, [navigate]);

    return (
        <WebSocketProvider
            url={Config.gateway_url}
            fallback={
                <div className="flex items-center justify-center bg-background absolute h-screen w-screen top-0 left-0 z-100 flex-col">
                    <LoaderCircleIcon className="animate-spin size-8 text-violet-400" strokeWidth={2.5} />
                    <p className="mt-4 text-center text-white">{loadingLine}</p>
                </div>
            }
        >
            <Outlet />
        </WebSocketProvider>
    );
}