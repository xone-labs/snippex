<template>
    <DefineEditorLoadingTemplate>
        <div class="flex items-center justify-center size-full">
            <Icon class="size-4" name="svg-spinners:3-dots-fade" />
        </div>
    </DefineEditorLoadingTemplate>

    <div class="my-4 flex flex-col border rounded-xl bg-light-300 divide-y dark:(border-dark-200 bg-dark-400 divide-dark-200)">
        <div class="flex flex-col divide-y dark:(divide-dark-200)">
            <div class="min-h-8 flex items-center bg-light-500/80 px-4 py-1 text-xs font-semibold tracking-wide dark:(bg-dark-300/40 text-gray-300)">
                Customize Settings
            </div>

            <div class="p-4 pt-3 text-sm light:bg-light-100">
                <div class="space-y-2">
                    <div class="text-xs font-medium uppercase op-50">
                        Diffing Mode
                    </div>
                    <div class="h-8 w-fit flex select-none items-stretch overflow-hidden border rounded-md bg-light-50 shadow-sm divide-x dark:(border-dark-100 bg-dark-300 divide-dark-100)">
                        <button :class="[currentDiffMode === 'char' ? 'active bg-blue-600 text-white font-medium' : 'bg-transparent']" class="flex items-center justify-center px-3 transition [&:not(.active)]:(active:bg-light-700 hover:bg-light-600 dark:active:bg-dark-400 dark:hover:bg-dark-200)" @click="currentDiffMode = 'char'">
                            Character
                        </button>

                        <button :class="[currentDiffMode === 'word' ? 'active bg-blue-600 text-white font-medium' : 'bg-transparent']" class="flex items-center justify-center px-3 transition [&:not(.active)]:(active:bg-light-700 hover:bg-light-600 dark:active:bg-dark-400 dark:hover:bg-dark-200)" @click="currentDiffMode = 'word'">
                            Word
                        </button>

                        <button :class="[currentDiffMode === 'line' ? 'active bg-blue-600 text-white font-medium' : 'bg-transparent']" class="flex items-center justify-center px-3 transition [&:not(.active)]:(active:bg-light-700 hover:bg-light-600 dark:active:bg-dark-400 dark:hover:bg-dark-200)" @click="currentDiffMode = 'line'">
                            Line
                        </button>
                    </div>
                </div>
            </div>
        </div>

        <div class="grid grid-cols-2 divide-x dark:(divide-dark-200)">
            <div class="flex flex-col divide-y dark:(divide-dark-200)">
                <div class="min-h-8 flex items-center rounded-tl-xl bg-light-500/80 px-4 py-1 text-xs font-semibold tracking-wide dark:(bg-dark-300/40 text-gray-300)">
                    First Code Snippet
                </div>

                <div class="h-40">
                    <ClientOnly>
                        <MonacoEditor v-model="firstSnippetCode" :options="editorOptions" class="h-full" lang="typescript" />

                        <template #fallback>
                            <EditorLoadingComponent />
                        </template>
                    </ClientOnly>
                </div>
            </div>

            <div class="flex flex-col divide-y dark:(divide-dark-200)">
                <div class="min-h-8 flex items-center rounded-tr-xl bg-light-500/80 px-4 py-1 text-xs font-semibold tracking-wide dark:(bg-dark-300/40 text-gray-300)">
                    Second Code Snippet
                </div>

                <div class="h-40">
                    <ClientOnly>
                        <MonacoEditor v-model="secondSnippetCode" :options="editorOptions" class="h-full" lang="typescript" />

                        <template #fallback>
                            <EditorLoadingComponent />
                        </template>
                    </ClientOnly>
                </div>
            </div>
        </div>

        <div class="flex flex-col divide-y dark:(divide-dark-200)">
            <div class="min-h-8 flex items-center bg-light-500/80 px-4 py-1 text-xs font-semibold tracking-wide dark:(bg-dark-300/40 text-gray-300)">
                Diff Preview
            </div>

            <OverlayScrollbarsComponent :defer="true" :options="basicOverlayScrollbarsOptions" class="max-h-40">
                <div class="size-fit min-h-full min-w-full p-4 text-sm font-fira">
                    <pre class="space-x-0.5" v-html="diffViewHtml" />
                </div>
            </OverlayScrollbarsComponent>
        </div>

        <div class="flex flex-col overflow-hidden rounded-b-xl divide-y dark:(divide-dark-200)">
            <div class="min-h-8 flex items-center justify-between bg-light-500/80 px-4 dark:(bg-dark-300/40 text-gray-300)">
                <div class="text-xs font-semibold tracking-wide">
                    Animated View
                </div>

                <div class="flex items-center gap-x-0.6">
                    <button :disabled="isAnimationDone" class="h-6 flex items-center rounded bg-transparent px-1.5 text-xs font-medium leading-none transition disabled:(pointer-events-none op-40) active:(scale-98 bg-light-800) hover:(bg-light-700) dark:(active:bg-dark-100 hover:bg-dark-200)" @click="playOrPauseTimeline">
                        <template v-if="isPlaying">
                            <Icon class="size-4" name="solar:pause-circle-linear" />
                            <span class="ml-1 pr-0.5 leading-none">Pause</span>
                        </template>
                        <template v-else>
                            <Icon class="size-4" name="solar:play-circle-outline" />
                            <span class="ml-1 pr-0.5 leading-none">Play</span>
                        </template>
                    </button>

                    <button class="h-6 flex items-center rounded bg-transparent px-1.5 text-xs font-medium leading-none transition -mr-2 active:(scale-98 bg-light-800) hover:(bg-light-700) dark:(active:bg-dark-100 hover:bg-dark-200)" @click="resetTimeline">
                        <Icon class="size-4" name="solar:restart-linear" />
                        <span class="ml-1 pr-0.5 leading-none">Reset</span>
                    </button>
                </div>
            </div>

            <OverlayScrollbarsComponent :defer="true" :options="basicOverlayScrollbarsOptions" class="max-h-50">
                <div class="relative grid grid-cols-[1fr] size-fit min-h-full min-w-full">
                    <div ref="firstSlideRef" class="shiki-preview col-start-1 row-start-1 min-h-full min-w-full text-xs font-fira [&>pre]:(px-4 py-3)" data-slide-id="first" />
                    <div ref="secondSlideRef" class="shiki-preview col-start-1 row-start-1 min-h-full min-w-full text-xs font-fira [&>pre]:(px-4 py-3)" data-slide-id="second" />
                </div>
            </OverlayScrollbarsComponent>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { transformerRenderWhitespace } from "@shikijs/transformers";
