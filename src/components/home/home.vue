<template>
  <div class="home">
    <div class="top">top</div>
    <div class="banner"></div>
    <div class="list">
      <div class="case clearfix">
        <div class="fl fl_bg">
          <h3>维修案例</h3>
          <a href="javascript:void(0)">查看更多</a>
        </div>
        <div class="fr fr_case">
          <h4><a href="javascript:void(0)">奔驰E20456785676540发动机怠速时抖动严重发动机严重动严严重发动重发动机有音可动机有音可</a></h4>
          <div class="attestation">
            <span>认证个人</span>
            <span>高可信</span>
          </div>
          <div class="time">
            <a href="javascript:void(0)">上架时间：2018.03.23 21:22:24</a>
            <a href="javascript:void(0)">权益：所有权</a>
          </div>
          <div class="fault">
            <p>
              故障现象：客户反映，正常行驶中，等红绿灯时，发现车辆抖动并且越来越严重，随后发动机故障灯亮起，靠边停车熄火，隔15min重新启动车辆，抖动稍缓解熄火，隔15min重新启动车辆，抖动稍缓解熄火，隔15min重新启动车辆，抖动稍缓解，但发动但发动机有很大很很大杂音，
              动稍缓解动稍缓解动稍缓解动稍缓解动稍缓解动稍缓 解常亮.......
            </p>
          </div>
          <div></div>
        </div>
      </div>
      <div class="facility clearfix">
        <div class="fl fl_bg">
          <h3>维修设备</h3>
          <a href="javascript:void(0)">查看更多</a>
        </div>
        <div class="fr">2</div>
      </div>
      <!--<div class="property clearfix">
        <div class="fl fl_bg"></div>
        <div class="fr">3</div>
      </div>
      <div class="parts clearfix">
        <div class="fl fl_bg"></div>
        <div class="fr">4</div>
      </div>-->
      <div class="partner clearfix">
        <div class="fl fl_bg">
          <h3>合作伙伴</h3>
        </div>
        <div class="fr">5</div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "home",
    data() {
      return {}
    },
  }
</script>

<style scoped lang="stylus">
  .home {
    .top {
      box-sizing border-box
      width 1212px
      height 130px
      margin 0 auto
      border 1px solid red
    }
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
      padding-bottom 100px
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
      /*.property{
        .fl_bg{
          width 346px
          height 734px
          background-image: url('./images/03.png');
          background-position: top center;
          background-repeat: no-repeat;
        }
      }
      .parts{
        .fl_bg{
          width 346px
          height 734px
          background-image: url('./images/04.png');
          background-position: top center;
          background-repeat: no-repeat;
        }
      }*/
      .partner {
        .fl_bg {
          height 330px
          background-image: url('./images/cooperation.png');
          h3{
            margin-top 132px
          }
        }
      }
      .fr_case {
        box-sizing border-box
        width 854px
        height 220px
        background-color rgba(255, 255, 255, 0.8)
        opacity: 0.8;
        padding 15px 20px
        h4{
          overflow: hidden;
          text-overflow:ellipsis;
          white-space: nowrap;
          a{
            color: #222222;
            font-size: 20px;
          }
        }
        .attestation{}
        .time{}    
        .fault{}
      }
    }
  }
</style>
