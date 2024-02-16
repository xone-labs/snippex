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
    css: ["~/assets/styles/global.scss"],
    modules: [
        "@unocss/nuxt",
        "@nuxtjs/color-mode",
        "nuxt-svgo",
        "nuxt-icon",
    ],
    colorMode: {
        globalName: "__SNIPPEX_COLOR_MODE__",
        classSuffix: "",
        storageKey: "snippex-color-mode",
    },
    svgo: {
        autoImportPath: "~/assets",
    },
});
