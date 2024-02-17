<template>
    <h1 :id="id" class="mb-2.5 mt-8 text-4xl font-bold">
        <a
            v-if="generate"
            :href="`#${id}`"
        >
            <slot />
        </a>
        <slot v-else />
    </h1>
</template>

<script lang="ts" setup>
import { useRuntimeConfig } from "#app";

const props = defineProps<{ id?: string }>();

const { headings } = useRuntimeConfig().public.mdc;
const generate = computed(() => props.id && headings?.anchorLinks?.h1);
</script>
