<template>
    <div ref="containerRef" class="origin-center overflow-clip">
        <template v-if="false">
            {{ rendererStatus }} - isSlideTransitioning: {{ isSlideTransitioning }} - {{ currentSlideIndex + 1 }} / {{ props.codes.length }} : {{ rangedSlideIndex + 1 }}

            <div class="mb-3 flex gap-x-2">
                <button class="bg-transparent" @click="previousSlide">
                    Previous
                </button>

                <button class="bg-transparent" @click="nextSlide">
                    Next
                </button>
            </div>
        </template>

        <div class="relative grid grid-cols-[1fr] size-fit select-none">
            <CodeRenderer
                ref="firstRendererRef"
                :code="firstCodeSlide.code"
                :dual-theme="dualTheme"
                :explicit-render="true"
                :mode="mode"
                :theme="firstCodeSlide.theme ?? theme"
                :themes="defu(firstCodeSlide.themes, themes)"
                :transparent-background="transparentBackground"
                @on-status-change="onFirstRendererStatusChange"
                @on-rendered="onFirstRendererRendered"
            />

            <CodeRenderer
                ref="secondRendererRef"
                :code="secondCodeSlide.code"
                :dual-theme="dualTheme"
                :explicit-render="true"
                :mode="mode"
                :theme="secondCodeSlide.theme ?? theme"
                :themes="defu(secondCodeSlide.themes, themes)"
                :transparent-background="transparentBackground"
                @on-status-change="updateSecondRendererStatus"
                @on-rendered="updateSecondRendererRendered"
            />
        </div>
    </div>
</template>

<script lang="ts" setup>
import defu from "defu";
import gsap from "gsap";

import CodeRenderer from "~/playground/code-morph-transition/feature/components/CodeRenderer.vue";
import { getDiff, useMorphAnimation } from "~/playground/code-morph-transition/feature/utils/code-morph-transition";

import type { CodeMorphTransitionProps, IRendererState } from "~/playground/code-morph-transition/feature/types/code-morph-transition";

const props = withDefaults(defineProps<CodeMorphTransitionProps>(), {
    language: "typescript",
    theme: "github-dark",
    themes: () => ({
        dark: "github-dark",
        light: "github-light",
    }),
    dualTheme: true,
    transparentBackground: true,
    mode: "dark",
    diffMode: "char",
});

// eslint-disable-next-line func-call-spacing
const emit = defineEmits<{
    (e: "on-next"): void;
    (e: "on-previous"): void;
}>();

const currentSlideIndex = ref(0);
const rangedSlideIndex = ref(0);

const containerRef = ref<HTMLDivElement | null>(null);

const firstRendererRef = ref<InstanceType<typeof CodeRenderer> | null>(null);
const firstCodeSlide = ref(props.codes[rangedSlideIndex.value]);
const firstSlideChars = ref<Array<HTMLDivElement | HTMLSpanElement>>([]);
const {
    state: firstSlideRendererState,
    produce: updateFirstSlideRendererState,
} = useImmer<IRendererState>({
    status: "processing",
    info: {
        backgroundColor: "",
        height: 0,
        width: 0,
        lineHeight: 0,
    },
});

const onFirstRendererStatusChange = (status: IRendererState["status"]) => { updateFirstSlideRendererState((draft) => { draft.status = status; }); };
const onFirstRendererRendered = (chars: Array<HTMLDivElement | HTMLSpanElement>, info: IRendererState["info"]) => {
    firstSlideChars.value = chars;
    updateFirstSlideRendererState((draft) => {
        draft.info = info;
    });
};

const secondRendererRef = ref<InstanceType<typeof CodeRenderer> | null>(null);
const secondCodeSlide = ref(props.codes[rangedSlideIndex.value + 1]);
const secondSlideChars = ref<Array<HTMLDivElement | HTMLSpanElement>>([]);
const {
    state: secondSlideRendererState,
    produce: updateSecondSlideRendererState,
} = useImmer<IRendererState>({
    status: "processing",
    info: {
        backgroundColor: "",
        height: 0,
        width: 0,
        lineHeight: 0,
    },
});

const updateSecondRendererStatus = (status: IRendererState["status"]) => { updateSecondSlideRendererState((draft) => { draft.status = status; }); };
const updateSecondRendererRendered = (chars: Array<HTMLDivElement | HTMLSpanElement>, info: IRendererState["info"]) => {
    secondSlideChars.value = chars;
    updateSecondSlideRendererState((draft) => {
        draft.info = info;
    });
};

const rendererStatus = computed(() => firstSlideRendererState.value.status === "rendered" && secondSlideRendererState.value.status === "rendered" ? "rendered" : "processing");

const currentLoadedSlide = ref<[number | null, number | null]>([null, null]);
const slideTransitionProgress = ref(0);

const isSlideTransitioning = ref(false);
const slideDirection = ref<"forward" | "backward" | "idle">("idle");

