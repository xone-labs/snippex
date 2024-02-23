<template>
    <DefineAnimatedMeshGradient>
        <svg preserveAspectRatio="xMidYMid slice" viewBox="0 0 100 100">
            <defs>
                <radialGradient id="Gradient1" cx="50%" cy="50%" fx="0.441602%" fy="50%" r=".5">
                    <animate attributeName="fx" dur="34s" repeatCount="indefinite" values="0%;3%;0%" />
                    <stop offset="0%" stop-color="rgba(255, 0, 255, 1)" />
                    <stop offset="100%" stop-color="rgba(255, 0, 255, 0)" />
                </radialGradient>
                <radialGradient id="Gradient2" cx="50%" cy="50%" fx="2.68147%" fy="50%" r=".5">
                    <animate attributeName="fx" dur="23.5s" repeatCount="indefinite" values="0%;3%;0%" />
                    <stop offset="0%" stop-color="rgba(255, 255, 0, 1)" />
                    <stop offset="100%" stop-color="rgba(255, 255, 0, 0)" />
                </radialGradient>
                <radialGradient id="Gradient3" cx="50%" cy="50%" fx="0.836536%" fy="50%" r=".5">
                    <animate attributeName="fx" dur="21.5s" repeatCount="indefinite" values="0%;3%;0%" />
                    <stop offset="0%" stop-color="rgba(0, 255, 255, 1)" />
                    <stop offset="100%" stop-color="rgba(0, 255, 255, 0)" />
                </radialGradient>
                <radialGradient id="Gradient4" cx="50%" cy="50%" fx="4.56417%" fy="50%" r=".5">
                    <animate attributeName="fx" dur="23s" repeatCount="indefinite" values="0%;5%;0%" />
                    <stop offset="0%" stop-color="rgba(0, 255, 0, 1)" />
                    <stop offset="100%" stop-color="rgba(0, 255, 0, 0)" />
                </radialGradient>
                <radialGradient id="Gradient5" cx="50%" cy="50%" fx="2.65405%" fy="50%" r=".5">
                    <animate attributeName="fx" dur="24.5s" repeatCount="indefinite" values="0%;5%;0%" />
                    <stop offset="0%" stop-color="rgba(0,0,255, 1)" />
                    <stop offset="100%" stop-color="rgba(0,0,255, 0)" />
                </radialGradient>
                <radialGradient id="Gradient6" cx="50%" cy="50%" fx="0.981338%" fy="50%" r=".5">
                    <animate attributeName="fx" dur="25.5s" repeatCount="indefinite" values="0%;5%;0%" />
                    <stop offset="0%" stop-color="rgba(255,0,0, 1)" />
                    <stop offset="100%" stop-color="rgba(255,0,0, 0)" />
                </radialGradient>
            </defs>
            <rect fill="url(#Gradient1)" height="100%" transform="rotate(334.41 50 50)" width="100%" x="13.744%" y="1.18473%">
                <animate attributeName="x" dur="20s" repeatCount="indefinite" values="25%;0%;25%" />
                <animate attributeName="y" dur="21s" repeatCount="indefinite" values="0%;25%;0%" />
                <animateTransform attributeName="transform" dur="7s" from="0 50 50" repeatCount="indefinite" to="360 50 50" type="rotate" />
            </rect>
            <rect fill="url(#Gradient2)" height="100%" transform="rotate(255.072 50 50)" width="100%" x="-2.17916%" y="35.4267%">
                <animate attributeName="x" dur="23s" repeatCount="indefinite" values="-25%;0%;-25%" />
                <animate attributeName="y" dur="24s" repeatCount="indefinite" values="0%;50%;0%" />
                <animateTransform attributeName="transform" dur="12s" from="0 50 50" repeatCount="indefinite" to="360 50 50" type="rotate" />
            </rect>
            <rect fill="url(#Gradient3)" height="100%" transform="rotate(139.903 50 50)" width="100%" x="9.00483%" y="14.5733%">
                <animate attributeName="x" dur="25s" repeatCount="indefinite" values="0%;25%;0%" />
                <animate attributeName="y" dur="12s" repeatCount="indefinite" values="0%;25%;0%" />
                <animateTransform attributeName="transform" dur="9s" from="360 50 50" repeatCount="indefinite" to="0 50 50" type="rotate" />
            </rect>
        </svg>
    </DefineAnimatedMeshGradient>

    <div class="relative my-4 aspect-video flex flex-col items-center justify-center overflow-hidden border rounded-xl bg-light-300 dark:(border-dark-200 bg-dark-400)">
        <AnimatedMeshGradientComponent v-if="didFirstRender" class="absolute inset-0 bg-light-500 animated animated-fade-in dark:(bg-dark-900)" />
        <div class="absolute inset-0 flex items-center justify-center backdrop-blur-100 dark:(bg-dark-900/40)">
            <Icon v-if="!didFirstRender" class="size-6" name="svg-spinners:3-dots-fade" />
        </div>

        <div v-show="didFirstRender" class="size-fit flex flex-col select-none overflow-hidden border rounded-xl bg-white/70 shadow-xl backdrop-blur-3xl dark:(border-dark-200/40 bg-dark-500/70)">
            <div class="relative mt-0.5 h-8 flex items-center justify-center">
                <div class="absolute left-4 h-2 flex gap-x-1.5">
                    <div v-for="i in 3" :key="i" class="rounded-full bg-dark op-15 size-2 dark:(bg-white)" />
                </div>

                <div class="scale-90 text-xs font-semibold tracking-wide op-40 -translate-y-1px">
                    Snippex Playground
                </div>
            </div>

            <div class="px-4 pb-2">
                <CodeMorphTransition ref="codeMorphTransitionRef" :codes="codes" :mode="colorMode" class="text-sm" />
            </div>
        </div>

        <div v-if="didFirstRender" class="absolute bottom-4 right-4 flex gap-x-0.5 overflow-hidden border rounded-md bg-light-200 p-0.5 shadow-md backdrop-blur-2xl dark:(border-dark-200 bg-dark-400/90)">
            <button class="flex items-center justify-center rounded bg-transparent transition size-7 disabled:(pointer-events-none op-40) active:(scale-95 bg-light-800) hover:bg-light-700 dark:(active:bg-dark-100 hover:bg-dark-200)" @click="codeMorphTransitionRef?.previous()">
                <Icon class="size-4" name="solar:arrow-left-linear" />
            </button>

            <button class="flex items-center justify-center rounded bg-transparent transition size-7 disabled:(pointer-events-none op-40) active:(scale-95 bg-light-800) hover:bg-light-700 dark:(active:bg-dark-100 hover:bg-dark-200)" @click="codeMorphTransitionRef?.next()">
                <Icon class="size-4" name="solar:arrow-right-linear" />
            </button>
        </div>
    </div>
