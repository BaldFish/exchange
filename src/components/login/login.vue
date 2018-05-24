<template>
    <div class="login-container">
        <div class="login-header">
            <div class="login-header-cont">
              <img src="./images/login_header.png" alt="">
            </div>
        </div>
        <div class="login-content">
            <div class="content-mid">
              <img src="./images/login_content.png" alt="">
              <div class="content-right">
                <div class="right-details">
                  <ul class="content-nav">
                    <li @click="tabChange" :class="{'nav-avtive': loginWay,'nav-unavtive': !loginWay}">账户登陆</li>
                    <li @click="tabChange" :class="{'nav-avtive': !loginWay,'nav-unavtive':loginWay }">手机登录</li>
                  </ul>
                  <section class="account-login" v-if="loginWay">
                    <ul>
                      <li>
                        <i></i>
                        <input type="text" placeholder="请输入账号">
                      </li>
                      <li>
                        <i></i>
                        <input type="password" placeholder="请输入密码">
                      </li>
                      <li>
                        <i></i>
                        <input type="text" placeholder="请输入验证码">
                        <img class="img_change_img" src="./images/code.png">
                      </li>
                    </ul>
                  </section>
                  <section class="account-login phone-login" v-else>
                    <ul>
                      <li>
                        <i></i>
                        <input type="text" placeholder="请输入手机号">
                      </li>
                      <li>
                        <i></i>
                        <input type="text" placeholder="请输入验证码">
                        <img class="img_change_img" src="./images/code.png">
                      </li>
                      <li>
                        <i></i>
                        <input type="text" placeholder="请输入手机验证码">
                        <div class="img_change_img get_code" @click="getCode" v-if="codeValue">获取验证码</div>
                        <div class="img_change_img count_down" v-else>倒计时（{{second}}）</div>
                      </li>
                    </ul>
                  </section>

                  <router-link to="" class="to_forget"><p>忘记密码？</p></router-link>
                  <router-link to="" class="to_login"><span>登录</span></router-link>
                  <router-link to="" class="to_register"><p>还没有账号，立即注册</p></router-link>


                </div>
              </div>
            </div>
        </div>
    </div>
</template>

<script>

    export default{
        data(){
          return {
            loginWay: true,
            codeValue:true,
            second:5,// 发送验证码倒计时

          };
        },
        computed:{

        },
        methods: {
          tabChange(){
            this.loginWay = !this.loginWay
          },
          getCode() {
            let me = this;
            me.codeValue = false;
            let interval = window.setInterval(function() {
              if ((me.second--) <= 0) {
                me.second = 5;
                me.codeValue = true;
                window.clearInterval(interval);
              }
            }, 1000);
          },


        }



        /*components: {
            'other-component': OtherComponent, HeaderComponent
        }*/
    }
</script>
<style scoped>
  .login-header{
    width:100%;
    height:122px;
    background-color: #f3f3f3;
    border-bottom: 4px solid #c7361e;
  }
  .login-header-cont{
    width: 1200px;
    margin: 0 auto;
    height: 100%;
  }
  .login-header-cont img{
    width:280px;
    height:58px;
    display: inline-block;
    margin-top: 34px;
  }
  .login-content{
    background: url("./images/login_bg.png") no-repeat center;
    background-size: 100% 100%;
    height: 765px;
  }
  .content-mid{
    width: 876px;
    height: 480px;
    padding-top: 121px;
    padding-left: 306px;
  }
  .content-mid img{
    width: 370px;
    height: 480px;
    float: left;
    z-index: 10;
    position: relative;
  }
  .content-right{
    width: 506px;
    height: 414px;
    background-color: #ffffff;
    float: left;
    margin-top: 32px;
    margin-left: -28px;
    z-index: 5;
  }
  .right-details{
    margin-top: 36px;
    margin-left: 62px;
  }
  .content-nav{
    height:48px;
    margin-bottom: 20px;
  }
  .content-nav li{
    font-size: 20px;
    color: #222222;
    height:44px;
    width:190px;
    float: left;
    text-align: center;
    border-bottom: 4px solid #313131;
    cursor: pointer;
  }
  .nav-avtive{
    color: #c7361e !important;
    border-bottom: 4px solid #c7361e !important;
  }
  .nav-unavtive{
    color: #222222;
    border-bottom: 4px solid #313131;
  }
  .account-login li{
    width: 380px;
    height: 40px;
    background-color: #f3f3f3;
    margin-bottom: 16px;
  }
  .account-login li input{
    background-color: #f3f3f3;
    height: 24px;
    width: 235px;
    outline: none;
    position: relative;
    bottom: 17px;
  }
  .account-login li:nth-child(3) input{
    width:150px;
  }
  .account-login li:nth-child(2) input{
    bottom: 15px;
  }
  .account-login li:nth-child(1) input{
    bottom: 14px;
  }
  .account-login li:nth-child(1) i{
    width: 20px;
    height: 24px;
    display: inline-block;
    background: url("./images/id.png") no-repeat center;
    background-size: 100% 100%;
    position: relative;
    margin: 7px 10px;
  }
  .account-login li:nth-child(2) i{
    width: 20px;
    height: 25px;
    display: inline-block;
    background: url("./images/passwoer.png") no-repeat center;
    background-size: 100% 100%;
    position: relative;
    margin: 7px 10px;
  }
  .account-login li:nth-child(3) i{
    width: 20px;
    height: 21px;
    display: inline-block;
    background: url("./images/yanzheng.png") no-repeat center;
    background-size: 100% 100%;
    position: relative;
    margin: 10px 10px;
  }
  .img_change_img{
    width: 100px !important;
    height: 33px !important;
    float: right !important;
    margin: 3px 10px;
    cursor: pointer;
  }
  .to_forget p{
    width: 388px;
    text-align: right;
    margin-top: -5px;
    font-size: 16px;
    color: #666;
    margin-bottom: 28px;
  }
  .to_login span{
    font-size: 18px;
    color: #ffffff;
    text-align: center;
    width: 380px;
    height: 40px;
    line-height: 40px;
    background-color: #c7361e;
    display: inline-block;
    margin-bottom: 12px;
  }
  .to_register p{
    width: 380px;
    text-align: center;
    font-size: 16px;
    color: #666666;
  }
  .phone-login li:nth-child(1) i{
    width: 19px;
    height: 28px;
    background: url("./images/phone.png") no-repeat center;
    background-size: 100% 100%;
    bottom: 1px;
  }
  .phone-login li:nth-child(2) i{
    width: 20px;
    height: 21px;
    background: url("./images/yanzheng.png") no-repeat center;
    background-size: 100% 100%;
    top: 3px;
  }
  .phone-login li:nth-child(1) input{
    bottom: 17px;
  }
  .phone-login li:nth-child(2) input{
    width:150px;
    bottom: 10px;
  }
  .get_code{
    border: solid 1px #c7361e;
    font-size: 14px;
    color: #c7361e;
    text-align: center;
    line-height: 35px;
  }
  .count_down{
    background-color: #7d7d7d;
    font-size: 14px;
    color: #ffffff;
    text-align: center;
    line-height: 33px;
  }
</style>
