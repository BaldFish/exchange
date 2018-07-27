<template>
  <div class="moreCase">
    <my-topSearch></my-topSearch>
    <div class="site_box">
      <div class="site">
        <ul>
          <li>当前位置 ：</li>
          <li><a href="#/">首页></a></li>
          <li><a href="#/moreCase">维修案例</a></li>
        </ul>
      </div>
    </div>
    <div class="case_list">
      <div class="fr_case" v-for="(item,index) of caseList" :key="item.Id">
        <h4><a href="#/caseDetails" @click="getCaseDetails(item.Id)">{{item.Assetname}}</a></h4>
        <div class="attestation">
          <span class="merchant" v-if="item.AuthType==='认证商家'">{{item.AuthType}}</span>
          <span class="person" v-if="item.AuthType==='认证个人'">{{item.AuthType}}</span>
          <span class="trust" v-if="item.CreditLevel!=='未认证'">{{item.CreditLevel}}</span>
        </div>
        <div class="putaway">
          <a class="time" href="#/caseDetails" @click="getCaseDetails(item.Id)"><span>上架时间：</span>{{item.SellAt}}</a>
          <a class="equity" href="#/caseDetails" @click="getCaseDetails(item.Id)"><span>权益：</span>{{item.SellType}}</a>
        </div>
        <div class="belong">
          <a href="#/caseDetails" @click="getCaseDetails(item.Id)">
            <span>所属人：</span>{{item.Assetowner}}
          </a>
        </div>
        <div class="fault">
          <p>
            <a href="#/caseDetails" @click="getCaseDetails(item.Id)">
              <span>故障现象：</span>{{item.AssetContent}}
            </a>
          </p>
        </div>
        <div :class="item.ShopCartId?'like':'dislike'" @click="toggleLike(item.Id)">收藏</div>
        <div class="price_box">
          <a href="#/caseDetails" @click="getCaseDetails(item.Id)"><p class="price">{{item.Price}}</p></a>
          <a href="#/caseSource" @click="getCaseSource(item.Id)"><p class="tracing">可信溯源</p></a>
          <a href="javascript:void(0)" @click="buy(item.Id)"><p class="buy">一键购买</p></a>
        </div>
      </div>
    </div>
    <div class="clearfix paging">
      <el-pagination class="my_paging"
                     layout="prev, pager, next"
                     :background=true
                     :total=total
                     :page-size=caseLimit
                     :current-page.sync=casePage
                     @current-change="handleCurrentChange">
      </el-pagination>
    </div>
  </div>
</template>

