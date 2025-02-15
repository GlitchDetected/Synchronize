import emojiData from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
import { Smile } from "lucide-react";

// Icon for the emoji picker button
import { useMemo, useRef, useState } from "react";
import { useParams } from "react-router";

import { request } from "~/lib/api";
import type { APIPostRoomMessagesResponse } from "~/types/messages";

import { AutoComplete } from "../autocomplete";
import type { Option } from "../autocomplete/hook";
import { AutocompleteType, useAutocomplete } from "../autocomplete/hook";
import { TextareaAutosize } from "../ui/textarea-autosize";

export function MessageInput() {
    const [inputValue, setInputValue] = useState<string>("");
    const [emojiPickerOpen, setEmojiPickerOpen] = useState(false);
    const textarea = useRef<HTMLTextAreaElement | null>(null);
    const params = useParams();

    const options = useMemo(
        () => [
            { id: 1, name: "Devannounce", type: AutocompleteType.User },
            { id: 2, name: "rules", type: AutocompleteType.User },
            { id: 3, name: "general", type: AutocompleteType.Channel },
            { id: 4, name: "videos", type: AutocompleteType.Channel }
        ],
        []
    );

    const { filteredOptions, focused, onChange, onKeyDown, onSelect, ...props } = useAutocomplete({
        options,
        handleSelect
    });

    function handleSelect(selected: Option, cursor: number) {
        const prefix = selected.type === AutocompleteType.Channel ? "#" : "@";
        textarea.current?.focus();

        setInputValue((prev) => {
            const mentionRegex = /[@#][\w]*/g;
            let match;
            let closestMatch: RegExpExecArray | null = null;

            while ((match = mentionRegex.exec(prev)) !== null) {
                const start = match.index;
                const end = start + match[0].length;

                if (start <= cursor && cursor <= end) {
                    closestMatch = match;
                    break;
                }
            }

            if (!closestMatch) return prev;

            const before = prev.slice(0, closestMatch.index);
            const replacement = `${prefix}${selected.name} `;
            const after = prev.slice(closestMatch.index + closestMatch[0].length);

            const newCursor = before.length + replacement.length;

            // Update cursor position after re-render
            setTimeout(() => {
                textarea.current?.setSelectionRange(newCursor, newCursor);
            }, 0);

            return before + replacement + after;
        });
    }

    function addEmoji(emoji: any) {
        setInputValue((prev) => prev + emoji.native);
        setEmojiPickerOpen(false);
        textarea.current?.focus();
    }

    return (
        <div className="relative m-3 flex items-center">
            {focused && (
                <AutoComplete
                    options={filteredOptions}
                    onSelect={onSelect}
                    {...props}
                />
            )}

            <TextareaAutosize
                ref={textarea}
                value={inputValue}
                placeholder="Type your message..."
                onChange={(e) => {
                    onChange(e);
                    setInputValue(e.target.value);
                }}
                onKeyDown={(e) => {
                    onKeyDown(e);

                    if (e.key !== "Enter" || e.shiftKey || filteredOptions.length || !focus) return;
                    e.preventDefault();

                    const message = request<APIPostRoomMessagesResponse>(
                        "post",
                        `/rooms/${params.rid}/messages`,
                        { content: inputValue }
                    );

                    if ("message" in message) return; // TODO: error?
                    setInputValue("");
                }}
                className="w-full pr-10"
                {...props}
            />

            {/* Emoji Picker Button */}
            <button
                type="button"
                onClick={() => setEmojiPickerOpen(!emojiPickerOpen)}
                className="absolute right-3 text-gray-500 hover:text-white"
            >
                <Smile size={22} />
            </button>

            {/* Emoji Picker */}
            {emojiPickerOpen && (
                <div className="absolute bottom-14 right-0 z-50">
                    <Picker data={emojiData} onEmojiSelect={addEmoji} theme="dark" />
                </div>
            )}
        </div>
    );
}