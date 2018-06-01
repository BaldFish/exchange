<template>
  <div class="nav_content">
    
    <div class="nav_content_title">
      <span>核对订单信息</span>
    </div>
    
    <div class="nav_content_table">
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
          <td>德国车载吸尘器无线12V汽车用小型家用手持式迷你充电强力大功率德国车载吸尘你充电强力大功率</td>
          <td>所有权</td>
          <td>9</td>
          <td>23456</td>
        </tr>
        </tbody>
      </table>
    </div>
    
    <div class="nav_content_table">
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
          <td>德国车载吸尘器无线12V汽车用小型家用手持式迷你充电强力大功率德国车载吸尘你充电强力大功率</td>
          <td>所有权</td>
          <td>9</td>
          <td>23456</td>
        </tr>
        </tbody>
      </table>
    </div>
    
    <p class="order_amount">订单金额：<span>180.00</span></p>
    
    <div class="check_container">
      <div class="check_info">
        <h2>使用可信币抵用</h2>
        <div class="check_title_info">
          <p>钱包地址：0X93f478321.....5498268554</p>
          <p>可信币：129400.00</p>
        </div>
      </div>
      <div class="check_code">
        <p>可使用元积分币，进行等价交易。</p><br>
        <p>提示：可用其它钱包地址支付</p>
        <img class="check_code_img" src="" alt="">
      </div>
    </div>
    
    <div class="check_container">
      <div class="check_info">
        <h2>使用可信币抵用</h2>
        <div class="check_title_info">
          <p>钱包地址：0X93f478321.....5498268554</p>
          <p>可信币：129400.00</p>
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
    
    <div class="check_container">
      <div class="check_info">
        <h2>使用可信币抵用</h2>
      </div>
      <div class="check_code check_confirm">
        <p>可使用元积分币，进行等价交易。
          <router-link to="" class="to_bind">去绑定 ></router-link>
        </p><br>
        <p>提示：可用其它钱包地址支付</p>
        <button>确认支付</button>
      </div>
    </div>
  
  </div>
</template>

<script>
  import myTopSearch from "../topSearch/topSearch"
  export default{
    name: "checkOrder",
    data(){
      return {
        msg: 'hello vue'
      }
    },
    components: {
      myTopSearch
    }
  }
</script>
<style scoped>
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
  .th_classify th{
    width:1080px;
    height: 40px;
    background-color: #f6f7fa;
    text-align: left;
    line-height: 40px;
    padding-left: 46px;
  }
  .no_img_tbody td:nth-child(1){
    text-align: left;
    padding-left: 46px;
    line-height: 20px;
  }
  .quick_buy_td button{
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
  .img_thead{
    height: 50px;
    line-height: 50px;
  }
  .img_thead th:first-child{
    padding-left: 46px;
    text-align: left;
    width: 100px;
  }
  .img_thead th:nth-child(2){
    text-align: left;
    width:370px;
  }
  .img_thead th{
    width:152px;
  }
  .img_tbody td:nth-child(2){
    text-align: left;
    line-height: 20px;
  }
  .img_tbody td:first-child img{
    width: 54px;
    height: 54px;
    border: solid 1px #bfbfbf;
    display: inline-block;
  }
  .order_amount{
    text-align: right;
    font-size: 18px;
    color: #222222;
    margin-top: 20px;
    margin-bottom: 60px;
  }
  .order_amount span{
    color: #c6351e;
  }
  .check_container{
    width: 1080px;
    height: 330px;
    background-color: #ffffff;
    border-top: 6px solid #c6351e;
    margin-bottom: 130px;
  }
  .check_info h2{
    font-size: 18px;
    color: #222222;
    margin: 18px;
    margin-bottom: 14px;
  }
  .check_title_info{
    font-size: 14px;
    color: #666666;
    margin-left: 22px;
    line-height: 24px;
  }
  .check_code{
    font-size: 16px;
    color: #222222;
    width: 240px;
    height: 180px;
    margin:0 auto;
    margin-top: 30px;
  }
  .check_code_img{
    width: 100px;
    height: 100px;
    border:1px solid #cccccc;
    display: inline-block;
    margin-top: 18px;
    margin-left: 58px;
  }
  .check_success{
    text-align: center;
    font-size: 16px;
    color: #c6351e;
    margin-top: 18px;
  }
  .check_success p{
    margin-top: 6px;
  }
  .to_home{
    width: 100px;
    height: 30px;
    display: inline-block;
    background-color: #c6351e;
    color: #ffffff;
    line-height: 30px;
    margin-top: 18px;
    margin-right: 14px;
  }
  .check_confirm{
    width: 310px;
    margin-top: 92px;
  }
  .check_confirm button{
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
  .to_bind{
    font-size: 14px;
    color: #c6351e;
  }
</style>
