<template>
  <div class="nav_content">
    
    <div class="nav_content_title">
      <span>核对订单信息</span>
    </div>
    
    <div class="nav_content_table" v-if="buyInfoObj.apikey==='5a6be74a55aaf50001a5e250'">
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
          <td>{{buyInfoObj.assetname}}</td>
          <td>{{buyInfoObj.sell_type}}</td>
          <td>{{buyInfoObj.count}}</td>
          <td>{{buyInfoObj.price}}</td>
        </tr>
        </tbody>
      </table>
    </div>
    
    <div class="nav_content_table" v-if="buyInfoObj.apikey==='5ae04522cff7cb000194f2f4'">
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
          <td><img :src="buyInfoObj.asseturl" alt=""></td>
          <td>{{buyInfoObj.assetname}}</td>
          <td>{{buyInfoObj.sell_type}}</td>
          <td>{{buyInfoObj.count}}</td>
          <td>{{total}}</td>
        </tr>
        </tbody>
      </table>
    </div>
    
    <p class="order_amount">订单金额：<span>{{total}}</span></p>
    
    <div class="check_container" v-if="next===1">
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
      <div class="check_code check_confirm">
        <p>可使用可信币，进行等价交易。</p><br>
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
        <p>可使用可信币，进行等价交易。</p><br>
        <p>提示：可用其它钱包地址支付</p>
        <img class="check_code_img":src="`data:image/png;base64,${paymentInfo.png}`" alt="" v-if="walletAddress!==''">
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
        <p>可使用可信币，进行等价交易。</p><br>
        <p>提示：可用其它钱包地址支付</p>
        <div class="check_success">
          <img src="./images/payment.png" alt="">
          <p>支付成功！</p>
          <router-link to="/personalAssets" class="to_home">查看资产</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import axios from "axios";
  import {baseURL, cardURL} from '@/common/js/public.js';
  import myTopSearch from "../topSearch/topSearch"
  import {BigNumber} from 'bignumber.js';
  import formatDate from "@/common/js/formatDate.js";
  
  export default {
    name: "checkOrder",
    components: {
      myTopSearch
    },
    data() {
      return {
        paymentInfo:{},
        orderNum:"",
        userId: "",
        token: "",
        id: "",
        walletAddress: "",
        balance: 0,
        buyInfoObj: {},
        caseDetails: {},
        facilityDetails: {},
        next: 1,
        mallId: "5b18e49ea4cc0d14ed0a3a1c",
        timer: "",
        phone: ""
      }
    },
    mounted() {
      if (JSON.parse(sessionStorage.getItem("loginInfo"))) {
        this.userId = JSON.parse(sessionStorage.getItem("loginInfo")).user_id;
        this.token = JSON.parse(sessionStorage.getItem("loginInfo")).token;
        if (JSON.parse(sessionStorage.getItem("buyInfoObj"))) {
          this.orderNum=JSON.parse(sessionStorage.getItem("buyInfoObj")).orderNum
        }
        this.acquireOrderInfo();
        this.acquireUserInfo();
      }
    },
    beforeRouteLeave(to, from, next) {
      clearTimeout(this.timer);
      this.next = 1;
      next();
    },
    computed: {
      total: function () {
        return this.buyInfoObj.price
      }
    },
    methods: {
      open() {
        this.$confirm('此操作需要先绑定钱包地址, 是否绑定?', '提示', {
          confirmButtonText: '是',
          cancelButtonText: '否',
          type: 'warning',
          center: true
        }).then(() => {
          window.location.href = "#/securityCenter"
        }).catch(() => {
        });
      },
      notarize() {
        this.acquireIntegralInfo();
      },
      acquireIntegralInfo(){
        axios({
          method: "GET",
          url: `${baseURL}/v1/order/pay/${this.orderNum}`,
          headers: {
            "Content-Type": "application/json",
          }
        }).then((res) => {
          if(this.buyInfoObj.orderStatus===0){
            return
          }else if(this.buyInfoObj.orderStatus===1){
            this.paymentInfo=res.data;
            this.next = 2;
            if (this.walletAddress) {
              let that = this;
              this.timer = window.setTimeout(function () {
                that.acquireOrderStatus()
              }, 5000);
            } else {
              this.open()
            }
          }
        }).catch((err) => {
          console.log(err);
        });
      },
      acquireOrderInfo() {
        axios({
          method: "GET",
          url: `${baseURL}/v1/order/detail/${this.orderNum}`,
          headers: {
            "Content-Type": "application/json",
          }
        }).then((res) => {
          this.buyInfoObj =res.data;
          this.orderNum=this.buyInfoObj.orderNum;
          if(this.buyInfoObj.orderStatus===2){
            this.next=3
          }
        }).catch((err) => {
          console.log(err);
        });
      },
      acquireOrderStatus() {
        axios({
          method: "GET",
          url: `${cardURL}/v1/asset-payment/mall/${this.mallId}/order/${this.orderNum}`,
          headers: {
            "Content-Type": "application/json",
          }
        }).then((res) => {
          if (res.data.status === 0) {
            clearTimeout(this.timer);
            this.notarize()
          } else if (res.data.status === 1) {
            clearTimeout(this.timer);
            this.next = 3
          }
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
            this.balance = 0
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
          if (res.data.error) {
            this.balance = 0
          } else {
            this.balance = new BigNumber(Number(res.data.result)).dividedBy(1e+18).toFormat(2);
          }
        }).catch((err) => {
          console.log(err);
        });
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
    width: 130px;
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
