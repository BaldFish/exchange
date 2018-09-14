<template>
  <div class="caseDetails">
    <div class="site_box">
      <div class="site">
        <ul>
          <li>当前位置 ：</li>
          <li><a href="/">首页</a></li>
          <li>&nbsp;>&nbsp;</li>
          <li><a href="/moreCase">维修案例</a></li>
          <li>&nbsp;>&nbsp;</li>
          <li>{{caseDetails.assetname}}</li>
        </ul>
      </div>
    </div>
    <div class="details">
      <h4>{{caseDetails.assetname}}</h4>
      <div class="attestation">
        <span class="merchant" v-if="caseDetails.authtype==='认证商家'">{{caseDetails.authtype}}</span>
        <span class="person" v-if="caseDetails.authtype==='认证个人'">{{caseDetails.authtype}}</span>
        <span class="trust" v-if="caseDetails.creditlevel!=='未认证'">{{caseDetails.creditlevel}}</span>
      </div>
      <div :class="caseDetails.shopcart_id?'like':'dislike'" @click="toggleLike(caseDetails.id)">收藏</div>
      <!--<a href="/caseSource" @click="getCaseSource"><p class="tracing">可信溯源</p></a>-->
      <div class="price">
        <span class="triangle_border_nw"></span>
        <label>此诊断报告价格：</label>
        <span class="money">{{caseDetails.price}}</span>
        <a href="javascript:void(0)" @click="buy(caseDetails.id)"><p class="buy">一键购买</p></a>
      </div>

      <div class="details-box">
        <div class="details-left">
          <span class="details-dot"></span>
          <ul>
            <li>
              <label>资产所属人</label>
              <span>：{{caseDetails.assetowner}}</span>
            </li>
            <li>
              <label>权益</label>
              <span>：{{caseDetails.sell_type}}</span>
            </li>
            <li>
              <label>价格</label>
              <span>：{{caseDetails.price}}</span>
            </li>
          </ul>
        </div>
        <div class="details-right">
          <span class="details-dot"></span>
          <ul>
            <li>
              <label>案例ID</label>
              <span>：{{caseDetails.id}}</span>
            </li>
            <li>
              <label>上架时间</label>
              <span>：{{caseDetails.sell_at}}</span>
            </li>
          </ul>
        </div>
      </div>
      <div style="clear: both"></div>

      <div class="title">
        <span class="title-intro"></span>
        <span class="title-text">案例简介</span>
      </div>
      <div class="intro_detail">
        <p>{{caseDetails.assetcontent}}</p>
      </div>

      <div class="title">
        <span class="title-source"></span>
        <span class="title-text">可信溯源</span>
        <span class="check-more" v-if="!isShow" @click="caseSource != ''?isShow = true:isShow = false">显示更多</span>
        <span class="check-more" v-if="isShow" @click="caseSource != ''?isShow = false:isShow = true">收起更多</span>
      </div>
      <div class="transfer-record" :class="{more:isShow}">
        <div class="transfer-title">
          <span class="transfer-dot"></span>
          <label>资产转让记录</label>
        </div>
        <div class="transfer-container">
          <ul v-for="(item,index) of caseSource" :key="item.id">
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
              <span>："{{item.updated_at}}"</span>
            </li>
          </ul>
        </div>
      </div>


    </div>
  </div>
</template>

