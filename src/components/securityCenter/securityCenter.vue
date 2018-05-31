<template>
  <div>
    <my-topSearch></my-topSearch>
    <div class="nav_body">
      <div class="nav_mid">
        <nav class="nav_tab">
          <ul>
            <li>
              <router-link to="/personalAssets">
                <span></span>
                <p>个人资产</p>
              </router-link>
            </li>
            <li>
              <router-link to="/collectFolder">
                <span></span>
                <p>收藏夹</p>
              </router-link>
            </li>
            <li>
              <router-link to="/orderHistory">
                <span></span>
                <p>历史订单</p>
              </router-link>
            </li>
            <li>
              <router-link to="/securityCenter">
                <span></span>
                <p>安全中心</p>
              </router-link>
            </li>
          </ul>
        </nav>
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
                <td>您验证的手机： 186*****680    若已丢失或停用，请立即更换，避免账户被盗</td>
                <td @click="phoneVerification = true">修改</td>
              </tr>
              <tr>
                <td><img src="./images/not.png" alt=""></td>
                <td>实名认证</td>
                <td>用于提升账号的安全性和信任级别</td>
                <td @click="realNameAuthentication = true" class="red_set">设置</td>
              </tr>
              <tr>
                <td><img src="./images/not.png" alt=""></td>
                <td>钱包地址</td>
                <td>绑定您的钱包地址后，可信币才能显示出来</td>
                <td class="red_set" @click="dialogFormVisible = true">设置</td>
              </tr>
              </tbody>
            </table>
          </div>

          <div class="safe_dialog">

            <el-dialog title="实名认证" :visible.sync="realNameAuthentication" class="auth_box">
              <div class="auth_title">
                <img src="./images/not.png" alt="">
                <p class="title_p1">您还未认证</p>
                <p class="title_p2">认证后，可提升账号安全等级，进行账号申诉等操作</p>
              </div>
              <div style="clear: both"></div>
              <el-form :model="form">
                <el-form-item label="证件类型：" :label-width="formLabelWidth" class="first_label">
                  <span>身份证</span>
                </el-form-item>
                <el-form-item label="真实姓名" :label-width="formLabelWidth">
                  <el-input v-model="form.name" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="身份证号" :label-width="formLabelWidth">
                  <el-input v-model="form.code" auto-complete="off"></el-input>
                </el-form-item>
              </el-form>
              <div slot="footer" class="dialog-footer">
                <button @click="realNameAuthentication = false">提交</button>
              </div>
            </el-dialog>

            <el-dialog title="修改登录密码" :visible.sync="modifyPassword">
              <el-form :model="form">
                <el-form-item label="旧密码" :label-width="formLabelWidth">
                  <el-input v-model="form.name" auto-complete="off" type="password"></el-input>
                </el-form-item>
                <el-form-item label="新密码" :label-width="formLabelWidth">
                  <el-input v-model="form.code" auto-complete="off" type="password"></el-input>
                </el-form-item>
                <el-form-item label="重复密码" :label-width="formLabelWidth">
                  <el-input v-model="form.code" auto-complete="off" type="password"></el-input>
                </el-form-item>
              </el-form>
              <div slot="footer" class="dialog-footer">
                <button @click="modifyPassword = false">确认</button>
                <button class="forget_btn" @click="modifyPassword = false">忘记密码</button>
              </div>
            </el-dialog>

            <el-dialog title="修改绑定手机" :visible.sync="phoneVerification">
              <el-form :model="form">
                <el-form-item label="绑定手机：" :label-width="formLabelWidth" class="first_label">
                  <span>186****1658</span>
                </el-form-item>
                <el-form-item label="新手机号" :label-width="formLabelWidth">
                  <el-input v-model="form.name" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="图形验证码" :label-width="formLabelWidth">
                  <el-input v-model="form.code" auto-complete="off"></el-input>
                  <img src="./images/code.png" alt="">
                </el-form-item>
                <el-form-item label="短信验证码" :label-width="formLabelWidth">
                  <el-input v-model="form.code" auto-complete="off"></el-input>
                  <button type="button" class="send_btn">发送</button>
                </el-form-item>
              </el-form>
              <div slot="footer" class="dialog-footer">
                <button @click="phoneVerification = false">提交</button>
              </div>
            </el-dialog>

            <el-dialog title="修改钱包地址" :visible.sync="dialogFormVisible">
              <el-form :model="form">
                <el-form-item label="请输入钱包地址" :label-width="formLabelWidth">
                  <el-input v-model="form.name" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="验证码" :label-width="formLabelWidth">
                  <el-input v-model="form.code" auto-complete="off"></el-input>
                  <img src="./images/code.png" alt="">
                </el-form-item>
              </el-form>
              <div slot="footer" class="dialog-footer">
                <button @click="dialogFormVisible = false">提交</button>
              </div>
            </el-dialog>
          </div>


        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import myTopSearch from "../topSearch/topSearch"
  export default{
    data(){
      return {
        dialogFormVisible: false,
        phoneVerification: false,
        modifyPassword: false,
        realNameAuthentication: false,
        form: {
          name: '',
          code:''
        },
        formLabelWidth: '120px',
      }
    },
    components: {
      myTopSearch
    }
  }
</script>
<style scoped>
  .nav_body{
    background-color: #f3f3f3;
  }
  .nav_mid{
    width: 1212px;
    margin:0 auto;
  }
  .nav_tab{
    font-size: 18px;
    width: 100px;
    height: 128px;
    float: left;
  }
  .nav_tab p{
    color: #222222;
    line-height: 34px;
  }
  .nav_tab span{
    width: 14px;
    height: 14px;
    background-color: #7d7d7d;
    display: inline-block;
    float: left;
    margin-top: 10px;
    margin-right: 10px;
  }
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
</style>
