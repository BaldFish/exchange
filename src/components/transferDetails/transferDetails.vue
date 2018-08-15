<template>
    <div>
      <my-topSearch></my-topSearch>
      <my-toggle></my-toggle>
      <div class="goods-container">
        <div class="goods-banner">
          <img class="show-img" :src="activeImg" alt="">
          <div class="banner-box">
            <img class="prev" @click="prevImg" src="./images/pre.png" alt="">
            <div class="img-list">
              <ul v-bind:style="{right: toRight + 'px' }">
                <li v-for="item in bannerList" @click="showImg(item.url)">
                  <input type="radio" name="showImg">
                  <img :src="item.url" alt="">
                </li>
              </ul>
            </div>
            <img class="next" @click="nextImg" src="./images/next.png" alt="">
          </div>
        </div>
        <div class="goods-buy">
          <p class="goods-title">{{goodsTitle}}</p>
          <div class="goods-logo">
            <span>LAUNCH</span>
            <span>买家</span>
          </div>
          <div class="goods-details">
            <ul>
              <li>
                <label>认购金额：</label>
                <span class="money">￥{{price}}</span>
              </li>
              <li class="goods-list">
                <label>选择设备：</label>
                <ul>
                  <li v-for="data in goodsList" @click="getSingleGood(data)">
                    <input type="radio" name="radio" :disabled="data.status == 1?true:false" :checked="data.isChecked">
                    <div class="radio-box">
                      <img :src="data.url" alt="">
                      <p>{{data.name}}</p>
                    </div>
                  </li>
                </ul>
                <div style="clear: both"></div>
              </li>
              <li class="number">
                <label>数量：</label>
                <template>
                  <el-input-number v-model="num8" size="mini" controls-position="right" @change="handleChange" :min="1" :max="10"></el-input-number>
                </template>

                <label class="rest">剩余：</label>
                <span>{{total_num - complete_num}}/{{total_num}}</span>

              </li>
              <li class="progress">
                <label>当前进度：</label>
                <my-progressBar :percentage="percentage"></my-progressBar>
              </li>
            </ul>
            <div style="clear: both"></div>

            <div class="btn">
              <button type="button">收藏</button>
              <button type="button">认购</button>
            </div>

          </div>
        </div>
      </div>

      <div class="assets-container">
        <div class="tabs_nav">
          <ul class="tabs">
            <li @click="tabChange" :class="{'nav-avtive': isShow}">资产介绍</li>
            <li @click="tabChange" :class="{'nav-avtive': !isShow}">认购列表</li>
          </ul>
        </div>
        <div class="assets-table" v-if="isShow">
          <table class="table">
            <thead>
              <tr>
                <th><span class="dot"></span>资产名称</th>
                <th><span class="dot"></span>资产总额</th>
                <th><span class="dot"></span>状态</th>
                <th><span class="dot"></span>上链信息</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>共享维修设备1</td>
                <td>309345687元</td>
                <td>已售出</td>
                <td @click="dialogTableVisible = true">查看</td>
              </tr>
              <tr>
                <td>共享维修设备1</td>
                <td>309345687元</td>
                <td>已售出</td>
                <td @click="dialogTableVisible = true">查看</td>
              </tr>
              <tr>
                <td>共享维修设备1</td>
                <td>309345687元</td>
                <td>已售出</td>
                <td @click="dialogTableVisible = true">查看</td>
              </tr>
              <tr>
                <td>共享维修设备1</td>
                <td>309345687元</td>
                <td>已售出</td>
                <td @click="dialogTableVisible = true">查看</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="offer-list" v-else>
          <table class="table">
            <thead>
            <tr>
              <th><span class="dot"></span>帐号</th>
              <th><span class="dot"></span>设备名称</th>
              <th><span class="dot"></span>金额</th>
              <th><span class="dot"></span>时间</th>
            </tr>
            </thead>
            <tbody>
            <tr>
              <td>138****7431</td>
              <td>维修共享设备2</td>
              <td>21000元</td>
              <td>2018-08-02 16:01:51</td>
            </tr>
            <tr>
              <td>138****7431</td>
              <td>维修共享设备2</td>
              <td>21000元</td>
              <td>2018-08-02 16:01:51</td>
            </tr>
            <tr>
              <td>138****7431</td>
              <td>维修共享设备2</td>
              <td>21000元</td>
              <td>2018-08-02 16:01:51</td>
            </tr>
            <tr>
              <td>138****7431</td>
              <td>维修共享设备2</td>
              <td>21000元</td>
              <td>2018-08-02 16:01:51</td>
            </tr>

            </tbody>
          </table>
        </div>

      </div>

      <img class="lock" src="./images/lock.png" alt="">

      <el-dialog class="info-dialog" title="上链信息" :visible.sync="dialogTableVisible">
        <div>
          <p class="title">资产详情</p>
          <div class="details-container">
            <img src="./images/02.png" alt="">
            <div class="box1-tips">
              <span>认证商家</span>
              <span>认证账户</span>
              <span>高可信</span>
            </div>
            <ul>
              <li>
                <label>资产所属人：</label>
                <span>0X32829342....1234567890</span>
              </li>
              <li>
                <label>权益：</label>
                <span>所有权</span>
              </li>
              <li>
                <label>设备ID：</label>
                <span>String123456</span>
              </li>
              <li>
                <label>时间：</label>
                <span>2005.03.04 12：32：44</span>
              </li>
            </ul>
            <div style="clear: both"></div>
          </div>
        </div>
        <div class="record-container1">
          <p class="title">资产转让记录</p>
          <div class="scroll-box">
            <p>
              <label>"资产ID" :</label>
              <span>"5ac33fa7d6c15a00018d8857",</span>
            </p>
            <p>
              <label>"记录名称" :</label>
              <span>"设备订单信息",</span>
            </p>
            <p>
              <label>"记录内容" :</label>
              <span>{"订单号": "SROR20180525022311322", "记录时间":"2018-05-25 02:23:01"}",</span>
            </p>
            <p>
              <label>"记录哈希" :</label>
              <span>"0xcb8a702e63313d95c0af111c9b8d03fd32410faef618440ba1b8f8637cf5b981",</span>
            </p>
            <p>
              <label>"交易哈希" :</label>
              <span>"0x56e81f171bcc55a6ff8345e692c0f86e5b48e01b996cadc001622fb5e363b421"</span>
            </p>
            <p>
              <label>"记录时间": </label>
              <span>"2018-05-23 09:13:30"</span>
            </p>
            <br>
            <p>
              <label>"资产ID" :</label>
              <span>"5ac33fa7d6c15a00018d8857",</span>
            </p>
            <p>
              <label>"记录名称" :</label>
              <span>"设备订单信息",</span>
            </p>
            <p>
              <label>"记录内容" :</label>
              <span>{"订单号": "SROR20180525022311322", "记录时间":"2018-05-25 02:23:01"}",</span>
            </p>
            <p>
              <label>"记录哈希" :</label>
              <span>"0xcb8a702e63313d95c0af111c9b8d03fd32410faef618440ba1b8f8637cf5b981",</span>
            </p>
            <p>
              <label>"交易哈希" :</label>
              <span>"0x56e81f171bcc55a6ff8345e692c0f86e5b48e01b996cadc001622fb5e363b421"</span>
            </p>
            <p>
              <label>"记录时间": </label>
              <span>"2018-05-23 09:13:30"</span>
            </p>

          </div>
        </div>
        <div class="record-container2">
          <p class="title">资产转让记录</p>
          <div class="scroll-box">
            <p>
              <label>"资产ID" :</label>
              <span>"5ac33fa7d6c15a00018d8857",</span>
            </p>
            <p>
              <label>"记录名称" :</label>
              <span>"设备订单信息",</span>
            </p>
            <p>
              <label>"记录内容" :</label>
              <span>{"订单号": "SROR20180525022311322", "记录时间":"2018-05-25 02:23:01"}",</span>
            </p>
            <p>
              <label>"记录哈希" :</label>
              <span>"0xcb8a702e63313d95c0af111c9b8d03fd32410faef618440ba1b8f8637cf5b981",</span>
            </p>
            <p>
              <label>"交易哈希" :</label>
              <span>"0x56e81f171bcc55a6ff8345e692c0f86e5b48e01b996cadc001622fb5e363b421"</span>
            </p>
            <p>
              <label>"记录时间": </label>
              <span>"2018-05-23 09:13:30"</span>
            </p>
            <br>
            <p>
              <label>"资产ID" :</label>
              <span>"5ac33fa7d6c15a00018d8857",</span>
            </p>
            <p>
              <label>"记录名称" :</label>
              <span>"设备订单信息",</span>
            </p>
            <p>
              <label>"记录内容" :</label>
              <span>{"订单号": "SROR20180525022311322", "记录时间":"2018-05-25 02:23:01"}",</span>
            </p>
            <p>
              <label>"记录哈希" :</label>
              <span>"0xcb8a702e63313d95c0af111c9b8d03fd32410faef618440ba1b8f8637cf5b981",</span>
            </p>
            <p>
              <label>"交易哈希" :</label>
              <span>"0x56e81f171bcc55a6ff8345e692c0f86e5b48e01b996cadc001622fb5e363b421"</span>
            </p>
            <p>
              <label>"记录时间": </label>
              <span>"2018-05-23 09:13:30"</span>
            </p>
            <br>
            <p>
              <label>"资产ID" :</label>
              <span>"5ac33fa7d6c15a00018d8857",</span>
            </p>
            <p>
              <label>"记录名称" :</label>
              <span>"设备订单信息",</span>
            </p>
            <p>
              <label>"记录内容" :</label>
              <span>{"订单号": "SROR20180525022311322", "记录时间":"2018-05-25 02:23:01"}",</span>
            </p>
            <p>
              <label>"记录哈希" :</label>
              <span>"0xcb8a702e63313d95c0af111c9b8d03fd32410faef618440ba1b8f8637cf5b981",</span>
            </p>
            <p>
              <label>"交易哈希" :</label>
              <span>"0x56e81f171bcc55a6ff8345e692c0f86e5b48e01b996cadc001622fb5e363b421"</span>
            </p>
            <p>
              <label>"记录时间": </label>
              <span>"2018-05-23 09:13:30"</span>
            </p>
          </div>
        </div>
      </el-dialog>

    </div>
