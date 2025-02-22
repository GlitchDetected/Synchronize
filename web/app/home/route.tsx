"use client";

import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import { BsDiscord } from "react-icons/bs";
import { HiArrowNarrowRight } from "react-icons/hi";
import { Link } from "react-router";

import { MoreFeatures } from "~/components/home/evenmore";
import { Faq } from "~/components/home/faq";
import { Getstarted } from "~/components/home/getstarted";
import { Button } from "~/components/ui/button";
import ScrollToTopButton from "~/components/ui/scrolltop";
import { cn } from "~/lib/utils";

const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } }
};

const styles = {
    h2: "text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-b from-cyan-400 to-cyan-700 mb-6",
    h3: "text-2xl font-semibold text-transparent bg-clip-text bg-gradient-to-b from-neutral-200 to-neutral-300 mb-6",
    cardStyle: "md:w-2/3 p-8 bg-slate-900 rounded-lg shadow-lg hover:shadow-2xl transition-shadow"
};

export default function Home() {

    return (
        <div className="relative flex items-center flex-col w-full p-8 min-h-screen px-5 md:px-8 lg:px-12 xl:px-16 py-8 z-10">
            {/* Hero Section */}
            <motion.div
                className="flex w-full items-center gap-1 mb-16 mt-12"
                initial="hidden"
                animate="visible"
                variants={fadeIn}
            >
                <div className="w-full md:w-2/3 xl:w-1/2 flex flex-col space-y-6">
                    <h1 className="text-5xl font-semibold">
                        <span className="bg-gradient-to-r from-zinc-800 to-zinc-700 bg-clip-text text-transparent">
                            Next generation
                        </span>
                        {" of "}
                        <span className="inline-flex items-center">
                            Discord Moderation
                        </span>
                    </h1>
                    <p className="text-lg mb-4">
                        Secure your server with commands like /purge and /lockdown!
                    </p>

                    <div className="space-y-4">
                        <Link to="/dashboard" className="flex items-center text-zinc-600 hover:underline">
                            Go to Dashboard <HiArrowNarrowRight />
                        </Link>

                        <div className="button-row">
                            <div className="button-link">
                                <Link to="https://discord.com/oauth2/authorize?client_id=1237878380838523001">
                                    <Button className="button flex items-center gap-2">
                                        <Sparkles className="w-5 h-5" />
                                        Invite ChatGuard
                                    </Button>
                                </Link>
                            </div>

                            <div className="button-link">
                                <Link to="https://discord.gg/QnZcYsf2E9">
                                    <Button className="button flex items-center gap-2">
                                        <BsDiscord className="w-5 h-5" />
                                        Support Server
                                    </Button>
                                </Link>
                            </div>
                        </div>
                        <span className={cn("lg:ml-auto flex gap-2 text-neutral-500 font-medium -mt-2 opacity-80 pl-20 lg:pr-20 rotate-2 relative -top-10")}>
                            <img src={"/arrow.webp"} width={24} height={24} alt="arrow up" className="h-5 w-5 relative top-px" draggable={false} />
                            Get started here in seconds
                        </span>

                    </div>
                </div>
            </motion.div>

            <motion.div
                className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-8 mb-16"
                initial="hidden"
                animate="visible"
                variants={fadeIn}
            >

                <div className="card">
                    <h3>Filters</h3>
                    <p>
                        Keep any chat clean with our many automated filtering options.
                    </p>
                </div>

                <div className="card">
                    <h3>Fake Permissions</h3>
                    <p>
                        Remove all dangerous Discord permissions that can be used for malicious reasons through API.
                    </p>
                </div>

                <div className="card">
                    <h3>Anti-nuke</h3>
                    <p>
                        Easily prevent your server from malicious attacks and griefing, with a customizable threshold set by you.
                    </p>
                </div>

                <div className="card">
                    <h3>Anti-raid</h3>
                    <p>
                        Protect against targeted bot raids on your server, with our mass join, avatar and account age anti-raid filters.
                    </p>
                </div>
            </motion.div>

            <div className="button-link">
                <Link to="/commands">
                    <button className="button">
                        More Commands
                    </button>
                </Link>
            </div>

            <div className="flex flex-col items-center space-x-2">
                <div className="animate-scroll rounded-lg rotate-180 md:rounded-3xl md:rotate-0">
                    <div className="animate-scroll-wheel" />
                </div>
                <span className="hidden md:block text-lg font-medium mt-2 text-neutral-500/50">Keep scrolling</span>
            </div>
            <Faq/>
            <Getstarted/>
            <MoreFeatures/>

            <ScrollToTopButton />
        </div>
    );
}