const timeline = gsap.timeline({
    paused: true,
    onComplete: () => {
        // currentSlideIndex.value = Math.min(currentSlideIndex.value + 1, props.codes.length - 1);
        // rangedSlideIndex.value = Math.min(rangedSlideIndex.value + 1, props.codes.length - 2);
        slideDirection.value = "idle";
    },
    onReverseComplete: () => {
        // currentSlideIndex.value = Math.max(currentSlideIndex.value - 1, 0);
        slideDirection.value = "idle";
    },
    onUpdate: () => {
        isSlideTransitioning.value = timeline.isActive();
        slideTransitionProgress.value = timeline.progress();
    },
});

async function loadCodeSlide(firstIndex: number, secondIndex: number) {
    if (firstRendererRef.value === null || secondRendererRef.value === null) { return; }

    const firstSlide = props.codes[firstIndex] ?? props.codes[0];
    const secondSlide = props.codes[secondIndex] ?? props.codes[props.codes.length - 1];

    const firstRendererOutput = await firstRendererRef.value.render(firstSlide.code, firstSlide.language ?? props.language, firstSlide.theme ?? props.theme, defu(firstSlide.themes, props.themes), props.dualTheme);
    const secondRendererOutput = await secondRendererRef.value.render(secondSlide.code, secondSlide.language ?? props.language, secondSlide.theme ?? props.theme, defu(secondSlide.themes, props.themes), props.dualTheme);

    updateFirstSlideRendererState((draft) => {
        draft.status = "rendered";
    });

    updateSecondSlideRendererState((draft) => {
        draft.status = "rendered";
    });

    const diff = getDiff(
        secondSlide.diffMode ?? firstSlide.diffMode ?? props.diffMode,
        firstSlide.code,
        secondSlide.code,
    );

    const diffCharMap: Array<{ char: string, action: "add" | "remove" | "none" }> = [];

    for (const change of diff) {
        const chars = change.value.split("");
        for (const char of chars) {
            if (char === "\n") { continue; }
            diffCharMap.push({
                char,
                action: change.added ? "add" : change.removed ? "remove" : "none",
            });
        }
    }

    timeline.clear();

    await nextTick();

    await useMorphAnimation({
        timeline,
        diffCharMap,
        firstSlideCharElements: firstRendererOutput.chars,
        secondSlideCharElements: secondRendererOutput.chars,
        moveDuration: 0.5,
        addDuration: 0.5,
        removeDuration: 0.5,
    });

    await nextTick();

    console.log("size", {
        firstWidth: firstRendererRef.value?.$el.querySelector(".code-renderer-highlight")?.getBoundingClientRect().width,
        firstHeight: firstRendererRef.value?.$el.querySelector(".code-renderer-highlight")?.getBoundingClientRect().height,
        secondWidth: secondRendererRef.value?.$el.querySelector(".code-renderer-highlight")?.getBoundingClientRect().width,
        secondHeight: secondRendererRef.value?.$el.querySelector(".code-renderer-highlight")?.getBoundingClientRect().height,
    });

    timeline.add(gsap.fromTo(containerRef.value, {
        width: firstRendererRef.value?.$el.querySelector(".code-renderer-highlight")?.getBoundingClientRect().width,
        height: firstRendererRef.value?.$el.querySelector(".code-renderer-highlight")?.getBoundingClientRect().height,
    }, {
        duration: 0.5,
        ease: "none",
        width: secondRendererRef.value?.$el.querySelector(".code-renderer-highlight")?.getBoundingClientRect().width,
        height: secondRendererRef.value?.$el.querySelector(".code-renderer-highlight")?.getBoundingClientRect().height,
    }), 0);

    if (slideDirection.value === "backward") {
        timeline.progress(1);
    } else {
        timeline.progress(0);
    }

    slideDirection.value = "idle";

    currentLoadedSlide.value = [firstIndex, secondIndex];
}

