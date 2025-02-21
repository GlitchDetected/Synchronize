export const Config = {
    platform_name: "Synchronize Chat",

    username_constraint: /^(?![_.])(?!.*[_.]{2})[a-z0-9._]{2,32}(?<![_.])$/,
    nickname_constraint: /^.{1,32}$/,
    password_constraint: /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/,

    base_url: process.env.BASE_URL || "http://localhost:5173",
    gateway_url: process.env.GATEWAY_URL || "ws://localhost:8080",
    cdn_url: process.env.CDN_URL,
    email_domain: process.env.EMAIL_DOMAIN
};