</template>

<script>
  import axios from "axios";
  import {baseURL, cardURL} from '@/common/js/public.js';
  import myTopSearch from "../topSearch/topSearch"
  import myToggle from "../toggle/toggle"
  import myProgressBar from "../progressBar/progressBar"

  export default {
    name: "transferDetails",
    data() {
        return {
          num8: 1,
          goodsTitle:'',
          percentage:75,
          isShow:true,
          dialogTableVisible: false,
          toRight:0,
          bannerList:[],
          goodsList:[],
          activeImg:require('./images/02.png'),
          price:'',
          complete_num:'',
          total_num:'',
          firstCheckedIndex:0,//第一次出现"0未完成"数组下标


        }
    },
    created() {
    },
    mounted() {
      //商品标题&进度条
      this.getGoodsTitle();
      //商品图片、商品列表
      this.getGoodsDetails();

    },
    methods: {
      handleChange(value) {
        console.log(value);
      },
      tabChange() {
        this.isShow = !this.isShow
      },
      //上一张图
      prevImg(){
        this.toRight = this.toRight + 60
      },
      //下一张图
      nextImg(){
        if(this.toRight == 0){
          return false
        }else{
          this.toRight = this.toRight - 60
        }
      },
      //展示大图
      showImg(item){
        this.activeImg = item
      },
      //商品标题&进度条
      getGoodsTitle(){
        axios({
          method: "GET",
          url: `${cardURL}/v1/assets-transfer/package/1`,
          headers: {
            "Content-Type": "application/json",
          }
        }).then((res) => {
          this.goodsTitle=res.data.name;
          this.percentage = Math.round((res.data.complete_amount / res.data.total_amount)*100);
        }).catch((err) => {
          console.log(err);
        })
      },
      //商品图片、商品列表
      getGoodsDetails(){
        axios({
          method: "GET",
          url: `${cardURL}/v1/assets-transfer/asset/packid/1`,
          headers: {
            "Content-Type": "application/json",
          }
        }).then((res) => {
          //获取轮播数据
          this.bannerList = res.data.data;
          this.activeImg = res.data.data[0].url;
          //获取商品数据
          this.goodsList = res.data.data;
          /*this.goodsList =  [
            {
              "id": "1",
              "apikey": "zyclq",
              "name": "中央处理器",
              "url": "http://pic42.photophoto.cn/20170311/1155117159645226_b.jpg",
              "status": 1,
              "total_num": 10,
              "price": 2000
            },
            {
              "id": "2",
              "apikey": "ncnco",
              "name": "内存",
              "url": "http://pic44.photophoto.cn/20170726/0017029157836055_b.jpg",
              "status": 0,
              "total_num": 10,
              "price": 888
            },
            {
              "id": "3",
              "apikey": "xpxpo",
              "name": "芯片",
              "url": "http://pic43.photophoto.cn/20170602/1190121114784731_b.jpg",
              "status": 1,
              "total_num": 10,
              "price": 1000
            },
            {
              "id": "4",
              "apikey": "iosbo",
              "name": "IO设备",
              "url": "http://pic44.photophoto.cn/20170729/0008118023308172_b.jpg",
              "status": 0,
              "total_num": 8,
              "price": 1666
            },
            {
              "id": "5",
              "apikey": "dyuan",
              "name": "电源",
              "url": "http://pic44.photophoto.cn/20170725/0017029572630842_b.jpg",
              "status": 0,
              "total_num": 4,
              "price": 500
            }
          ];*/

          //判断首次出现"0未完成"位置，并添加isChecked属性
          let unDoneList = [];
          //let j=0;
          this.goodsList.forEach((good)=>{
            good.isChecked = false;
            if(good.status == 0){
              unDoneList.push(good)
            }
          });
          for (let i=0;i<this.goodsList.length;i++){
            if(this.goodsList[i].id == unDoneList[0].id){
              this.firstCheckedIndex=i;
            }
          }
          this.goodsList[this.firstCheckedIndex].isChecked = true;

          this.getSingleGood(this.goodsList[this.firstCheckedIndex])
        }).catch((err) => {
          console.log(err);
        })
      },
      //点击单个商品
      getSingleGood(data){
        this.goodsList.forEach((good)=>{
          good.isChecked = false;
        });
        data.isChecked = true;

        axios({
          method: "GET",
          url: `${cardURL}/v1/assets-transfer/asset/id/${data.id}/${data.apikey}`,
          headers: {
            "Content-Type": "application/json",
          }
        }).then((res) => {
          this.complete_num = res.data.complete_num;
          this.total_num = res.data.total_num;
          this.price = res.data.price;
        }).catch((err) => {
          console.log(err);
        })
      },



    },
    watch: {},
    computed: {},
    components: {
      myTopSearch,
      myToggle,
      myProgressBar,
    },
  }
