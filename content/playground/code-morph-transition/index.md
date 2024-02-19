# Code Morph Transition

This playground does the proof-of-concept of the code morph transition.
That is, the transition between two code snippets that are similar.

It uses diffing to find the differences between the two code snippets and then morphs the code from one to the other.

This demo depends on the following libraries:

- [diff](https://github.com/kpdecker/jsdiff) - For finding the differences between the two code snippets.
- [gsap](https://github.com/greensock/GSAP) - For animating the morphing of the code snippets.
- [shiki](https://github.com/shikijs/shiki) - For syntax highlighting the code snippets.

## Interactive Demo

Below is the playground that demonstrates the code morph transition. You can edit the code snippets and see the transition between them.

:CodeMorphTransitionInteractiveDemoPlayground

:br

## Find the differences

The first step is to find the differences between the two code snippets.
This is done using the `diff`{lang="bash"} library.

We provide three ways to find the differences:

- `diffChars()`{lang="javascript"} - Finds the differences at the character level.
- `diffWordsWithSpace()`{lang="javascript"} - Finds the differences at the word level (including spaces).
- `diffLines()`{lang="javascript"} - Finds the differences at the line level.

You can see the diff preview in the interactive demo above. The differences are highlighted using color codes, where:

- Gray: Common part, either in the same position or moved.
- Red: Removed part from the first code snippet.
- Green: Added part in the second code snippet.
