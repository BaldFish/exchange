import Vue from 'vue'
import Router from 'vue-router'
import myHome from '@/components/home/home'
import myMoreCase from '@/components/moreCase/moreCase'
import myCaseDetails from '@/components/caseDetails/caseDetails'
import myCaseSource from '@/components/caseSource/caseSource'
import myMoreFacility from '@/components/moreFacility/moreFacility'
import myFacilityDetails from '@/components/facilityDetails/facilityDetails'
import myFacilitySource from '@/components/facilitySource/facilitySource'
import myLogin from '@/components/login/login'
import myForgetPassword from '@/components/forgetPassword/forgetPassword'
import myRegister from '@/components/register/register'
import myCollectFolder from '@/components/collectFolder/collectFolder'
import myPersonalAssets from '@/components/personalAssets/personalAssets'
import myNoAssets from '@/components/personalAssets/noAssets'
import myCheckOrder from '@/components/orderHistory/checkOrder'
import myOrderHistory from '@/components/orderHistory/orderHistory'
import mySecurityCenter from '@/components/securityCenter/securityCenter'

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
      path: '/caseDetails',
      name: 'caseDetails',
      component: myCaseDetails
    },
    {
      path: '/caseSource',
      name: 'caseSource',
      component: myCaseSource
    },
    {
      path: '/moreFacility',
      name: 'moreFacility',
      component: myMoreFacility
    },
    {
      path: '/facilityDetails',
      name: 'facilityDetails',
      component: myFacilityDetails
    },
    {
      path: '/facilitySource',
      name: 'facilitySource',
      component: myFacilitySource
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
    {
      path: '/checkOrder',
      name: 'checkOrder',
      component: myCheckOrder
    },
    {
      path: '/orderHistory',
      name: 'orderHistory',
      component: myOrderHistory
    },
    {
      path: '/securityCenter',
      name: 'securityCenter',
      component: mySecurityCenter
    },
  ]
})
