<template>
    <div>
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
      <div class="container">
        <div class="title">
          <span></span>
          <p>项目发起人资质信息公示</p>
        </div>
        <div class="content">
          <ul>
            <li>
              <label>公司名称：</label>
              <span>深圳市元征科技股份有限公司北京研发公司</span>
            </li>
            <li>
              <label>联系地址：</label>
              <span>北京市朝阳区建国路93号万达广场8号楼808</span>
            </li>
            <li>
              <label>官方电话：</label>
              <span>010 - 63827419</span>
            </li>
            <li>
              <label>工作时间：</label>
              <span>工作日 09:00-17:00</span>
            </li>
          </ul>
          <div class="tips">
            <p>注：以上营业执照信息，除公司名称、联系地址和官方电话已通过认证之外，其余信息由项目方自行申报填写。如需进一步核实，请联系当地工商行政管理部门。</p>
          </div>
        </div>
        <img src="./images/infoCertificate.png" alt="">
      </div>
    </div>
</template>

<script>
  import axios from "axios";
  import {baseURL, cardURL} from '@/common/js/public.js';
  import myTopSearch from "../topSearch/topSearch"

  export default {
      name: "infoPublicity",
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
      }
  }
</script>

<style scoped lang="stylus">
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
</style>
<style scoped lang="stylus">
  .container{
    width: 1200px;
    height: 400px;
    background-color: #ffffff;
    margin:0 auto;
    margin-top 30px;
    margin-bottom 460px;
  }
  .title{
    font-size: 20px;
    color: #333333;
    height:80px;
    width:100%;
    border-bottom: solid 1px #eeeeee;
    line-height 80px
  }
  .title span{
    width: 2px;
    height: 18px;
    background-color: #d91e01;
    display: inline-block;
    float: left;
    margin-top: 32px;
    margin-right: 12px;
  }
  .content{
    width:600px;
    height:222px;
    float left;
    margin: 48px 95px;
    font-size: 17px;
    color: #333333;
    line-height:normal;
  }
  .content ul li{
    margin-bottom: 12px
  }
  .tips{
    border-top: solid 1px #eeeeee;
    font-size: 12px;
    color: #666666;
    margin-top:30px;
    padding-top:30px;
  }
  .container img{
    margin-top: 22px;
    margin-left: 60px;
  }
</style>
