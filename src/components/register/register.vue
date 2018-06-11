<template>
  <div>
    <div class="forget_psw_header">
      <section>
        <img src="./images/register_logo.png" alt="">
        <p>已有账号，立即<router-link to="/login" class="to_login">登录</router-link></p>
      </section>
    </div>
    <div class="forget_psw_nav">
      <div class="psw_nav_details">
        当前位置：
        <router-link to="/home" class="to_home">首页</router-link> >
        <router-link to="/login" class="to_home">登录</router-link> >
        免费注册
      </div>
    </div>
    <div class="forget_psw_body">
      <div class="forget_psw_content">

        <section class="forget_psw_sec" v-if="stepOne">
          <div class="sec_step">
            <img src="./images/register_step01.png" alt="">
            <span class="step_color">输入手机号</span>
            <span>完善信息</span>
            <span>实名认证</span>
            <span>注册成功</span>
          </div>

          <div class="sec_input">
            <ul>
              <li>
                <i></i>
                <input type="text" placeholder="请输入手机号" v-model="phone" v-validate="'required|mobile'" name='mobile'>
                <!--<span v-show="errors.has('mobile')" class="error" style="width: 200px">{{errors.first('mobile')}}</span>-->
              </li>
              <li>
                <i></i>
                <input type="text" placeholder="请输入验证码" v-model="captcha_number" v-validate="'required'" name='captcha_number'>
                <img class="img_change_img" @click="getCaptcha" :src="captcha">
                <!--<span v-show="errors.has('captcha_number')" class="error">{{errors.first('captcha_number')}}</span>-->
              </li>
              <li>
                <i></i>
                <input type="text" placeholder="请输入手机验证码" v-model="code" v-validate="'required'" name='code'>
                <div class="img_change_img get_code" @click="getCode" v-if="codeValue">获取验证码</div>
                <div class="img_change_img count_down" v-else>倒计时（{{second}}）</div>
                <!--<span v-show="errors.has('code')" class="error">{{errors.first('code')}}</span>-->
              </li>
            </ul>
          </div>
          <div class="contract">
            <input type="radio">
           <!-- <input type="radio" v-model="contract" v-validate="'required'" name='contract'>-->
            <i></i>
            <span>我已阅读并同意《服务协议》</span>
           <!-- <span v-show="errors.has('contract')" class="error">{{errors.first('contract')}}</span>-->
          </div>
          <div class="next_btn" @click="nextStep(2)"><span>下一步</span></div>
        </section>

        <section class="forget_psw_sec" v-if="stepTwo">
          <div class="sec_step">
            <img src="./images/register_step02.png" alt="">
            <span class="step_color">输入手机号</span>
            <span class="step_color">完善信息</span>
            <span>实名认证</span>
            <span>注册成功</span>
          </div>
          <div class="sec_input step_two">
            <ul>
              <li>
                <i></i>
                <input type="password" placeholder="请输入密码" v-model="password" v-validate="'required'" name='password'>
               <!-- <span v-show="errors.has('password')" class="error_password">{{errors.first('password')}}</span>-->
              </li>
              <li>
                <i></i>
                <input type="password" placeholder="请确认密码" v-model="repassword" v-validate="'required'" name='repassword'>
                <!--<span v-show="errors.has('repassword')" class="error_password">{{errors.first('repassword')}}</span>-->
              </li>
            </ul>
          </div>
          <div class="next_btn step_two_btn" @click="nextStep(3)"><span>下一步</span></div>
        </section>

        <section class="forget_psw_sec" v-if="stepThree">
          <div class="sec_step">
            <img src="./images/register_step03.png" alt="">
            <span class="step_color">输入手机号</span>
            <span class="step_color">完善信息</span>
            <span class="step_color">实名认证</span>
            <span>注册成功</span>
          </div>
          <div class="sec_input step_three_icon">
            <ul>
              <li>
                <i></i>
                <input type="text" placeholder="请输入姓名" v-model="realname">
              </li>
              <li>
                <i></i>
                <input type="text" placeholder="请确认身份证号" v-model="idcard">
              </li>
            </ul>
          </div>
          <div class="next_btn skip_btn" @click="skipToStep"><span>跳过</span></div>
          <div class="next_btn step_two_btn skip_btn_next" @click="nextStep(4)"><span>下一步</span></div>
        </section>

        <section class="forget_psw_sec" v-if="stepFour">
          <div class="sec_step">
            <img src="./images/register_step04.png" alt="">
            <span class="step_color">输入手机号</span>
            <span class="step_color">完善信息</span>
            <span class="step_color">实名认证</span>
            <span class="step_color">注册成功</span>
          </div>
          <img src="./images/success.png" class="sc_bg" alt="">
          <div class="success_to_home">
            <router-link to="/home"></router-link>
          </div>
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
        second:5, //发送验证码倒计时
        stepOne:true,
        stepTwo:false,
        stepThree:false,
        stepFour:false,
        phone:"", //手机号
        captcha_number:"", //图形验证码
        captcha_id:"", //图形验证码--ID
        captcha:"../login/images/code.png", //图形验证码--图片
        code:"", //短信验证码
        password:"", //密码
        repassword:"", //重复密码
        realname:"", //姓名
        idcard:"" //身份证号
      };
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
            type:1 //1-注册，2-修改密码, 3-登录
          })
        }).then(res => {
          console.log(res)
        }).catch(error => {
          console.log(error);
        })
      },
      nextStep(id){
        if (id == 2){

        /*  this.$validator.validateAll().then((result)=>{
            if(result){

            }
          })*/

          //进入下一步
          this.stepTwo = true;
          this.stepOne = false;

        } else if(id == 3){

          let regFormData = {
            phone:"+86"+this.phone, //手机号
            captcha_number: this.captcha_number, //图形验证码
            captcha_id: this.captcha_id, //图形验证码ID
            code: this.code, //短信验证码
            password: this.password, //密码
            repassword: this.repassword, //重复密码
            device_id:this.uuid, //设备ID
            platform:1
          };

         /* this.$validator.validateAll().then((result)=>{
            if(result){

            }
          })*/

          axios({
            method: 'post',
            url: `${baseURL}/v1/users`,
            data: querystring.stringify(regFormData)
          }).then(res => {
            sessionStorage.setItem("regInfo",JSON.stringify(res.data));
            //进入下一步
            this.stepOne = false;
            this.stepTwo = false;
            this.stepThree = true;
          }).catch(error => {
            console.log(error);

            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
            console.log('Error', error.message);
            console.log(error.config);

          });
        }else {

          let authFormData = {
            type:1, //1-实名认证，2-人像认证
            realname: this.realname, //姓名
            idcard: this.idcard, //身份证号
          };


          let regInfo = JSON.parse(sessionStorage.getItem("regInfo"));

          console.log(regInfo.user._id)

          axios({
            method: 'post',
            url: `${baseURL}/v1/users/${regInfo.user._id}/authentication`,
            data: querystring.stringify(authFormData)
          }).then(res => {

            console.log(res)

            //进入下一步
            this.stepOne = false;
            this.stepTwo = false;
            this.stepThree = false;
            this.stepFour = true;
          }).catch(error => {
            console.log(error);
          });
        }
      },
      skipToStep(){
        this.stepOne = false;
        this.stepTwo = false;
        this.stepThree = false;
        this.stepFour = true;
      }

    },
  /*  mounted:{
     /!* getPhoneCode(){

      }*!/
    }*/
