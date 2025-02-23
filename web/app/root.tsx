import { useEffect, useState } from "react";
import type { LinksFunction } from "react-router";
import {
    Links,
    Meta,
    Outlet,
    Scripts,
    ScrollRestoration
} from "react-router";

import { Config } from "~/constants/config";

import stylesheet from "./tailwind.css?url";

export const links: LinksFunction = () => [
    { rel: "stylesheet", href: stylesheet },
    { rel: "preconnect", href: "https://fonts.googleapis.com" },
    {
        rel: "preconnect",
        href: "https://fonts.gstatic.com",
        crossOrigin: "anonymous"
    },
    {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap"
    }
];

export function Layout({ children }: { children: React.ReactNode; }) {
    const [theme, setTheme] = useState("dark");

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

    return (
        <html lang="en" className={theme}>
            <head>
                <meta charSet="utf-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <title>{Config.platform_name}</title>
                <Meta />
                <Links />
            </head>
            <body>
                {children}
                <ScrollRestoration />
                <Scripts />
            </body>
        </html>
    );
}

export default function App() {
    return <Outlet />;
}