<template>
    <OverlayScrollbarsComponent :defer="true" :options="basicOverlayScrollbarsOptions" class="my-2 overflow-hidden border rounded-xl bg-light-400 dark:(border-dark-200 bg-dark-400)">
        <pre :class="$props.class" class="size-fit min-h-full min-w-full py-3"><slot /></pre>
    </OverlayScrollbarsComponent>
</template>

<script lang="ts" setup>
import { OverlayScrollbarsComponent } from "overlayscrollbars-vue";

defineProps({
    code: {
        type: String,
        default: "",
    },
    language: {
        type: String,
        default: null,
    },
    filename: {
        type: String,
        default: null,
    },
    highlights: {
        type: Array as () => number[],
        default: () => [],
    },
    meta: {
        type: String,
        default: null,
    },
    class: {
        type: String,
        default: null,
    },
});
</script>

<style lang="scss" scoped>
pre :slotted(code) {
    .line {
        @apply block font-fira text-sm px-4;

        &.highlight {
            @apply bg-light-200/40 dark:bg-dark-200/50;
        }
    }
}
</style>