import { type Change, diffChars, diffLines, diffWordsWithSpace } from "diff";
import gsap from "gsap";
import { OverlayScrollbarsComponent } from "overlayscrollbars-vue";
import { codeToHtml } from "shiki";
import SplitType from "split-type";

import type * as Monaco from "monaco-editor";

const isPlaying = ref(false);
const isAnimationDone = ref(false);
const gsapTimeline = gsap.timeline({
    paused: true,
    defaults: {
        ease: "power1.inOut",
    },
    onComplete: () => {
        isAnimationDone.value = true;
    },
    onReverseComplete: () => {
        isAnimationDone.value = false;
    },
    onStart: () => {
        isPlaying.value = true;
    },
});

function playOrPauseTimeline() {
    if (isPlaying.value) {
        gsapTimeline.pause();
        isPlaying.value = false;
    } else if (gsapTimeline.paused()) {
        gsapTimeline.resume();
        isPlaying.value = true;
    } else {
        gsapTimeline.play();
        isPlaying.value = true;
    }
}

function resetTimeline() {
    gsapTimeline.pause(0);
    isAnimationDone.value = false;
    isPlaying.value = false;
}

const [DefineEditorLoadingTemplate, EditorLoadingComponent] = createReusableTemplate();

const editorOptions = computed<Monaco.editor.IStandaloneEditorConstructionOptions>(() => ({
    automaticLayout: true,
    theme: useColorMode().value === "dark" ? "vs-dark" : "light",
    fontSize: 12,
    fontFamily: "Fira Code",
    fontLigatures: true,
    minimap: {
        enabled: false,
    },
    lineNumbers: "off",
    padding: {
        top: 8,
        bottom: 8,
    },
    scrollBeyondLastLine: false,
    formatOnPaste: true,
    codeLens: false,
    inlineSuggest: {
        enabled: false,
    },
}));

