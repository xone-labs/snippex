import { resolve } from "path";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    devtools: { enabled: true },
    alias: {
        "@": resolve(__dirname, "./"),
    },
    app: {
        head: {
            htmlAttrs: {
                lang: "en",
            },
            title: "Snippex",
        },
    },
    typescript: {
        typeCheck: true,
        tsConfig: {
            compilerOptions: {
                noErrorTruncation: true,
            },
        },
    },
});
