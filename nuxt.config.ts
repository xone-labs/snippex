import { isDevelopment, isProduction } from "std-env";

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
    build: {
        transpile: isProduction ? ["naive-ui", "@css-render/vue3-ssr", "vueuc", "@juggle/resize-observer"] : ["@juggle/resize-observer"],
    },
    vite: {
        optimizeDeps: {
            include: isDevelopment ? ["naive-ui", "vueuc", "date-fns-tz/esm/formatInTimeZone"] : [],
        },
    },
});
