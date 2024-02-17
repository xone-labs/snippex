<template>
    <h3 :id="id" class="mb-1 mt-6 text-2xl font-semibold">
        <a
            v-if="generate"
            :href="`#${id}`"
        >
            <slot />
        </a>
        <slot v-else />
    </h3>
</template>

<script lang="ts" setup>
import { useRuntimeConfig } from "#app";

const props = defineProps<{ id?: string }>();

const { headings } = useRuntimeConfig().public.mdc;
const generate = computed(() => props.id && headings?.anchorLinks?.h1);
</script>
