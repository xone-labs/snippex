<template>
    <h5 :id="id" class="mb-1 mt-4 text-lg font-semibold">
        <a
            v-if="generate"
            :href="`#${id}`"
        >
            <slot />
        </a>
        <slot v-else />
    </h5>
</template>

<script lang="ts" setup>
import { useRuntimeConfig } from "#app";

const props = defineProps<{ id?: string }>();

const { headings } = useRuntimeConfig().public.mdc;
const generate = computed(() => props.id && headings?.anchorLinks?.h1);
</script>
