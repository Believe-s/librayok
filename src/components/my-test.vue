<template>
  <div class="container">
    <p>头部</p>
    <p class="content">
      <slot name="con" :test="testName">内容1</slot>
    </p>
    <p>
      <slot name="com">内容2</slot>
    </p>
  </div>
</template>

<script>
export default {
  data () {
    return {
      testName: '组件内部数据'
    }
  }
}
</script>

<style scoped lang="less">
</style>
