import { createRouter, createWebHistory } from 'vue-router'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/homeView',
      name: 'homeView',
      component: () => import('../views/homeView.vue'),
      children: [
        {
          path: '/materialRequest',
          name: 'materialRequest',
          component: () => import('../views/panel/materialRequest.vue'),
        },
        {
          path: '/requestList',
          name: 'requestList',
          component: () => import('../views/panel/requestList.vue'),
        },
        {
          path: '/lineSet',
          name: 'lineSet',
          component: () => import('../views/panel/lineSet.vue'),
        },
      ]
    },
    {   
      path: '/:pathMatch(.*)', // ()에 custom regular expression으로 검색어를 설정한다. 검색된 단어는 params.pathMatch에 저장된다. 어쨌든 matching이 되면 /main으로 redirect 된다.
      redirect: {path:'/materialRequest'},
    }
  ]
})

export default router
