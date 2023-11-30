import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import NomalView from '../views/game/NomalView.vue'
import LAHView from '../views/game/LAHView.vue'
const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  }, {
    path: '/game/nomal',
    name: 'gameNomal',
    component: NomalView
  }, {
    path: '/game/love-and-hate',
    name: 'LoveAndHate',
    component: LAHView
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
