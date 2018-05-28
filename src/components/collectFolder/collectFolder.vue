<template>
  <div>
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

        </div>
      </div>
    </div>
  </div>
</template>

<script>

    export default{
        data(){
            return {
                msg: 'hello vue'
            }
        },
 /*       components: {
            'other-component': OtherComponent, HeaderComponent
        }*/
    }
</script>
<style scoped>
  .nav_body{
    background-color: #f3f3f3;
  }
  .nav_mid{
    width: 1212px;
    margin:0 auto;
  }
  .nav_tab{
    font-size: 18px;
    width: 94px;
    height: 128px;
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
    margin-right: 8px;
  }
</style>
