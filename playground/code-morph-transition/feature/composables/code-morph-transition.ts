import { transformerRenderWhitespace } from "@shikijs/transformers";
import { hash } from "ohash";
import { codeToHtml } from "shiki";
import SplitType from "split-type";

import type { BundledLanguage, BundledTheme } from "shiki";
import type { Ref } from "vue";

interface IGetHighlightedCode {
    id?: string;
    code: string;
    language: BundledLanguage;
    theme: BundledTheme;
    themes: { light: BundledTheme; dark: BundledTheme };
    dualTheme: boolean;
}

export const useHighlightedCode = useMemoize(async (config: IGetHighlightedCode): Promise<string> => {
    const wrapperEl = document.createElement("div");
    wrapperEl.innerHTML = await new Promise<string>((resolve) => {
        codeToHtml(config.code, {
            lang: config.language,
            ...(config.dualTheme ? { themes: config.themes } : { theme: config.theme }),
            cssVariablePrefix: "--code-renderer-",
            transformers: [
                transformerRenderWhitespace({ classSpace: "space char" }),
            ],
        }).then(resolve);
    });

    wrapperEl.firstElementChild?.classList.replace("shiki", "code-renderer-highlight");
    wrapperEl.firstElementChild?.classList.replace("shiki-themes", "code-renderer-themes");
    return wrapperEl.innerHTML;
}, { getKey: (config: IGetHighlightedCode) => hash(config) });

export async function useRenderCode(el: Ref<HTMLElement | null>, config: IGetHighlightedCode): Promise<Array<HTMLSpanElement | HTMLDivElement>> {
    if (!el.value) {
        console.error("Element not found");
        return [];
    }

    el.value.innerHTML = await useHighlightedCode(config);
    SplitType.create(el.value.querySelectorAll(".code-renderer-highlight > code .line span")!, { types: ["chars"] });
    return Array.from(el.value.querySelectorAll(".code-renderer-highlight > code .line .char") ?? []);
}
