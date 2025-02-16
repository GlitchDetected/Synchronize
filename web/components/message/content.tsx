const parseMarkdown = (content: string) => {
    // Handle mentions (@username, #channel) with a blue gradient
    const mentionRegex = /([@#][\w]+)/g;
    content = content.replace(mentionRegex, (match) =>
        `<span class="bg-gradient-to-r from-blue-500 to-indigo-500 text-transparent bg-clip-text">${match}</span>`
    );

    // Handle Discord-style bold (**text**) and italic (*text*)
    content = content.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>"); // bold
    content = content.replace(/\*(.*?)\*/g, "<em>$1</em>"); // italic

    // Handle inline code (`code`)
    content = content.replace(/`(.*?)`/g, "<code class=\"bg-gray-800 text-white p-1 rounded\">$1</code>");

    // Handle block quotes (>)
    content = content.replace(/^>(.*?)$/gm, "<blockquote class=\"pl-4 border-l-4 border-gray-500 italic\">$1</blockquote>");

    return content;
};

export function MessageContent({ content }: { content: string | null; }) {
    if (!content) return null;

    // Parse the content to apply mentions and markdown styles
    const parsedContent = parseMarkdown(content);

    return (
        <div className="opacity-90 break-words text-sm" dangerouslySetInnerHTML={{ __html: parsedContent }} />
    );
}