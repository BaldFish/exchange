import Vue from 'vue'
import Router from 'vue-router'
import myHome from '@/components/home/home'
import myMoreCase from '@/components/moreCase/moreCase'
import myMoreFacility from '@/components/moreFacility/moreFacility'
import myCaseDetails from '@/components/caseDetails/caseDetails'
import myFacilityDetails from '@/components/facilityDetails/facilityDetails'
import myTrustedSource from '@/components/trustedSource/trustedSource'
import myLogin from '@/components/login/login'
import myForgetPassword from '@/components/forgetPassword/forgetPassword'
import myRegister from '@/components/register/register'

Vue.use(Router);

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
      path: '/moreCase',
      name: 'moreCase',
      component: myMoreCase
    },
    {
      path: '/moreFacility',
      name: 'moreFacility',
      component: myMoreFacility
    },
    {
      path: '/caseDetails',
      name: 'caseDetails',
      component: myCaseDetails
    },
    {
      path: '/facilityDetails',
      name: 'facilityDetails',
      component: myFacilityDetails
    },
    {
      path: '/trustedSource',
      name: 'trustedSource',
      component: myTrustedSource
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
