# Code Morph Transition

This playground does the proof-of-concept of the code morph transition.
That is, the transition between two code snippets that are similar.

It uses diffing to find the differences between the two code snippets and then morphs the code from one to the other.

This demo depends on the following libraries:

- [diff](https://github.com/kpdecker/jsdiff) - For finding the differences between the two code snippets.
- [gsap](https://github.com/greensock/GSAP) - For animating the morphing of the code snippets.
- [shiki](https://github.com/shikijs/shiki) - For syntax highlighting the code snippets.

