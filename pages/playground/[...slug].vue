<template>
    <OverlayScrollbarsComponent :defer="true" :options="pageOverlayScrollbarsOptions" class="relative h-dvh" @os-scroll="handleOnScroll">
        <div :class="isScrolledPassedTop && 'shadow-xl light:shadow-dark-50/5 dark:(shadow-2xl shadow-dark-800/80)'" class="sticky top-0 z-10 flex border-b bg-light-200/80 px-8 py-3 backdrop-blur-2xl transition dark:(border-dark-200 bg-dark-600/90)">
            <div class="mx-auto h-8 max-w-6xl w-full flex items-stretch justify-center">
                <NuxtLink class="flex flex-col items-center justify-center gap-y-1 uppercase" to="/playground">
                    <span class="scale-90 text-xs text-gray-500 font-bold leading-none tracking-wider -translate-y-0.5">Snippex</span>
                    <span :class="isScrolledPassedTop ? 'bg-gradient-to-br from-amber-400 via-orange-500 to-pink-500' : 'bg-gradient-to-r from-neutral-300 to-stone-400'" class="bg-clip-text text-lg text-transparent font-bold leading-none tracking-wide transition-all">
                        Playground
                    </span>
                </NuxtLink>
            </div>
        </div>

        <div class="relative flex px-8 py-10">
            <div class="mx-auto max-w-3xl w-full flex flex-col">
                <ContentDoc />

                <div class="h-20" />
            </div>
        </div>
    </OverlayScrollbarsComponent>
</template>

<script lang="ts" setup>
import { OverlayScrollbarsComponent } from "overlayscrollbars-vue";

import type { OverlayScrollbars } from "overlayscrollbars";

useHead({
    titleTemplate: input => (input) ? `${input} - Snippex Playground` : "Snippex Playground",
});

const isScrolledPassedTop = ref(false);

function handleOnScroll(_: OverlayScrollbars, e: Event) {
    isScrolledPassedTop.value = (e.target instanceof HTMLElement) ? e.target.scrollTop >= 40 : false;
}
</script>

<style lang="scss" scoped>
:deep(.x-playground-paragraph) {
    @apply text-base dark:font-medium dark:text-gray-300/80;
}
</style>