</template>

<script lang="ts" setup>
import CodeMorphTransition from "~/playground/code-morph-transition/feature/components/CodeMorphTransition.vue";

import type { CodeMorphTransitionProps } from "~/playground/code-morph-transition/feature/types/code-morph-transition";

const [DefineAnimatedMeshGradient, AnimatedMeshGradientComponent] = createReusableTemplate();
const codeMorphTransitionRef = ref<InstanceType<typeof CodeMorphTransition> | null>(null);

const codes = ref<CodeMorphTransitionProps["codes"]>([
    {
        id: "1",
        code: "const isExample = animations.some(() => {})",
    },
    {
        id: "2",
        code: "const isExample = animations.some((animation) => {\n" +
            "  return animation.looksAwesome()\n" +
            "})",
        themes: {
            dark: "monokai",
        },
    },
    {
        id: "2.1",
        code: "function add(a: number, b: number) {\n  return a + b + isExample; \n}",
        diffMode: "word",
        themes: {
            dark: "dracula",
        },
    },
    {
        id: "3",
        code: "const hello = 'Hello, world!';\nconsole.log(hello)",
        diffMode: "char",
    },
    {
        id: "4",
        code: "function hello() {\n  console.log('Hello, world!')\n}",
        diffMode: "word",
        themes: {
            dark: "monokai",
        },
    },
    {
        id: "5",
        code: "<button class=\"flex items-center\">\n" +
            "    <Icon class=\"size-4\" name=\"solar:arrow-left-linear\" />\n" +
            "</button>",
        diffMode: "word",
        themes: {
            dark: "dracula",
        },
        language: "html",
    },
    {
        id: "6",
        code: "   \n" +
            "my_dict1 = {'a' : 1, 'b' : 2, 'c' : 3} \n" +
            "my_dict2 = {'d' : 4, 'e' : 5, 'f' : 6} \n" +
            "  \n" +
            "# Method 1 \n" +
            "result = { **my_dict1, **my_dict2} \n" +
            "print(result) \n" +
            "  \n" +
            "# Method 2 \n" +
            "result = my_dict1.copy() \n" +
            "result.update(my_dict2) \n" +
            "print(result)",
        diffMode: "word",
        themes: {
            dark: "dracula",
        },
        language: "python",
    },
]);

const colorMode = ref<"light" | "dark">("dark");
const didFirstRender = ref(false);

whenever(() => codeMorphTransitionRef.value?.status === "rendered", () => {
    if (!didFirstRender.value) {
        didFirstRender.value = true;
    }
});

watch(() => useColorMode().value, (mode) => {
    colorMode.value = mode === "dark" ? "dark" : "light";
});

onMounted(() => {
    colorMode.value = useColorMode().value === "dark" ? "dark" : "light";
});
</script>
