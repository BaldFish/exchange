<template>
  <div class="nav_content">

    <div class="nav_content_title">
      <span>安全中心</span>
      <span>建议您启动全部安全设置，以保障账户及资金安全</span>
    </div>

    <div class="nav_content_table">
      <table>
        <tbody>
        <tr>
          <td><img src="./images/adopt.png" alt=""></td>
          <td>登录密码</td>
          <td>互联网账号存在被盗风险，建议您定期更改密码以保护账户安全</td>
          <td @click="modifyPassword = true">修改</td>
        </tr>
        <tr>
          <td><img src="./images/adopt.png" alt=""></td>
          <td>手机验证</td>
          <td>您验证的手机： {{phone}}    若已丢失或停用，请立即更换，避免账户被盗</td>
          <td @click="openPhoneModal">修改</td>
        </tr>
        <tr>
          <td :class="{'class-a': userInfo.authentication == 2, 'class-b': userInfo.authentication == 1}">
            <span></span>
          </td>
          <td>实名认证</td>
          <td>用于提升账号的安全性和信任级别</td>
          <td v-if="userInfo.authentication == 2">已认证</td>
          <td v-else @click="realNameAuthentication = true" class="red_set">设置</td>
        </tr>
        <tr v-if="!userInfo.wallet_address">
          <td><img src="./images/not.png" alt=""></td>
          <td>钱包地址</td>
          <td>绑定您的钱包地址后，可信币才能显示出来</td>
          <td class="red_set" @click="dialogFormVisible = true">设置</td>
        </tr>
        <tr v-else>
          <td><img src="./images/adopt.png" alt=""></td>
          <td>钱包地址</td>
          <td>钱包地址：{{userInfo.wallet_address}}</td>
          <td @click="dialogFormVisible2 = true">修改</td>
        </tr>
        </tbody>
      </table>
    </div>

    <div class="safe_dialog">

      <el-dialog title="修改登录密码" :visible.sync="modifyPassword">
        <el-form :model="formPwd">
          <el-form-item label="旧密码" :label-width="formLabelWidth">
            <el-input v-model="formPwd.old" auto-complete="off" type="password"></el-input>
          </el-form-item>
          <el-form-item label="新密码" :label-width="formLabelWidth">
            <el-input v-model="formPwd.new" auto-complete="off" type="password"></el-input>
          </el-form-item>
          <el-form-item label="重复密码" :label-width="formLabelWidth">
            <el-input v-model="formPwd.renew" auto-complete="off" type="password"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <button @click="submitPwd">确认</button>
          <button class="forget_btn" @click="modifyPassword = false">
            <router-link to="/forgetPassword">忘记密码</router-link>
          </button>
        </div>
      </el-dialog>

      <el-dialog title="实名认证" :visible.sync="realNameAuthentication" class="auth_box">
        <div class="auth_title">
          <img src="./images/not.png" alt="">
          <p class="title_p1">您还未认证</p>
          <p class="title_p2">认证后，可提升账号安全等级，进行账号申诉等操作</p>
        </div>
        <div style="clear: both"></div>
        <el-form :model="formAuth">
          <el-form-item label="证件类型：" :label-width="formLabelWidth" class="first_label">
            <span>身份证</span>
          </el-form-item>
          <el-form-item label="真实姓名" :label-width="formLabelWidth">
            <el-input v-model="formAuth.realname" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="身份证号" :label-width="formLabelWidth">
            <el-input v-model="formAuth.idcard" auto-complete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <button @click="submitAuth">提交</button>
        </div>
      </el-dialog>

      <el-dialog title="修改绑定手机" :visible.sync="phoneVerification">
        <el-form :model="formPhone">
          <div v-if="bindPhone">
            <el-form-item label="绑定手机：" :label-width="formLabelWidth" class="first_label">
              <span>{{phone}}</span>
            </el-form-item>
            <el-form-item label="图形验证码" :label-width="formLabelWidth">
              <el-input auto-complete="off"></el-input>
              <img :src="captcha" @click="getCaptcha" alt="">
            </el-form-item>
            <el-form-item label="短信验证码" :label-width="formLabelWidth">
              <el-input v-model="formPhone.code" auto-complete="off"></el-input>
              <button type="button" @click="getCode(1)" class="send_btn">发送</button>
            </el-form-item>

            <div slot="footer" class="dialog-footer padding_phone">
              <button @click="nextStep">下一步</button>
            </div>
          </div>
          <div v-else>
            <el-form-item label="新手机号" :label-width="formLabelWidth">
              <el-input v-model="inputPhone" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="图形验证码" :label-width="formLabelWidth">
              <el-input v-model="formPhone.captcha_number" auto-complete="off"></el-input>
              <img :src="captcha" @click="getCaptcha" alt="">
            </el-form-item>
            <el-form-item label="短信验证码" :label-width="formLabelWidth">
              <el-input v-model="formPhone.new_code" auto-complete="off"></el-input>
              <button type="button" @click="getCode(2)" class="send_btn">发送</button>
            </el-form-item>

            <div slot="footer" class="dialog-footer padding_phone">
              <button @click="submitPhone">提交</button>
            </div>
          </div>
        </el-form>
      </el-dialog>

      <el-dialog title="绑定钱包地址" :visible.sync="dialogFormVisible">
        <el-form :model="formBindWallet">
          <el-form-item label="请输入钱包地址" :label-width="formLabelWidth">
            <el-input v-model="formBindWallet.wallet_address" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="验证码" :label-width="formLabelWidth">
            <el-input v-model="formBindWallet.captcha_number" auto-complete="off"></el-input>
            <img :src="captcha" @click="getCaptcha" alt="">
          </el-form-item>
        </el-form>

        <div slot="footer" class="dialog-footer">
          <button @click="sunmitBindWallet">提交</button>
        </div>
      </el-dialog>

      <el-dialog title="修改钱包地址" :visible.sync="dialogFormVisible2">
        <el-form :model="formBindWallet">
          <el-form-item label="请输入钱包地址" :label-width="formLabelWidth">
            <el-input v-model="formBindWallet.wallet_address" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="验证码" :label-width="formLabelWidth">
            <el-input v-model="formBindWallet.captcha_number" auto-complete="off"></el-input>
            <img :src="captcha" @click="getCaptcha" alt="">
          </el-form-item>
        </el-form>

        <div slot="footer" class="dialog-footer">
          <button @click="sunmitInputWallet">提交</button>
        </div>
      </el-dialog>
    </div>


  </div>
