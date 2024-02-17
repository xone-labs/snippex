<template>
    <NuxtLink
        :href="href"
        :target="target"
        class="text-blue-500 transition dark:text-blue-400 hover:underline"
    >
        <slot />
    </NuxtLink>
</template>

<script lang="ts" setup>
defineProps({
    href: {
        type: String,
        default: "",
    },
    target: {
        type: String,
        default: undefined,
        required: false,
    },
});
</script>