</script>

<style scoped lang="stylus">
  .goods-banner{
    width:350px
    height:425px
    float: left
    margin-left: 30px;
    margin-top: 20px;
  }
  .show-img{
    width: 350px;
    height: 350px;
    border: solid 1px #eeeeee;
    margin-bottom: 20px;
  }
  .banner-box{
    height: 50px;
    width:350px
  }
  .img-list{
    height: 52px;
    width: 240px;
    margin-left: 60px;
    overflow: hidden;
  }
  .banner-box ul {
    height: 52px;
    width: 900px;
    position: relative
  }
  .banner-box ul li{
    float left
    width: 50px;
    height: 50px;
    border: solid 1px #eeeeee;
    margin-right 8px
    cursor pointer
  }
  .banner-box ul li:hover img{
    border: solid 1px #d91e01;
  }
  .banner-box ul li input{
    width: 50px;
    height: 50px;
    position relative;
    z-index:60;
    cursor pointer;
    opacity 0
  }
  .banner-box ul li input:checked +img{
    border: solid 1px #d91e01;
  }
  .banner-box ul li img{
    width: 50px;
    height: 49px;
    position: relative;
    top: -52.3px;
    border: solid 1px #eee;
    right: 1px;
  }
  .prev{
    float left
    margin-top: 10px;
    cursor pointer
  }
  .next{
    float right
    margin-top: -42px;
    cursor pointer
  }
