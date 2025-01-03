import { reactive, ref } from "vue";
import { useLocalStorage } from "@/composables/useLocalStorage";

export const globalDataStore = reactive({
    levelDemoImages : [] as string[],
    lastQuestKey: undefined as string | undefined,
})

// TODO: track last quest key globally so it persists even if the level reloads (and shows the same level again)