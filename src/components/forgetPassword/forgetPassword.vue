<template>
  <div>
    <div class="forget_psw_header">
      <section>
        <img src="./images/forget_psw_logo.png" alt="">
        <p>已有账号，立即<router-link to="/login" class="to_login">登录</router-link></p>
      </section>
    </div>
    <div class="forget_psw_nav">
       <div class="psw_nav_details">
          当前位置：<router-link to="/home" class="to_home">首页</router-link> > 找回密码
       </div>
    </div>
    <div class="forget_psw_body">
      <div class="forget_psw_content">

        <section class="forget_psw_sec" v-if="stepOne">
          <div class="sec_step">
            <img src="./images/forget_psw_step01.png" alt="">
            <span class="step_color">输入手机号</span>
            <span>设置新密码</span>
            <span>修改成功</span>
          </div>
          <div class="sec_input">
            <ul>
              <li>
                <i></i>
                <input type="text" placeholder="请输入手机号" v-model="phone">
              </li>
              <li>
                <i></i>
                <input type="text" placeholder="请输入验证码" v-model="captcha_number">
                <img class="img_change_img" @click="getCaptcha" :src="captcha">
              </li>
              <li>
                <i></i>
                <input type="text" placeholder="请输入手机验证码" v-model="code">
                <div class="img_change_img get_code" @click="getCode" v-if="codeValue">获取验证码</div>
                <div class="img_change_img count_down" v-else>倒计时（{{second}}）</div>
              </li>
            </ul>
          </div>
          <div class="next_btn" @click="nextStep(2)"><span>下一步</span></div>
        </section>

        <section class="forget_psw_sec" v-if="stepTwo">
          <div class="sec_step">
            <img src="./images/forget_psw_step02.png" alt="">
            <span class="step_color">输入手机号</span>
            <span class="step_color">设置新密码</span>
            <span>修改成功</span>
          </div>
          <div class="sec_input step_two">
            <ul>
              <li>
                <i></i>
                <input type="password" placeholder="请输入新密码" v-model="newpwd">
              </li>
              <li>
                <i></i>
                <input type="password" placeholder="请确认新密码" v-model="renew">
              </li>
            </ul>
          </div>
          <div class="next_btn step_two_btn" @click="nextStep()"><span>下一步</span></div>
        </section>

        <section class="forget_psw_sec" v-if="stepThree">
          <div class="sec_step">
            <img src="./images/forget_psw_step03.png" alt="">
            <span class="step_color">输入手机号</span>
            <span class="step_color">设置新密码</span>
            <span class="step_color">修改成功</span>
          </div>
          <div class="step_three">
            <img src="./images/sc.png" alt="">
            <p>新密码设置成功</p>
          </div>
          <div class="title">
            <span class="caption"><span class="line line-l"></span>请牢记您的密码<span class="line line-r"></span></span>
          </div>
          <div class="next_btn step_two_three"><router-link to="/home">返回首页</router-link></div>
        </section>


      </div>
    </div>



  </div>
</template>

<script>
  import axios from "axios";
  import {baseURL} from '@/common/js/public.js';
  const querystring = require('querystring');

  export default{
    data(){
      return {
        codeValue:true,
        second:5,// 发送验证码倒计时
        stepOne:true,
        stepTwo:false,
        stepThree:false,
        phone:"", //手机号
        captcha_number:"", //图形验证码
        captcha_id:"", //图形验证码--ID
        captcha:"../login/images/code.png", //图形验证码--图片
        code:"", //短信验证码
        newpwd:"", //新密码
        renew:"", //新密码
      };
    },
    computed:{
      uuid() {
        var s = [];
        var hexDigits = "0123456789abcdef";
        for (var i = 0; i < 36; i++) {
          s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
        }
        s[14] = "4";  // bits 12-15 of the time_hi_and_version field to 0010
        s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1);  // bits 6-7 of the clock_seq_hi_and_reserved to 01
        s[8] = s[13] = s[18] = s[23] = "-";

        var uuid = s.join("");
        return uuid;
      }
    },
    mounted: function() {
      //这个是钩子函数
      //如果getCaptcha函数要执行，必须先执行钩子函数
      //这个钩子函数完成了对getCaptcha函数的调用
      //应该注意的是，使用mounted 并不能保证钩子函数中的 this.$el 在 document 中。为此还应该引入Vue.nextTick/vm.$nextTick
      this.$nextTick( ()=> {
        this.getCaptcha()
      })
    },
    methods: {
      //获取图片验证码--图片
      getCaptcha(){
        axios({
          method: 'post',
          url: `${baseURL}/v1/captcha`,
          data: querystring.stringify({})
        }).then(res => {
          this.captcha = `data:image/png;base64,${res.data.png}`;
          this.captcha_id =res.data.captcha_id;
        }).catch(error => {
          console.log(error);
        });
      },
      //获取短信验证码
      getCode() {
        //倒计时
        let me = this;
        me.codeValue = false;
        let interval = window.setInterval(function() {
          if ((me.second--) <= 0) {
            me.second = 5;
            me.codeValue = true;
            window.clearInterval(interval);
          }
        }, 1000);
        //get短信验证码
        axios({
          method: 'post',
          url: `${baseURL}/v1/sms/code`,
          data: querystring.stringify({
            phone:"+86"+this.phone, //手机号
            type:2 //1-注册，2-修改密码, 3-登录
          })
        }).then(res => {
          console.log(res)
        }).catch(error => {
          console.log(error);
        })
      },
      nextStep(id){
        if (id){
          this.stepTwo = true;
          this.stepOne = false;
        } else{
          let loginFormData = {
            phone:"+86"+this.phone, //手机号
            captcha_number: this.captcha_number, //图形验证码
            captcha_id: this.captcha_id, //图形验证码--ID
            code: this.code, //短信验证码
            new: this.newpwd, //新密码
            renew: this.renew, //新密码
          };
          axios({
            method: 'post',
            url: `${baseURL}/v1/phones/${loginFormData.phone}/password`,
            data: querystring.stringify(loginFormData)
          }).then(res => {

            console.log(res)
            //进入下一步
            this.stepTwo = false;
            this.stepThree = true;
          }).catch(error => {
            console.log(error);
          });



        }
      }

    }



    /*components: {
     'other-component': OtherComponent, HeaderComponent
     }*/
  }