whenever(() => rendererStatus.value === "rendered", async () => {
    // const diff = getDiff(
    //     props.codes[rangedSlideIndex.value + 1].diffMode ?? props.codes[rangedSlideIndex.value].diffMode ?? props.diffMode,
    //     firstCodeSlide.value.code,
    //     secondCodeSlide.value.code,
    // );
    // const diffCharMap: Array<{ char: string, action: "add" | "remove" | "none" }> = [];
    //
    // for (const change of diff) {
    //     const chars = change.value.split("");
    //     for (const char of chars) {
    //         if (char === "\n") { continue; }
    //         diffCharMap.push({
    //             char,
    //             action: change.added ? "add" : change.removed ? "remove" : "none",
    //         });
    //     }
    // }

    // if (slideDirection.value === "forward") {
    //     timeline.clear();
    // }
    //
    // await nextTick();
    //
    // await useMorphAnimation({
    //     timeline,
    //     diffCharMap,
    //     firstSlideCharElements: firstSlideChars.value,
    //     secondSlideCharElements: secondSlideChars.value,
    //     moveDuration: 0.5,
    //     addDuration: 0.5,
    //     removeDuration: 0.5,
    // });
    //
    // await nextTick();
    //
    // timeline.addPause();
    //
    // if (slideDirection.value === "backward") {
    //     if (currentSlideIndex.value > rangedSlideIndex.value) {
    //         console.log("previous", firstRendererRef.value?.$el.querySelector(".code-renderer-highlight")?.getBoundingClientRect());
    //
    //         timeline.add(gsap.to(containerRef.value, {
    //             duration: 0.5,
    //             width: firstRendererRef.value?.$el.querySelector(".code-renderer-highlight")?.getBoundingClientRect().width,
    //             height: firstRendererRef.value?.$el.querySelector(".code-renderer-highlight")?.getBoundingClientRect().height,
    //         }), 0);
    //     } else {
    //         timeline.add(gsap.fromTo(containerRef.value, {
    //             width: secondRendererRef.value?.$el.querySelector(".code-renderer-highlight")?.getBoundingClientRect().width,
    //             height: secondRendererRef.value?.$el.querySelector(".code-renderer-highlight")?.getBoundingClientRect().height,
    //         }, {
    //             duration: 0.5,
    //             width: firstRendererRef.value?.$el.querySelector(".code-renderer-highlight")?.getBoundingClientRect().width,
    //             height: firstRendererRef.value?.$el.querySelector(".code-renderer-highlight")?.getBoundingClientRect().height,
    //         }), ">");
    //     }
    //
    //     timeline.progress(0.9999);
    //     timeline.reverse();
    // }
    //
    // if (slideDirection.value === "forward") {
    //     console.log("next", secondRendererRef.value?.$el.querySelector(".code-renderer-highlight")?.getBoundingClientRect());
    //
    //     timeline.add(gsap.to(containerRef.value, {
    //         duration: 0.5,
    //         width: secondRendererRef.value?.$el.querySelector(".code-renderer-highlight")?.getBoundingClientRect().width,
    //         height: secondRendererRef.value?.$el.querySelector(".code-renderer-highlight")?.getBoundingClientRect().height,
    //     }), 0);
    // }
});

function nextSlide() {
    // if (rendererStatus.value === "processing") { return; }
    //
    // emit("on-next");
    //
    // slideDirection.value = "forward";
    // timeline.play();

    if (isSlideTransitioning.value) {
        if (slideDirection.value === "backward") {
            timeline.play();
        } else {
            timeline.progress(1);
        }
        return;
    }

    emit("on-next");

    // console.log("should load next slide", currentLoadedSlide.value, slideTransitionProgress.value, currentLoadedSlide.value[1] && slideTransitionProgress.value === 1);

    const shouldLoadNextSlide = currentLoadedSlide.value[1] && slideTransitionProgress.value === 1;
    if (shouldLoadNextSlide) {
        if (currentLoadedSlide.value[1] === props.codes.length - 1) {
            return;
        }
        slideDirection.value = "forward";
        loadCodeSlide(currentLoadedSlide.value[1] ?? 0, (currentLoadedSlide.value[1] ?? 0) + 1).then(() => {
            nextTick(() => {
                timeline.play();
            });
        });
    } else {
        timeline.play();
    }

    slideDirection.value = "forward";
}

function previousSlide() {
    // if (rendererStatus.value === "processing") { return; }
    //
    // emit("on-previous");
    //
    // slideDirection.value = "backward";
    // if (currentSlideIndex.value > rangedSlideIndex.value) {
    //     timeline.reverse();
    // } else {
    //     rangedSlideIndex.value = Math.max(rangedSlideIndex.value - 1, 0);
    // }

    // console.log("should load previous slide", currentLoadedSlide.value, slideTransitionProgress.value, currentLoadedSlide.value[0] && slideTransitionProgress.value === 0);

    if (isSlideTransitioning.value) {
        if (slideDirection.value === "forward") {
            timeline.reverse();
        } else {
            timeline.progress(0);
        }
        return;
    }

    emit("on-previous");

    const shouldLoadPreviousSlide = currentLoadedSlide.value[0] && slideTransitionProgress.value === 0;
    if (shouldLoadPreviousSlide) {
        if (currentLoadedSlide.value[0] === 0) {
            return;
        }
        loadCodeSlide((currentLoadedSlide.value[0] ?? 0) - 1, currentLoadedSlide.value[0] ?? 0).then(() => {
            nextTick(() => {
                timeline.reverse();
            });
        });
    } else {
        timeline.reverse();
    }

    slideDirection.value = "backward";
}

onMounted(async () => {
    await loadCodeSlide(0, 1);
});

defineExpose({
    next: nextSlide,
    previous: previousSlide,
    status: rendererStatus,
});
</script>
