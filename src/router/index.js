import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  // 将匹配所有内容并将其放在 `$route.params.pathMatch` 下
  {
    path: '*',
    name: 'NotFound',
    component: () => import('../views/exception/ExceptionView.vue')
  },
  //main body
  {
    path: '/main',
    alias: '/',
    component: () =>import('../views/template/MainTemplate.vue'),
    children: [
      //main page
      {
        path: 'home',
        name: 'home',
        component: () => import('../views/home/HomeView.vue')
      },
      //综测统计
      {
        path: 'zongce_cal',
        name: 'zongceCal',
        component: () => import('../views/mainfunction/ZongceCalView.vue')
      },
      //互评统计
      {
        path: 'classmate_cal',
        name: 'classmateCal',
        component: () => import('../views/mainfunction/ClassmateCalView.vue')
      },
      //创新创业学院相关
      {
        path: 'innovation_school',
        name: 'innovationSchool',
        component: () => import('../views/innovationschool/Default.vue'),
        children:[
          //创新创业学院前台
          {
            path: 'vote_fronted',
            name: 'voteFronted',
            component: () => import('../views/innovationschool/Fronted.vue')
          },
          //创新创业学院评分后台
          {
            path: 'vote_backend',
            name: 'voteBackend',
            component: () => import('../views/innovationschool/Backend.vue')
          },
        ]
      },
    ]
  },
  //monitor dashboard
  // {
  //   path: '/dashboard',
  //   name: 'dashboard',
  //   component: () => import('../views/hidefunction/DashboardView.vue')
  // },
]

const router = new VueRouter({
  routes,
  mode: "history"
})

export default router
