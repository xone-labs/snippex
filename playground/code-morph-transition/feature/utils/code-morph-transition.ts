import { diffChars, diffLines, diffWordsWithSpace } from "diff";
import gsap from "gsap";

interface IApplyAnimation {
    timeline: gsap.core.Timeline;
    diffCharMap: Array<{ char: string, action: "add" | "remove" | "none" }>;
    firstSlideCharElements: Array<HTMLSpanElement | HTMLDivElement>;
    secondSlideCharElements: Array<HTMLSpanElement | HTMLDivElement>;
    moveEasing?: gsap.EaseString;
    addEasing?: gsap.EaseString;
    removeEasing?: gsap.EaseString;
    addDuration?: number;
    removeDuration?: number;
    moveDuration?: number;
}

export async function useMorphAnimation(config: IApplyAnimation) {
    const {
        timeline,
        diffCharMap,
        firstSlideCharElements,
        secondSlideCharElements,
        moveEasing = "none",
        addEasing = "none",
        removeEasing = "none",
        addDuration = 1,
        removeDuration = 1,
        moveDuration = 1,
    } = config;

    let firstSlideIndex = 0;
    let secondSlideIndex = 0;

    for (const change of diffCharMap) {
        const firstCharEl = firstSlideCharElements[firstSlideIndex];
        const secondCharEl = secondSlideCharElements[secondSlideIndex];

        if (firstCharEl || secondCharEl) {
            if (change.action === "none") {
                if (firstCharEl.textContent === secondCharEl.textContent) {
                    const firstCharBox = firstCharEl.getBoundingClientRect();
                    const secondCharBox = secondCharEl.getBoundingClientRect();

                    timeline.add(gsap.from(secondCharEl, {
                        x: -(secondCharBox.left - firstCharBox.left),
                        y: -(secondCharBox.top - firstCharBox.top),
                        duration: moveDuration,
                        ease: moveEasing,
                    }), 0);

                    timeline.add(gsap.to(firstCharEl, {
                        x: secondCharBox.left - firstCharBox.left,
                        y: secondCharBox.top - firstCharBox.top,
                        duration: moveDuration,
                        ease: moveEasing,
                    }), 0);

                    timeline.add(gsap.from(secondCharEl, {
                        opacity: 0,
                        duration: 0.2,
                        ease: moveEasing,
                    }), 0);

                    timeline.add(gsap.to(firstCharEl, {
                        opacity: 0,
                        duration: 0.2,
                        ease: moveEasing,
                    }), 0);

                    firstSlideIndex++;
                    secondSlideIndex++;
                }
            } else if (change.action === "add") {
                timeline.add(gsap.fromTo(secondCharEl, {
                    opacity: 0,
                }, {
                    opacity: 1,
                    duration: addDuration,
                    ease: addEasing,
                }), 0);

                secondSlideIndex++;
            } else if (change.action === "remove") {
                timeline.add(gsap.to(firstCharEl, {
                    opacity: 0,
                    duration: removeDuration,
                    ease: removeEasing,
                }), 0);

                firstSlideIndex++;
            }
        }

        await nextTick();
    }
}

export function getDiff(mode: "char" | "word" | "line", oldText: string, newText: string) {
    switch (mode) {
    case "word":
        return diffWordsWithSpace(oldText, newText);
    case "line":
        return diffLines(oldText, newText);
    case "char":
    default:
        return diffChars(oldText, newText);
    }
}
