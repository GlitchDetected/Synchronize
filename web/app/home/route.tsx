import { useNavigate } from "react-router-dom";

export default function HomePage() {
    const navigate = useNavigate();

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">Welcome to Synchronize Chat</h1>
            <p className="text-lg text-gray-600 mb-6 text-center max-w-md">
                Connect, communicate, and collaborate in real time. Join your rooms and chat seamlessly.
            </p>
            <button
                className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg text-lg font-medium shadow-md"
                onClick={() => navigate("/login")}
            >
                Get Started
            </button>
        </div>
    );
}