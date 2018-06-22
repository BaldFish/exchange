import Vue from 'vue'
import Router from 'vue-router'
import myHome from '@/components/home/home'
import myMoreCase from '@/components/moreCase/moreCase'
import myCaseDetails from '@/components/caseDetails/caseDetails'
import myCaseSource from '@/components/caseSource/caseSource'
import myMoreFacility from '@/components/moreFacility/moreFacility'
import myFacilityDetails from '@/components/facilityDetails/facilityDetails'
import myFacilityProfit from '@/components/facilityProfit/facilityProfit'
import myFacilitySource from '@/components/facilitySource/facilitySource'
import myLogin from '@/components/login/login'
import myForgetPassword from '@/components/forgetPassword/forgetPassword'
import myRegister from '@/components/register/register'
import myContract from '@/components/register/contract'
import myTabs from '@/components/tabs/tabs'
import myFavorite from '@/components/favorite/favorite'
import myPersonalAssets from '@/components/personalAssets/personalAssets'
import myNoAssets from '@/components/noAssets/noAssets'
import myCheckOrder from '@/components/checkOrder/checkOrder'
import myOrderHistory from '@/components/orderHistory/orderHistory'
import mySecurityCenter from '@/components/securityCenter/securityCenter'
import mySearchCase from '@/components/searchCase/searchCase'
import mySearchFacility from '@/components/searchFacility/searchFacility'
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
      path: '/facilityProfit',
      name: 'facilityProfit',
      component: myFacilityProfit
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
      path: '/contract',
      name: 'contract',
      component: myContract
    },
    {
      path: '/tabs',
      component: myTabs,
      children: [
        {
          path: '',
          redirect:"/favorite",
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
          path: '/favorite',
          name: 'favorite',
          component: myFavorite
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
        {
          path: '/checkOrder',
          name: 'checkOrder',
          component: myCheckOrder
        },
      ]
    },
    {
      path: '/searchCase',
      name: 'searchCase',
      component: mySearchCase
    },
    {
      path: '/searchFacility',
      name: 'searchFacility',
      component: mySearchFacility
    }
  ]
})
