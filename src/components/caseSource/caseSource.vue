<template>
  <div class="trustedSource">
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
      <h4>奔驰E20456785676540发动机怠速时抖动严重发动机严重动严严重发动重发动机有音可动机有音可奔驰E20456785676540发动机怠速时抖动严重发动机严重动严严重发动重发动机有音可动机有音可</h4>
      <div class="like">收藏</div>
      <div class="transfer_record">
        <span>资产转让记录</span>
        <ul>
          <li>
            <span>"交易发起方"</span>
            <span>："0xefc7dfef4456ab87392dcd8bb6e51418df70e340"</span>
          </li>
          <li>
            <span>"交易接收方"</span>
            <span>："0xedbff07577761936121e2ab82de3a2f3b7658b43"</span>
          </li>
          <li>
            <span>"交易数量"</span>
            <span>：10</span>
          </li>
          <li>
            <span>"交易时间"</span>
            <span>："2018-05-23 08:32:48"</span>
          </li>
        </ul>
        <ul>
          <li>
            <span>"交易发起方"</span>
            <span>："0xefc7dfef4456ab87392dcd8bb6e51418df70e340"</span>
          </li>
          <li>
            <span>"交易接收方"</span>
            <span>："0xedbff07577761936121e2ab82de3a2f3b7658b43"</span>
          </li>
          <li>
            <span>"交易数量"</span>
            <span>：10</span>
          </li>
          <li>
            <span>"交易时间"</span>
            <span>："2018-05-23 08:32:48"</span>
          </li>
        </ul>
        <ul>
          <li>
            <span>"交易发起方"</span>
            <span>："0xefc7dfef4456ab87392dcd8bb6e51418df70e340"</span>
          </li>
          <li>
            <span>"交易接收方"</span>
            <span>："0xedbff07577761936121e2ab82de3a2f3b7658b43"</span>
          </li>
          <li>
            <span>"交易数量"</span>
            <span>：10</span>
          </li>
          <li>
            <span>"交易时间"</span>
            <span>："2018-05-23 08:32:48"</span>
          </li>
        </ul>
        <a href="#/caseDetails"><p class="asset_details">案例详情</p></a>
        <a href="javascript:void(0)"><p class="buy">一键购买</p></a>
      </div>
    </div>
  </div>
</template>

<script>
  import myTopSearch from "../topSearch/topSearch"
  export default {
    name: "trustedSource",
    data() {
      return {}
    },
    created() {
    },
    mounted() {
    },
    methods: {},
    watch: {},
    computed: {},
    components: {
      myTopSearch
    },
  }
</script>

<style scoped lang="stylus">
  .trustedSource{
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
        margin-bottom 70px
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
    }
  }
</style>
