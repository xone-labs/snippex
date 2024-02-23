import { applyPatches, enablePatches, produceWithPatches } from "immer";

import type { Draft, Patch } from "immer";
import type { Ref } from "vue";

enablePatches();

interface PatchNode {
    redoPatches: Patch[];
    undoPatches: Patch[];
}

interface State<T> {
    data: T;
}

function useMigrationStack<T>() {
    const stack = reactive<T[]>([]) as unknown as T[];
    const nextIndex = ref(0);

    const hasNext = computed(() => stack.length > nextIndex.value);
    const hasPrev = computed(() => nextIndex.value > 0);

    function push(value: T) {
        stack.splice(nextIndex.value);
        stack.push(value);
        nextIndex.value = stack.length;
    }

    function next() {
        if (hasNext.value) {
            nextIndex.value++;
        }
    }

    function prev() {
        if (hasPrev.value) {
            nextIndex.value--;
        }
    }

    function current() {
        return stack[nextIndex.value - 1];
    }

    function clear() {
        stack.splice(0);
        nextIndex.value = 0;
    }

    function reset(step?: number) {
        if (step === undefined) {
            nextIndex.value = stack.length;
            return stack;
        } else if (step < 0) {
            const left = Math.max(nextIndex.value + step, 0);
            const result = stack.slice(left, nextIndex.value);
            nextIndex.value = left;
            return result;
        } else if (step > 0) {
            const right = Math.min(nextIndex.value + step, stack.length);
            const result = stack.slice(nextIndex.value, right);
            nextIndex.value = right;
            return result;
        } else {
            return [];
        }
    }

    return {
        stack,
        nextIndex,
        hasNext,
        hasPrev,
        push,
        next,
        prev,
        current,
        clear,
        reset,
    };
}

export function useImmer<T>(initial: T) {
    const state = shallowRef({ data: initial }) as unknown as Ref<State<T>>;

    const history = useMigrationStack<PatchNode>();

    function _produce(producer: (draft: Draft<T>) => Draft<T> | undefined | void) {
        const [data, redoPatches, undoPatches] = produceWithPatches<State<T>>(state.value, (draft) => {
            const result = producer(draft.data);
            if (result !== undefined && result !== draft.data) {
                draft.data = result;
            }
        });

        if (redoPatches.length === 0) { return; }

        history.push({
            redoPatches,
            undoPatches,
        });
        state.value = data;
    }

    function _undo() {
        const patches = history.reset(-1).map(node => node.undoPatches).reduce((acc, val) => acc.concat(val), []);
        state.value = applyPatches(state.value, patches);
    }

    function _redo() {
        const patches = history.reset(1).map(node => node.redoPatches).reduce((acc, val) => acc.concat(val), []);
        state.value = applyPatches(state.value, patches);
    }

    return {
        state: readonly(computed(() => state.value.data)),
        produce: _produce,
        undo: _undo,
        redo: _redo,
        canUndo: history.hasPrev,
        canRedo: history.hasNext,
        clearHistory: history.clear,
    };
}
