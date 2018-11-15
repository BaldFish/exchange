<template>
  <div class="reportDetails">
    <div class="site_box">
      <div class="site">
        <ul>
          <li>当前位置 ：</li>
          <li><a href="/">首页</a></li>
          <li>&nbsp;>&nbsp;</li>
          <li><a href="/moreReport">诊断报告</a></li>
          <li>&nbsp;>&nbsp;</li>
          <li>{{reportDetails.assetname}}</li>
        </ul>
      </div>
    </div>
    <div class="details">
      <h4>{{reportDetails.assetname}}</h4>
      <div class="attestation">
        <span class="merchant" v-if="reportDetails.authtype==='认证商家'">{{reportDetails.authtype}}</span>
        <span class="person" v-if="reportDetails.authtype==='认证个人'">{{reportDetails.authtype}}</span>
        <span class="trust" v-if="reportDetails.creditlevel!=='未认证'">{{reportDetails.creditlevel}}</span>
      </div>
      <div :class="reportDetails.shopcart_id?'like':'dislike'" @click="toggleLike(reportDetails.id)">收藏</div>
      <div class="price">
        <span class="triangle_border_nw"></span>
        <label>此诊断报告价格：</label>
        <span class="money">{{reportDetails.price}}</span>
        <a href="javascript:void(0)" @click="buy(reportDetails.id)"><p class="buy">一键购买</p></a>
      </div>
      <div class="details-box">
        <div class="details-left">
          <span class="details-dot"></span>
          <ul>
            <li>
              <label>资产所属人</label>
              <span>：{{reportDetails.assetowner}}</span>
            </li>
            <li>
              <label>诊断报告ID</label>
              <span>：{{reportDetails.report_id}}</span>
            </li>
            <li>
              <label>数据来源</label>
              <span>：{{reportDetails.resource}}</span>
            </li>
            <li>
              <label>故障码个数</label>
              <span>：{{reportDetails.fault_n}}</span>
            </li>
            <li>
              <label>VIN码</label>
              <span>：{{reportDetails.vin}}</span>
            </li>
          </ul>
        </div>
        <div class="details-right">
          <span class="details-dot"></span>
          <ul>
            <li>
              <label>权益</label>
              <span>：{{reportDetails.sell_type}}</span>
            </li>
            <li>
              <label>诊断设备ID</label>
              <span>：{{reportDetails.pro_serial_no}}</span>
            </li>
            <li>
              <label>诊断用户ID</label>
              <span>：{{reportDetails.diagnostic_user_id}}</span>
            </li>
            <li>
              <label>报告生产时间</label>
              <span>：{{reportDetails.generate_time}}</span>
            </li>
          </ul>
        </div>
      </div>
      <div style="clear: both"></div>
      <div class="title">
        <span class="title-source"></span>
        <span class="title-text">可信溯源</span>
        <span class="check-more" v-if="!isShow" @click="reportSource != ''?isShow = true:isShow = false">显示更多</span>
        <span class="check-more" v-if="isShow" @click="reportSource != ''?isShow = false:isShow = true">收起更多</span>
      </div>
      <div class="transfer-record" :class="{more:isShow}">
        <div class="transfer-title">
          <span class="transfer-dot"></span>
          <label>资产转让记录</label>
        </div>
        <div class="transfer-container">
          <ul v-for="(item,index) of reportSource" :key="item.id">
            <li>
              <label>"交易发起方"</label>
              <span>："{{item.from}}",</span>
            </li>
            <li>
              <label>"交易接收方"</label>
              <span>："{{item.to}}",</span>
            </li>
            <li>
              <label>"交易价格"</label>
              <span>：{{item.price}},</span>
            </li>
            <li>
              <label>"交易时间"</label>
              <span>："{{item.trans_at}}"</span>
            </li>
          </ul>
        </div>
      </div>
      
      <div class="evaluate">
        <div class="title">
          <span class="title-source"></span>
          <span class="title-text">商品评价</span>
          <span class="reliability">资产可信度：<span>{{credit}}%</span></span>
        </div>
        <div class="evaluate-container">
          <div class="evaluate-tabs">
            <ul>
              <li>
                <input type="radio" name="evaluate" checked="checked" @click="getEvaluationList">
                <span>全部评价（{{total_comments}}）</span>
              </li>
              <!--<li>
                <input type="radio" name="evaluate">
                <span>追评（{{evaluationList}}）</span>
              </li>-->
              <li>
                <input type="radio" name="evaluate" @click="getPraiseList">
                <span>好评（{{praise}}）</span>
              </li>
              <li>
                <input type="radio" name="evaluate" @click="getAssessmentList">
                <span>中评（{{assessment}}）</span>
              </li>
              <li>
                <input type="radio" name="evaluate" @click="getBadList">
                <span>差评（{{bad_comment}}）</span>
              </li>
            </ul>
          </div>
          <div class="evaluate-details">
            <ul>
              <li v-for="item in evaluationList.data">
                <div class="buyer">
                  <div class="buyer-info">
                    <p>{{item.phone}}</p><br>
                    <p>{{item.created_at}}</p>
                  </div>
                  <div class="buyer-details">
                    <el-rate v-model="item.star" disabled style="width:120px;float: left"></el-rate>
                    <div class="buyer-action">
                      <!--<div :class="isThumbsUp?'thumbs-up-yes':'thumbs-up-no'" @click="toggleThumbsUp()">
                        <span></span>
                        <span class="num">{{thumbsUpNum}}</span>
                      </div>-->
                      <div class="reply" @click="openModal(item)" v-if="item.can_reply == 1">
                        <img src="./images/reply.png" alt="">
                        <!--<span class="num">1</span>-->
                      </div>
                    </div>
                    <div style="clear: both"></div>
                    <div class="buyer-text">
                      <p>{{item.content}}</p>
                    </div>
                    <div class="buyer-img" v-if="item.img">
                      <ul>
                        <li v-for="img in item.img" @click="showBigImg(img)">
                          <input type="radio" name="smallImg">
                          <img :src="img" alt="">
                        </li>
                      </ul>
                      <div style="clear: both"></div>
                      <div class="big-img" @click="hideBigImg()" v-if="isShowImg">
                        <img :src="bigImg" alt="">
                      </div>
                    </div>
                  </div>
                  <div style="clear: both"></div>
                </div>
                <div class="seller" v-if="item.reply!== null">
                  <div class="seller-info">
                    <p>[商家回复]</p><br>
                    <p>{{item.reply[0].created_at}}</p>
                  </div>
                  <div class="seller-details">
                    <p>{{item.reply[0].content}}</p>
                  </div>
                  <div style="clear: both"></div>
                </div>
              </li>
            </ul>
          </div>
        </div>
        <div class="clearfix paging" v-if="currentTab == 0">
          <el-pagination class="my_paging"
                         layout="prev, pager, next"
                         :background=true
                         :total=total
                         :page-size=evaluationLimit
                         :current-page.sync=evaluationPage_All
                         @current-change="handleCurrentChange">
          </el-pagination>
        </div>
        <div class="clearfix paging" v-if="currentTab == 1">
          <el-pagination class="my_paging"
                         layout="prev, pager, next"
                         :background=true
                         :total=total
                         :page-size=evaluationLimit
                         :current-page.sync=evaluationPage_Praise
                         @current-change="handleCurrentChange">
          </el-pagination>
        </div>
        <div class="clearfix paging" v-if="currentTab == 2">
          <el-pagination class="my_paging"
                         layout="prev, pager, next"
                         :background=true
                         :total=total
                         :page-size=evaluationLimit
                         :current-page.sync=evaluationPage_Assessment
                         @current-change="handleCurrentChange">
          </el-pagination>
        </div>
        <div class="clearfix paging" v-if="currentTab == 3">
          <el-pagination class="my_paging"
                         layout="prev, pager, next"
                         :background=true
                         :total=total
                         :page-size=evaluationLimit
                         :current-page.sync=evaluationPage_Bad
                         @current-change="handleCurrentChange">
          </el-pagination>
        </div>
        
        <el-dialog title="卖家回复" :visible.sync="dialogFormVisible">
          <el-form>
            <el-input type="textarea" v-model="replyContent"></el-input>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="closeModal">取 消</el-button>
            <el-button type="primary" @click="replySubmit">确 定</el-button>
          </div>
        </el-dialog>
      
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
    name: "reportDetails",
    components: {},
    data() {
      return {
        reportSource: [],
        reportDetails: {},
        userId: "",
        token: "",
        apiKey: "",
        assetId: "",
        id: "",
        isShow: false,
        bigImg: '',
        isShowImg: false,
        isThumbsUp: false,
        thumbsUpNum: 100,
        evaluationList: {},
        wallet_address: '',
        evaluationPage_All: 1,
        evaluationPage_Praise: 1,
        evaluationPage_Assessment: 1,
        evaluationPage_Bad: 1,
        evaluationLimit: 10,
        credit: 100,
        total_comments: 0,
        praise: 0,
        assessment: 0,
        bad_comment: 0,
        total: 10,
        dialogFormVisible: false,
        replyContent: '',
        evaluationId: '',
        currentTab: '',
      }
    },
    beforeMount() {
      let token = utils.getCookie("token");
      if (token) {
        axios({
          method: "GET",
          url: `${baseURL}/v1/sessions/check`,
          headers: {
            "Access-Token": `${token}`,
          }
        }).then((res) => {
          if (res.data.user_id) {
            window.sessionStorage.setItem("userInfo", JSON.stringify(res.data));
            let loginInfo = {};
            loginInfo.token = token;
            loginInfo.user_id = res.data.user_id;
            window.sessionStorage.setItem("loginInfo", JSON.stringify(loginInfo));
            this.userId = JSON.parse(sessionStorage.getItem("loginInfo")).user_id;
            this.token = JSON.parse(sessionStorage.getItem("loginInfo")).token;
            
            this.wallet_address = JSON.parse(sessionStorage.getItem("userInfo")).wallet_address;
            this.getEvaluationList();
            
            this.acquireReportDetails();
          } else {
            alert("登录失效")
          }
        }).catch((err) => {
          console.log(err);
        })
      } else {
        sessionStorage.removeItem('loginInfo');
        sessionStorage.removeItem('userInfo');
      }
    },
    mounted() {
      let url = location.search;
      if (url.indexOf("?") != -1) {
        let theRequest = new Object();
        let str = url.substr(1);
        let strs = str.split("&");
        for (let i = 0; i < strs.length; i++) {
          theRequest[strs[i].split("=")[0]] = unescape(strs[i].split("=")[1]);
        }
        this.apiKey = theRequest.apikey;
        this.assetId = theRequest.assetid;
      } else {
        this.apiKey = JSON.parse(sessionStorage.getItem("reportDetails")).apikey;
        this.assetId = JSON.parse(sessionStorage.getItem("reportDetails")).assetid;
      }
      this.acquireReportDetails();
      this.acquireReportSource();
      this.getEvaluationList();
    },
    watch: {},
    computed: {},
    methods: {
      showBigImg(img) {
        this.isShowImg = true;
        this.bigImg = img
      },
      hideBigImg() {
        this.isShowImg = false;
      },
      toggleThumbsUp() {
        this.isThumbsUp = !this.isThumbsUp;
        if (this.isThumbsUp) {
          this.thumbsUpNum++
        } else {
          this.thumbsUpNum--
        }
      },
      // 获取全部评价列表
      getEvaluationList() {
        this.currentTab = 0;
        axios({
          method: "GET",
          url: `${baseURL}/v1/asset-comment/comment/list/${this.assetId}/${this.apiKey}?address=${this.wallet_address}&page=${this.evaluationPage_All}&limit=${this.evaluationLimit}`,
          headers: {
            "Content-Type": "application/json",
          }
        }).then((res) => {
          //格式化时间
          res.data.data.forEach((val) => {
            val.created_at = utils.formatDate(new Date(val.created_at), "yyyy-MM-dd hh:mm:ss");
            if (val.reply != null) {
              val.reply[0].created_at = utils.formatDate(new Date(val.reply[0].created_at), "yyyy-MM-dd hh:mm:ss");
            }
          });
          this.evaluationList = res.data;
          this.assessment = res.data.assessment;
          this.bad_comment = res.data.bad_comment;
          this.credit = res.data.credit;
          this.praise = res.data.praise;
          this.total_comments = res.data.total_comments;
          this.total = res.data.total_comments
        }).catch((err) => {
          console.log(err);
        })
      },
      // 获取好评列表
      getPraiseList() {
        this.currentTab = 1;
        axios({
          method: "GET",
          url: `${baseURL}/v1/asset-comment/comment/praiselist/${this.assetId}/${this.apiKey}?address=${this.wallet_address}&page=${this.evaluationPage_Praise}&limit=${this.evaluationLimit}`,
          headers: {
            "Content-Type": "application/json",
          }
        }).then((res) => {
          //格式化时间
          res.data.data.forEach((val) => {
            val.created_at = utils.formatDate(new Date(val.created_at), "yyyy-MM-dd hh:mm:ss");
            if (val.reply != null) {
              val.reply[0].created_at = utils.formatDate(new Date(val.reply[0].created_at), "yyyy-MM-dd hh:mm:ss");
            }
          });
          this.evaluationList = res.data;
          this.total = res.data.total_comments
        }).catch((err) => {
          console.log(err);
        })
      },
      // 获取中评列表
      getAssessmentList() {
        this.currentTab = 2;
        axios({
          method: "GET",
          url: `${baseURL}/v1/asset-comment/comment/assessmentlist/${this.assetId}/${this.apiKey}?address=${this.wallet_address}&page=${this.evaluationPage_Assessment}&limit=${this.evaluationLimit}`,
          headers: {
            "Content-Type": "application/json",
          }
        }).then((res) => {
          //格式化时间
          res.data.data.forEach((val) => {
            val.created_at = utils.formatDate(new Date(val.created_at), "yyyy-MM-dd hh:mm:ss");
            if (val.reply != null) {
              val.reply[0].created_at = utils.formatDate(new Date(val.reply[0].created_at), "yyyy-MM-dd hh:mm:ss");
            }
          });
          this.evaluationList = res.data;
          this.total = res.data.total_comments
        }).catch((err) => {
          console.log(err);
        })
      },
      // 获取差评列表
      getBadList() {
        this.currentTab = 3;
        axios({
          method: "GET",
          url: `${baseURL}/v1/asset-comment/comment/badlist/${this.assetId}/${this.apiKey}?address=${this.wallet_address}&page=${this.evaluationPage_Bad}&limit=${this.evaluationLimit}`,
          headers: {
            "Content-Type": "application/json",
          }
        }).then((res) => {
          //格式化时间
          res.data.data.forEach((val) => {
            val.created_at = utils.formatDate(new Date(val.created_at), "yyyy-MM-dd hh:mm:ss");
            if (val.reply != null) {
              val.reply[0].created_at = utils.formatDate(new Date(val.reply[0].created_at), "yyyy-MM-dd hh:mm:ss");
            }
          });
          this.evaluationList = res.data;
          this.total = res.data.total_comments
        }).catch((err) => {
          console.log(err);
        })
      },
      // 分页变化，不同tab分页独立
      handleCurrentChange(val) {
        if (this.currentTab == 0) {
          this.evaluationPage_All = val;
          this.getEvaluationList()
        } else if (this.currentTab == 1) {
          this.evaluationPage_Praise = val;
          this.getPraiseList()
        } else if (this.currentTab == 2) {
          this.evaluationPage_Assessment = val;
          this.getAssessmentList()
        } else if (this.currentTab == 3) {
          this.evaluationPage_Bad = val;
          this.getBadList()
        }
      },
      // 打开modal
      openModal(item) {
        this.replyContent = '';
        if (sessionStorage.getItem("loginInfo")) {
          this.dialogFormVisible = true;
          this.evaluationId = item._id
        } else {
          this.open()
        }
      },
      // 关闭modal
      closeModal() {
        this.dialogFormVisible = false;
        this.replyContent = ''
      },
      // 卖家回复
      replySubmit() {
        if (sessionStorage.getItem("loginInfo")) {
          axios({
            method: "POST",
            url: `${baseURL}/v1/asset-comment/reply/insert`,
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
              "X-Access-Token": this.token,
            },
            data: querystring.stringify({
              userid: this.userId,
              id: this.evaluationId,
              content: this.replyContent
            }),
          }).then((res) => {
            this.dialogFormVisible = false;
            this.replyContent = '';
            if (this.currentTab == 0) {
              this.getEvaluationList()
            } else if (this.currentTab == 1) {
              this.getPraiseList()
            } else if (this.currentTab == 2) {
              this.getAssessmentList()
            } else if (this.currentTab == 3) {
              this.getBadList()
            }
          }).catch((err) => {
            console.log(err);
          })
        } else {
          this.open()
        }
      },
      login() {
        let redirectURL = window.location.href;
        let url = `?redirectURL=${redirectURL}`;
        window.location.href = `${loginPlatform}${url}`;
      },
      open() {
        this.$confirm('此操作需要先登录, 是否登录?', '提示', {
          confirmButtonText: '是',
          cancelButtonText: '否',
          type: 'warning',
          center: true
        }).then(() => {
          this.login();
        }).catch(() => {
        });
      },
      toggleLike(val) {
        if (sessionStorage.getItem("loginInfo")) {
          let likeInfo = this.reportDetails;
          this.apiKey = likeInfo.apikey;
          this.assetId = likeInfo.assetid;
          if (likeInfo.shopcart_id === "") {
            axios({
              method: "POST",
              url: `${baseURL}/v1/shopcart/${this.userId}/${this.apiKey}/${this.assetId}`,
              headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                "X-Access-Token": this.token
              }
            }).then((res) => {
              this.id = res.data.id;
              likeInfo.shopcart_id = this.id
              this.addCollection()
            }).catch((err) => {
              console.log(err);
            });
          } else if (likeInfo.shopcart_id !== "") {
            this.id = likeInfo.shopcart_id;
            axios({
              method: "DELETE",
              url: `${baseURL}/v1/shopcart/${this.userId}/${this.id}`,
              headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                "X-Access-Token": this.token
              }
            }).then((res) => {
              likeInfo.shopcart_id = "";
              this.subtractCollection()
            }).catch((err) => {
              console.log(err);
            });
          }
        } else {
          this.open()
        }
      },
      acquireReportDetails() {
        if (JSON.parse(sessionStorage.getItem("loginInfo"))) {
          axios({
            method: "GET",
            url: `${baseURL}/v1/asset/${this.apiKey}/${this.assetId}/detail?userid=${this.userId}`,
            headers: {
              "Content-Type": "application/json",
            }
          }).then((res) => {
            res.data.sell_at = utils.formatDate(new Date(res.data.sell_at), "yyyy-MM-dd hh:mm:ss");
            res.data.generate_time = utils.formatDate(new Date(res.data.generate_time), "yyyy-MM-dd hh:mm:ss");
            this.reportDetails = res.data;
          }).catch((err) => {
            console.log(err);
          })
        } else {
          axios({
            method: "GET",
            url: `${baseURL}/v1/asset/${this.apiKey}/${this.assetId}/detail`,
            headers: {
              "Content-Type": "application/json",
            }
          }).then((res) => {
            res.data.sell_at = utils.formatDate(new Date(res.data.sell_at), "yyyy-MM-dd hh:mm:ss");
            res.data.generate_time = utils.formatDate(new Date(res.data.generate_time), "yyyy-MM-dd hh:mm:ss");
            this.reportDetails = res.data;
          }).catch((err) => {
            console.log(err);
          })
        }
      },
      acquireReportSource() {
        axios({
          method: "GET",
          url: `${baseURL}/v1/transed-asset/${this.assetId}/apikey/${this.apiKey}?page=0&limit=1000000`,
          headers: {
            "Content-Type": "application/json",
          }
        }).then((res) => {
          if (res.data.data != null) {
            for (let v of res.data.data) {
              v.trans_at = utils.formatDate(new Date(v.trans_at), "yyyy-MM-dd hh:mm:ss");
            }
            this.reportSource = res.data.data
          } else {
            this.reportSource = []
          }
        }).catch((err) => {
          console.log(err);
        })
      },
      addCollection() {
        this.$store.commit("addCollection")
      },
      subtractCollection() {
        this.$store.commit("subtractCollection")
      },
      buy(val) {
        if (JSON.parse(sessionStorage.getItem("loginInfo"))) {
          let buyInfoObj = this.reportDetails;
          this.apiKey = buyInfoObj.apikey;
          this.assetId = buyInfoObj.assetid;
          var data = {};
          data.nums = 1;
          axios({
            method: "POST",
            url: `${baseURL}/v1/order/${this.userId}/${this.apiKey}/${this.assetId}`,
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
              "X-Access-Token": this.token,
            },
            data: querystring.stringify(data),
          }).then((res) => {
            buyInfoObj = res.data;
            this.getBuy(buyInfoObj);
            this.$router.push("/checkOrder")
          }).catch((err) => {
            console.log(err);
          })
        } else {
          this.open()
        }
      },
      getBuy(val) {
        this.$store.commit("changeBuy", val);
      },
    },
  }
