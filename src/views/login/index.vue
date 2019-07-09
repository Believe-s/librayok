<template>
  <div class="container">
    <!-- 卡片 -->
    <el-card class="login_box">
      <img src="../../assets/images/logo_index.png" alt />

    </el-card>

  </div>
</template>

<script>
export default {}
</script>

<style scoped lang='less'>
.container {
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  background: url(../../assets/images/login_bg.jpg) no-repeat center/cover;
  .login_box {
    width: 400px;
    height: 300px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    img {
      display: block;
      width: 200px;
      margin: 5px auto 20px;
    }
  }
}
</style>
