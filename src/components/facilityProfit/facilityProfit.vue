<template>
  <div>
    <div class="facilityProfit">
      <my-topSearch></my-topSearch>
      <div class="site_box">
        <div class="site">
          <ul>
            <li>当前位置 ：</li>
            <li>首页></li>
            <li>维修案例></li>
            <li>共享设备详情</li>
          </ul>
        </div>
      </div>
      <div class="details">
        <div class="clearfix details_top">
          <div class="fl facility_img">
            <img src="./images/01.png" alt="">
          </div>
          <div class="fr facility_intro">
            <h4>奔驰E20456785676540发动机怠速时抖动严重发动机严重动严严重发动重发动机有音可动机有音可奔驰E20456785676540发动机怠速时抖动严重发动机严重动严严重发动重发动机有音可动机有音可</h4>
            <div class="attestation">
              <span class="person">认证个人</span>
              <span class="trust">高可信</span>
            </div>
            <div class="dislike">收藏</div>
            <a href="#/facilitySource"><p class="tracing">可信溯源</p></a>
            <div class="intro_list">
              <ul>
                <li>
                  <span>资产所属人</span>
                  <span class="holder">：0X32345674342....1234567890</span>
                </li>
                <li>
                  <span>权益</span>
                  <span>：查阅权</span>
                </li>
                <li>
                  <span>每份价格</span>
                  <span>：139.00</span>
                </li>
                <li>
                  <span>拆分剩余份数</span>
                  <span>：30/234</span>
                </li>
                <li>
                  <span>拆分截止时间</span>
                  <span>：2018.03.06</span>
                </li>
              </ul>
            </div>
            <div class="intro_list intro_list_right">
              <ul>
                <li>
                  <span>收益起止时间</span>
                  <span class="holder">：2018年6月1日~2018年12月30日</span>
                </li>
                <li>
                  <span>收益方式</span>
                  <span>：月结息</span>
                </li>
                <li>
                  <span>设备ID</span>
                  <span>：String123456</span>
                </li>
                <li>
                  <span>发布时间</span>
                  <span>：2005.03.04</span>
                </li>
                <li>
                  <span>认购份数</span>
                  <span class="input-number">：
                  <el-input-number size="mini" v-model="num" :min="1" ></el-input-number>
                </span>
                </li>
              </ul>
              <a href="javascript:void(0)"><p class="buy">一键购买</p></a>
            </div>
          </div>
        </div>
        <div class="intro_text">
          <span>设备简介</span>
          <p>容我也不知道啥内容也不知道啥内容我也不知道啥内容我也不知道啥内容也不知道啥内容我也不知道啥内容我也不知道啥内容也不知道啥内容我也不知道啥内容我也不知道啥内容也不知道啥内容我也不知道啥内容我也不知道啥内容也不知道啥内容我也不知道啥内容我也不知道啥内容也不知道啥内容我也不知道啥内容我也不知道啥内容也不知道啥内容我也不知道啥内容我也不知道啥内容也不知道啥内容我也不知道啥内容我也不知道啥内容也不知道啥内容我也不知道啥内容我也不知道啥内容也不知道啥内容我也不知道啥内容我也不知道啥内容也不知道啥内容我也不知道啥内容我也不知道啥内容也不知道啥内容我也不知道啥内容我也不知道啥内容也不知道啥内容我也不知道啥内容我也不知道啥内容也不知道啥内容我也不知道啥内容我也不知道啥内容也不知道啥内容我也不知道啥内容我也不知道啥内容也不知道啥内容我也不知道啥内容我也不知道啥内容也不知道啥内容我也不知道啥内容我也不知道啥内容也不知道啥内容我也不知道啥内容我也不知道啥内容也不知道啥内容我也不知道啥内容我也不知道啥内容也不知道啥内容我也不知道啥内容我也不知道啥内容也不知道啥内容我也不知道啥内容我也不知道啥内容也不知道啥内容我也不知道啥内容我也不知道啥内容也不知道啥内容我也不知道啥内容我也不知道啥内容也不知道啥内容我也不知道啥内容我也不知道啥内容也不知道啥内容我也不知道啥内容我也不知道啥内容也不知道啥内容我也不知道啥内容我也不知道啥内容也不知道啥内容我也不知道啥内</p>
        </div>
      </div>
    </div>
  </div>
  
</template>

<script>
  import myTopSearch from "../topSearch/topSearch"
  export default {
    name: "facilityProfit",
    data() {
      return {
        num:1
      }
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
  .facilityProfit{
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
            width 445px
            float left
            height 184px
            .buy{
              position absolute
              top 120px
              right 10px
              width 126px
              height 50px
              background-color #c6351e
              color #ffffff
              font-size 22px
              line-height 50px
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
                width 100px
              }
            }
          }
          .intro_list_right{
            float right
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
<style>
  .input-number .el-input--mini .el-input__inner {
    height: 18px;
    line-height: 18px;
  }
  .input-number .el-input-number--mini {
    width: 110px;
    line-height: 16px;
  }
</style>
