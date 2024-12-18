import TopicListView from '@/views/TopicListView.vue'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'topics',
      component: TopicListView,
    },
  ],
})

export default router
