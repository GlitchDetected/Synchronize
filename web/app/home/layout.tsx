import { Suspense } from "react";

import Footer from "~/components/home/Footer";

export const revalidate = 43_200;

export default function RootLayout({
    children
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="w-full">
            {children}

            <Suspense>
                <Footer />
            </Suspense>
        </div>
    );
}