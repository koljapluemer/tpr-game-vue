import type { TopicTemplate } from "@/models_backend/TopicTemplate";
import type { Level } from "@/models_frontend/Level";
import type { Thing } from "@/models_frontend/Thing";
import type { Topic } from "@/models_frontend/Topic";
import { reactive, ref } from "vue";

export const gameDataStore = reactive({
    topics: [] as Topic[],
    levels: [] as Level[],
    things: [] as Thing[],


    setTopics(topics: Topic[]) {
        this.topics = topics
        console.info('set topics, they are now', this.topics)
    }
})