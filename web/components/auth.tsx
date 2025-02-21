export function Auth({ children }: { children: React.ReactNode; }) {
    return (
        <div className="flex h-screen w-full items-center justify-start bg-[url('/background.avif')] bg-cover bg-no-repeat sm:p-32">
            <div className="size-full min-w-96 rounded-lg border border-muted bg-background/80 p-6 backdrop-blur-md sm:size-fit sm:max-w-96">
                {children}
            </div>
            <footer className="absolute bottom-4 right-4 text-sm text-gray-500 hover:underline">
                <a href="https://unsplash.com/photos/vintage-gray-game-console-and-joystick-p0j-mE6mGo4" target="_blank" rel="noopener noreferrer">
                    @unsplash
                </a>
            </footer>
        </div>
    );
}

//
export function AuthTitle({ children }: { children: React.ReactNode; }) {
    return <h1 className="text-2xl font-medium ">{children}</h1>;
}

//
export function AuthDescription({ children }: { children: React.ReactNode; }) {
    return <p className="text-sm text-muted-foreground">{children}</p>;
}

export function AuthContent({ children }: { children: React.ReactNode; }) {
    return <div className="mt-5">{children}</div>;
}