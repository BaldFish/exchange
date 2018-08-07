<template>
  <div class="transferPlatform">
    <my-topSearch></my-topSearch>
    <div class="nav">
      <ul>
        <li>
          <router-link to="/home">资产平台</router-link>
        </li>
        <li>
          <router-link to="/transferPlatform">转让平台</router-link>
        </li>
      </ul>
    </div>
    <div class="carousel">
      <el-carousel :interval="3000" arrow="always">
        <el-carousel-item v-for="item in bannerList" :key="item.link_url">
          <a :href="item.link_url"><img :src="item.picture_url" alt=""></a>
        </el-carousel-item>
      </el-carousel>
    </div>
  </div>
</template>

<script>
  import axios from "axios";
  import _ from "lodash";
  import {baseURL, cardURL} from '@/common/js/public.js';
  import formatDate from "@/common/js/formatDate.js";
  import myTopSearch from "../topSearch/topSearch"
  
  export default {
    name: "transferPlatform",
    components: {
      myTopSearch
    },
    data() {
      return {
        bannerList: [
          {link_url: 'javascript:void(0)', picture_url: require('./images/01.png')},
        ],
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
.transferPlatform{
  .nav {
    width 100%
    height 26px
    border-bottom 2px solid #d91e01
    vertical-align top
    padding-left 34px
    ul {
      width 1212px
      margin 0 auto
      font-size 0
      li {
        font-size: 14px;
        color: #d91e01;
        display inline-block
        margin-right 46px
        a {
          font-size: 14px;
          color: #333333;
        }
      }
      li:nth-child(2){
        a{
          font-size: 14px;
          color:#d91e01;
        }
      }
    }
  }
  
}
</style>
<style lang="stylus">
  .carousel {
    max-width 1920px
    //min-width 1212px
    height 600px
    margin 0 auto
    .el-carousel {
      width 100%
      height 100%
      .el-carousel__container {
        width 100%
        height 100%
        .el-carousel__arrow {
          width: 50px;
          height: 50px;
          font-size: 30px;
        }
        .el-carousel__item {
          width 100%
          height 100%
          text-align center
          a {
            img {
              width: 1920px;
              height 600px
              /*Firefox*/
              margin: 0 -moz-calc(50% - 1212px);
              /*chrome safari*/
              margin: 0 -webkit-calc(50% - 1212px);
              /*Standard */
              margin: 0 calc(50% - 1212px);
            }
          }
        }
      }
      .el-carousel__indicators {
        .el-carousel__indicator {
          padding: 20px 6px;
          .el-carousel__button {
            width: 36px;
          }
        }
      }
    }
  }
</style>
