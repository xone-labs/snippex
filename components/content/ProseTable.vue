<template>
    <OverlayScrollbarsComponent :defer="true" :options="pageOverlayScrollbarsOptions" class="my-2 overflow-hidden border rounded-xl bg-light-300 shadow-sm dark:(border-dark-200 bg-dark-400) light:shadow-dark-50/10">
        <table class="x-playground-table min-w-full border-collapse table-auto text-left divide-y dark:(divide-dark-200)">
            <slot />
        </table>
    </OverlayScrollbarsComponent>
</template>

<script lang="ts" setup>
import { OverlayScrollbarsComponent } from "overlayscrollbars-vue";
</script>

<style lang="scss" scoped>
.x-playground-table {
    :slotted(thead) {
        @apply bg-light-200 dark:bg-dark-500;
        @apply [&_tr]:(divide-x dark:divide-dark-200);
        @apply [&_th]:(py-2 px-4 text-xs font-semibold uppercase tracking-wider text-gray-500/80 dark:text-gray-400/80);
    }

    :slotted(tbody) {
        @apply divide-y dark:(divide-dark-200);
        @apply [&_tr]:(divide-x dark:divide-dark-200);
        @apply [&_td]:(py-2 px-4 text-sm text-sm align-baseline);
    }
}
</style>