<script>
  import axios from "axios";
  import {baseURL,cardURL} from '@/common/js/public.js';
  import utils from "@/common/js/utils.js";
  const querystring = require('querystring');
  
  export default {
    name: "caseDetails",
    components: {},
    data() {
      return {
        toggleIndex: 0,
        caseDetails:{},
        caseSource:[],
        userId:"",
        token:"",
        apiKey:"",
        assetId:"",
        id:"",
        isShow:false
      }
    },
    mounted() {
      if(JSON.parse(sessionStorage.getItem("loginInfo"))){
        this.userId=JSON.parse(sessionStorage.getItem("loginInfo")).user_id;
        this.token=JSON.parse(sessionStorage.getItem("loginInfo")).token;
      }
      this.apiKey=JSON.parse(sessionStorage.getItem("caseDetails")).apikey;
      this.assetId=JSON.parse(sessionStorage.getItem("caseDetails")).assetid;
      this.acquireCaseSource();
      this.acquireCaseDetails()
    },
    watch: {},
    computed: {},
    methods: {
      open() {
        this.$confirm('此操作需要先登录, 是否登录?', '提示', {
          confirmButtonText: '是',
          cancelButtonText: '否',
          type: 'warning',
          center: true
        }).then(() => {
          this.$router.push("/login")
        }).catch(() => {
        });
      },
      toggleLike(val){
        if(sessionStorage.getItem("loginInfo")){
          let likeInfo=this.caseDetails;
          this.apiKey=likeInfo.apikey;
          this.assetId=likeInfo.assetid;
          if(likeInfo.shopcart_id===""){
            axios({
              method: "POST",
              url: `${baseURL}/v1/shopcart/${this.userId}/${this.apiKey}/${this.assetId}`,
              headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                "X-Access-Token":this.token
              }
            }).then((res) => {
              this.id=res.data._id;
              likeInfo.shopcart_id=this.id
              this.addCollection()
            }).catch((err) => {
              console.log(err);
            });
          }else if(likeInfo.shopcart_id!==""){
            this.id=likeInfo.shopcart_id;
            axios({
              method: "DELETE",
              url: `${baseURL}/v1/shopcart/${this.userId}/${this.id}`,
              headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                "X-Access-Token":this.token
              }
            }).then((res) => {
              likeInfo.shopcart_id="";
              this.subtractCollection()
            }).catch((err) => {
              console.log(err);
            });
          }
        }else {
          this.open()
        }
      },
      acquireCaseSource(){
        axios({
          method: "GET",
          url: `${cardURL}/v1/transed-asset/${this.assetId}/apikey/${this.apiKey}?page=0&limit=1000000`,
          headers: {
            "Content-Type": "application/json",
          }
        }).then((res) => {
          if (res.data.data != null) {
            for(let v of res.data.data){
              v.updated_at=utils.formatDate(new Date(v.updated_at), "yyyy-MM-dd hh:mm:ss");
            }
            this.caseSource = res.data.data
          }else{
            this.caseSource =[]
          }
        }).catch((err) => {
          console.log(err);
        })
      },
      acquireCaseDetails(){
        if(JSON.parse(sessionStorage.getItem("loginInfo"))){
          axios({
            method: "GET",
            url: `${baseURL}/v1/asset/${this.apiKey}/${this.assetId}/detail?userid=${this.userId}`,
            headers: {
              "Content-Type": "application/json",
            }
          }).then((res) => {
            res.data.sell_at=utils.formatDate(new Date(res.data.sell_at), "yyyy-MM-dd hh:mm:ss");
            this.caseDetails=res.data;
          }).catch((err) => {
            console.log(err);
          })
        }else{
          axios({
            method: "GET",
            url: `${baseURL}/v1/asset/${this.apiKey}/${this.assetId}/detail`,
            headers: {
              "Content-Type": "application/json",
            }
          }).then((res) => {
            res.data.sell_at=utils.formatDate(new Date(res.data.sell_at), "yyyy-MM-dd hh:mm:ss");
            this.caseDetails=res.data;
          }).catch((err) => {
            console.log(err);
          })
        }
      },
/*      getCaseSource() {
        this.$store.commit("changeCaseSource",this.caseDetails);
      },*/
      addCollection(){
        this.$store.commit("addCollection")
      },
      subtractCollection(){
        this.$store.commit("subtractCollection")
      },
      buy(val){
        if(JSON.parse(sessionStorage.getItem("loginInfo"))){
          let buyInfoObj=this.caseDetails;
          this.apiKey=buyInfoObj.apikey;
          this.assetId=buyInfoObj.assetid;
          let data={};
          data.nums=1;
          axios({
            method: "POST",
            url: `${baseURL}/v1/order/${this.userId}/${this.apiKey}/${this.assetId}`,
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
              "X-Access-Token":this.token,
            },
            data:querystring.stringify(data),
          }).then((res) => {
            buyInfoObj=res.data;
            this.getBuy(buyInfoObj);
            this.$router.push("/checkOrder")
          }).catch((err) => {
            console.log(err);
          })
        }else{
          this.open()
        }
      },
      getBuy(val){
        this.$store.commit("changeBuy",val);
      }
    },
  }
</script>

