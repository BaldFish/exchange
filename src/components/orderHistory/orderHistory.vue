<template>
  <div class="nav_content">

    <div class="nav_content_title">
      <span>订单商品信息</span>
    </div>

    <table class="order_nav">
      <tr>
        <td>
          <el-select class="my_select" v-model="value" placeholder="请选择" >
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
          <span>订单详情</span>
        </td>
        <td>权益</td>
        <td>数量</td>
        <td>小计</td>
        <td>全部状态</td>
      </tr>
    </table>

    <!-- <div class="nav_content_table">
      <table>
        <thead>
        <tr class="no_img_thead">
          <th>支付钱包地址：0X32480328*****47483279fa</th>
          <th colspan="4" class="order_amount">
            订单金额：
            <span>￥309.00</span>
          </th>
        </tr>
        <tr class="th_classify">
          <th>维修案例
            <span>订单号： 752642823580</span>
          </th>
          <th colspan="4">下单日期：2018-04-01 12:12:56</th>
        </tr>
        </thead>
        <tbody>
        <tr class="no_img_tbody">
          <td>德国车载吸尘器无线12V汽车用小型家用手持式迷你充电强力大功率德国车载吸尘你充电强力大功率</td>
          <td>所有权</td>
          <td>9</td>
          <td>23456</td>
          <td class="no_img_lastTd">
            <p>未完成</p>
            <router-link to="">去支付 ></router-link>
          </td>
        </tr>
        </tbody>
      </table>
    </div>-->

    <!--<div class="nav_content_table">
      <table>
        <thead>
        <tr class="img_thead">
          <th>支付钱包地址：0X32480328*****47483279fa</th>
          <th colspan="5" class="order_amount">
            订单金额：
            <span>￥309.00</span>
          </th>
        </tr>
        <tr class="th_classify">
          <th>维修设备
            <span>订单号： 752642823580</span>
          </th>
          <th colspan="4">下单日期：2018-04-01 12:12:56</th>
        </tr>
        </thead>
        <tbody>
        <tr class="img_tbody">
          <td>
            <img src="item.asseturl" alt="">
            <p>德国车载吸尘器无线12V汽车用小型家用手持式迷你充电强力大功率德国车载吸尘你充电强力大功率</p>
          </td>
          <td>所有权</td>
          <td>9</td>
          <td>23456</td>
          <td class="img_lastTd">
            <p>已完成</p>
            <router-link to=""><p>查阅</p></router-link>
          </td>
        </tr>
        </tbody>
      </table>
    </div>-->

    <div class="nav_content_table" v-for="(item,index) in dataList">
      <table>
        <thead>
        <tr class="img_thead">
          <th>支付钱包地址：{{userInfo.wallet_address}}</th>
          <!--<th colspan="5" class="order_amount">
            订单金额：
            <span>￥{{item.price}}</span>
          </th>-->
        </tr>
        <tr class="th_classify">
          <th>{{item.apiname}}
            <span>订单号： {{item.orderNum}}</span>
          </th>
          <th colspan="4">下单日期：2018-04-01 12:12:56</th>
        </tr>
        </thead>
        <tbody>
        <tr class="img_tbody">
          <td  v-if="item.apiname == '共享维修设备'">
            <img src="" alt="">
            <p>{{item.assetname}}</p>
          </td>
          <td v-if="item.apiname == '案例'">
            <p class="no_img_p">{{item.assetname}}</p>
          </td>
          <td>{{item.sell_type}}</td>
          <td>{{item.split_count}}</td>
          <td>￥{{item.price}}</td>
          <td class="img_lastTd" v-if="item.orderStatus == 2">
            <p>已完成</p>
            <router-link to=""><p>查阅</p></router-link>
          </td>
          <td class="no_img_lastTd" v-if="item.orderStatus == 1">
            <p>未完成</p>
            <router-link to="/checkOrder">去支付 ></router-link>
          </td>
        </tr>
        </tbody>
      </table>
    </div>

    <div class="clearfix paging">
      <my-paging></my-paging>
    </div>

  </div>
</template>

