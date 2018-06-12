<template>
  <div class="nav_content">
    <div class="nav_content_title">
      <span>收藏夹</span>
    </div>
    <div class="nav_content_table">
      <table>
        <thead>
        <tr class="content_thead">
          <th>名称</th>
          <th>权益</th>
          <th>操作</th>
        </tr>
        </thead>
        <tbody>
        <tr class="classify">
          <td colspan="5">维修案例</td>
        </tr>
        <tr class="content_tbody">
          <td>德国车载吸尘器无线12V汽车用小型家用手持式迷你充电强力大功率德国车载吸尘你充电强力大功率</td>
          <td>所有权</td>
          <td class="quick_buy_td" @click="cancel">
            <button>取消收藏</button>
          </td>
        </tr>
        <tr class="classify">
          <td colspan="5">维修设备</td>
        </tr>
        <tr class="content_tbody">
          <td><span><img src="" alt=""></span>德国车载吸尘器无线12V汽车用小型家用手持式迷你充电强力大功率德国车载吸尘你充电强力大功率</td>
          <td>所有权</td>
          <td class="quick_buy_td" @click="cancel">
            <button>取消收藏</button>
          </td>
        </tr>
        </tbody>
      </table>
    </div>
    <div class="clearfix paging">
      <el-pagination class="my_paging"
                     layout="prev, pager, next"
                     :background=true
                     :total=total
                     :page-size=pageSize
                     :current-page.sync=currentPage
                     @current-change="handleCurrentChange">
      </el-pagination>
    </div>
  </div>
</template>
<script>
  import axios from "axios";
  import "../../common/stylus/paging.styl";
  import {baseURL, cardURL} from '@/common/js/public.js';
  export default {
    name: "favorite",
    data() {
      return {
        total: 10,
        pageSize: 10,
        currentPage: 1,
        favoriteList: [],
        caseList: [],
        facilityList: [],
        user_id: '',
        id:"5b1fbcff3eb34b00018ebd9c",
        token:"",
      }
    },
    components: {},
    mounted() {
      this.user_id = JSON.parse(sessionStorage.getItem("loginInfo")).user._id;
      this.token=JSON.parse(sessionStorage.getItem("loginInfo")).session.token;
      this.acquireFacilityList();
    },
    methods: {
      handleCurrentChange(val) {
        this.currentPage = val;
      },
      acquireFacilityList() {
        axios({
          method: "GET",
          url: `${baseURL}/v1/shopcart/list/${this.user_id}?page=${this.currentPage}&limit=${this.pageSize}`,
          headers: {
            "Content-Type": "application/json",
          }
        }).then((res) => {
          this.total = res.data.count;
          this.favoriteList = res.data.data;
          let that = this;
          this.favoriteList.forEach(function (value, index, array) {
            switch (value.apikey) {
              case "5a6be74a55aaf50001a5e250":
                that.caseList.push(value)
                break;
              case "5ae04522cff7cb000194f2f4":
                that.facilityList.push(value)
                break;
            }
          });
          console.log(res);
          console.log(this.caseList);
          console.log(this.facilityList);
        }).catch((err) => {
          console.log(err);
        });
      },
      cancel(){
        axios({
          method: "DELETE",
          url: `${baseURL}/v1/shopcart/${this.user_id}/${this.id}`,
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            "X-Access-Token":this.token
          }
        }).then((res) => {
          console.log(res);
        }).catch((err) => {
          console.log(err);
        });
      },
    }
  }
</script>
<style scoped>
  .nav_content {
    width: 1078px;
    float: right;
  }
  
  .nav_content_title {
    width: 1078px;
    height: 50px;
    background-color: #ffffff;
    border: solid 1px #bfbfbf;
    line-height: 50px;
    font-size: 18px;
    color: #222222;
  }
  
  .nav_content_title span {
    padding-left: 20px;
  }
  
  .nav_content_table {
    margin-top: 12px;
    width: 1078px;
    background-color: #ffffff;
    border: solid 1px #bfbfbf;
  }
  
  .content_thead {
    font-size: 16px;
    color: #222222;
    height: 50px;
    line-height: 50px;
  }
  .content_thead th {
    width: 140px;
  }
  .content_thead th:first-child {
    text-align: left;
    padding-left: 46px;
    width: 800px;
  }
  
  .classify td {
    background-color: #f6f7fa;
    text-align: left;
    line-height: 40px;
    padding-left: 46px;
    font-size: 16px;
    color: #222222;
  }
  .content_tbody{
    border-bottom: 1px solid #d2d2d2;
  }
  .content_tbody td {
    font-size: 14px;
    color: #666666;
    text-align: center;
    height: 90px;
    vertical-align: middle;
  }
  .content_tbody td span{
    box-sizing: border-box;
    display: inline-block;
    width: 54px;
    height: 54px;
    vertical-align: middle;
    border: solid 1px #bfbfbf;
    margin-right: 40px;
  }
  .content_tbody td span img{
    vertical-align: middle;
    position: relative;
    top: 50%;
    transform: translateY(-50%);
  }
  .content_tbody td:first-child{
    text-align: left;
    padding-left: 46px;
    cursor: pointer;
  }
  tbody tr:first-child {
    border-top: 1px solid #d2d2d2;
  }
  tbody tr:last-child {
    border-bottom: none;
  }
  .quick_buy_td button {
    box-sizing: border-box;
    width: 80px;
    height: 28px;
    border-radius: 4px;
    border: solid 1px #c6351e;
    background-color: #ffffff;
    outline: none;
    cursor: pointer;
    font-size: 14px;
    color: #c6351e;
    margin: 0 10px;
  }
</style>
