<template>
  <div class="seller">
    <my-topSearch></my-topSearch>
    <my-toggle></my-toggle>
    <div class="presentation_bg">
      <div class="presentation_box">
        <div class="logo"></div>
      </div>
      <p>打造基于区块链技术的汽车数据生态</p>
    </div>
    <div class="headline">
      <p></p>
      <span>发起的项目</span>
      <p></p>
    </div>
    <div class="tabs_content">
      <ul class="content">
        <li>
          <div class="content_img">
            <img src="./images/02.png" alt="">
          </div>
          <h4 class="content_title">维修共享设备5件维修共享</h4>
          <my-progressBar :percentage="percentage"></my-progressBar>
          <p class="price">&yen;523200.00&nbsp;<span>起</span></p>
        </li>
        <li>
          <div class="content_img">
            <img src="./images/02.png" alt="">
          </div>
          <h4 class="content_title">维修共享设备5件维修共享</h4>
          <my-progressBar :percentage="percentage"></my-progressBar>
          <p class="price">&yen;523200.00&nbsp;<span>起</span></p>
        </li>
        <li>
          <div class="content_img">
            <img src="./images/02.png" alt="">
          </div>
          <h4 class="content_title">维修共享设备5件维修共享</h4>
          <my-progressBar :percentage="percentage"></my-progressBar>
          <p class="price">&yen;523200.00&nbsp;<span>起</span></p>
        </li>
        <li>
          <div class="content_img">
            <img src="./images/02.png" alt="">
          </div>
          <h4 class="content_title">维修共享设备5件维修共享</h4>
          <my-progressBar :percentage="percentage"></my-progressBar>
          <p class="price">&yen;523200.00&nbsp;<span>起</span></p>
        </li>
        <li>
          <div class="content_img">
            <img src="./images/02.png" alt="">
          </div>
          <h4 class="content_title">维修共享设备5件维修共享</h4>
          <my-progressBar :percentage="percentage"></my-progressBar>
          <p class="price">&yen;523200.00&nbsp;<span>起</span></p>
        </li>
        <li>
          <div class="content_img">
            <img src="./images/02.png" alt="">
          </div>
          <h4 class="content_title">维修共享设备5件维修共享</h4>
          <my-progressBar :percentage="percentage"></my-progressBar>
          <p class="price">&yen;523200.00&nbsp;<span>起</span></p>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  import axios from "axios";
  import _ from "lodash";
  import {baseURL, cardURL} from '@/common/js/public.js';
  import formatDate from "@/common/js/formatDate.js";
  import myTopSearch from "../topSearch/topSearch"
  import myToggle from "../toggle/toggle"
  import myProgressBar from "../progressBar/progressBar"
  
  export default {
    name: "seller",
    components: {
      myTopSearch,
      myToggle,
      myProgressBar,
    },
    data() {
      return {
        percentage:50
      }
    },
    created() {
    },
    mounted() {
    },
    watch: {},
    computed: {},
    methods: {},
  }
</script>

<style scoped lang="stylus">
  .seller {
    .presentation_bg {
      box-sizing border-box
      height 252px
      background-image: url('./images/01.png');
      background-position: top center;
      background-repeat: no-repeat;
      presentation_box{
        .logo{}
        .presentation{}
      }
    }
    .headline {
      font-size 0;
      color: #333333;
      text-align center
      padding 20px 0
      p {
        display inline-block
        width: 20px;
        height: 1px;
        background-color: #d91e01;
        vertical-align middle
      }
      span {
        font-size 14px;
        display inline-block
        padding 0 12px
        vertical-align middle
      }
    }
    .tabs_content {
      box-sizing border-box
      width 1212px
      margin 0 auto
      padding 0 6px;
      .content{
        width 1198px
        margin 0 auto
        font-size: 0;
        li{
          box-sizing border-box
          display inline-block
          width 280px
          height 370px
          margin-right 26px
          margin-bottom 16px
          background-color #ffffff
          font-size: 14px;
          color: #000033;
          cursor pointer
          vertical-align middle
          padding 10px
          .content_img{
            width 260px
            height 260px
            display: table-cell;
            text-align center
            img {
              vertical-align: middle;
              position: relative;
              top: 50%;
              transform: translateY(-50%);
              max-width 260px
              max-height 260px
            }
          }
          .content_title{
            color: #000033
            font-size 14px
            line-height 34px
            text-indent 2px
            margin-bottom 16px
          }
          .price{
            margin-top 7px
            font-size 16px
            color #e90031;
            line-height 26px
            span{
              font-size: 12px;
              color: #666666;
            }
          }
        }
        li:nth-child(4n){
          margin-right 0
        }
      }
    }
  }
</style>
