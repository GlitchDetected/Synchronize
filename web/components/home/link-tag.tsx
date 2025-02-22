import { HiExternalLink } from "react-icons/hi";
import { Link } from "react-router";

import { cn } from "~/lib/utils";

export default function LinkTag({
    href,
    children,
    className
}: {
    href: string;
    children: React.ReactNode;
    className?: string;
}) {
    return (
        <Link
            className={cn("text-neutral-400 underline decoration-neutral-400", className)}
            to={href}
            target="_blank"
        >
            {children}
            <HiExternalLink className="inline ml-1 mb-0.5" />
        </Link>
    );
}