<script>
  import "../../common/stylus/paging.styl";
  import axios from "axios";
  import _ from "lodash";
  import {baseURL,cardURL} from '@/common/js/public.js';
  import myTopSearch from "../topSearch/topSearch";
  const querystring = require('querystring');
  
  export default {
    name: "moreCase",
    data() {
      return {
        casePage: 1,
        caseLimit: 10,
        total: 10,
        caseList: [],
        userId:"",
        token:"",
        apiKey:"",
        assetId:"",
        id:"",
        
      }
    },
    mounted() {
      if(JSON.parse(sessionStorage.getItem("loginInfo"))){
        this.userId=JSON.parse(sessionStorage.getItem("loginInfo")).user_id;
        this.token=JSON.parse(sessionStorage.getItem("loginInfo")).token;
      }
      this.acquireCaseList()
    },
    methods: {
      open() {
        this.$confirm('此操作需要先登录, 是否登录?', '提示', {
          confirmButtonText: '是',
          cancelButtonText: '否',
          type: 'warning',
          center: true
        }).then(() => {
          window.location.href="#/login"
        }).catch(() => {
        });
      },
      toggleLike(val){
        if(sessionStorage.getItem("loginInfo")){
          let likeInfo=_.find(this.caseList,function (o) {
            return o.Id===val
          });
          this.apiKey=likeInfo.Apikey;
          this.assetId=likeInfo.Assetid;
          this.id=likeInfo.ShopCartId;
          if(likeInfo.ShopCartId===""){
            axios({
              method: "POST",
              url: `${baseURL}/v1/shopcart/${this.userId}/${this.apiKey}/${this.assetId}`,
              headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                "X-Access-Token":this.token
              }
            }).then((res) => {
              this.id=res.data._id;
              likeInfo.ShopCartId=res.data._id;
              this.addCollection()
            }).catch((err) => {
              console.log(err);
            });
          }else if(likeInfo.ShopCartId!==""){
            axios({
              method: "DELETE",
              url: `${baseURL}/v1/shopcart/${this.userId}/${this.id}`,
              headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                "X-Access-Token":this.token
              }
            }).then((res) => {
              likeInfo.ShopCartId="";
              this.subtractCollection()
            }).catch((err) => {
              console.log(err);
            });
          }
        }else {
          this.open()
        }
      },
      acquireCaseList() {
        //获取维修案例列表
        if(JSON.parse(sessionStorage.getItem("loginInfo"))){
          axios({
            method: "GET",
            url: `${baseURL}/v1/asset/casus?page=${this.casePage}&limit=${this.caseLimit}&userid=${this.userId}`,
            headers: {
              "Content-Type": "application/json",
            }
          }).then((res) => {
            this.total=res.data.count;
            this.caseList = res.data.data;
          }).catch((err) => {
            console.log(err);
          })
        }else {
          axios({
            method: "GET",
            url: `${baseURL}/v1/asset/casus?page=${this.casePage}&limit=${this.caseLimit}`,
            headers: {
              "Content-Type": "application/json",
            }
          }).then((res) => {
            this.total=res.data.count;
            this.caseList = res.data.data;
          }).catch((err) => {
            console.log(err);
          })
        }
      },
      handleCurrentChange(val){
        this.casePage=val;
        this.acquireCaseList()
      },
      getCaseDetails(val) {
        this.$store.commit("changeCaseDetails",_.find(this.caseList,function (o) {
          return o.Id===val
        }));
      },
      getCaseSource(val) {
        this.$store.commit("changeCaseSource",_.find(this.caseList,function (o) {
          return o.Id===val
        }));
      },
      addCollection(){
        this.$store.commit("addCollection")
      },
      subtractCollection(){
        this.$store.commit("subtractCollection")
      },
      buy(val){
        if(JSON.parse(sessionStorage.getItem("loginInfo"))){
          let buyInfo=_.find(this.caseList,function (o) {
            return o.Id===val
          });
          this.apiKey=buyInfo.Apikey;
          this.assetId=buyInfo.Assetid;
          var data={};
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
            let buyInfoObj={};
            buyInfoObj.buyInfo=buyInfo;
            buyInfoObj.buyInfo.Count=1;
            buyInfoObj.turnInfo=res.data;
            this.getBuy(buyInfoObj);
            window.location.href="#/checkOrder"
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
    components: {
      myTopSearch,
    },
  }
</script>

<style scoped lang="stylus">
  .moreCase {
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
            a{
              color #ffffff
            }
          }
        }
      }
    }
    .case_list {
      width 1212px
      margin 0 auto
      padding-top 30px
      .fr_case {
        margin-bottom 18px
        position relative
        box-sizing border-box
        width 1198px
        height 220px
        background-color rgba(255, 255, 255, 0.8)
        /*opacity: 0.8;*/
        padding 15px 20px
        h4 {
          width 1060px
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          a {
            color: #222222;
            font-size: 20px;
          }
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
            margin-top 14px
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
        .putaway {
          a {
            padding-left 26px
            padding-top 2px
            padding-bottom 2px
            color #666666;
            font-size 14px
            margin-right 43px
            background-repeat: no-repeat;
            background-position: top left;
            line-height 22px
            span {
              color #222222;
              font-size 16px
            }
          }
          .time {
            background-image: url('./images/time.png');
          }
          .equity {
            background-image: url('./images/Profit.png');
          }
        }
        .belong{
          a{
            display block
            line-height 22px
            padding-left 26px
            background-image: url('./images/person.png');
            background-repeat: no-repeat;
            background-position: top left;
            color #666666;
            font-size 14px;
            span{
              color #222222;
              font-size 16px
            }
          }
        }
        .fault {
          p {
            padding-top 4px
            width 562px
            height 54px
            line-height 18px
            a {
              color #666666;
              font-size 14px
              display block
              display: -webkit-box;
              -webkit-box-orient: vertical;
              -webkit-line-clamp: 3;
              overflow: hidden;
              span {
                font-size 16px
                color #222222;
              }
            }
          }
        }
        .dislike {
          position absolute
          top 15px
          right 30px
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
          top 15px
          right 30px
          height 20px
          line-height 20px
          color: #c6351e;
          cursor pointer
          padding-left 26px
          background-image: url('./images/like.png');
          background-repeat: no-repeat;
          background-position: top left;
        }
        .price_box {
          position absolute
          top 78px
          left 1000px
          .price {
            min-width 18px
            height 24px
            font-size: 24px;
            color: #c6351e;
            background-image: url('./images/currency.png');
            background-repeat: no-repeat;
            background-position: top left;
            padding-left 26px
            margin-bottom 8px
          }
          .tracing {
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
          .buy {
            width 114px
            height 36px
            background-color #c6351e
            color #ffffff
            font-size 18px
            line-height 36px
            text-align center
          }
        }
      }
    }
  }
</style>

