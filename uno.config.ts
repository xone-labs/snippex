import ArbitraryVariantsExtractor from "@unocss/extractor-arbitrary-variants";
import extractorMdc from "@unocss/extractor-mdc";
import { defineConfig, presetTypography, presetUno, presetWebFonts, transformerDirectives, transformerVariantGroup } from "unocss";
import { presetExtra } from "unocss-preset-extra";
import { presetUseful } from "unocss-preset-useful";

export default defineConfig({
    presets: [
        presetUno(),
        presetWebFonts({
            provider: "google",
            fonts: {
                sans: {
                    name: "Inter",
                    weights: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
                    italic: true,
                },
            },
        }),
        presetTypography(),
        presetExtra(),
        presetUseful(),
    ],
    transformers: [
        transformerDirectives(),
        transformerVariantGroup(),
    ],
    extractors: [
        ArbitraryVariantsExtractor,
        extractorMdc(),
    ],
});
