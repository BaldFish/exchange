<template>
  <div class="home">
    <my-topSearch></my-topSearch>
  <!--  <a href="#/publicityPage">
      <div class="banner"></div>
    </a>-->

    <template>
      <el-carousel :interval="3000" arrow="always" height="600px">
        <el-carousel-item v-for="item in bannerList" :key="item.url">
          <a :href="item.url">
            <img :src="item.img" alt="">
          </a>
        </el-carousel-item>
      </el-carousel>
    </template>

    <div class="list">
      <div class="case clearfix">
        <div class="fl fl_bg">
          <h3>维修案例</h3>
          <a href="#/moreCase">查看更多</a>
        </div>
        <div class="fr fr_case" v-for="(item,index) of caseList" :key="item.Id">
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
          <div class="price_box">
            <a href="#/caseDetails" @click="getCaseDetails(item.Id)"><p class="price">{{item.Price}}</p></a>
            <a href="#/caseSource" @click="getCaseSource(item.Id)"><p class="tracing">可信溯源</p></a>
          </div>
        </div>
      </div>
      <div class="facility clearfix">
        <div class="fl fl_bg">
          <h3>维修设备</h3>
          <a href="#/moreFacility">查看更多</a>
        </div>
        <div class="fr fr_facility">
          <div class="fl facility_info" v-for="(item,index) of facilityList" :key="item.Id">
            <a href="#/facilityDetails" @click="getFacilityDetails(item.Id)"><h4>{{item.Assetname}}</h4></a>
            <div class="belong">
              <a href="#/facilityDetails" @click="getFacilityDetails(item.Id)">
                <span>所属人：</span>{{item.Assetowner}}
              </a>
            </div>
            <div class="putaway">
              <a class="time" href="#/facilityDetails" @click="getFacilityDetails(item.Id)"><span>上架时间：</span>{{item.SellAt}}</a>
              <a class="equity" href="#/facilityDetails" @click="getFacilityDetails(item.Id)"><span>权益：</span>{{item.SellType}}</a>
            </div>
            <div class="fl price_box">
              <a href="#/facilityDetails" @click="getFacilityDetails(item.Id)"><p class="price">{{item.Price}}</p></a>
              <a href="#/facilitySource" @click="getFacilitySource(item.Id)"><p class="tracing">可信溯源</p></a>
            </div>
            <div class="fr facility_img">
              <a href="#/facilityDetails" @click="getFacilityDetails(item.Id)"><img :src="item.Asseturl" alt=""></a>
            </div>
            <div class="attestation clearfix">
              <span class="merchant" v-if="item.AuthType==='认证商家'">{{item.AuthType}}</span>
              <span class="person" v-if="item.AuthType==='认证个人'">{{item.AuthType}}</span>
              <span class="trust" v-if="item.CreditLevel!=='未认证'">{{item.CreditLevel}}</span>
            </div>
          </div>
        </div>
      </div>
      <div class="partner clearfix">
        <div class="fl fl_bg">
          <h3>合作伙伴</h3>
        </div>
        <div class="fr fr_partner">
          <div class="fl partner_img">
            <img src="./images/06.png" alt="">
          </div>
          <div class="fl partner_img">
            <img src="./images/06.png" alt="">
          </div>
          <div class="fl partner_img">
            <img src="./images/06.png" alt="">
          </div>
          <div class="fl partner_img">
            <img src="./images/07.png" alt="">
          </div>
          <div class="fl partner_img">
            <img src="./images/07.png" alt="">
          </div>
          <div class="fl partner_img">
            <img src="./images/07.png" alt="">
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import axios from "axios";
  import _ from "lodash";
  import {baseURL,cardURL} from '@/common/js/public.js';
  import myTopSearch from "../topSearch/topSearch"

  export default {
    name: "home",
    data() {
      return {
        casePage: 1,
        caseLimit: 3,
        facilityPage: 1,
        facilityLimit: 6,
        caseList:[],
        facilityList:[],
        userId:"",
        token:"",
        //用webpack搭建的项目不能直接使用绝对路径，要用require，如果不使用这个，必须是线上图片。http类型的
        bannerList:[
          {url:'javascript:void(0)',img:require('./images/banner.png')},
          {url:'#/publicityPage',img:require('./images/banner_002.png')}
        ],
      }
    },
    mounted() {
      this.acquireCaseList();
      this.acquireFacilityList();
    },
    methods: {
      //获取维修案例列表
      acquireCaseList() {
        axios({
          method: "GET",
          url: `${baseURL}/v1/asset/casus?page=${this.casePage}&limit=${this.caseLimit}`,
          headers: {
            "Content-Type": "application/json",
          }
        }).then((res) => {
          this.caseList=res.data.data;
        }).catch((err) => {
          console.log(err)
        })
      },
      //获取维修设备列表
      acquireFacilityList() {
        axios({
          method: "GET",
          url: `${baseURL}/v1/asset/device?page=${this.facilityPage}&limit=${this.facilityLimit}`,
          headers: {
            "Content-Type": "application/json",
          }
        }).then((res) => {
          this.facilityList=res.data.data
        }).catch((err) => {
          console.log(err)
        })
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
      getFacilityDetails(val) {
        this.$store.commit("changeFacilityDetails",_.find(this.facilityList,function (o) {
          return o.Id===val
        }));
      },
      getFacilitySource(val) {
        this.$store.commit("changeFacilitySource",_.find(this.facilityList,function (o) {
          return o.Id===val
        }));
      },
    },
    watch: {},
    computed: {},
    components: {
      myTopSearch
    }
  }
</script>

<style scoped lang="stylus">
  .home {
    .banner {
      box-sizing border-box
      height 600px
      background-image: url('./images/banner.png');
      background-position: top center;
      background-repeat: no-repeat;
      background-size: cover;
      /*background-size:contain;*/
      /*background-size:auto;*/
    }
    .list {
      width 1212px
      margin 0 auto
      margin-top 32px
      padding-bottom 88px
      .fl_bg {
        width 346px
        background-position: top center;
        background-repeat: no-repeat;
        text-align center
        h3 {
          color #ffffff
          font-size 30px
          margin 285px 80px 18px 96px
          padding 20px
          border 1px solid #ffffff
        }
        a {
          padding 5px 0
          color #ffffff
          border-bottom 1px solid #ffffff
        }
      }
      .case {
        .fl_bg {
          height 734px
          background-image: url('./images/01.png');
        }
      }
      .facility {
        .fl_bg {
          height 734px
          background-image: url('./images/02.png');
        }
      }
      .partner {
        .fl_bg {
          height 330px
          background-image: url('./images/cooperation.png');
          background-position: top left 16px;
          h3 {
            margin-top 132px
          }
        }
      }
      .fr_case {
        margin-bottom 18px
        position relative
        box-sizing border-box
        width 854px
        height 220px
        background-color rgba(255, 255, 255, 0.8)
        /*opacity: 0.8;*/
        padding 15px 20px
        h4 {
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
        .price_box {
          position absolute
          top 78px
          right 84px
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
          }
        }
      }
      .fr_facility {
        width 854px
        .facility_info {
          margin-bottom 20px
          margin-right 12px
          box-sizing border-box
          width 276px
          height 340px
          padding 22px 15px 0
          background-color #ffffff
          h4 {
            color: #222222;
            font-size: 18px;
            height 40px
            line-height 20px
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 2;
            overflow: hidden;
          }
          .belong{
            a{
              width 210px
              display block
              text-overflow:ellipsis;
              white-space:nowrap;
              overflow:hidden;
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
          .putaway {
            margin-top 12px
            a {
              display block
              padding-left 26px
              padding-top 2px
              padding-bottom 2px
              color #666666;
              font-size 14px
              background-repeat: no-repeat;
              background-position: top left;
              span {
                color #222222;
                font-size 16px
              }
            }
            .time {
              background-image: url('./images/time.png');
              padding-bottom 12px
            }
            .equity {
              background-image: url('./images/Profit.png');
            }
          }
          .price_box {
            margin-top 43px
            .price {
              a {
                display block
              }
              min-width 18px
              height 24px
              font-size: 24px;
              color: #c6351e;
              background-image: url('./images/currency.png');
              background-repeat: no-repeat;
              background-position: top left;
              padding-left 26px
              margin-bottom 10px
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
            }
          }
          .facility_img {
            display: table-cell;
            vertical-align: middle;
            text-align: center;
            img {
              vertical-align: middle;
              position: relative;
              top: 50%;
              transform: translateY(-50%);
              max-width 90px
              max-height 90px
            }
            a {
              display block
              width 92px
              height 92px
              border 1px solid #eeeeee
            }
          }
          .attestation {
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
              margin-top 30px
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
        }
        .facility_info:nth-child(3n) {
          margin-right 0
        }
      }
      .fr_partner {
        width 854px
        .partner_img {
          box-sizing border-box
          background-color: #ffffff;
          margin-bottom 14px
          margin-right 12px
          display: table-cell;
          width: 276px;
          height: 158px;
          vertical-align: middle;
          text-align: center;
          img {
            vertical-align: middle;
            position: relative;
            top: 50%;
            transform: translateY(-50%);
          }
        }
        .partner_img:nth-child(3n) {
          margin-right 0
        }
      }
    }
  }
</style>
<style>
  .el-carousel__arrow{
    width:50px;
    height: 50px;
    font-size: 30px;
  }
  .el-carousel__button{
    width:36px;
  }
  .el-carousel__indicator {
    padding: 20px 6px;
  }
</style>
