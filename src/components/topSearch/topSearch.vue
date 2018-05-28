<template>
  <div class="topBox">.
    <div class="logo">
      <img src="./images/logo_head.png" alt="logo">
    </div>
    <div class="search_box">
      <div class="search">
        <el-select class="my_select" v-model="value" placeholder="请选择" >
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
        <div class="line1"></div>
        <el-input class="my_input" v-model="input" placeholder="请输入您要搜索的内容"></el-input>
        <div class="button"></div>
      </div>
      <div class="keyword">
        <ul>
          <li>热门搜索：</li>
          <li>关键字</li>
          <li>关键字</li>
          <li>关键字</li>
          <li>关键字</li>
          <li>关键字</li>
        </ul>
      </div>
    </div>
    <div class="favorite">
      <span class="s_text">收藏夹</span>
      <span class="s_num">99</span>
    </div>
  </div>
</template>

<script>
  export default {
    name: "topSearch",
    data() {
      return {
        options: [{
          value: '选项1',
          label: '共享维修设备'
        }, {
          value: '选项2',
          label: '共享维修案例'
        },],
        value: '选项1',
        input: '',
      }
    },
  }
</script>

<style scoped lang="stylus">
  .topBox {
    font-size 0
    box-sizing border-box
    width 1212px
    height 130px
    margin 0 auto
    .logo, .search_box, .favorite {
      display inline-block
      font-size 14px
      vertical-align top
    }
    .logo {
      margin-top 30px
      margin-left 8px
      margin-right 116px
    }
    .search_box {
      width 680px
      margin-top 35px
      .search {
        margin-bottom 8px
        box-sizing border-box
        background-color #ffffff
        width: 680px;
        height 34px
        line-height 34px
        border: 1px solid #c6351e;
        font-size 0
        .line1{
          display inline-block
          width 1px
          height 20px
          margin-top 6px
          background-color #bfbfbf;
          vertical-align top
        }
        .button{
          display inline-block
          width 70px
          height 32px
          line-height 32px
          background-color #c6351e
          vertical-align top
          background-image: url('./images/search.png');
          background-position: top 3px center;
          background-repeat: no-repeat;
          cursor pointer
        }
      }
      .keyword {
        color #acacac
        font-size 0
        li{
          display inline-block
          font-size 14px
          margin-right 10px
        }
        li:first-child{
          margin-right 0
        }
      }
    }
    .favorite{
      box-sizing border-box
      width 202px
      height 34px
      line-height 32px
      border 1px solid #c6351e
      margin-top 35px
      margin-left 54px
      padding-left 80px
      background-image: url('./images/like.png');
      background-position: top 6px left 50px;
      background-repeat: no-repeat;
      background-color #ffffff
      color #c6351e
      font-size 0
      position relative
      .s_text{
        display inline-block
        font-size 14px
      }
      .s_num{
        width 20px
        height 20px
        line-height 20px
        text-align center
        font-size 10px
        display inline-block
        color #ffffff
        background-color #c6351e
        border-radius 50%
        position absolute
        top 2px
        left 132px
      }
    }
  }
</style>
<style lang="stylus">
  .el-select.my_select{
    width 131px
    vertical-align top
    .el-input--suffix .el-input__inner {
      border-radius:0
      color #333333
      border: none;
      height: 32px;
      line-height: 32px;
      outline: 0;
      vertical-align top
      padding 0
      padding-left 15px
    }
    .el-input .el-select__caret{
      color #333333
      }
  }
  .el-input.my_input{
    display inline-block
    width 476px
    .el-input__inner{
      border: none;
      height: 32px;
      line-height: 32px;
      vertical-align top
    }
  }
</style>
