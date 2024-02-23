<template>
    <NConfigProvider :abstract="true" :inline-theme-disabled="true" :theme="naiveTheme" :theme-overrides="globalThemeOverride">
        <div class="min-h-dvh">
            <NuxtLayout>
                <NuxtPage />
            </NuxtLayout>
        </div>
    </NConfigProvider>
</template>

<script lang="ts" setup>
import { darkTheme, NConfigProvider } from "naive-ui";

import type { GlobalTheme, GlobalThemeOverrides } from "naive-ui";

const naiveTheme = ref<GlobalTheme | null>(null);

const globalThemeOverride: GlobalThemeOverrides = {
    common: {
        fontFamily: "Inter, sans-serif",
        fontFamilyMono: "Fira Code, monospace",
        fontSizeSmall: "13px",
        borderRadius: "6px",
        borderRadiusSmall: "3px",
    },
    Tooltip: {
        padding: "4px 10px",
    },
};

const colorMode = useColorMode();
watch(() => colorMode.value, (mode) => {
    naiveTheme.value = mode === "dark" ? darkTheme : null;
});

onMounted(() => {
    naiveTheme.value = colorMode.value === "dark" ? darkTheme : null;
});
</script>
