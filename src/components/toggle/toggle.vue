<template>
  <div class="toggle">
    <ul>
      <li>
        <router-link to="/home">资产平台</router-link>
      </li>
      <li>
        <router-link to="/transferPlatform">转让平台</router-link>
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    name: "toggle",
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
  .toggle {
    width 100%
    height 26px
    border-bottom 2px solid #d91e01
    vertical-align top
    padding-left 34px
    ul {
      width 1212px
      margin 0 auto
      font-size 0
      li {
        display inline-block
        margin-right 46px
        a {
          font-size: 14px;
          color: #333333;
        }
      }
      li:nth-child(2){
        a{
          font-size: 14px;
          color:#d91e01;
        }
      }
    }
  }

</style>
