export const Config = {
    platform_name: "Synchronize Chat",

    username_constraint: /^(?![_.])(?!.*[_.]{2})[a-z0-9._]{2,32}(?<![_.])$/,
    nickname_constraint: /^.{1,32}$/,
    password_constraint: /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/,

    base_url: import.meta.env.VITE_BASE_URL,
    gateway_url: import.meta.env.VITE_GATEWAY_URL,
    cdn_url: import.meta.env.VITE_CDN_URL,
    email_domain: import.meta.env.VITE_EMAIL_DOMAIN
};