<template>
  <div class="sellerReply">
    <div class="seller_header">
      <ul>
        <li class="text">资产评价</li>
        <li class="star">
          <span>商品评价</span>
          <el-rate v-model="star" class="star_rate" disabled disabled-void-color="#C6D1DE"></el-rate>
        </li>
      </ul>
    </div>
    <div class="evaluate_details">
      <ul>
        <li>
          <div class="buyer_info">
            <p>{{evaluationDetails.phone}}</p><br>
            <p>{{evaluationDetails.created_at}}</p>
          </div>
          <div class="buyer_details">
            <div class="buyer_text">
              <p>{{evaluationDetails.content}}</p>
            </div>
            <!--<div class="buyer_img" v-if="evaluationDetails.img!==null">
              <ul class="buyer_img_list">
                <li v-for="img of evaluationDetails.img">
                  <img :src="img" alt="">
                </li>
              </ul>
            </div>-->
          </div>
        </li>
      </ul>
      <div class="reply_title">发表回复</div>
      <div class="reply_content_wrap">
        <div class="reply_content">
          <textarea placeholder="立即评价晒单吧" name="" minlength="5" maxlength="300" v-model="content" v-validate="'required|code'" name='content'></textarea>
          <p class="reply-tips">请填写回复内容，长度在5-300位字符之间</p>
        </div>
        <span v-show="errors.has('content')" class="error_content">{{errors.first('content')}}</span>
      </div>
      <div class="code_wrap">
        <span>验证码</span>
        <input type="text" v-model="captcha_number" v-validate="'required'" name='captcha_number'
               @blur="captchaError">
        <img :src="captcha" alt="">
        <span @click="getCaptcha" class="huan">换一换</span>
        <span v-show="errors.has('captcha_number')" class="error">{{errors.first('captcha_number')}}</span>
        <span v-show="captchaNotice" class="error">{{errorMsg}}</span>
      </div>
      <div class="button_wrap">
        <span class="button" @click="submitReply">提交</span>
      </div>
    </div>
  </div>
</template>

<script>
  import axios from "axios";
  import {baseURL, loginPlatform} from '@/common/js/public.js';
  import utils from "@/common/js/utils.js";
  
  const querystring = require('querystring');
  
  export default {
    name: "sellerReply",
    components: {},
    data() {
      return {
        star: 3,
        isShowImg: false,
        bigImg: "",
        evaluationDetails: "",
        captcha: "",
        captchaNotice: false,//校验图形码是否正确
        errorMsg: "",
        phone: "",
        userId: "",
        evaluationId: "",
        content: "",
        captcha_id: "",
        captcha_number: "",
      }
    },
    created() {
    },
    mounted() {
      if (JSON.parse(sessionStorage.getItem("loginInfo"))) {
        this.phone=JSON.parse(sessionStorage.getItem("userInfo")).phone;
        this.userId=JSON.parse(sessionStorage.getItem("userInfo")).user_id;
        this.evaluationId = JSON.parse(sessionStorage.getItem("evaluationId"));
        this.acquireEvaluate()
      }
      this.getCaptcha()
    },
    watch: {},
    computed: {},
    methods: {
      //获取单条评价
      acquireEvaluate() {
        axios({
          method: "GET",
          url: `${baseURL}/v1/asset-comment/comment/content/${this.evaluationId}`,
        }).then((res) => {
          //格式化时间
          res.data.data.created_at = utils.formatDate(new Date(res.data.data.created_at), "yyyy-MM-dd hh:mm:ss");
          this.evaluationDetails = res.data.data;
          this.star = res.data.data.star
        }).catch((err) => {
          console.log(err);
        })
      },
      //获取图片验证码--图片
      getCaptcha() {
        axios({
          method: 'post',
          url: `${baseURL}/v1/captcha`,
          data: querystring.stringify({})
        }).then(res => {
          this.captcha = `data:image/png;base64,${res.data.png}`;
          this.captcha_id = res.data.captcha_id;
        }).catch(error => {
          console.log(error);
        });
      },
      //校验图形验证码
      captchaError() {
        if (this.captcha_number) {
          axios({
            method: 'get',
            url: `${baseURL}/v1/captcha/${this.captcha_id}/code/${this.captcha_number}`
          }).then(res => {
            this.captchaNotice = false
          }).catch(error => {
            if (error.response.status === 400) {
              this.errorMsg = "图形验证码错误";
              this.captchaNotice = true
            } else if (error.response.status === 404) {
              this.captchaNotice = true;
              this.errorMsg = "图形验证码已过期";
            }
          });
        } else {
          this.captchaNotice = false
        }
      },
      //提交恢复
      submitReply() {
        this.$validator.validateAll({
          content: this.content,
          captcha_number: this.captcha_number,
        }).then(result => {
          if(result){
            let replyData = {
              phone: this.phone,
              user_id: this.userId,
              id: this.evaluationId,
              content: this.content,
              captcha_id: this.captcha_id,
              captcha_number: this.captcha_number
            };
            axios({
              method: "post",
              url: `${baseURL}/v1/asset-comment/reply/insert`,
              data: querystring.stringify(replyData)
            }).then(res => {
              this.$router.push("/reportDetails");
            }).catch(error => {
              console.log(error.response.data.code);
            })
          }
        })
      }
    },
  }