const initialCodes = {
    simple: {
        first: "console.log(\"Hello World\");",
        second: "const r = console.warn(\"Hello, New World\");",
    },
    complex: {
        first: "if (3 > 4) {} elsea {}",
        second: "if (4 < 3) {\n    console.log('Hello');\n} else {\n    console.log('World');\n}",
    },
};

const firstSnippetCode = ref<string>(initialCodes.complex.first);
const secondSnippetCode = ref<string>(initialCodes.complex.second);

const firstSlideRef = ref<HTMLDivElement | null>(null);
const secondSlideRef = ref<HTMLDivElement | null>(null);

const currentDiffMode = ref<"char" | "word" | "line">("char");
const diff = ref<Change[]>([]);
const diffViewHtml = ref<string>("");

function updateDiffViewHtml() {
    diffViewHtml.value = "";
    for (const change of diff.value) {
        if (change.added) {
            diffViewHtml.value += `<span class="rounded px-1 py-0.25 text-green-700 bg-green-200">${change.value}</span>`;
        } else if (change.removed) {
            diffViewHtml.value += `<span class="rounded px-1 py-0.25 text-red-700 bg-red-200">${change.value}</span>`;
        } else {
            diffViewHtml.value += `<span class="rounded px-1 py-0.25 text-gray-700 bg-gray-200">${change.value}</span>`;
        }
    }
}

async function updateFirstSlideContent(code?: string): Promise<(HTMLDivElement | HTMLSpanElement)[]> {
    if (firstSlideRef.value) {
        firstSlideRef.value.innerHTML = await new Promise((resolve) => {
            codeToHtml(code ?? firstSnippetCode.value, {
                lang: "typescript",
                themes: {
                    dark: "github-dark",
                    light: "github-light",
                },
                transformers: [
                    transformerRenderWhitespace({ classSpace: "space char" }),
                    {
                        span: (hast, line, col) => {
                            hast.properties["data-text"] = (hast.children[0] as { value: string }).value;
                            hast.properties["data-pos"] = `${line}:${col}:${(hast.children[0] as { value: string }).value.length}`;
                        },
                    },
                ],
            }).then(resolve);
        });

        SplitType.create(firstSlideRef.value.querySelectorAll(".shiki > code .line span, .shiki > code .line span.space")!, {
            types: ["chars"],
        });
        return Array.from(document.querySelectorAll(".shiki-preview[data-slide-id=first] .shiki > code .line .char") ?? []);
    }

    return [];
}

async function updateSecondSlideContent(code?: string): Promise<(HTMLDivElement | HTMLSpanElement)[]> {
    if (secondSlideRef.value) {
        secondSlideRef.value.innerHTML = await new Promise((resolve) => {
            codeToHtml(code ?? secondSnippetCode.value, {
                lang: "typescript",
                themes: {
                    dark: "github-dark",
                    light: "github-light",
                },
                transformers: [
                    transformerRenderWhitespace({ classSpace: "space char" }),
                    {
                        span: (hast, line, col) => {
                            hast.properties["data-text"] = (hast.children[0] as { value: string }).value;
                            hast.properties["data-pos"] = `${line}:${col}:${(hast.children[0] as { value: string }).value.length}`;
                        },
                    },
                ],
            }).then(resolve);
        });

        SplitType.create(secondSlideRef.value.querySelectorAll(".shiki > code .line span, .shiki > code .line span.space")!, { types: ["chars"] });
        return Array.from(document.querySelectorAll(".shiki-preview[data-slide-id=second] .shiki > code .line .char") ?? []);
    }

    return [];
}

