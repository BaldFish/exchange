import Vue from 'vue'
import Router from 'vue-router'
import myHome from '@/components/home/home'
import myMoreFacility from '@/components/moreFacility/moreFacility'
import myLogin from '@/components/login/login'
import myForgetPassword from '@/components/forgetPassword/forgetPassword'
import myRegister from '@/components/register/register'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: "/",
      redirect: "/home"
    },
    {
      path: '/home',
      name: 'home',
      component: myHome
    },
    {
      path: '/moreFacility',
      name: 'moreFacility',
      component: myMoreFacility
    },
    {
      path: '/login',
      name: 'login',
      component: myLogin
    },
    {
      path: '/forgetPassword',
      name: 'forgetPassword',
      component: myForgetPassword
    },
    {
      path: '/register',
      name: 'register',
      component: myRegister
    },
  ]
})
