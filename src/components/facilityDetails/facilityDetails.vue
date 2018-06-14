<template>
  <div class="facilityDetails">
    <my-topSearch></my-topSearch>
    <div class="site_box">
      <div class="site">
        <ul>
          <li>当前位置 ：</li>
          <li>首页></li>
          <li>维修案例></li>
          <li>{{facilityDetails.Assetname}}</li>
        </ul>
      </div>
    </div>
    <div class="details">
      <div class="clearfix details_top">
        <div class="fl facility_img">
          <img :src="facilityDetails.Asseturl" alt="">
        </div>
        <div class="fr facility_intro">
          <h4>{{facilityDetails.Assetname}}</h4>
          <div class="attestation">
            <span class="merchant" v-if="facilityDetails.AuthType==='认证商家'">{{facilityDetails.AuthType}}</span>
            <span class="person" v-if="facilityDetails.AuthType==='认证个人'">{{facilityDetails.AuthType}}</span>
            <span class="trust" v-if="facilityDetails.CreditLevel!=='未认证'">{{facilityDetails.CreditLevel}}</span>
          </div>
          <div :class="facilityDetails.InShopCart?'like':'dislike'" @click="toggleLike(facilityDetails.Id)">收藏</div>
          <a href="#/facilitySource" @click="getFacilitySource"><p class="tracing">可信溯源</p></a>
          <div class="intro_list">
            <ul>
              <li>
                <span>资产所属人</span>
                <span class="holder">：{{facilityDetails.Assetowner}}</span>
              </li>
              <li>
                <span>权益</span>
                <span>：{{facilityDetails.SellType}}</span>
              </li>
              <li>
                <span>价格</span>
                <span>：{{facilityDetails.Price}}</span>
              </li>
              <li>
                <span>案例ID</span>
                <span>：{{facilityDetails.Id}}</span>
              </li>
              <li>
                <span>上架时间</span>
                <span>：{{facilityDetails.SellAt}}</span>
              </li>
            </ul>
            <a href="#/checkOrder"><p class="buy">一键购买</p></a>
          </div>
        </div>
      </div>
      <div class="intro_text">
        <span>设备简介</span>
        <p>{{facilityDetails.AssetContent}}</p>
      </div>
    </div>
  </div>
</template>

<script>
  import axios from "axios";
  import myTopSearch from "../topSearch/topSearch"
  import {baseURL,cardURL} from '@/common/js/public.js';
  export default {
    name: "facilityDetails",
    data() {
      return {
        facilityDetails:{},
        userId:"",
        token:"",
        apiKey:"",
        assetId:"",
        id:"",
      }
    },
    mounted() {
      this.facilityDetails=JSON.parse(sessionStorage.getItem("facilityDetails"));
      this.apiKey=this.facilityDetails.Apikey;
      this.assetId=this.facilityDetails.Assetid;
      this.acquireFacilityDetails()
    },
    methods: {
      toggleLike(val){
        if(sessionStorage.getItem("loginInfo")){
          let likeInfo=this.facilityDetails;
          console.log(likeInfo);
          this.token=JSON.parse(sessionStorage.getItem("loginInfo")).token;
          this.userId=JSON.parse(sessionStorage.getItem("loginInfo")).user_id;
          this.apiKey=likeInfo.Apikey;
          this.assetId=likeInfo.Assetid;
          //this.id=likeInfo.Id;
          console.log(this.apiKey,this.assetId);
          if(likeInfo.InShopCart===0){
            axios({
              method: "POST",
              url: `${baseURL}/v1/shopcart/${this.userId}/${this.apiKey}/${this.assetId}`,
              headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                "X-Access-Token":this.token
              }
            }).then((res) => {
              console.log(res);
              this.id=res.data._id;
              console.log(this.id);
              likeInfo.InShopCart=1
            }).catch((err) => {
              console.log(err);
            });
            likeInfo.InShopCart=1
          }else if(likeInfo.InShopCart===1){
            console.log(this.id);
            axios({
              method: "DELETE",
              url: `${baseURL}/v1/shopcart/${this.userId}/${this.id}`,
              headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                "X-Access-Token":this.token
              }
            }).then((res) => {
              console.log(11111111111);
              likeInfo.InShopCart=0
            }).catch((err) => {
              console.log(err);
            });
          }
        }
      },
      acquireFacilityDetails(){
        axios({
          method: "GET",
          url: `${baseURL}/v1/asset/${this.apiKey}/${this.assetId}/detail`,
          headers: {
            "Content-Type": "application/json",
          }
        }).then((res) => {
          this.facilityDetails=res.data
        }).catch((err) => {
          console.log(err);
        })
      },
      getFacilitySource(val) {
        this.$store.commit("changeFacilitySource",this.facilityDetails);
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
  .facilityDetails{
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
      .details_top{
        .facility_img{
          box-sizing border-box
          background-color: #ffffff;
          display: table-cell;
          width: 280px;
          height: 280px;
          vertical-align: middle;
          text-align: center;
          img {
            vertical-align: middle;
            position: relative;
            top: 50%;
            transform: translateY(-50%);
          }
        }
        .facility_intro{
          width 904px
          h4 {
            width 770px
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            color: #222222;
            font-size: 20px;
          }
          .attestation {
            width 850px
            height 78px
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
            top 78px
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