</template>

<script>
  import myTopSearch from "../topSearch/topSearch";
  import axios from "axios";
  import {baseURL} from '@/common/js/public.js';
  const querystring = require('querystring');

  export default{
    inject:['reload'],
    name: "securityCenter",
    data(){
      return {
        dialogFormVisible: false,
        dialogFormVisible2: false,
        phoneVerification: false,
        modifyPassword: false,
        realNameAuthentication: false,
        bindPhone:true,
        captcha:"./images/code.png", //图形验证码--图片
        phone:'',
        inputPhone:'',
        userInfo:'',
        formPwd: {
          old:'',
          new:'',
          renew:''
        },
        formAuth: {
          type:1,
          realname: '',
          idcard:''
        },
        formPhone:{
          phone: '',
          code:'',
          new_phone:'',
          new_code:'',
          captcha_id:'',
          captcha_number:''
        },
        formBindWallet: {
          wallet_address:'',
          captcha_id:'',
          captcha_number:''
        },
        formInputWallet: {
          wallet_address:'',
          captcha_id:'',
          captcha_number:''
        },
        formLabelWidth: '120px',
      }
    },
    mounted: function() {
      let loginInfo = JSON.parse(sessionStorage.getItem("loginInfo"));
      axios({
        method: 'get',
        url: `${baseURL}/v1/users/${loginInfo.user_id}`,
      }).then(res => {
        this.userInfo = res.data;
        sessionStorage.setItem("userInfo",JSON.stringify(res.data));
        this.phone = `${res.data.phone.substring(3,6)}*****${res.data.phone.substring(11,14)}`
      }).catch(error => {
        console.log(error);
      });
    },
    methods: {
      //修改密码
      submitPwd(){
        axios({
          method: 'put',
          url: `${baseURL}/v1/users/${this.userInfo._id}/password`,
          data: querystring.stringify(this.formPwd)
        }).then(res => {
          console.log(res);
          this.modifyPassword = false
        }).catch(error => {
          console.log(error);
        });
      },
      //用户认证
      submitAuth(){
        axios({
          method: 'post',
          url: `${baseURL}/v1/users/${this.userInfo._id}/authentication`,
          data: querystring.stringify(this.formAuth)
        }).then(res => {
          console.log(res);
          this.userInfo.authentication = 2;
          this.realNameAuthentication = false
        }).catch(error => {
          console.log(error);
        });
      },
      //获取图片验证码--图片
      getCaptcha(){
        axios({
          method: 'post',
          url: `${baseURL}/v1/captcha`,
          data: querystring.stringify({})
        }).then(res => {
          this.captcha = `data:image/png;base64,${res.data.png}`;
          this.formPhone.captcha_id =res.data.captcha_id;
        }).catch(error => {
          console.log(error);
        });
      },
      //获取短信验证码
      getCode(id) {
        let phoneNum ="";
        if(id == 1){
          phoneNum = this.userInfo.phone
        }else{
          phoneNum = '+86'+this.inputPhone
        }
        axios({
          method: 'post',
          url: `${baseURL}/v1/sms/code`,
          data: querystring.stringify({
            phone: phoneNum, //手机号
            type:3 //1-注册，2-修改密码, 3-登录
          })
        }).then(res => {
          console.log(res)
        }).catch(error => {
          console.log(error);
        })
      },
      //修改绑定手机
      openPhoneModal(){
        this.phoneVerification = true;
        this.bindPhone =  true;
        this.getCaptcha()
      },
      nextStep(){
        this.bindPhone =false;
      },
      submitPhone(){
        this.formPhone.phone = this.userInfo.phone;
        this.formPhone.new_phone = '+86'+this.inputPhone;

        console.log(this.formPhone)

        axios({
          method: 'post',
          url: `${baseURL}/v1/users/${this.userInfo._id}/phone`,
          data: querystring.stringify(this.formPhone)
        }).then(res => {
          console.log(res);
          this.phoneVerification = false;
          ///location.reload();
          this.reload()
        }).catch(error => {
          console.log(error);
        })
      },

      //绑定钱包地址
      sunmitBindWallet(){

        axios({
          method: 'post',
          url: `${baseURL}/v1/users/${this.userInfo._id}/wallet_address/${this.formBindWallet.wallet_address}`,
          data: querystring.stringify(this.formBindWallet)
        }).then(res => {
          console.log(res);
          this.dialogFormVisible = false;
          this.reload()
        }).catch(error => {
          console.log(error);
        })

      },
      //修改钱包地址
      sunmitInputWallet(){

       axios({
         method: 'post',
         url: `${baseURL}/v1/users/${this.userInfo._id}/wallet_address/${this.formBindWallet.wallet_address}`,
         data: querystring.stringify(this.formBindWallet)
       }).then(res => {
         console.log(res);
         this.dialogFormVisible2 = false;
         this.reload()
       }).catch(error => {
        console.log(error);
       })


      }



    },
    components: {
      myTopSearch
    }
  }
