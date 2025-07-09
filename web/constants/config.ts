export const Config = {
    platform_name: "Synchronize Chat",

    username_constraint: /^(?![_.])(?!.*[_.]{2})[a-z0-9._]{2,32}(?<![_.])$/,
    nickname_constraint: /^.{1,32}$/,
    password_constraint: /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/,

    base_url: "http://localhost:5173",
    gateway_url: "ws://localhost:8080",
    cdn_url: "https://cloudflare.com",
    email_domain: "random@example.com"
};