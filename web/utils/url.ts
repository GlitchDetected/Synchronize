import { Config } from "~/constants/config";

export function getUserAvatarUrl(id: number) {
    return "/syncmascot.png";
}

export function getServerIconUrl(id: number) {
    return `${Config.cdn_url}/icons/${id}.webp`;
}