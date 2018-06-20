<template>
  <div id="app">
    <div class="head-wrap">
      <div class="head">
        <a href="/">欢迎来到 可信链 ！</a>
        <div class="no_login" v-if="">
          <a href="#/login">请登录</a>
          <a href="#/register">免费注册</a>
        </div>
        <div class="login" v-if=""  @mouseleave="leaveUl">
          <div @click.capture="toggle">111111 <img src="./down.png" alt=""></div>
          <ul v-if="switchover">
            <li><a href="#/personalAssets">个人中心</a></li>
            <li><a href="#/securityCenter">安全中心</a></li>
            <li @click="dropOut">退出</li>
          </ul>
        </div>
        
      </div>
    </div>
    <div class="main_wrap">
      <router-view class="main" v-if="isRouterAlive"></router-view>
    </div>
    <div class="footer-wrap">
      <div class="footer">
        <div class="ft-box">
          <img class="ft_logo" src="./common/images/logo_footer.png" alt="log">
        </div>
        <div class="ft-box">
          <span>资产服务</span>
          <ul class="text">
            <li><a href="javascript:void(0)">维修案例</a></li>
            <li><a href="javascript:void(0)">维修设备</a></li>
            <li><a href="javascript:void(0)">汽车资产</a></li>
            <li><a href="javascript:void(0)">汽车零部件</a></li>
          </ul>
        </div>
        <div class="ft-box">
          <ul class="code">
            <li>
              <a href="javascript:void(0)">
                <img class="ft_code" src="./common/images/Android.png" alt="Android">
                <p>Android版</p>
              </a>
            </li>
            <li>
              <a href="javascript:void(0)">
                <img class="ft_code" src="./common/images/IOS.png" alt="IOS">
                <p>IOS版</p>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import "./common/stylus/index.styl";
  import {baseURL, cardURL} from '@/common/js/public.js';
  import axios from "axios";
  
  export default {
    name: 'App',
    provide() {
      return {
        reload: this.reload
      }
    },
    data() {
      return {
        isRouterAlive: true,
        switchover:false,
      }
    },
    computed: {
      login:function(){
        return this.$store.state.isLogin
      },
      userName(){
        if(JSON.parse(sessionStorage.getItem("loginInfo"))){
          return JSON.parse(sessionStorage.getItem("loginInfo")).user_id.substr(3,3)+"***"+JSON.parse(sessionStorage.getItem("loginInfo")).user_id.substr(10,4)
        }else{
          return ""
        }
      }
    },
    watch: {
      login:function () {
      }
    },
    methods: {
      reload() {
        this.isRouterAlive = false;
        this.$nextTick(() => {
          this.isRouterAlive = true
        })
      },
      dropOut(command){
      },
      toggle(){this.switchover=!this.switchover},
      leaveUl(){this.switchover=false},
      acquireUserInfo(){
        axios({
          method: "GET",
          url: `${baseURL}/v1/users/${this.userId}`,
          headers: {
            "Content-Type": "application/json",
          }
        }).then((res) => {
          this.userName=res.data.phone.substr(3,3)+"***"+res.data.phone.substr(10,4);
          return this.userName
        }).catch((err) => {
          console.log(err);
        });
      },
      getIsLogin(val){
        this.$store.commit("changeIsLogin",val);
      },
    }
  }
</script>

<style lang="stylus">
  #app {
    /*min-height: 100vh;*/
    display: flex;
    flex-direction: column;
  }
  
  .head-wrap {
    width: 100%;
    min-width 1212px
    height: 34px;
    background-color: #e5e5e5;
    z-index:9999;
    .head {
      box-sizing: border-box
      width: 1212px;
      margin: 0 auto;
      text-align right
      line-height 34px
      a {
        color: #666666;
      }
      .no_login{
        display inline-block
        width 160px
        a{
          margin-left 28px
          color: #666666;
        }
      }
      .login{
        display inline-block
        cursor pointer
        width 160px
        position relative
        ul{
          background-color #ffffff
          position absolute
          top 34
          right 0
          text-align center
          width 86px
          color #666666
          li:hover{
            color #c6351e
            a{
              color #c6351e
            }
          }
        }
      }
    }
  }
  
  .main_wrap {
    flex: 1;
    box-sizing: border-box;
    margin: 0 auto;
    width 100%
    min-width 1212px
    background-color #f3f3f3
  }
  
  .footer-wrap {
    width 100%
    min-width 1212px
    background-color: #272324;
    .footer {
      box-sizing: border-box
      width 1212px
      height 156px
      margin 0 auto
      font-size 0
      text-align center
      .ft-box {
        display inline-block
        font-size 16px
        vertical-align top
        margin-right 66px
        .ft_logo {
          margin-top 38px
        }
        span {
          padding-top 45px
          display block
          color #ffffff
          text-align left
        }
        .text {
          font-size 0
          li {
            padding-top 25px
            display inline-block
            font-size 14px
            margin-right 77px
            a {
              color #ffffff
            }
          }
          li:last-child {
            margin-right 0
          }
        }
        .code {
          font-size 0
          li {
            padding 30px 16px 0
            display inline-block
            font-size 14px
            a {
              color #ffffff
              p {
                font-size 16px
                color #ffffff
                padding-top 14px
              }
            }
          }
        }
      }
      .ft-box:last-child {
        margin-right -16px
      }
    }
  }
</style>
