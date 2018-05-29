import Vue from 'vue'
import Router from 'vue-router'
import myHome from '@/components/home/home'
import myMoreFacility from '@/components/moreFacility/moreFacility'
import myLogin from '@/components/login/login'
import myForgetPassword from '@/components/forgetPassword/forgetPassword'
import myRegister from '@/components/register/register'
import myCollectFolder from '@/components/collectFolder/collectFolder'
import myPersonalAssets from '@/components/personalAssets/personalAssets'
import myNoAssets from '@/components/personalAssets/noAssets'

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
    {
      path: '/collectFolder',
      name: 'collectFolder',
      component: myCollectFolder
    },
    {
      path: '/personalAssets',
      name: 'personalAssets',
      component: myPersonalAssets
    },
    {
      path: '/noAssets',
      name: 'noAssets',
      component: myNoAssets
    },
  ]
})