</script>
<style scoped>
  .forget_psw_header{
    height:130px;
    background-color: #f3f3f3;
    width:100%;
  }
  .forget_psw_header section{
    width:1212px;
    margin:0 auto;
    padding-top: 36px;
  }
  .forget_psw_header section p{
    float: right;
    margin-top: 42px;
    font-size: 16px;
    color: #222222;
  }
  .to_login{
    color: #c6351e;
  }
  .forget_psw_nav{
    width: 100%;
    height: 40px;
    background-color: #7d7d7d;
    font-size: 20px;
    color: #ffffff;
  }
  .to_home{
    color: #ffffff;
  }
  .psw_nav_details{
    width:1212px;
    margin: 0 auto;
    line-height: 40px;
  }
  .forget_psw_body{
    background-color: #f3f3f3;
    width:100%;
    height:714px;
  }
  .forget_psw_content{
    width: 1212px;
    height: 645px;
    background-color: #ffffff;
    margin:0 auto;
    position: relative;
    top:34px;
  }
  .forget_psw_sec{
    height:90px;
    width: 450px;
    margin:0 auto;
    padding-top: 74px;
  }
  .sec_step span{
    font-size: 16px;
    color: #7d7d7d;
    margin-top: 30px;
    display: inline-block;
  }
  .step_color{
    color: #c6351e !important;
  }
  .sec_step span:nth-child(3){
    margin-left: 82px;
    margin-right: 114px;
  }
  .sec_input{
    margin-top: 92px;
    margin-left: 28px;
  }
  .sec_input li{
    width: 380px;
    height: 40px;
    background-color: #f3f3f3;
    margin-bottom: 15px;
  }
  .sec_input li input{
    background-color: #f3f3f3;
    height: 24px;
    width: 150px;
    outline: none;
    position: relative;
    bottom: 17px;
  }
  .sec_input li:nth-child(1) input{
    position: relative;
    top: -16px;
  }
  .sec_input li:nth-child(1) i{
    width: 19px;
    height: 28px;
    display: inline-block;
    background: url("../login/images/phone.png") no-repeat center;
    background-size: 100% 100%;
    position: relative;
    margin: 6px 10.5px;
  }
  .sec_input li:nth-child(2) i{
    width: 20px;
    height: 21px;
    display: inline-block;
    background: url("../login/images/yanzheng.png") no-repeat center;
    background-size: 100% 100%;
    position: relative;
    margin: 10px 10px;
  }
  .sec_input li:nth-child(3) i{
    width: 20px;
    height: 21px;
    display: inline-block;
    background: url("../login/images/yanzheng.png") no-repeat center;
    background-size: 100% 100%;
    position: relative;
    margin: 10px 10px;
  }
  .img_change_img{
    width: 100px !important;
    height: 33px !important;
    float: right !important;
    margin: 4px 10px;
    cursor: pointer;
  }
  .get_code{
    border: solid 1px #c7361e;
    font-size: 14px;
    color: #c7361e;
    text-align: center;
    line-height: 35px;
    margin-top: 2px;
  }
  .count_down{
    background-color: #7d7d7d;
    font-size: 14px;
    color: #ffffff;
    text-align: center;
    line-height: 33px;
    margin-top: 3px;
  }
  .next_btn{
    width: 380px;
    height: 40px;
    background-color: #c7361e;
    font-size: 18px;
    color: #ffffff;
    text-align: center;
    line-height: 40px;
    cursor: pointer;
    margin-left: 28px;
    position: relative;
    top: 96px;
  }
  .next_btn a{
    color: #ffffff;
  }
  .step_two li:nth-child(1) i{
    width: 20px;
    height: 25px;
    background: url("../login/images/passwoer.png") no-repeat center;
    background-size: 100% 100%;
    position: relative;
    margin: 7px 10px;
  }
  .step_two li:nth-child(2) i{
    width: 20px;
    height: 25px;
    background: url("./images/passw_2.png") no-repeat center;
    background-size: 100% 100%;
    position: relative;
    margin: 7px 10px;
  }
  .step_two input{
    top: -14px !important;
  }
  .step_three {
    margin-top: 60px;
    text-align: center;
  }
  .step_three p{
    font-size: 22px;
    color: #222222;
    margin:26px;
  }
  .step_two_btn{
    top:151px;
  }
  .step_two_three{
    top: 38px;
  }
  .title { position: relative;  font-size: 16px; line-height: 24px; text-align: center; color: #999; overflow: hidden;}
  .title .caption { position: relative; display: inline-block; }
  .title .caption .line { position: absolute; top: 11px; width: 40px; height: 1px; background-color: #bfbfbf; }
  .title .caption .line-l { right: 100%; margin-right: 10px; }
  .title .caption .line-r { left: 100%; margin-left: 10px; }
</style>
