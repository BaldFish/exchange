<template>
  <div class="developer">
    <div class="dev">
      <ul>
        <li>
          <img src="./images/1.png" alt="">
          <div class="presentation">
            <h4>Engine API 白皮书</h4>
            <p>介绍了平台所提供的API接口，主要分为 HTTP 和 gRPC 两类，用于完成数据的上链存证、数据获取和查询、数据所在区块信息等操作。</p>
            <!--<a href="javascript:void(0)">下载</a>-->
          </div>
        </li>
        <li>
          <img src="./images/2.png" alt="">
          <div class="presentation">
            <h4>元数据标准白皮书</h4>
            <p>定义了平台中数据实体形式和元数据内容，主要包括了标识信息、元数据信息、位置信息、自定义列表。</p>
            <!--<a href="javascript:void(0)">下载</a>-->
          </div>
        </li>
        <li>
          <img src="./images/3.png" alt="">
          <div class="presentation">
            <h4>多方计算白皮书</h4>
            <p>一组互不信任的参与方，在不泄露彼此数据的前提下，进行协同计算，得到计算结果。</p>
            <!--<a href="javascript:void(0)">下载</a>-->
          </div>
        </li>
        <li>
          <img src="./images/4.png" alt="">
          <div class="presentation">
            <h4>安全上链白皮书</h4>
            <p>基于硬件安全元素的敏感数据保护方案，支持嵌入式设备及pc等多种接口。</p>
            <!--<a href="javascript:void(0)">下载</a>-->
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  export default {
    name: "developer",
    components: {},
    data() {
      return {}
    },
    created() {
    },
    mounted() {
    },
    watch: {},
    computed: {},
    methods: {},
  }
</script>

<style scoped lang="stylus">
.developer{
  .dev{
    width 1212px
    margin 0 auto
    ul{
      padding-top 56px
      padding-bottom 85px
      li{
        position relative
        box-sizing border-box
        height 172px
        padding-top 26px
        margin-bottom 13px
        img{
          width 142px
          height 172px
          position absolute
          top 0
          left 44px
          z-index 1000
        }
        .presentation{
          box-sizing border-box
          width: 1016px;
          height: 120px;
          background-color: #ffffff;
          box-shadow: -1px 1px 7px 0px rgba(14, 14, 14, 0.1);
          border-radius: 4px;
          color: #333333;
          position relative
          padding-top 22px
          padding-left 46px
          margin-left 135px
          h4{
            
            font-size: 20px;
          }
          p{
            font-size: 14px;
            margin-top 20px
          }
          a{
            //display inline-block
            position absolute
            top 46px
            right 20px
            background-color: #d92104;
            border-radius: 4px;
            padding 10px 18px
            color #ffffff
          }
        }
      }
    }
  }
}
</style>
