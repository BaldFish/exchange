<template>
  <div class="moreFacility">
    <my-topSearch></my-topSearch>
    <div class="site_box">
      <div class="site">
        <ul>
          <li>当前位置 ：</li>
          <li>首页></li>
          <li>维修设备</li>
        </ul>
      </div>
    </div>
    <div class="facility_list">
      <div class="fl facility_info" v-for="(item,index) of searchFacilityList" :key="item.Id">
        <a href="#/facilityDetails" @click="getFacilityDetails(item.Id)"><h4>{{item.Assetname}}</h4></a>
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
    <div class="clearfix paging">
      <el-pagination class="my_paging"
                     layout="prev, pager, next"
                     :background=true
                     :total=total
                     :page-size=facilityLimit
                     :current-page.sync=facilityPage
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
  import myTopSearch from "../topSearch/topSearch"
  
  export default {
    name: "searchFacility",
    data() {
      return {
        facilityPage: 1,
        facilityLimit: 12,
        total:12,
        searchFacilityList: [],
        userId:"",
        token:"",
        apiKey:"",
        assetId:"",
        id:"",
      }
    },
    mounted() {
      this.acquireSearchFacilityList();
    },
    computed: {
      facilityValue:function () {
        return this.$store.state.facilityValue
      },
      facilityInput:function () {
        return this.$store.state.facilityInput
      }
    },
    watch: {
      facilityInput:function () {
        this.acquireSearchFacilityList();
      }
    },
    methods: {
      acquireSearchFacilityList() {
        if(JSON.parse(sessionStorage.getItem("loginInfo"))){
          axios({
            method: "GET",
            url: `${baseURL}/v1/asset/device/search?key=${this.facilityInput}&page=${this.facilityPage}&limit=${this.facilityLimit}&userid=${this.userId}`,
            headers: {
              "Content-Type": "application/json",
            }
          }).then((res) => {
            this.total=res.data.count;
            this.searchFacilityList = res.data.data
          }).catch((err) => {
            console.log(err)
          })
        }else{
          axios({
            method: "GET",
            url: `${baseURL}/v1/asset/device/search?key=${this.facilityInput}&page=${this.facilityPage}&limit=${this.facilityLimit}`,
            headers: {
              "Content-Type": "application/json",
            }
          }).then((res) => {
            this.total=res.data.count;
            this.searchFacilityList = res.data.data
          }).catch((err) => {
            console.log(err)
          })
        }
        
      },
      handleCurrentChange(val){
        this.facilityPage=val;
        this.acquireSearchFacilityList()
      },
      getFacilityDetails(val) {
        this.$store.commit("changeFacilityDetails",_.find(this.searchFacilityList,function (o) {
          return o.Id===val
        }));
      },
      getFacilitySource(val) {
        this.$store.commit("changeFacilitySource",_.find(this.searchFacilityList,function (o) {
          return o.Id===val
        }));
      },
    },
    components: {
      myTopSearch,
    },
  }
</script>

<style scoped lang="stylus">
  .moreFacility {
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
        }
      }
    }
    .facility_list {
      padding-top 36px
      width 1212px
      margin 0 auto
      .facility_info {
        margin-bottom 20px
        margin-right 22px
        box-sizing border-box
        width 286px
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
        .putaway {
          margin-top 32px
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
          }
          a {
            display block
            width 92px
            height 92px
            border 1px solid #eeeeee
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
      .facility_info:nth-child(4n) {
        margin-right 0
      }
    }
  }
</style>