</style>
<style scoped lang="stylus">
  .goods-container{
    width:1200px;
    height:500px;
    margin:45px auto;
    background-color: #fff;
  }
  .goods-buy{
    width:735px;
    float: right;
    margin-top: 36px;
    margin-right: 56px;
  }
  .goods-title{
    font-size: 14px;
    color: #333333;
  }
  .goods-logo{
    width: 78px;
    height: 18px;
    border:1px solid #d91e01;
    text-align center;
    margin-top 8px
    margin-bottom 10px
  }
  .goods-logo span:first-child{
    font-size: 6px;
    width: 45px;
    color: #d91e01;
    line-height: 18px;
    margin: 0 auto;
    display: inline-block;
    float: left;
  }
  .goods-logo span:last-child{
    font-size: 12px;
    width: 33px;
    height: 20px;
    display: inline-block;
    background-color: #d91e01;
    color: #fff;
    position: relative;
    bottom: 1px;
    line-height: 20px;
    right: -1px;
  }
  .goods-details ul li{
    margin-bottom 15px
  }
  .goods-details ul li label{
    font-size: 14px;
    color: #999999;
  }
  .money{
    font-size: 16px;
    color: #d91e01;
  }
  .goods-list li{
    float left
    margin-right 16px
    margin-bottom 10px
    font-size: 14px;
    color: #333333;
    cursor pointer
    height:52px
  }
  .goods-list li input:disabled + div{
    background-color: #eee;
  }
  .goods-list li input:disabled + div p{
    opacity: 0.5;
  }
  .goods-list li img{
    width: 40px;
    height: 40px;
    float: left;
    margin-top: 4.5px;
    margin-right: 10px;
    margin-left: 5px;
  }
  .goods-list li p{
    line-height 52px
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    padding-right: 5px;
  }
  .goods-list label{
    float left
    margin-right 8px
    height: 180px;
  }
  .goods-list li input{
    width: 200px;
    height: 50px;
    cursor: pointer;
    position: relative;
    z-index:99
    opacity 0
  }
  .radio-box{
    width: 200px;
    height: 50px;
    border: solid 1px #eeeeee;
    position: relative;
    bottom:52px
  }
  .goods-list li input:checked +.radio-box{
    background:url("./images/red_bg.png") no-repeat center;
    background-size 100% 100%
  }
  .progress label{
    float left
  }
  .progress .progressBar{
    float left
    margin-left 6px
    margin-top: 2px;
  }
  .rest {
    margin-left 36px
  }
  .rest +span{
    color: #333
  }
  .btn button{
    width: 100px;
    height: 40px;
    border: solid 1px #d91e01;
    outline none
    background-color #fff
    font-size: 16px;
    color: #d91e01;
    margin-right 20px
    cursor pointer
  }
  .btn button:first-child{
    margin-left: 76px;
    margin-top: 18px;
  }
  .btn button:last-child{
    background-color #d91e01
    color: #fff
  }
  .number label:first-child{
    width: 70px;
    display: inline-block;
    text-align: right;
    margin-right: 3px;
  }