<script>
  import myPaging from "../paging/paging";
  import axios from "axios";
  import {baseURL} from '@/common/js/public.js';
  const querystring = require('querystring');

  export default{
    inject:['reload'],
    name: "orderHistory",
    data(){
      return {
        options: [{
          value: '选项1',
          label: '近三个月的订单'
        }, {
          value: '选项2',
          label: '今年内订单'
        }, {
          value: '选项3',
          label: '2017年订单'
        }],
        value: '选项1',
        //input: '',
        dataList:'',
        userInfo:''
      }
    },
    mounted: function() {
      //获取用户信息
      let logInfo = JSON.parse(sessionStorage.getItem("loginInfo"));
      axios({
        method: 'get',
        url: `${baseURL}/v1/users/${logInfo.user_id}`,
      }).then(res => {
        this.userInfo = res.data;
        sessionStorage.setItem("userInfo",JSON.stringify(res.data))
      }).catch(error => {
        console.log(error);
      });
      //获取表格数据
      this.getData()
    },
    methods: {
      getData(){
        let loginInfo = JSON.parse(sessionStorage.getItem("loginInfo"));
        axios({
          method: 'get',
          url: `${baseURL}/v1/order/list/${loginInfo.user_id}?page=1&limit=10&begin=2017-01-01`,
        }).then(res => {
          this.dataList = res.data.data
        }).catch(error => {
          console.log(error);
        });
      }
    },


 /*   watch:{
      value:()=>{

        console.log(this.value)
      }
    },*/

    components: {
      myPaging
    }
  }
</script>
<style scoped>
  .paging{
    width:1080px;
    margin: 0 auto;
    text-align: center
  }
  .nav_content{
    width: 1078px;
    float: right;
  }
  .nav_content_title{
    width: 1078px;
    height: 50px;
    background-color: #ffffff;
    border: solid 1px #bfbfbf;
    line-height: 50px;
    font-size: 18px;
    color: #222222;
  }
  .nav_content_title span{
    padding-left: 20px;
  }
  .nav_content_table{
    margin-top: 12px;
    width:1078px;
    background-color: #ffffff;
    border: solid 1px #bfbfbf;
  }
  .nav_content_table thead th{
    font-size: 16px;
    color: #222222;
  }
  .nav_content_table tbody td{
    font-size: 14px;
    color: #666666;
  }
  .nav_content_table tbody tr{
    border-bottom: 1px solid #d2d2d2;
    text-align: center;
    height:90px;
  }
  .nav_content_table tbody tr td{
    vertical-align: middle;
  }
  .nav_content_table tbody tr:last-child{
    border-bottom: none;
  }
  .no_img_thead{
    height: 50px;
    line-height: 50px;
  }
  .no_img_thead th:nth-child(1){
    width: 480px;
    text-align: left;
    padding-left: 46px;
  }
  .no_img_thead th{
    width: 154px;
  }
  .th_classify{
    width:1080px;
    height: 40px;
    background-color: #f6f7fa;
    text-align: left;
    line-height: 40px;
  }
  .th_classify span{
    margin-left: 50px;
  }
  .th_classify th:nth-child(1){
    padding-left: 46px;
    width: 100px !important;
  }
  .no_img_tbody td:nth-child(1){
    text-align: left;
    padding-left: 46px;
    line-height: 20px;
  }
  .no_img_tbody td{
    width: 160px;
  }
  .no_img_lastTd a{
    font-size: 14px;
    color: #c6351e;
    margin-top: 10px;
    display: inline-block;
    margin-left: 14px;
  }
  .img_lastTd p:last-child{
    margin-top: 10px;
    color: #666666;
  }
  .img_thead{
    height: 50px;
    line-height: 50px;
  }
  .img_thead th:first-child{
    padding-left: 46px;
    text-align: left;
    width: 452px;
  }
  .img_thead th:nth-child(2){
    text-align: left;
    width:370px;
  }
  .img_thead th{
    width:152px;
  }
  .img_tbody td{
    width: 145px;
    text-align: center;
  }
  .img_tbody td:first-child img{
    width: 54px;
    height: 54px;
    border: solid 1px #bfbfbf;
    display: inline-block;
    float: left;
    margin-left: 45px;
  }
  .img_tbody td:first-child p{
    width:360px;
    float: right;
    text-align: left;
    line-height: 20px;
    margin-top: 6px;
  }
  .order_nav{
    width: 1080px;
    height: 40px;
    background-color: #f6f7fa;
    border: solid 1px #bfbfbf;
    margin-top: 16px;
    font-size: 16px;
    color: #222222;
    line-height: 40px;
    text-align: center;
  }
  .order_nav td{
    width:160px;
  }
  .order_nav td:nth-child(1){
    width:536px;
    text-align: left;
  }
  .order_nav td:nth-child(1) span{
    margin-left: 90px;
  }
  .order_nav .my_select{
    width: 145px;
    margin-left: 32px;
  }
  .order_amount{
    width:170px !important;
    text-align: left;
  }
  .order_amount span{
    color: #c6351e;
  }
  .no_img_p{
    padding-left: 46px;
    float: none !important;
  }
</style>
<style>
  .order_nav .el-input--suffix .el-input__inner{
    height: 40px !important;
    background-color: #f6f7fa;
  }
</style>