<style scoped lang="stylus">
  .caseDetails {
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
            a{
              color: #666666;
            }
          }
        }
      }
    }
    .details {
      width 1200px
      padding-top 42px
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
      .tracing {
        position absolute
        top 83px
        right 0
        color: #f3b43f;
        font-size 14px
        background-image: url('./images/credible.png');
        background-repeat: no-repeat;
        background-position: top left;
        padding-left 26px
        height 18px
        line-height 18px
        margin-bottom 24px
      }
      .intro_list{
        box-sizing border-box
        min-height 180px
        padding 20px 30px 5px
        background-color #ffffff
        position relative
        .buy{
          position absolute
          top 88px
          right 60px
          width 170px
          height 54px
          background-color #c6351e
          color #ffffff
          font-size 22px
          line-height 54px
          text-align center
        }
        li{
          font-size 0
          color: #222222;
          margin-bottom 15px
          span{
            display inline-block
            font-size 16px
            vertical-align top
          }
          span:first-child{
            width 80px
          }
        }
      }
      .intro_text{
        box-sizing border-box
        min-height 180px
        margin-top 22px
        margin-bottom 70px
        padding 20px 30px
        background-color #ffffff
        border 1px solid #bfbfbf;
        span{
          color: #000000;
          font-size: 18px;
        }
        p{
          margin 18px 50px 30px 36px
          color: #666666;
          font-size: 14px;
        }
      }
    }
  }
  .price{
    width: 1200px;
    height: 60px;
    background-color: #e9e9e9;
    line-height 60px
    label{
      font-size: 16px;
      color: #666666;
    }
    a{
      outline none
      .buy{
        width: 160px;
        height: 54px;
        display inline-block;
        background-color: #d91e01;
        font-size: 22px;
        color: #ffffff;
        text-align center
        margin-top: 3px;
        float right
        margin-right:3px
      }
    }
    .money{
      font-size: 24px;
      color: #d91f00;
    }
    .triangle_border_nw{
      width: 0;
      height: 0;
      border-width: 15px 15px 0 0;
      border-style: solid;
      border-color: #d91e01 transparent transparent transparent;
      float: left;
      margin-right: 5px;
    }
  }
  .details-box{
    ul{
      margin-left: 30px;
      font-size 14px
      li{
        margin-bottom 18px
        label{
          width: 110px;
          display: inline-block;
          color: #666;
        }
        span{
          color: #222;
        }
      }
    }
    .details-left{
      float left
      width: 590px;
      height: 125px;
      background-color: #ffffff;
      border-radius: 10px;
      margin-top 16px
      margin-bottom: 20px;
      .details-dot{
        width: 10px;
        height: 10px;
        display inline-block
        background-color: #f3f3f3;
        border-radius 50%
        margin:10px
        margin-bottom 0
      }
    }
    .details-right{
      float right
      width: 590px;
      height: 125px;
      background-color: #ffffff;
      border-radius: 10px;
      margin-top 16px
      margin-bottom: 20px;
      .details-dot{
        width: 10px;
        height: 10px;
        display inline-block
        background-color: #f3f3f3;
        border-radius 50%
        margin:10px
        margin-bottom 0
      }
    }
  }
  .title{
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
    .title-intro{
      width: 18px;
      height: 20px;
      background:url("./images/case.png") no-repeat center
      display: inline-block;
      margin-left: 10px;
      margin-right: 3px;
      position: relative;
      top: 4px;
    }
    .title-source{
      width: 18px;
      height: 20px;
      background:url("./images/belive.png") no-repeat center
      display: inline-block;
      margin-left: 10px;
      margin-right: 3px;
      position: relative;
      top: 4px;
    }
    .check-more{
      font-size: 14px;
      color: #666666;
      cursor pointer
      float right
      margin-right 24px
    }
  }
  .more{
    height:auto !important
  }
  .transfer-record{
    width: 1200px;
    height: 145px;
    background-color: #ffffff;
    border-radius: 0 0 10px 10px;
    border: solid 1px #e5e5e5;
    margin-bottom 60px
    overflow: hidden;
    .transfer-title{
      height:54px
      line-height 54px
      .transfer-dot{
        width: 8px;
        height: 8px;
        background-color: #dcdcdc;
        display: inline-block;
        border-radius: 50%;
        margin-left: 18px;
        margin-right: 2px;
        margin-bottom: 2px;
      }
      label{
        font-size: 18px;
        color: #333333;
      }
    }
    .transfer-container{
      margin-left 30px
      line-height normal
      margin-bottom: 27px;
      ul{
        margin-bottom 27px
        li{
          label{
            color: #333333
            width: 84px;
            display: inline-block;
          }
          span{
            color: #666666;
          }
        }
      }
    }
  }
  .intro_detail{
    width: 1200px;
    height: 145px;
    background-color: #fff;
    border-radius: 0 0 10px 10px;
    border: solid 1px #e5e5e5;
    margin-bottom: 20px;
    p{
      line-height: 18px
      padding: 20px 30px;
    }
  }

</style>