</script>
<style scoped>
  .nav_content{
    width: 1078px;
    float: right;
  }
  .nav_content_title{
    width: 1078px;
    height: 50px;
    background-color: #ffffff;
    border: solid 1px #bfbfbf;
    line-height: 50px;
    font-size: 18px;
    color: #222222;
  }
  .nav_content_title span{
    padding-left: 20px;
  }
  .nav_content_title span:last-child{
    font-size: 14px;
    color: #666666;
  }
  .nav_content_table{
    margin-top: 12px;
    width:1078px;
    background-color: #ffffff;
    border: solid 1px #bfbfbf;
    margin-bottom: 324px;
  }
  .nav_content_table table{
    width:100%;
  }
  .nav_content_table tbody td:nth-child(1){
    width:100px;
    text-align: center;
  }
  .nav_content_table tbody td:nth-child(1) span{
    display: inline-block;
  }
  .nav_content_table tbody td:nth-child(2){
    width:170px;
    font-size: 18px;
    color: #222222;
  }
  .nav_content_table tbody td:nth-child(3){
    width:710px;
    font-size: 16px;
    color: #666666;
  }
  .nav_content_table tbody td:nth-child(4){
    font-size: 16px;
    color: #666666;
    cursor: pointer;
  }
  .nav_content_table tbody tr{
    border-bottom: 1px solid #d2d2d2;
    text-align: left;
    height:90px;
  }
  .nav_content_table tbody tr td{
    vertical-align: middle;
  }
  .nav_content_table tbody tr:last-child{
    border-bottom: none;
  }
  .red_set{
    color: #c6351e !important;
  }
