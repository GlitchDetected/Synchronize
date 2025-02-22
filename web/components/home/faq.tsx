"use client";

import { Accordion, AccordionItem, Code } from "@nextui-org/react";
import { HiBell, HiCash, HiChat, HiLockClosed, HiUserAdd } from "react-icons/hi";

import LinkTag from "./link-tag";
import { Section } from "./section";

const data = [
    {
        startContent: <HiUserAdd />,
        title: "How do I invite ChatGuard to my Server?",
        subtitle: "Invite ChatGuard to your server to get started!",
        content: (
            <ol
                className="list-decimal list-inside marker:text-neutral-500"
                itemProp="text"
            >
                <li>
                    Be sure to have the <Code color="secondary">Manage Server</Code> permission on the server you want <LinkTag href="/add">invite ChatGuard</LinkTag> into.
                </li>
                <li>
                    Open Discord{"'"}s add-app flow at <LinkTag href="/add">chatguard.com/add</LinkTag>.
                </li>
                <li>
                    Select a server and click on {"\""}Continue{"\""}.
                </li>
                <li>
                    Do <span className="font-semibold">not uncheck</span> any permissions (or the bot will malfunction) and click on {"\""}Authorize{"\""}.
                </li>
                <li>
                    <span className="font-semibold">Done!</span> 🎉 You should now find yourself on the Dashboard for your server!
                </li>
            </ol>
        )
    },
    {
        startContent: <HiCash />,
        title: "Is the rank system free to use?",
        content: (
            <div>
                Yes, the ranking system will be free forever $0 total! But there is a catch, you will need to <LinkTag href="/vote">vote for ChatGuard on top.gg</LinkTag> if you start using it a lot.
            </div>
        )
    },
    {
        startContent: <HiChat />,
        title: "How do I set up the ranking system?",
        content: (
            <div itemProp="text">
                <ol className="list-decimal list-inside marker:text-neutral-500 mb-4">
                    <li>
                        <LinkTag href="/add">Invite ChatGuard</LinkTag> to your Server. If you do not own it, ask the server Administrators to add ChatGuard.
                    </li>
                    <li>
                        Go to the <LinkTag href="/dashboard">Dashboard</LinkTag>, find your server and click {"\""}manage{"\""}.
                    </li>
                    <li>
                        Go to the tab that says {"\""}Rank{"\""}
                    </li>
                    <li>
                        <span className="font-semibold">Click the toggle and your done!!!</span> 🎉
                    </li>
                </ol>

                You can also watch the video tutorial below or <LinkTag href="https://youtu.be/WLPlb1_OTfQ?si=nX8j5zjTKCLMNKyM">watch it on YouTube</LinkTag>.
                <iframe
                    className="mt-2 aspect-video rounded-lg"
                    width="100%"
                    src="https://www.youtube.com/embed/WLPlb1_OTfQ?si=nX8j5zjTKCLMNKyM"
                    title="ChatGuard Ranking system"
                    allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                />
            </div>
        )
    },
    {
        startContent: <HiBell />,
        title: "Mod notification/log system coming soon?",
        content: (
            <div itemProp="text">
                yes. i promise
            </div>
        )
    }
];

interface Props {
    showTitle?: boolean;
}

export function Faq({
    showTitle = false
}: Props) {

    return (
        <div
            className="my-4 w-full"
            itemType="https://schema.org/FAQPage"
            itemScope
        >

            {showTitle
                ?
                <Section
                    className="mb-4"
                    title="Frequently Asked Questions about ChatGuard"
                >
                    Commonly asked questions about ChatGuard and how to use it.
                </Section>
                :
                <b className="sr-only">
                    Frequently Asked Questions for ChatGuard
                </b>
            }

            <Accordion
                className="rounded-lg overflow-hidden"
                variant="splitted"
                defaultExpandedKeys={["0"]}
            >
                {data.map((item, index) => (
                    <AccordionItem
                        aria-label={item.title}
                        className="bg-[#151515]"
                        classNames={{ content: "mb-2 space-y-4" }}
                        key={index}
                        startContent={item.startContent}
                        subtitle={item.subtitle}
                        title={
                            <span itemProp="name">
                                {item.title}
                            </span>
                        }
                        itemType="https://schema.org/Question"
                        itemProp="mainEntity"
                        itemScope
                    >
                        <span
                            itemType="https://schema.org/Answer"
                            itemProp="acceptedAnswer"
                            itemScope
                        >
                            {item.content}
                        </span>
                    </AccordionItem>
                ))}
            </Accordion>
        </div>
    );
}