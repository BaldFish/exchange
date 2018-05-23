<template>
  <div class="home">
    <div class="top">top</div>
    <div class="banner"></div>
    <div class="list">
      <div class="case clearfix">
        <div class="fl fl_bg"></div>
        <div class="fr">1</div>
      </div>
      <div class="facility clearfix">
        <div class="fl fl_bg"></div>
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
        <div class="fl fl_bg"></div>
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
      .case{
        .fl_bg{
          width 346px
          height 734px
          background-image: url('./images/01.png');
          background-position: top center;
          background-repeat: no-repeat;
        }
      }
      .facility{
        .fl_bg{
          width 346px
          height 734px
          background-image: url('./images/02.png');
          background-position: top center;
          background-repeat: no-repeat;
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
      .partner{
        .fl_bg{
          width 346px
          height 330px
          background-image: url('./images/cooperation.png');
          background-position: top right ;
          background-repeat: no-repeat;
        }
      }
    }
  }
</style>
