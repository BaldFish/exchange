<template>
  <div class="reportConclusion">
    <h2>汽车诊断报告</h2>
    <p>该报告由LAUNCH提供</p>
    <div class="info">
      <h4>车辆信息</h4>
      <ul>
        <li><span>VIN码：</span><span>{{vehicle.vin}}</span></li>
        <li><span>品牌：</span><span>{{vehicle.brand}}</span></li>
        <li><span>车型：</span><span>{{vehicle.style}}</span></li>
        <li><span>年款：</span><span>{{vehicle.style_year}}</span></li>
      </ul>
    </div>
    <div class="info">
      <h4>设备信息</h4>
      <ul>
        <li><span>设备序列号：</span>{{device.pro_serial_no}}<span></span></li>
        <li><span>检测时间：</span><span>{{device.detection_time}}</span></li>
      </ul>
    </div>
    <div class="info">
      <h4>检测结果</h4>
      <ul>
        <li>汽车存在<span style="color: #c6351e;padding: 0 5px">{{detection_result.fault_n}}</span>问题：</li>
        <li v-for="(item,index) of detection_result.fault_codes" :key="item.fault_id">{{index+1+'、'}}{{item.description}}</li>
      </ul>
    </div>
  </div>
</template>

<script>
  import axios from "axios";
  import {baseURL} from '@/common/js/public.js';
  import utils from "@/common/js/utils.js";
  
  export default {
    name: "reportConclusion",
    components: {},
    data() {
      return {
        token:"",
        userId: "",
        apiKey:"",
        assetId:"",
        orderId:"",
        count:0,
        vehicle:{},
        device:{},
        detection_result:{},
      }
    },
    mounted() {
      if (JSON.parse(sessionStorage.getItem("loginInfo"))) {
        this.userId = JSON.parse(sessionStorage.getItem("loginInfo")).user_id;
        this.token = JSON.parse(sessionStorage.getItem("loginInfo")).token;
      }
      this.apiKey=JSON.parse(sessionStorage.getItem("reportConclusion")).apikey;
      this.assetId=JSON.parse(sessionStorage.getItem("reportConclusion")).assetid;
      this.orderId=JSON.parse(sessionStorage.getItem("reportConclusion")).orderNum;
      this.acquireReportConclusion()
    },
    watch: {},
    computed: {},
    methods: {
      acquireReportConclusion(){
        axios({
          method: "GET",
          url:
            `${baseURL}/v1/asset/diagnoseReport/view/${this.apiKey}/${this.assetId}?user_id=${this.userId}&order_id=${this.orderId}`,
          headers: {
            "Content-Type": "application/json",
          }
        }).then((res) => {
          //res.data.data.vehicle.update_time = utils.formatDate(new Date(res.data.data.vehicle.update_time), "yyyy-MM-dd hh:mm:ss");
          res.data.data.device.detection_time = utils.formatDate(new Date(res.data.data.device.detection_time), "yyyy-MM-dd hh:mm:ss");
          res.data.data.device.detection_time = utils.formatDate(new Date(res.data.data.device.detection_time), "yyyy-MM-dd hh:mm:ss");
          this.vehicle=res.data.data.vehicle;
          this.device=res.data.data.device;
          this.detection_result=res.data.data.detection_result;
        }).catch((err) => {
          console.log(err);
        });
      }
    },
  }
</script>

<style scoped lang="stylus">
  .reportConclusion{
    box-sizing border-box
    width 1200px
    min-height 750px
    margin 0 auto
    h2{
      margin-top 20px
      color #000000
      font-weight bold
      text-align center
      font-size 24px
    }
    p{
      font-size 16px
      margin 10px 0
    }
    .info{
      margin-top 20px
      margin-left 80px
      h4{
        color #000000
      }
      ul{
        margin-left 80px
        li{
          line-height 30px
          width 860px
          word-break: break-all; word-wrap:break-word;
        }
      }
    }
  }
</style>
