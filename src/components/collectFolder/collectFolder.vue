<template>
  <div>
    <my-topSearch></my-topSearch>
    <div class="nav_body">
      <div class="nav_mid">
        <nav class="nav_tab">
          <ul>
            <li>
              <router-link to="">
                <span></span>
                <p>个人资产</p>
              </router-link>
            </li>
            <li>
              <router-link to="/collectFolder">
                <span></span>
                <p>收藏夹</p>
              </router-link>
            </li>
            <li>
              <router-link to="">
                <span></span>
                <p>历史订单</p>
              </router-link>
            </li>
            <li>
              <router-link to="">
                <span></span>
                <p>安全中心</p>
              </router-link>
            </li>
          </ul>
        </nav>
        <div class="nav_content">
          <div class="nav_content_title">
            <span>收藏夹</span>
          </div>

          <div class="nav_content_table">
            <table>
              <thead>
                <tr class="no_img_thead">
                  <th>名称</th>
                  <th>权益</th>
                  <th>数量</th>
                  <th>小计</th>
                  <th>操作</th>
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
                  <td class="quick_buy_td">
                    <button>一键购买</button>
                    <span>删除</span>
                  </td>
                </tr>
                <tr class="no_img_tbody">
                  <td>德国车载吸尘器无线12V汽车用小型家用手持式迷你充电强力大功型家用手持式迷你充电强力大功率</td>
                  <td>所有权</td>
                  <td>9</td>
                  <td>23456</td>
                  <td class="quick_buy_td">
                    <button>一键购买</button>
                    <span>删除</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div class="nav_content_table">
            <table>
              <thead>
              <tr class="img_thead">
                <th>图片</th>
                <th>名称</th>
                <th>权益</th>
                <th>数量</th>
                <th>小计</th>
                <th>操作</th>
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
                <td class="quick_buy_td">
                  <button>一键购买</button>
                  <span>删除</span>
                </td>
              </tr>
              <tr class="img_tbody">
                <td><img src="" alt=""></td>
                <td>德国车载吸尘器无线12V汽车用小型家用手持式迷你充电强力大功型家用手持式迷你充电强力大功率</td>
                <td>所有权</td>
                <td>9</td>
                <td>23456</td>
                <td class="quick_buy_td">
                  <button>一键购买</button>
                  <span>删除</span>
                </td>
              </tr>
              </tbody>
            </table>
          </div>

          <div class="clearfix paging">
            <my-paging></my-paging>
          </div>

        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import myTopSearch from "../topSearch/topSearch"
  import myPaging from "../paging/paging"
    export default{
        data(){
            return {
                msg: 'hello vue'
            }
        },
        components: {
          myPaging,myTopSearch
        }
    }
</script>
<style scoped>
  .paging{
    width:1080px;
    margin: 0 auto;
    text-align: center
  }
  .nav_body{
    background-color: #f3f3f3;
  }
  .nav_mid{
    width: 1212px;
    margin:0 auto;
  }
  .nav_tab{
    font-size: 18px;
    width: 100px;
    height: 128px;
    float: left;
  }
  .nav_tab p{
    color: #222222;
    line-height: 34px;
  }
  .nav_tab span{
    width: 14px;
    height: 14px;
    background-color: #7d7d7d;
    display: inline-block;
    float: left;
    margin-top: 10px;
    margin-right: 10px;
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
  }
  .quick_buy_td button{
    width: 80px;
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
  .quick_buy_td span{
    font-size: 13px;
    color: #666666;
    margin-top: 10px;
    display: inline-block;
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
  }
  .img_tbody td:first-child img{
    width: 54px;
    height: 54px;
    border: solid 1px #bfbfbf;
    display: inline-block;
  }
</style>
