import ArbitraryVariantsExtractor from "@unocss/extractor-arbitrary-variants";
import extractorMdc from "@unocss/extractor-mdc";
import { defineConfig, presetTypography, presetUno, transformerDirectives, transformerVariantGroup } from "unocss";
import { presetExtra } from "unocss-preset-extra";
import { presetUseful } from "unocss-preset-useful";

export default defineConfig({
    presets: [
        presetUno(),
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