</style>
<style>
  .safe_dialog .el-dialog__header{
    text-align: center;
    font-size: 16px;
    color: #222222;
  }
  .safe_dialog .dialog-footer{
    text-align: center;
  }
  .padding_phone{
    padding: 20px;
  }
  .safe_dialog .dialog-footer button{
    width: 85px;
    height: 30px;
    border-radius: 4px;
    border: solid 1px #c6351e;
    font-size: 14px;
    color: #c9402a;
    outline: none;
    background-color: #ffffff;
    cursor: pointer;
  }
  .safe_dialog .forget_btn{
    margin-left: 30px;
  }
  .safe_dialog .forget_btn a{
    color: #c9402a;
  }
  .safe_dialog .el-form-item{
    margin-bottom: 2px;
  }
  .safe_dialog .el-dialog__footer{
    padding: 20px;
  }
  .safe_dialog .el-form-item__label{
    color: #222222;
  }
  .safe_dialog .el-input__inner{
    width: 198px;
    height: 28px;
    background-color: #eeeeee;
    border-radius: 0;
    border: 0;
    padding-left: 4px;
  }
  .safe_dialog .el-dialog{
    width: 400px;
    border-radius: 10px;
  }
  .safe_dialog .el-dialog__body{
    padding-bottom: 0;
    padding-top: 10px;
  }
  .safe_dialog .el-form-item img{
    width: 57px;
    height: 23px;
    position: relative;
    top: 7px;
    left: -60px;
    cursor: pointer;
  }
  .safe_dialog .el-form-item__content{
    width:100%;
  }
  .safe_dialog .el-input{
    float: left;
    width:auto;
  }
  .safe_dialog .el-dialog__headerbtn{
    border: 1px solid #909399;
    width: 18px;
    height: 18px;
  }
  .safe_dialog .el-dialog__headerbtn .el-dialog__close:hover{
    color: #909399;
  }
  .safe_dialog .send_btn{
    width: 57px;
    height: 23px;
    border-radius: 4px;
    border: solid 1px #c6351e;
    font-size: 14px;
    background-color: #ffffff;
    color: #c6351e;
    outline: none;
    cursor: pointer;
    position: relative;
    left: -60px;
    top: 1px;
  }
  .safe_dialog .first_label .el-form-item__label{
    padding-right: 2px;
  }
  .safe_dialog .auth_title{
    padding-left: 14px;
    margin-bottom: 12px;
  }
  .safe_dialog .auth_title img{
    float: left;
    margin: 0 10px;
  }
  .safe_dialog .title_p1{
    font-size: 16px;
    color: #222222;
    position: relative;
    top: -4px;
    margin-bottom: 12px;
  }
  .safe_dialog .title_p2{
    font-size: 12px;
    color: #666666;
  }
  .safe_dialog .auth_box .el-dialog{
    width: 420px;
  }
  .class-a span{
    width: 35px;
    height: 27px;
    background: url("./images/adopt.png") no-repeat center;
    background-size: 100% 100%;
  }
  .class-b span{
    width: 33px;
    height: 34px;
    background: url("./images/not.png") no-repeat center;
    background-size: 100% 100%;
  }
</style>
