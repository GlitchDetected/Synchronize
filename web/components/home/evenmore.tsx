import { CodeIcon, EraserIcon, GearIcon, GlobeIcon, RocketIcon, SpeakerLoudIcon } from "@radix-ui/react-icons";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const content = [
    {
        icon: RocketIcon,
        title: "Growing bot",
        text: "ChatGuard is constantly growing"
    },
    {
        icon: EraserIcon,
        title: "Purge",
        text: "Use /purge to delete those spams"
    },
    {
        icon: CodeIcon,
        title: "Rolling out new features",
        text: "If you see any bugs, just use /support and we will fix the bug immediately"
    },
    {
        icon: SpeakerLoudIcon,
        title: "TTS translations",
        text: "Use tts translates"
    },
    {
        icon: GearIcon,
        title: "Configure automod automatically",
        text: "With /automodesetup you can configure automod automatically"
    },
    {
        icon: GlobeIcon,
        title: "Global",
        text: "Used globally by many users"
    }
];

export const MoreFeatures = () => {
    const targetRef = useRef<HTMLDivElement | null>(null);
    const { scrollYProgress } = useScroll({
        target: targetRef,
        offset: ["start end", "end start"]
    });

    const opacity = useTransform(scrollYProgress, [0.8, 1], [1, 0]);
    const y = useTransform(scrollYProgress, [0.8, 1], ["0vh", "50vh"]);

    const numberOfIcons = content?.length ?? 0;
    const angle = 180 / (numberOfIcons - 1);

    return (
        <motion.section
            ref={targetRef}
            style={{ opacity, y }}
            className="mx-auto w-full max-w-[120rem] py-24 sm:py-32 lg:py-40 mt-20"
        >
            <div className="relative flex justify-center items-center mb-16">
                {content.map(({ icon: Icon }, index) => {
                    const rotation = angle * index;
                    return (
                        <div
                            key={index}
                            className="absolute"
                            style={{
                                transform: `rotate(-${rotation}deg) translateX(120px) rotate(${rotation}deg)`
                            }}
                        >
                            <div className="flex justify-center items-center bg-zinc-700 rounded-full h-16 w-16">
                                <Icon className="h-8 w-8" />
                            </div>
                        </div>
                    );
                })}
            </div>

            <div className="text-center mb-16">
                <h2 className="text-3xl sm:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-zinc-900 to-zinc-100">
                    Countless more Features
                </h2>
                <p className="mt-4 text-sm sm:text-md text-gray-400">
                    Never worry about needing another bot for anything else, we’ve got all your needs covered.
                </p>
            </div>

            {/* Features Grid */}
            <div className="grid w-full grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-12 lg:gap-16">
                {content.map(({ icon: Icon, title, text }) => (
                    <div
                        key={title}
                        className="text-center p-4 sm:p-6 lg:p-8 bg-gradient-to-r from-zinc-700 to-zinc-900 rounded-4xl shadow-lg relative"
                        style={{
                            background: "radial-gradient(circle, #333333, #151515)"
                        }}
                    >
                        <span className="absolute top-4 left-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#151515]">
                            <Icon className="h-8 w-8 text-white" />
                        </span>
                        <h3 className="mt-16 mb-2 text-lg sm:text-xl text-white">{title}</h3>
                        <p className="text-sm sm:text-md text-white">{text}</p>
                    </div>
                ))}
            </div>
        </motion.section>
    );
};