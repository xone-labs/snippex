<template>
    <div ref="containerRef" :class="[codeColorMode, transparentBackground && 'code-renderer--no-background', dualTheme && 'code-renderer--dual-theme']" class="code-renderer col-start-1 row-start-1" style="font-kerning: none" />
</template>

<script lang="ts" setup>
import chroma from "chroma-js";
import { hash } from "ohash";

import { useRenderCode } from "~/playground/code-morph-transition/feature/composables/code-morph-transition";

import type { BundledLanguage, BundledTheme } from "shiki";
import type { CodeRendererProps } from "~/playground/code-morph-transition/feature/types/code-morph-transition";

const props = withDefaults(defineProps<CodeRendererProps & { explicitRender?: boolean }>(), {
    language: "typescript",
    theme: "github-dark",
    themes: () => ({
        dark: "github-dark",
        light: "github-light",
    }),
    dualTheme: true,
    transparentBackground: true,
    mode: "dark",
    explicitRender: false,
});

// eslint-disable-next-line func-call-spacing
const emit = defineEmits<{
    (e: "on-status-change", status: "rendered" | "processing"): void;
    (e: "on-rendered", chars: Array<HTMLDivElement | HTMLSpanElement>, info: { backgroundColor: string, height: number, width: number, lineHeight: number }, refEl: HTMLDivElement): void;
}>();

const codeColorMode = computed(() => props.mode === "dark" ? "code-renderer--mode__dark" : "code-renderer--mode__light");

const containerRef = ref<HTMLDivElement | null>(null);

async function _render(code: CodeRendererProps["code"], language: BundledLanguage, theme: BundledTheme, themes: { dark: BundledTheme, light: BundledTheme }, dualTheme: boolean) {
    const chars = containerRef.value
        ? await useRenderCode(containerRef, {
            code,
            language,
            theme,
            themes,
            dualTheme,
        })
        : [];

    chars.forEach((char) => {
        char.style.fontKerning = "none";
    });

    await nextTick();

    const backgroundColor = chroma((containerRef.value?.querySelector(".code-renderer-highlight") as HTMLPreElement)?.style.backgroundColor || "transparent").hex();
    const lineHeight = containerRef.value?.querySelector(".code-renderer-highlight .line")?.getBoundingClientRect().height || 0;
    const containerSize = containerRef.value?.querySelector(".code-renderer-highlight")?.getBoundingClientRect() || {
        height: 0,
        width: 0,
    };

    return {
        chars,
        backgroundColor,
        lineHeight,
        height: containerSize.height,
        width: containerSize.width,
    };
}

const { trigger: rerender } = watchTriggerable([
    () => props.code,
    () => props.language,
    () => props.theme,
    () => props.themes,
    () => props.dualTheme,
], async ([code, language, theme, themes, dualTheme], [_prevCode, _prevLanguage, _prevTheme, _prevThemes, _prevDualTheme]) => {
    if (props.explicitRender) { return; }

    if (hash({
        code,
        language,
        theme,
        themes,
        dualTheme,
    }) === hash({
        code: _prevCode,
        language: _prevLanguage,
        theme: _prevTheme,
        themes: _prevThemes,
        dualTheme: _prevDualTheme,
    })) { return; }

    if (!containerRef.value) { return; }

    emit("on-status-change", "processing");

    const {
        chars,
        backgroundColor,
        lineHeight,
        height,
        width,
    } = await _render(code, language, theme, themes, dualTheme);

    await nextTick();

    emit("on-rendered", chars, {
        backgroundColor,
        lineHeight,
        height,
        width,
    }, containerRef.value);
    emit("on-status-change", "rendered");
});

onMounted(async () => {
    await rerender();
});

defineExpose({
    render: _render,
});
</script>

<style lang="scss" scoped>
.code-renderer {
    @apply size-fit;

    &.code-renderer--dual-theme {
        &.code-renderer--mode__dark {
            :deep(.code-renderer-highlight),
            :deep(.code-renderer-highlight span) {
                color: var(--code-renderer-dark) !important;
                background-color: var(--code-renderer-dark-bg) !important;
                font-style: var(--code-renderer-dark-font-style) !important;
                font-weight: var(--code-renderer-dark-font-weight) !important;
                text-decoration: var(--code-renderer-dark-text-decoration) !important;
            }
        }
    }

    &.code-renderer--dual-theme.code-renderer--no-background,
    &.code-renderer--no-background {
        :deep(.code-renderer-highlight),
        :deep(.code-renderer-highlight span) {
            background-color: transparent !important;
        }
    }
}
</style>
