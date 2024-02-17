import { consola } from "consola";
import { createResolver, defineNuxtModule } from "nuxt/kit";

export default defineNuxtModule({
    hooks: {
        "components:dirs": (dirs) => {
            consola.info("Registering playground components");

            const { resolve } = createResolver(import.meta.url);

            dirs.push({
                path: resolve("../playground/"),
                extensions: ["vue"],
                pattern: "**/*.playground.vue",
                global: true,
            });
        },
    },
});
