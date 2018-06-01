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
      <h4>奔驰E20456785676540发动机怠速时抖动严重发动机严重动严严重发动重发动机有音可动机有音可奔驰E20456785676540发动机怠速时抖动严重发动机严重动严严重发动重发动机有音可动机有音可</h4>
      <div class="attestation">
        <span class="merchant">认证商家</span>
        <span class="person">认证个人</span>
        <span class="trust">高可信</span>
      </div>
      <div class="like">收藏</div>
      <a href="#/caseSource"><p class="tracing">可信溯源</p></a>
      <div class="intro_list">
        <ul>
          <li>
            <span>资产所属人</span>
            <span class="holder">：0X32345674323456829342....12342345675432567890</span>
          </li>
          <li>
            <span>权益</span>
            <span>：所有权</span>
          </li>
          <li>
            <span>价格</span>
            <span>：139.00</span>
          </li>
          <li>
            <span>案例ID</span>
            <span>：String123456</span>
          </li>
          <li>
            <span>上架时间</span>
            <span>：2005.03.04</span>
          </li>
        </ul>
        <a href="#/checkOrder"><p class="buy">一键购买</p></a>
      </div>
      <div class="intro_text">
        <span>设备简介</span>
        <p>容我也不知道啥内容也不知道啥内容我也不知道啥内容我也不知道啥内容也不知道啥内容我也不知道啥内容我也不知道啥内容也不知道啥内容我也不知道啥内容我也不知道啥内容也不知道啥内容我也不知道啥内容我也不知道啥内容也不知道啥内容我也不知道啥内容我也不知道啥内容也不知道啥内容我也不知道啥内容我也不知道啥内容也不知道啥内容我也不知道啥内容我也不知道啥内容也不知道啥内容我也不知道啥内容我也不知道啥内容也不知道啥内容我也不知道啥内容我也不知道啥内容也不知道啥内容我也不知道啥内容我也不知道啥内容也不知道啥内容我也不知道啥内容我也不知道啥内容也不知道啥内容我也不知道啥内容我也不知道啥内容也不知道啥内容我也不知道啥内容我也不知道啥内容也不知道啥内容我也不知道啥内容我也不知道啥内容也不知道啥内容我也不知道啥内容我也不知道啥内容也不知道啥内容我也不知道啥内容我也不知道啥内容也不知道啥内容我也不知道啥内容我也不知道啥内容也不知道啥内容我也不知道啥内容我也不知道啥内容也不知道啥内容我也不知道啥内容我也不知道啥内容也不知道啥内容我也不知道啥内容我也不知道啥内容也不知道啥内容我也不知道啥内容我也不知道啥内容也不知道啥内容我也不知道啥内容我也不知道啥内容也不知道啥内容我也不知道啥内容我也不知道啥内容也不知道啥内容我也不知道啥内容我也不知道啥内容也不知道啥内容我也不知道啥内容我也不知道啥内容也不知道啥内容我也不知道啥内容我也不知道啥内容也不知道啥内容我也不知道啥内</p>
      </div>
    </div>
  </div>
</template>

<script>
  import myTopSearch from "../topSearch/topSearch"
  
  export default {
    name: "caseDetails",
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