</script>

<style scoped lang="stylus">
  .reportDetails {
    .site_box {
      margin 0 auto
      width 100%
      background-color: #e7e7e7;
      .site {
        width 1212px
        height 34px
        line-height 34px
        margin 0 auto
        ul {
          padding-left 8px
          font-size 0
          li {
            vertical-align top
            display inline-block
            font-size 14px
            a {
              color: #666666;
            }
          }
        }
      }
    }
    .details {
      width 1200px
      padding-top 20px
      margin 0 auto
      position relative
      h4 {
        width 1028px
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        color: #222222;
        font-size: 20px;
      }
      .attestation {
        width 850px
        height 74px
        font-size 0px
        span {
          text-align center
          color #ffffff
          font-size 14px
          display inline-block
          width 70px
          height 30px
          line-height 30px
          margin-right 14px
          margin-top 16px
          margin-bottom 30px
        }
        .trust {
          background-color #99c7ff
        }
        .person {
          background-color #ffdd99
        }
        .merchant {
          background-color #ffa799
        }
      }
      .dislike {
        position absolute
        top 48px
        right 0
        height 20px
        line-height 20px
        color: #979797;
        cursor pointer
        padding-left 26px
        background-image: url('./images/dislike.png');
        background-repeat: no-repeat;
        background-position: top left;
      }
      .like {
        position absolute
        top 48px
        right 0
        height 20px
        line-height 20px
        color: #c6351e;
        cursor pointer
        padding-left 26px
        background-image: url('./images/like.png');
        background-repeat: no-repeat;
        background-position: top left;
      }
    }
  }
  
  .price {
    width: 1200px;
    height: 60px;
    background-color: #e9e9e9;
    line-height 60px
  }
  
  .price label {
    font-size: 16px;
    color: #666666;
  }
  
  .price a {
    outline none
  }
  
  .money {
    font-size: 24px;
    color: #d91f00;
  }
  
  .triangle_border_nw {
    width: 0;
    height: 0;
    border-width: 15px 15px 0 0;
    border-style: solid;
    border-color: #d91e01 transparent transparent transparent;
    float: left;
    margin-right: 5px;
  }
  
  .buy {
    width: 160px;
    height: 54px;
    display inline-block;
    background-color: #d91e01;
    font-size: 22px;
    color: #ffffff;
    text-align center
    margin-top: 3px;
    float right
    margin-right: 3px
  }
  
  .details-left, .details-right {
    width: 590px;
    height: 180px;
    background-color: #ffffff;
    border-radius: 10px;
    margin-top 16px
  }
  
  .details-left {
    float left
  }
  
  .details-right {
    float right
  }
  
  .details-dot {
    width: 10px;
    height: 10px;
    display inline-block
    background-color: #f3f3f3;
    border-radius 50%
    margin: 10px
    margin-bottom 0
  }
  
  .details-box ul {
    margin-left: 30px;
    font-size 14px
  }
  
  .details-box ul li {
    margin-bottom 18px
  }
  
  .details-box ul li label {
    width: 110px;
    display: inline-block;
    color: #666;
  }
  
  .details-box ul li span {
    color: #222;
  }
  
  .title {
    width: 1200px;
    height: 45px;
    background-color: #ffffff;
    border-radius: 10px 10px 0 0;
    border: solid 1px #e5e5e5;
    margin-top 15px
    margin-bottom 4px
    line-height 45px
    font-size: 18px;
    color: #c82c13;
    .title-source {
      width: 18px;
      height: 20px;
      background: url("./images/belive.png") no-repeat center
      display: inline-block;
      margin-left: 10px;
      margin-right: 3px;
      position: relative;
      top: 4px;
    }
    .check-more {
      font-size: 14px;
      color: #666666;
      cursor pointer
      float right
      margin-right 24px
    }
  }
  
  .more {
    height: auto !important
  }
  
  .transfer-record {
    width: 1200px;
    height: 145px;
    background-color: #ffffff;
    border-radius: 0 0 10px 10px;
    border: solid 1px #e5e5e5;
    margin-bottom 60px
    overflow: hidden;
    .transfer-title {
      height: 54px
      line-height 54px
      .transfer-dot {
        width: 8px;
        height: 8px;
        background-color: #dcdcdc;
        display: inline-block;
        border-radius: 50%;
        margin-left: 18px;
        margin-right: 2px;
        margin-bottom: 2px;
      }
      label {
        font-size: 18px;
        color: #333333;
      }
    }
    .transfer-container {
      margin-left 30px
      line-height normal
      margin-bottom: 27px;
      ul {
        margin-bottom 27px
        li {
          label {
            color: #333333
            width: 84px;
            display: inline-block;
          }
          span {
            color: #666666;
          }
        }
      }
    }
  }
  
  .evaluate {
    .title {
      .reliability {
        font-size: 18px;
        color: #666666;
        float: right;
        margin-right: 54px;
        span {
          font-size: 28px;
          color: #d91e01;
        }
      }
    }
    .evaluate-container {
      width: 1200px;
      height: auto;
      background-color: #fff;
      border-radius: 0 0 10px 10px;
      border: solid 1px #e5e5e5;
      .evaluate-tabs {
        width: 1160px;
        height: 30px;
        background-color: #f7f7f7;
        margin: 0 auto
        margin-top 14px
        margin-bottom 22px
        font-size: 12px;
        color: #666666;
        ul {
          margin-left 70px
          li {
            width: auto
            float left
            height 30px
            margin-right 50px
            input {
              width: 100%
              height: 100%
              opacity 0
              cursor pointer
              position: relative;
              z-index: 10;
            }
            span {
              position: relative;
              bottom: 22px;
            }
            input:checked + span {
              color: #d91e01;
            }
          }
        }
      }
      .evaluate-details {
        margin: 0 18px;
        ul {
          li:last-child {
            border-bottom none
          }
          li {
            border-bottom 1px solid #dcdcdc
            .buyer {
              margin: 12px 0;
              .buyer-info {
                font-size: 12px;
                color: #333333;
                width: 160px
                text-align right
                margin-right 30px
                float left
                p:last-child {
                  color: #999999;
                }
              }
              .buyer-details {
                width: 970px;
                float: right;
                .buyer-action {
                  float right
                  font-size: 12px
                  color: #333333;
                  width: 100px;
                  cursor pointer
                  .thumbs-up-no {
                    float: left;
                    margin-right: 10px;
                    span:first-child {
                      width: 17px;
                      height: 15px;
                      display inline-block
                      background: url("./images/bad.png") no-repeat center
                    }
                    .num {
                      position: relative;
                      bottom: 2px;
                    }
                  }
                  .thumbs-up-yes {
                    float: left;
                    margin-right: 10px;
                    span:first-child {
                      width: 17px;
                      height: 15px;
                      display inline-block
                      background: url("./images/good.png") no-repeat center
                    }
                    .num {
                      position: relative;
                      bottom: 2px;
                    }
                  }
                  .reply {
                    float: right;
                    margin-right: 20px;
                    .num {
                      position: relative;
                      bottom: 3px;
                    }
                  }
                }
                .buyer-text {
                  font-size: 12px;
                  color: #666666;
                  line-height normal
                  margin-top: 8px;
                }
                .buyer-img {
                  margin-bottom: 14px;
                  ul {
                    margin 14px 0
                    li {
                      width: 50px;
                      height: 50px;
                      float left
                      margin-right 12px
                      cursor pointer
                      input {
                        width: 50px;
                        height: 50px;
                        opacity: 0;
                        position: relative;
                        z-index: 10;
                        cursor pointer
                      }
                      input:checked + img {
                        border: 1px solid red;
                      }
                      img {
                        width: 100%
                        height: 100%
                        position: relative;
                        bottom: 52px;
                        border: solid 1px #eeeeee;
                      }
                    }
                  }
                  .big-img {
                    width: 200px;
                    height: 200px;
                    border: solid 1px #eeeeee;
                    margin-top: 14px;
                    cursor: pointer;
                    img {
                      width: 100%
                      height: 100%
                    }
                  }
                }
              }
            }
            .seller {
              padding-bottom 16px
              .seller-info {
                font-size: 12px;
                color: #999;
                width: 160px;
                text-align: right;
                margin-right: 30px;
                float: left;
                p:first-child {
                  padding-top: 20px;
                }
              }
              .seller-details {
                width: 970px;
                float: right;
                font-size: 12px;
                color: #ff8e7d;
                line-height normal
                border-top: solid 1px #eeeeee;
                padding-top 16px
              }
            }
          }
        }
      }
    }
  }

</style>
<style>
  .evaluate .el-dialog__body {
    padding: 20px
  }
  
  .evaluate .el-textarea__inner {
    height: 200px;
  }
</style>
