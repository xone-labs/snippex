import type { BundledLanguage, BundledTheme } from "shiki";

export interface IRendererState {
    status: "rendered" | "processing" | "error";
    info: {
        backgroundColor: string;
        height: number;
        width: number;
        lineHeight: number;
    };
}

export interface CodeRendererProps {
    code: string;
    language?: BundledLanguage;
    theme?: BundledTheme;
    themes?: { light: BundledTheme; dark: BundledTheme };
    dualTheme?: boolean;
    transparentBackground?: boolean;
    mode?: "light" | "dark";
}

export interface CodeMorphTransitionProps extends Omit<CodeRendererProps, "mode" | "code"> {
    codes: Array<{
        id: string,
        diffMode?: "char" | "word" | "line",
    } & Omit<CodeRendererProps, "transparentBackground" | "mode" | "dualTheme" | "themes"> & { themes?: { light?: BundledTheme; dark?: BundledTheme } }>;
    mode?: "light" | "dark";
    diffMode?: "char" | "word" | "line";
}