/*    created() {
    },

    watch(){

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
    width: 520px;
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
    margin-left: 66px;
    margin-right: 74px;
  }
  .sec_step span:nth-child(4){
    margin-right: 74px;
  }
  .sec_input{
    margin-top: 92px;
    margin-left: 68px;
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
    margin-left: 68px;
    position: relative;
    top: 50px;
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
    background: url("../forgetPassword/images/passw_2.png") no-repeat center;
    background-size: 100% 100%;
    position: relative;
    margin: 7px 10px;
  }
  .step_two input{
    top: -14px !important;
  }
  .step_three p{
    font-size: 22px;
    color: #222222;
    margin:26px;
  }
  .step_two_btn{
    top:149px;
  }
  .step_two_three{
    top: 38px;
  }
  .contract{
    font-size: 14px;
    color: #999999;
    width: 380px;
    margin-top: 36px;
    margin-left: 128px;
  }
  .contract span{
    position: relative;
    bottom: 5px;
    left: 6px;
  }
  .contract input{
    width: 22px;
    height: 22px;
    position: relative;
    left: 26px;
    opacity: 0;
    z-index: 10;
    cursor: pointer;
  }
  .contract i{
    width: 22px;
    height: 22px;
    display: inline-block;
    background: url("./images/w_guo.png") no-repeat center;
    background-size: 100% 100%;
    position: relative;
  }
  .contract input:checked +i{
    background: url("./images/guo.png") no-repeat center;
    background-size: 100% 100%;
  }
  .step_three_icon li:nth-child(1) i{
    width: 20px;
    height: 24px;
    background: url("../login/images/id.png") no-repeat center;
    background-size: 100% 100%;
    position: relative;
    margin: 7px 10px;
  }
  .step_three_icon li:nth-child(2) i{
    width: 20px;
    height: 18px;
    background: url("./images/identity.png") no-repeat center;
    background-size: 100% 100%;
    position: relative;
    margin: 10px;
  }
  .step_three_icon li:nth-child(1) input{
    top: -12px;
  }
  .step_three_icon li:nth-child(2) input{
    top: -13px;
  }
  .skip_btn{
    width: 380px;
    height: 41px;
    border: solid 1px #c7361e;
    background-color: #ffffff;
    color: #c7361e;
    top:91px;
  }
  .skip_btn_next{
    top:106px;
  }
  .sc_bg{
    margin-left: 80px;
    margin-top: 60px;
  }
  .success_to_home a{
    width: 180px;
    height: 50px;
    display: inline-block;
    position: relative;
    bottom: 138px;
    left: 174px;
  }
  .error{
    position: relative;
    bottom: 36px;
    left: 390px;
    color: #c6351e;
    display: inline-block;
  }
  .error_password{
    position: relative;
    bottom: 14px;
    left: 194px;
    color: #c6351e;
    display: inline-block;
  }
</style>
