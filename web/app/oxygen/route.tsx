import { useNavigate } from "react-router-dom";

export default function HomePage() {
    const navigate = useNavigate();

    return (
        <div className="flex flex-col items-center justify-center min-h-screen p-6">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">Get your free Oxygen today!</h1>
            <p className="text-lg text-gray-600 mb-6 text-center max-w-md">
                $1000 monthly for pro tier
            </p>
            <button
                className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg text-lg font-medium shadow-md"
                onClick={() => navigate("/rooms/@me")}
            >
                Get Started
            </button>
        </div>
    );
}