</style>
<style scoped lang="stylus">
  .assets-container{
    width: 1200px;
    height: 360px;
    background-color #fff
    margin:0 auto
  }
  .tabs_nav{
    height: 48px;
    border-bottom: solid 1px #d91e01;
  }
  .tabs li{
    width: 92px;
    height: 48px;
    float left;
    text-align center;
    line-height 48px
    font-size: 14px;
    color: #333333;
    cursor pointer
  }
  .nav-avtive{
    color: #fff !important
    background-color: #d91e01;
  }
  .table{
    width:1200px
    text-align center
  }
  .table thead{
    font-size: 14px;
    color: #333333;
  }
  .table tbody{
    color: #666666;
  }
  .table thead th{
    border-right: solid 1px #eeeeee;
    border-bottom: solid 1px #eeeeee;
    height 50px
    line-height 50px
    width: 300px;
  }
  .table tbody td{
    border-right: solid 1px #eeeeee;
    border-bottom: solid 1px #eeeeee;
    height 36px
    line-height 36px
    cursor pointer
  }
  .table tbody tr:hover{
    color: #d91e01;
  }
  .dot{
    width: 6px;
    height: 6px;
    display inline-block
    border-radius 50%
    background-color: #bfbfbf;
    margin-right: 6px;
    margin-bottom: 2px;
  }
  .lock{
    margin: 0 auto;
    display: inherit;
    margin-top: 20px;
    margin-bottom 80px
  }
  .title{
    font-size: 14px;
    color: #333333;
    border-left:1px solid #d91e01;
    padding-left 8px
    margin-bottom: 16px;
  }
  .details-container{
    margin-bottom 16px
  }
  .details-container img{
    width: 80px;
    height: 80px;
    border: solid 1px #eeeeee;
    float left
    margin-left: 10px;
  }
  .box1-tips span{
    width: 60px;
    height: 25px;
    display inline-block;
    color: #fff;
    font-size: 14px;
    text-align center;
    line-height 25px;
    margin-right 4px
    margin-bottom: 4px;
  }
  .box1-tips span:nth-child(1){
    background-color: #ffa195;
    margin-left 10px
    margin-top: 6px;
  }
  .box1-tips span:nth-child(2){
    background-color: #ffdc8f;
  }
  .box1-tips span:nth-child(3){
    background-color: #8bc8ff;
  }
  .details-container ul li{
    float left;
    margin: 5px
    margin-left 10px
    font-size: 14px;
    width: 286px;
  }
  .details-container ul li label{
    color: #999999;
  }
  .details-container ul li span{
    color: #666666;
  }
  .record-container1 .scroll-box{
    height: 85px;
  }
  .record-container2 .scroll-box{
    height: 220px;
  }
  .scroll-box{
    line-height normal;
    font-size: 12px;
    color: #999;
    margin-left: 10px
    width: 675px;
    border: solid 1px #eeeeee;
    padding-left 10px
    overflow-y: scroll;
    overflow-x: hidden;
    margin-bottom: 16px;
  }
  .scroll-box p:first-child{
    margin-top 15px
  }
  .scroll-box p:last-child{
    margin-bottom 15px
  }

  /*定义滚动条高宽及背景 高宽分别对应横竖滚动条的尺寸*/
  .scroll-box::-webkit-scrollbar {
    width: 4px;
    height: 16px;
    background-color: #fff;
  }
  /*定义滚动条轨道 内阴影+圆角*/
  .scroll-box::-webkit-scrollbar-track {
    /*-webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);*/
    border-radius: 10px;
    background-color: #fff;
  }
  /*定义滑块 内阴影+圆角*/
  .scroll-box::-webkit-scrollbar-thumb {
    border-radius: 2px;
    /*-webkit-box-shadow: inset 0 0 6px rgba(0,0,0,.3);*/
    background-color: #eeeeee;
  }
</style>
<style>
  .info-dialog .el-dialog__title{
    text-align: center;
    display: inherit;
  }
  .info-dialog .el-dialog__body{
    padding-top: 0;
  }
  .info-dialog .el-dialog{
    border-radius: 30px;
    padding: 0 10px;
  }
</style>
