import { ClickScrollPlugin, OverlayScrollbars } from "overlayscrollbars";

import type { OverlayScrollbarsComponentProps } from "overlayscrollbars-vue";

export function initializeOverlayScrollbars() {
    OverlayScrollbars.plugin(ClickScrollPlugin);
}

export const basicOverlayScrollbarsOptions: OverlayScrollbarsComponentProps["options"] = {
    scrollbars: {
        autoHide: "move",
        clickScroll: true,
    },
};

export const pageOverlayScrollbarsOptions: OverlayScrollbarsComponentProps["options"] = {
    overflow: {
        x: "hidden",
    },
    scrollbars: {
        autoHide: "move",
        clickScroll: true,
    },
};
