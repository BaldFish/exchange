<template>
  <div class="nav_content">
    
    <div class="nav_content_title">
      <span>核对订单信息</span>
    </div>
    
    <div class="nav_content_table" v-if="buyInfo.Apikey==='5a6be74a55aaf50001a5e250'">
      <table>
        <thead>
        <tr class="no_img_thead">
          <th>订单详情</th>
          <th>权益</th>
          <th>数量</th>
          <th>小计</th>
        </tr>
        <tr class="th_classify">
          <th colspan="5">维修案例</th>
        </tr>
        </thead>
        <tbody>
        <tr class="no_img_tbody">
          <td>{{buyInfo.Assetname}}</td>
          <td>{{buyInfo.SellType}}</td>
          <td>1</td>
          <td>{{buyInfo.Price}}</td>
        </tr>
        </tbody>
      </table>
    </div>
    
    <div class="nav_content_table" v-if="buyInfo.Apikey==='5ae04522cff7cb000194f2f4'">
      <table>
        <thead>
        <tr class="img_thead">
          <th>订单详情</th>
          <th></th>
          <th>权益</th>
          <th>数量</th>
          <th>小计</th>
        </tr>
        <tr class="th_classify">
          <th colspan="6">维修设备</th>
        </tr>
        </thead>
        <tbody>
        <tr class="img_tbody">
          <td><img src="" alt=""></td>
          <td>{{buyInfo.Assetname}}</td>
          <td>{{buyInfo.SellType}}</td>
          <td>1</td>
          <td>{{buyInfo.Price}}</td>
        </tr>
        </tbody>
      </table>
    </div>
    
    <p class="order_amount">订单金额：<span>{{buyInfo.Price}}</span></p>
    
    <div class="check_container" v-if="next===1">
      <div class="check_info">
        <h2>使用可信币抵用</h2>
      </div>
      <div class="check_code check_confirm">
        <p>可使用元积分币，进行等价交易。
          <router-link to="/securityCenter" class="to_bind">去绑定 ></router-link>
        </p>
        <br>
        <p>提示：可用其它钱包地址支付</p>
        <button @click="notarize">确认支付</button>
      </div>
    </div>
    
    <div class="check_container" v-if="next===2">
      <div class="check_info">
        <h2>使用可信币抵用</h2>
        <div class="check_title_info">
          <p v-if="walletAddress===''">未绑定钱包地址
            <router-link to="/securityCenter" class="to_bind">去绑定 ></router-link>
          </p>
          <p v-if="walletAddress!==''">钱包地址：{{walletAddress}}</p>
          <p>可信币：{{balance}}</p>
        </div>
      </div>
      <div class="check_code">
        <p>可使用元积分币，进行等价交易。</p><br>
        <p>提示：可用其它钱包地址支付</p>
        <img class="check_code_img" :src="`data:image/png;base64,${turnInfo.png}`" alt="">
      </div>
    </div>
    
    <div class="check_container" v-if="next===3">
      <div class="check_info">
        <h2>使用可信币抵用</h2>
        <div class="check_title_info">
          <p v-if="walletAddress===''">未绑定钱包地址
            <router-link to="/securityCenter" class="to_bind">去绑定 ></router-link>
          </p>
          <p v-if="walletAddress!==''">钱包地址：{{walletAddress}}</p>
          <p>可信币：{{balance}}</p>
        </div>
      </div>
      <div class="check_code">
        <p>可使用元积分币，进行等价交易。</p><br>
        <p>提示：可用其它钱包地址支付</p>
        <div class="check_success">
          <img src="./images/payment.png" alt="">
          <p>支付成功！</p>
          <router-link to="/home" class="to_home">返回首页</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import axios from "axios";
  import {baseURL, cardURL} from '@/common/js/public.js';
  import myTopSearch from "../topSearch/topSearch"
  
  export default {
    name: "checkOrder",
    components: {
      myTopSearch
    },
    data() {
      return {
        userId: "",
        token: "",
        apiKey: "",
        assetId: "",
        id: "",
        walletAddress: "",
        balance: "",
        buyInfoObj: {},
        buyInfo: {},
        turnInfo: {},
        caseDetails: {},
        facilityDetails: {},
        next: 1,
        mallId: "5b18e49ea4cc0d14ed0a3a1c",
      }
    },
    mounted() {
      if (JSON.parse(sessionStorage.getItem("loginInfo"))) {
        this.userId = JSON.parse(sessionStorage.getItem("loginInfo")).user_id;
        this.token = JSON.parse(sessionStorage.getItem("loginInfo")).token;
        if (JSON.parse(sessionStorage.getItem("buyInfoObj"))) {
          this.buyInfoObj = JSON.parse(sessionStorage.getItem("buyInfoObj"));
          this.buyInfo = this.buyInfoObj.buyInfo;
          this.assetId = this.buyInfo.Assetid
          this.turnInfo = this.buyInfoObj.turnInfo;
          console.log(this.buyInfoObj)
          /*if(this.buyInfo.Apikey==='5a6be74a55aaf50001a5e250'){
            this.acquireCaseDetails()
          }else if(this.buyInfo.Apikey==='5ae04522cff7cb000194f2f4'){
            this.acquireFacilityDetails()
          }*/
        }
        this.acquireUserInfo()
      }
      console.log(this.next)
    },
    methods: {
      notarize() {
        this.next = 2;
        var that = this;
        /*var timer = window.setInterval(function () {
          that.acquireOrderStatus()
        }, 5000);*/
      },
      acquireOrderStatus() {
        axios({
          method: "GET",
          url: `${cardURL}/v1/asset-payment/mall/${this.mallId}/order/${this.turnInfo.id}`,
          headers: {
            "Content-Type": "application/json",
          }
        }).then((res) => {
          console.log(res);
          /*if (res.data.status === 1) {
            window.clearInterval(timer);
            this.next = 3
          } else if (this.next === 2) {
            window.clearInterval(timer);
            this.next = 3
          }*/
        }).catch((err) => {
          console.log(err);
        });
      },
      acquireUserInfo() {
        axios({
          method: "GET",
          url: `${baseURL}/v1/users/${this.userId}`,
          headers: {
            "Content-Type": "application/json",
          }
        }).then((res) => {
          this.phone = res.data.phone.substr(3, 3) + "***" + res.data.phone.substr(10, 4);
          this.walletAddress = res.data.wallet_address;
          if (this.walletAddress) {
            this.acquireBalance()
          } else {
            this.balance = ""
          }
        }).catch((err) => {
          console.log(err);
        });
      },
      acquireBalance() {
        axios({
          method: "POST",
          url: `${cardURL}/`,
          headers: {
            "Content-Type": "application/json",
          },
          data: {
            "jsonrpc": "2.0",
            "method": "eth_getBalance",
            "params": [this.walletAddress, "latest"],
            "id": 1
          },
        }).then((res) => {
          this.balance = res.data.result;
        }).catch((err) => {
          console.log(err);
        });
      },
      acquireCaseDetails() {
        if (JSON.parse(sessionStorage.getItem("loginInfo"))) {
          axios({
            method: "GET",
            url: `${baseURL}/v1/asset/${this.apiKey}/${this.assetId}/detail?userid=${this.userId}`,
            headers: {
              "Content-Type": "application/json",
            }
          }).then((res) => {
            this.buyInfo = res.data;
            console.log(res)
          }).catch((err) => {
            console.log(err);
          })
        } else {
          axios({
            method: "GET",
            url: `${baseURL}/v1/asset/${this.apiKey}/${this.assetId}/detail`,
            headers: {
              "Content-Type": "application/json",
            }
          }).then((res) => {
            this.buyInfo = res.data;
          }).catch((err) => {
            console.log(err);
          })
        }
      },
      acquireFacilityDetails() {
        if (JSON.parse(sessionStorage.getItem("loginInfo"))) {
          axios({
            method: "GET",
            url: `${baseURL}/v1/asset/${this.apiKey}/${this.assetId}/detail?userid=${this.userId}`,
            headers: {
              "Content-Type": "application/json",
            }
          }).then((res) => {
            this.buyInfo = res.data
          }).catch((err) => {
            console.log(err);
          })
        } else {
          axios({
            method: "GET",
            url: `${baseURL}/v1/asset/${this.apiKey}/${this.assetId}/detail`,
            headers: {
              "Content-Type": "application/json",
            }
          }).then((res) => {
            this.buyInfo = res.data
          }).catch((err) => {
            console.log(err);
          })
        }
      },
    },
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
  
  .nav_content_table thead th {
    font-size: 16px;
    color: #222222;
  }
  
  .nav_content_table tbody td {
    font-size: 14px;
    color: #666666;
  }
  
  .nav_content_table tbody tr {
    border-bottom: 1px solid #d2d2d2;
    text-align: center;
    height: 90px;
  }
  
  .nav_content_table tbody tr td {
    vertical-align: middle;
  }
  
  .nav_content_table tbody tr:last-child {
    border-bottom: none;
  }
  
  .no_img_thead {
    height: 50px;
    line-height: 50px;
  }
  
  .no_img_thead th:nth-child(1) {
    width: 480px;
    text-align: left;
    padding-left: 46px;
  }
  
  .no_img_thead th {
    width: 154px;
  }
  
  .th_classify th {
    width: 1080px;
    height: 40px;
    background-color: #f6f7fa;
    text-align: left;
    line-height: 40px;
    padding-left: 46px;
  }
  
  .no_img_tbody td:nth-child(1) {
    text-align: left;
    padding-left: 46px;
    line-height: 20px;
  }
  
  .quick_buy_td button {
    width: 64px;
    height: 28px;
    border-radius: 4px;
    border: solid 1px #c6351e;
    background-color: #ffffff;
    outline: none;
    cursor: pointer;
    font-size: 14px;
    color: #c6351e;
    margin: 0 30px;
  }
  
  .img_thead {
    height: 50px;
    line-height: 50px;
  }
  
  .img_thead th:first-child {
    padding-left: 46px;
    text-align: left;
    width: 100px;
  }
  
  .img_thead th:nth-child(2) {
    text-align: left;
    width: 370px;
  }
  
  .img_thead th {
    width: 152px;
  }
  
  .img_tbody td:nth-child(2) {
    text-align: left;
    line-height: 20px;
  }
  
  .img_tbody td:first-child img {
    width: 54px;
    height: 54px;
    border: solid 1px #bfbfbf;
    display: inline-block;
  }
  
  .order_amount {
    text-align: right;
    font-size: 18px;
    color: #222222;
    margin-top: 20px;
    margin-bottom: 60px;
  }
  
  .order_amount span {
    color: #c6351e;
  }
  
  .check_container {
    width: 1080px;
    height: 330px;
    background-color: #ffffff;
    border-top: 6px solid #c6351e;
    margin-bottom: 130px;
  }
  
  .check_info h2 {
    font-size: 18px;
    color: #222222;
    margin: 18px;
    margin-bottom: 14px;
  }
  
  .check_title_info {
    font-size: 14px;
    color: #666666;
    margin-left: 22px;
    line-height: 24px;
  }
  
  .check_code {
    font-size: 16px;
    color: #222222;
    width: 240px;
    height: 180px;
    margin: 0 auto;
    margin-top: 30px;
  }
  
  .check_code_img {
    width: 100px;
    height: 100px;
    border: 1px solid #cccccc;
    display: inline-block;
    margin-top: 18px;
    margin-left: 58px;
  }
  
  .check_success {
    text-align: center;
    font-size: 16px;
    color: #c6351e;
    margin-top: 18px;
  }
  
  .check_success p {
    margin-top: 6px;
  }
  
  .to_home {
    width: 100px;
    height: 30px;
    display: inline-block;
    background-color: #c6351e;
    color: #ffffff;
    line-height: 30px;
    margin-top: 18px;
    margin-right: 14px;
  }
  
  .check_confirm {
    width: 310px;
    margin-top: 92px;
  }
  
  .check_confirm button {
    width: 100px;
    height: 30px;
    color: #ffffff;
    line-height: 30px;
    background-color: #c6351e;
    outline: none;
    border: none;
    cursor: pointer;
    margin-top: 24px;
    margin-left: 94px;
  }
  
  .to_bind {
    font-size: 14px;
    color: #c6351e;
  }
</style>