</script>

<style scoped lang="stylus">
  .sellerReply {
    box-sizing border-box
    width 1212px
    margin 0 auto
    border: solid 1px #d2d2d2;
    margin-top 20px
    background-color #ffffff
    .seller_header {
      margin-bottom 10px
      ul {
        background-color #eef8fc
        font-size 0
        .text {
          display inline-block
          font-size 16px
          color #ffffff
          padding 17px
          background-color #d92104
        }
        .star {
          font-size 0
          display inline-block
          span {
            display inline-block
            font-size 14px
            padding 18px
            color: #333333;
          }
          .star_rate {
            display: inline-block;
            font-size 18px
          }
        }
      }
    }
    .evaluate_details {
      width 1164px
      margin 0 auto
      ul {
        width 1164px
        background-color #f8f8f8
        margin 0 auto
        li {
          font-size 0
          padding-top 10px
          .buyer_info {
            display inline-block
            width 160px
            text-align right
            margin-right 30px
            vertical-align top
            p {
              line-height 22px
              font-size 12px
              color: #333333;
            }
            p:last-child {
              color #999999
            }
          }
          .buyer_details {
            display inline-block
            width 940px
            padding-bottom 10px
            border-bottom 1px solid #eeeeee
            .buyer_text {
              p {
                font-size 12px
                line-height 16px
                color #666666
              }
            }
            .buyer_img {
              .buyer_img_list {
              }
            }
          }
          .buyer_details:last-child {
            border-bottom none
          }
        }
      }
      
      .reply_title {
        font-size 16px
        color: #666666;
        line-height 44px
        margin-top 14px
      }
      .reply_content_wrap{
        font-size 0
        .reply_content {
          display inline-block
          box-sizing border-box
          padding 9px
          width 740px
          height 220px
          background-color: #eef8fc;
          border: solid 1px #e2f3fd;
          position relative
          font-size 0
          textarea {
            display inline-block
            box-sizing border-box
            outline: none
            resize: none
            padding 20px 15px
            width 720px
            height 200px
            font-size 14px
            vertical-align middle
          }
          textarea:
          :-webkit-input-placeholder {
            color: #999999;
          }
          textarea:-moz-placeholder {
            color: #999999;
          }
          textarea:
          :-moz-placeholder {
            color: #999999;
          }
          textarea:-ms-input-placeholder {
            color: #999999;
          }
          p {
            color: #999999;
            position absolute
            right 36px
            bottom 34px
            font-size 14px
          }
          
        }
        .error_content{
          display inline-block
          font-size 14px
          color #d92104
          margin-left 10px
        }
      }
      .code_wrap {
        color: #333333;
        margin-top 10px
        font-size 0
        span {
          font-size 14px
          display inline-block
          line-height 28px
        }
        input {
          box-sizing border-box
          outline: none
          border 1px solid #e5e5e5;
          width 72px
          height 28px
          line-height 28px
          padding-left 16px
          font-size 14px
          margin-left 13px
          margin-right 35px
        }
        img {
          display inline-block
          width 108px
          height 28px
          background-color #eeeeee
          vertical-align top
          margin-right 14px
        }
        .huan {
          padding-left 21px
          background: url("./images/huan.png") no-repeat left
          cursor pointer
        }
        .error {
          margin-left 10px
          color #d92104
        }
      }
      .button_wrap {
        margin-top 30px
        margin-bottom 30px
        width 740px
        text-align center
        .button {
          display inline-block
          font-size 16px
          color: #ffffff;
          background-color: #d91e01;
          padding 8px 30px
          cursor pointer
        }
      }
    }
  }
</style>

