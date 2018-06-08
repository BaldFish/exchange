<template>
  <div class="facilitySource">
    <my-topSearch></my-topSearch>
    <div class="site_box">
      <div class="site">
        <ul>
          <li>当前位置 ：</li>
          <li>首页></li>
          <li>维修案例></li>
          <li>{{facilitySourceTitle}}</li>
        </ul>
      </div>
    </div>
    <div class="details">
      <h4>{{facilitySourceTitle}}</h4>
      <div class="like">收藏</div>
      <div class="transfer_record">
        <span>资产转让记录</span>
        <ul v-for="(item,index) of facilitySource" :key="item.id">
          <li>
            <span>交易发起方</span>
            <span>：{{item.from}}</span>
          </li>
          <li>
            <span>交易接收方</span>
            <span>：{{item.to}}</span>
          </li>
          <li>
            <span>交易价格</span>
            <span>：{{item.price}}</span>
          </li>
          <li>
            <span>交易时间</span>
            <span>：{{item.updated_at}}</span>
          </li>
        </ul>
        <a href="#/caseDetails"><p class="asset_details">案例详情</p></a>
        <a href="javascript:void(0)"><p class="buy">一键购买</p></a>
      </div>
      <div class="transfer_record use_record">
        <span>资产使用记录</span>
        <ul v-for="(item,index) of usageRecord" :key="item.id">
          <li>
            <span>资产ID</span>
            <span>：{{item.asset_id}}</span>
          </li>
          <li>
            <span>记录名称</span>
            <span>：{{item.name}}</span>
          </li>
          <li>
            <span>记录内容</span>
            <span>：{{item.content}}</span>
          </li>
          <li>
            <span>记录哈希</span>
            <span>：{{item.record_hash}}</span>
          </li>
          <li>
            <span>交易哈希</span>
            <span>：{{item.txn_hash}}</span>
          </li>
          <li>
            <span>记录时间</span>
            <span>：{{item.updated_at}}</span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
  import axios from "axios";
  import myTopSearch from "../topSearch/topSearch"
  import {baseURL,cardURL} from '@/common/js/public.js';
  export default {
    name: "facilitySource",
    data() {
      return {
        facilitySourceTitle: "",
        facilitySource: [],
        usageRecord: [],
        assetId: "",
        apiKey: "",
      }
    },
    mounted() {
      this.facilitySourceTitle = JSON.parse(sessionStorage.getItem("facilitySource")).Assetname
      this.assetId = JSON.parse(sessionStorage.getItem("facilitySource")).Assetid;
      this.apiKey = JSON.parse(sessionStorage.getItem("facilitySource")).Apikey;
      axios({
        method: "GET",
        url: `${cardURL}/v1/transed-asset/${this.assetId}/apikey/${this.apiKey}?page=0&limit=1000000`,
        headers: {
          "Content-Type": "application/json",
        }
      }).then((res) => {
        if (res.data.data != []) {
          this.facilitySource = res.data.data
        }else{
          this.facilitySource =[]
        }
      }).catch((err) => {
        console.log(err);
      });
      axios({
        method: "GET",
        url: `${cardURL}/v1/used-asset/${this.assetId}/apikey/${this.apiKey}?page=0&limit=1000000`,
        headers: {
          "Content-Type": "application/json",
        }
      }).then((res) => {
        if (res.data.data != null) {
          this.usageRecord = res.data.data
        }else{
          this.usageRecord =[]
        }
      }).catch((err) => {
        console.log(err);
      });
    },
    methods: {
    
    },
    watch: {},
    computed: {},
    components: {
      myTopSearch
    },
  }
</script>

<style scoped lang="stylus">
.facilitySource{
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
    .transfer_record{
      box-sizing border-box
      min-height 218px
      padding 20px 30px
      background-color #ffffff
      border 1px solid #bfbfbf;
      margin-top 30px
      margin-bottom 20px
      position relative
      span{
        display inline-block
        font-size 18px
        height 18px
        line-height 18px
        color #000000
        margin-bottom 10px
      }
      ul{
        padding 8px 0
        li{
          line-height 20px
          font-size 0
          span{
            display inline-block
            font-size 16px
            vertical-align top
            color: #666666;
            margin-bottom 0px
          }
          span:first-child{
            width 96px
            color: #333333;
          }
        }
      }
      .asset_details{
        box-sizing border-box
        position absolute
        top 70px
        right 60px
        width 170px
        height 54px
        background-color #ffffff
        border 1px solid #c6351e
        color #c6351e;
        font-size 22px
        line-height 54px
        text-align center
      }
      .buy{
        position absolute
        top 134px
        right 60px
        width 170px
        height 54px
        background-color #c6351e
        color #ffffff
        font-size 22px
        line-height 54px
        text-align center
      }
    }
    .use_record{
      margin-bottom 70px
    }
  }
}
</style>
