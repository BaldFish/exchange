<template>
    <div class="buyer-container">
      <div class="buyer-head">
        <ul>
          <li class="head-title">
            <p>订单详情</p>
          </li>
          <li>
            订单号：<span>{{reportEvaluation.orderNum}}</span>
          </li>
          <li>
            下单日期：<span>{{reportEvaluation.created_at}}</span>
          </li>
        </ul>
      </div>
      <div style="clear: both"></div>
      <div class="buyer-goods">
        <ul>
          <li>
            <span class="red-dot"></span>
            <span>{{reportEvaluation.assetname}}</span>
          </li>
          <li>
            价格：<span>{{reportEvaluation.price}}</span>
          </li>
        </ul>
      </div>
      <div class="buyer-reply">
        <label>商品评分</label>
        <el-rate v-model="star" style="width:120px;float: left"></el-rate>
        <div style="clear: both"></div>
        <div class="reply-container">
          <textarea placeholder="立即评价晒单吧" name="" style="resize:none;line-height: normal" maxlength="500" @input = "descInput" v-model="content"></textarea>
          <p class="reply-tips">{{remnant}}/500(评价多于10个字，有可能会获得元积分哦)</p>
          <el-upload
            class="upload-demo"
            action="http://wallet-api-test.launchain.org/v1/asset-comment/img/upload"
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            :on-success="handleSuccess"
            :auto-upload="true"
            :data="upLoadData"
            :before-upload="beforeImgUpload"
            list-type="picture">
            <el-button size="small" type="primary">点击上传</el-button>
            <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
          </el-upload>
        </div>
        <div style="clear: both"></div>
        <button type="button" class="submit" @click="replySubmit">提交</button>
      </div>
    </div>
</template>

<script>
  import axios from "axios";
  import {baseURL,} from '@/common/js/public.js';
  import utils from "@/common/js/utils.js";
  const querystring = require('querystring');
  var currentImg = '';

    export default {
        name: "buyerEvaluation",
        data() {
            return {
              star:null,
              remnant:0,
              content:'',
              upLoadData:{
                img: currentImg,
                order_id: '',
                userid: ''
              },
              userId:'',
              token:'',
              apiKey:'',
              assetId:'',
              reportEvaluation:'',
              phone:''
            }
        },
        created() {
        },
        mounted() {
          if(JSON.parse(sessionStorage.getItem("loginInfo"))){
            this.userId=JSON.parse(sessionStorage.getItem("loginInfo")).user_id;
            this.token=JSON.parse(sessionStorage.getItem("loginInfo")).token;
            this.phone=JSON.parse(sessionStorage.getItem("userInfo")).phone;
            this.reportEvaluation=JSON.parse(sessionStorage.getItem("reportEvaluation"));
            this.upLoadData = {
              img: currentImg,
              order_id: this.reportEvaluation.orderNum,
              userid: this.userId
            }
          }
          this.removeServerImg()
        },
        methods: {
          // 倒计数
          descInput(){
            this.remnant = this.content.length;
          },
          handlePreview(file) {
            console.log(file);
          },
          handleSuccess(response, file, fileList){
            console.log(response);
          },
          // 文件上传前
          beforeImgUpload (file) {
            const self = this;  //这个很重要！
            var reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = function() {
              self.upLoadData.img = this.result.slice(22);
              currentImg = self.upLoadData.img
            };
          },
          // 删除单张图片
          handleRemove(file, fileList) {
            axios({
              method: "DELETE",
              url: `${baseURL}/v1/asset-comment/img/delete/one/${file.response.img_id}`,
              headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                "X-Access-Token":this.token
              }
            }).then((res) => {
              console.log(res)
            }).catch((err) => {
              console.log(err);
            });
          },
          //删除未评价的历史图片
          removeServerImg(){
            axios({
              method: "DELETE",
              url: `${baseURL}/v1/asset-comment/img/delete/all/${this.upLoadData.order_id}`,
              headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                "X-Access-Token":this.token
              }
            }).then((res) => {
              console.log(res)
            }).catch((err) => {
              console.log(err);
            });
          },
          // 提交评价
          replySubmit(){
            axios({
              method: "POST",
              url: `${baseURL}/v1/asset-comment/comment/insert`,
              headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                "X-Access-Token":this.token
              },
              data:querystring.stringify({
                userid:this.reportEvaluation.userid,
                assetid:this.reportEvaluation.assetid,
                apikey:this.reportEvaluation.apikey,
                order_id:this.reportEvaluation.orderNum,
                star:this.star,
                content:this.content,
                phone:this.phone,
              }),
            }).then((res) => {
              this.$router.push({path: '/orderHistory'});
            }).catch((err) => {
              console.log(err);
            });
          },


        },
        watch: {},
        computed: {},
        components: {},
    }
</script>

<style scoped lang="stylus">
  .buyer-container{
    width: 1200px;
    height: 870px;
    margin 0 auto
    margin-top 35px
    margin-bottom 70px
    background-color: #ffffff;
    border: solid 1px #d2d2d2;
    box-sizing border-box
    .buyer-head{
      height: 50px;
      line-height 50px
      background-color: #eef8fc;
      ul {
        .head-title{
          width: 93px;
          background-color: #d92104;
          color #ffffff
          font-size: 16px;
          text-align center
          padding 0
          position: relative;
          bottom: 1px;
          height: 51px;
          line-height: 51px;
        }
        li{
          float: left;
          width: 300px;
          font-size: 14px;
          color: #333;
          padding-left: 42px;
          span{
            color: #999999;
          }
        }
      }
    }
    .buyer-goods{
      width: 1141px;
      height: 50px;
      background-color: #f7f7f7;
      border: solid 1px #eeeeee;
      margin:0 auto
      margin-top 20px
      margin-bottom 50px
      ul{
        li{
          float left
          line-height 50px
        }
        li:first-child{
          font-size: 16px;
          color: #333333;
          .red-dot{
            width: 8px;
            height: 8px;
            background-color: #d91e01;
            display inline-block
            border-radius 50%
            margin: 0 16px 1px 25px;
          }
        }
        li:nth-child(2){
          font-size: 14px;
          color: #666
          margin-left: 280px;
          span {
            color: #d92104;
          }
        }
      }
    }
    .buyer-reply{
      width:735px
      margin:0 auto
      label{
        font-size: 14px;
        color: #333333;
        float left
        margin-right: 16px;
        margin-top: 3px;
      }
      .reply-container{
        height: 516px
        width: 735px;
        background-color: #eef8fc;
        border: solid 1px #e2f3fd;
        margin-top: 16px;
        textarea{
          width: 685px;
          height: 270px;
          background-color: #fff;
          border: solid 1px #e5e5e5;
          outline: none;
          padding: 15px;
          margin-left: 9px;
          margin-top: 12px;
          font-size: 14px;
        }
        .reply-tips{
          font-size: 14px;
          color: #999;
          text-align: right;
          width: 700px;
          margin: 0 auto;
          margin-top: 10px;
          margin-bottom: 10px;
        }
      }
    }
    .submit{
      width: 100px;
      height: 30px;
      background-color: #d91e01;
      outline none
      border:none
      line-height 30px
      text-align center
      color white
      font-size: 16px;
      margin-top: 50px;
      margin-left: 317.5px;
      cursor: pointer;
    }
  }
</style>
<style>
  .reply-container .upload-demo{
    padding: 0 10px;
    margin-bottom: 20px;
  }
  .reply-container .el-upload-list__item{
    width: 100px;
    float: left;
    margin-right: 20px;
  }
</style>
