import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '@/views/LoginView.vue'
import NoteList from '@/views/note/NoteList.vue'
import RegisterView from '@/views/RegisterView.vue'
import UserList from '@/views/user/UserList.vue'
import UserNote from '@/views/user/UserNote.vue'
import ProjectList from '@/views/project/ProjectList.vue'
import ProjectDetail from '@/views/project/ProjectDetail.vue'
import TaskList from '@/views/task/TaskList.vue'
import { isLogin } from '@/services/authService';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue'),
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterView,
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView,
    },
    {
      path: '/usuarios',
      name: 'usuarios',
      component: UserList,
      meta: { requiresAuth: true },
    },
    {
      path: '/usuario/:id/notes',
      name: 'usuarioNote',
      component: UserNote,
      props: true,
      meta: { requiresAuth: true },
    },
    {
      path: '/notes',
      name: 'notes',
      component: NoteList,
      meta: { requiresAuth: true },
    },
    {
      path: '/proyectos',
      name: 'proyectos',
      component: ProjectList,
      meta: { requiresAuth: true },
    },
    {
      path: '/proyecto/:id',
      name: 'proyectoDetalle',
      component: ProjectDetail,
      props: true,
      meta: { requiresAuth: true },
    },
    {
      path: '/tareas',
      name: 'tareas',
      component: TaskList,
      meta: { requiresAuth: true },
    },
  ],
});

router.beforeEach((to, from, next) => {
  if (to.path === '/login' && isLogin()) {
    next('/')
  } else if (to.meta.requiresAuth && !isLogin()) {
    next('/login')
  } else {
    next()
  }
});

export default router
