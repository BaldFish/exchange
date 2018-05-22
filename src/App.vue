<template>
  <div id="app">
    <div class="head-wrap">
      <div class="head">
        <a href="javascript:void(0)">欢迎来到 可信链 ！</a>
        <a href="javascript:void(0)">请登录</a>
        <a href="javascript:void(0)">免费注册</a>
      </div>
    </div>
    <div class="main_wrap">
      <router-view class="main"></router-view>
    </div>
    <div class="footer-wrap">
      <div class="footer">
        <div class="fl-box">
          <img src="" alt="log">
        </div>
        <div class="fl-box">
          <p>资产服务</p>
          <ul>
            <li><a href="javascript:void(0)">维修案例</a></li>
            <li><a href="javascript:void(0)">维修设备</a></li>
            <li><a href="javascript:void(0)">汽车资产</a></li>
            <li><a href="javascript:void(0)">汽车零部件</a></li>
          </ul>
        </div>
        <div class="fl-box">
          <ul>
            <li>
              <a href="#/product">
                <img src="" alt="Android">
                <p>Android版</p>
              </a>
            </li>
            <li>
              <a href="#/product">
                <img src="" alt="IOS">
                <p>IOS版</p>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import "./common/stylus/index.styl";
export default {
  name: 'App'
}
</script>

<style lang="stylus">
  #app {
    /*min-height: 100vh;*/
    display: flex;
    flex-direction: column;
  }
  
  .head-wrap {
    width: 100%;
    height: 34px;
    background-color: #e5e5e5;
    .head {
      box-sizing: border-box
      width: 1200px;
      margin: 0 auto;
      text-align right
      line-height 34px
      a{
        margin-left 30px
        color: #666666;
      }
    }
  }
  
  .main_wrap {
    flex: 1;
    box-sizing: border-box;
    margin: 0 auto;
    width 100%
    min-width 1200px
  }
  .footer-wrap {
    width 100%
    min-width 1200px
    background-color: #272324;
    .footer {
      box-sizing: border-box
      width 1200px
      height 156px
      margin 0 auto
      .fl-box {
        p{
          font-size 16px
          color #ffffff
        }
        ul{
          font-size 0
          li{
            display inline-block
            font-size 14px
            a{
              color #ffffff
            }
          }
        }
      }
    }
  }
</style>
