<template>
  <el-pagination class="my_paging"
    background=true
    layout="prev, pager, next"
    :total="1000">
  </el-pagination>
</template>

<script>
  export default {
    name: "paging",
    data() {
      return {}
    },
  }
</script>

<style scoped lang="stylus">

</style>
<style>
  .el-pagination.my_paging {
    white-space: nowrap;
    padding: 20px 0 30px;
    color: #666666;
    font-weight: normal;
  }
</style>
