import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import NormalView from '../views/game/NormalView.vue'
import LAHView from '../views/game/LAHView.vue'
const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  }, {
    path: '/game/normal',
    name: 'gameNormal',
    component: NormalView
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