watchImmediate([firstSnippetCode, secondSnippetCode, currentDiffMode], async ([first, second, mode]) => {
    diff.value = mode === "char" ? diffChars(first, second) : mode === "word" ? diffWordsWithSpace(first, second) : diffLines(first, second);

    updateDiffViewHtml();

    await nextTick();

    const firstSlideChars = await updateFirstSlideContent(first);
    const secondSlideChars = await updateSecondSlideContent(second);

    await nextTick();

    // transform diff to {char: string, action: "add" | "remove" | "none"}[]
    const diffCharMap: Array<{ char: string | string[], action: "add" | "remove" | "none" }> = [];
    for (const change of diff.value) {
        // break value into characters and add them to diffCharMap
        const chars = change.value.split("");
        for (const char of chars) {
            if (change.added) {
                diffCharMap.push({
                    char,
                    action: "add",
                });
            } else if (change.removed) {
                diffCharMap.push({
                    char,
                    action: "remove",
                });
            } else {
                diffCharMap.push({
                    char,
                    action: "none",
                });
            }
        }
    }

    // filter out new lines from diffCharMap
    // remove consecutive add and remove or remove and add actions and merge them into one
    const filteredDiffCharMap = diffCharMap.filter(char => char.char !== "\n");

    let firstCharPos = 0;
    let secondCharPos = 0;

    for (const change of filteredDiffCharMap) {
        const firstChar = firstSlideChars[firstCharPos];
        const secondChar = secondSlideChars[secondCharPos];

        if (firstChar || secondChar) {
            if (change.action === "none") {
                if (firstChar.textContent === secondChar.textContent) {
                    // check if dom position of firstChar and secondChar are same
                    const firstCharRect = firstChar.getBoundingClientRect();
                    const secondCharRect = secondChar.getBoundingClientRect();

                    const isDomPositionSame = firstCharRect.left === secondCharRect.left && firstCharRect.top === secondCharRect.top;

                    if (!isDomPositionSame) {
                        // calculate the distance between firstChar and secondChar
                        const distanceX = secondCharRect.left - firstCharRect.left;
                        const distanceY = secondCharRect.top - firstCharRect.top;

                        gsap.set(firstChar, {
                            opacity: 1,
                        });

                        gsap.set(secondChar, {
                            x: -distanceX,
                            y: -distanceY,
                            opacity: 0,
                        });

                        gsapTimeline.add(gsap.to(firstChar, {
                            duration: 0.2,
                            opacity: 0,
                        }), 0);

                        gsapTimeline.add(gsap.to(secondChar, {
                            duration: 0.2,
                            opacity: 1,
                        }), 0);

                        gsapTimeline.add(gsap.to(secondChar, {
                            duration: 1,
                            x: 0,
                            y: 0,
                        }), 0);
                    } else {
                        gsap.set(secondChar, {
                            opacity: 0,
                        });

                        gsapTimeline.add(gsap.to(firstChar, {
                            opacity: 0,
                            duration: 1,
                        }), 0);

                        gsapTimeline.add(gsap.to(secondChar, {
                            opacity: 1,
                            duration: 1,
                        }), 0);
                    }

                    firstCharPos++;
                    secondCharPos++;
                }
            } else if (change.action === "remove") {
                gsap.set(firstChar, {
                    opacity: 1,
                });

                gsapTimeline.add(gsap.to(firstChar, {
                    opacity: 0,
                    duration: 1,
                }), 0);

                firstCharPos++;
            } else if (change.action === "add") {
                gsap.set(secondChar, {
                    opacity: 0,
                });

                gsapTimeline.add(gsap.to(secondChar, {
                    opacity: 1,
                    duration: 1,
                }), 0);

                secondCharPos++;
            }
        }
    }
});

onMounted(async () => {
    await updateFirstSlideContent();
    await updateSecondSlideContent();
});
</script>

<style lang="scss">
html.dark .shiki,
html.dark .shiki span {
    color: var(--shiki-dark) !important;
    background-color: var(--shiki-dark-bg) !important;
    /* Optional, if you also want font styles */
    font-style: var(--shiki-dark-font-style) !important;
    font-weight: var(--shiki-dark-font-weight) !important;
    text-decoration: var(--shiki-dark-text-decoration) !important;
}

html.dark .shiki,
html.dark .shiki span,
.shiki-preview .shiki,
.shiki-preview .shiki span {
    background-color: transparent !important;
}
</style>
