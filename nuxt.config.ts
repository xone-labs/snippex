import { isProduction } from "std-env";

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
        "@nuxt/content",
        "@nuxtjs/html-validator",
        "nuxt-monaco-editor",
        "@vueuse/nuxt",
    ],
    colorMode: {
        globalName: "__SNIPPEX_COLOR_MODE__",
        classSuffix: "",
        storageKey: "snippex-color-mode",
    },
    svgo: {
        autoImportPath: "~/assets",
    },
    content: {
        ignores: [
            isProduction ? "playground/" : "",
        ],
        highlight: {
            langs: [
                "vue",
                "javascript",
                "typescript",
                "bash",
                "json",
                "markdown",
                "css",
                "scss",
                "yaml",
                "html",
                "jsx",
                "tsx",
            ],
        },
    },
    ignore: [
        isProduction ? "/pages/playground/**" : "",
        isProduction ? "/content/playground/**" : "",
        isProduction ? "/playground/**" : "",
    ],
});
