import { useState } from "react";

import { useUserStore } from "~/common/user";
import type { PublicUser } from "~/types/users";

interface EditableFieldProps {
    label: string;
    field: keyof PublicUser;
    value: string;
}

export function EditableField({ field, value }: EditableFieldProps) {
    const [isEditing, setIsEditing] = useState(false);
    const [inputValue, setInputValue] = useState(value);
    const userStore = useUserStore();

    const handleSave = async () => {
        try {
            console.log("Updating user:", { [field]: inputValue });

            const response = await fetch("/api/users/@me", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ [field]: inputValue }) // Send only the updated field
            });

            if (!response.ok) {
                throw new Error(`Failed to update ${field}`);
            }

            const updatedUser = await response.json();
            console.log("API Response:", updatedUser);

            // Update the store with the updated user
            userStore.set(updatedUser); // Set the updated user data

            setIsEditing(false);
        } catch (error) {
            console.error(`Failed to update ${field}:`, error);
        }
    };


    return (
        <div className="flex items-center gap-2">
            {isEditing ? (
                <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    className="px-2 py-1 border border-border rounded-md text-sm bg-popover text-muted-foreground"
                    autoFocus
                />
            ) : (
                <p className="text-muted-foreground text-sm font-semibold">{value}</p>
            )}
            <button
                onClick={isEditing ? handleSave : () => setIsEditing(true)}
                className="text-blue-500 text-sm font-medium"
            >
                {isEditing ? "Save" : "Edit"}
            </button>
        </div>
    );
}