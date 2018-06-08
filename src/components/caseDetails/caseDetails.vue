<template>
  <div class="caseDetails">
    <my-topSearch></my-topSearch>
    <div class="site_box">
      <div class="site">
        <ul>
          <li>当前位置 ：</li>
          <li>首页></li>
          <li>维修案例></li>
          <li>奔驰E20456785676540发动机怠速时抖动严重发动机严重动严严重发动重发动机有音可动机有音可奔驰E20456785676540发动机怠速时抖动严重发动机严重动严严重发动重发动机有音可动机有音可</li>
        </ul>
      </div>
    </div>
    <div class="details">
      <h4>{{caseDetails.Assetname}}</h4>
      <div class="attestation">
        <span class="merchant" v-if="caseDetails.AuthType==='认证商家'">{{caseDetails.AuthType}}</span>
        <span class="person" v-if="caseDetails.AuthType==='认证个人'">{{caseDetails.AuthType}}</span>
        <span class="trust" v-if="caseDetails.CreditLevel!=='未认证'">{{caseDetails.CreditLevel}}</span>
      </div>
      <div class="like">收藏</div>
      <a href="#/caseSource" @click="getCaseSource(caseDetails)"><p class="tracing">可信溯源</p></a>
      <div class="intro_list">
        <ul>
          <li>
            <span>资产所属人</span>
            <span class="holder">：{{caseDetails.Assetowner}}</span>
          </li>
          <li>
            <span>权益</span>
            <span>：{{caseDetails.SellType}}</span>
          </li>
          <li>
            <span>价格</span>
            <span>：{{caseDetails.Price}}</span>
          </li>
          <li>
            <span>案例ID</span>
            <span>：{{caseDetails.Id}}</span>
          </li>
          <li>
            <span>上架时间</span>
            <span>：{{caseDetails.SellAt}}</span>
          </li>
        </ul>
        <a href="#/checkOrder"><p class="buy">一键购买</p></a>
      </div>
      <div class="intro_text">
        <span>案例简介</span>
        <p>{{caseDetails.AssetContent}}</p>
      </div>
    </div>
  </div>
</template>

<script>
  import axios from "axios";
  import myTopSearch from "../topSearch/topSearch"
  import {baseURL,cardURL} from '@/common/js/public.js';
  export default {
    name: "caseDetails",
    data() {
      return {
        caseDetails:{},
        apiKey:"",
        assetId:""
      }
    },
    created() {
    },
    mounted() {
      this.caseDetails=JSON.parse(sessionStorage.getItem("caseDetails"))
      this.apiKey=this.caseDetails.Apikey;
      this.assetId=this.caseDetails.Assetid;
      axios({
        method: "GET",
        url: `${baseURL}/v1/asset/${this.apiKey}/${this.assetId}/detail`,
        headers: {
          "Content-Type": "application/json",
        }
      }).then((res) => {
        this.caseDetails=res.data
      }).catch((err) => {
        console.log(err);
      })
    },
    methods: {
      getCaseSource(val) {
        this.$store.commit("changeCaseSource",val);
      },
    },
    watch: {},
    computed: {},
    components: {
      myTopSearch
    },
  }
</script>

<style scoped lang="stylus">
  .caseDetails {
    .site_box {
      width 100%
      background-color #7d7d7d;
      .site {
        width 1212px
        height 40px
        line-height 40px
        margin 0 auto
        ul {
          padding-left 8px
          font-size 0
          color #ffffff
          li {
            vertical-align top
            display inline-block
            font-size 20px
          }
          li:last-child{
            width 500px
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
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
      .like {
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
</style>
