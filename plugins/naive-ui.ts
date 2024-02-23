import { type NuxtSSRContext } from "#app";
import { setup } from "@css-render/vue3-ssr";

export default defineNuxtPlugin((nuxtApp) => {
    if (process.server) {
        const { collect } = setup(nuxtApp.vueApp);
        const originalRenderMeta = nuxtApp.ssrContext?.renderMeta;

        nuxtApp.ssrContext = nuxtApp.ssrContext || {} as NuxtSSRContext & { renderMeta: () => Promise<{ headTags: string }> | { headTags: string } };
        nuxtApp.ssrContext.renderMeta = () => {
            if (!originalRenderMeta) {
                return {
                    headTags: collect(),
                };
            }
            const originalMeta = originalRenderMeta();
            if ("then" in originalMeta) {
                return originalMeta.then((resolvedOriginalMeta: any) => {
                    return {
                        ...resolvedOriginalMeta,
                        headTags: resolvedOriginalMeta.headTags + collect(),
                    };
                });
            } else {
                return {
                    ...originalMeta,
                    headTags: originalMeta.headTags + collect(),
                };
            }
        };
    }
});
