<template>
  <div class="image-container">
    <!-- 图片按钮 -->
    <div class="img-btn" @click="dialogVisible=true">
      <img src="../assets/images/default.png" alt />
    </div>
    <!-- 对话框 -->
    <el-dialog :visible.sync="dialogVisible" width="700px">
      <!-- v-model="activeName"是选中了tab选项卡 name属性的值 -->
      <!-- label="配置管理"选项卡文字 el-tab-pane内容就是对应的内容容器-->
      <el-tabs v-model="activeName" type="card">
        <el-tab-pane label="素材库" name="image">
          <!-- 单选框组 -->
          <div style="margin-bottom:10px">
            <el-radio-group size="small" v-model="reqParams.collect">
              <el-radio-button :label="false">全部</el-radio-button>
              <el-radio-button :label="true">收藏</el-radio-button>
            </el-radio-group>
          </div>
          <!-- 图片列表 -->
          <div class="img-item" v-for="item in 8" :key="item">
            <img src="../assets/images/avatar.jpg" alt />
          </div>
          <!-- 分页区域 -->
          <el-pagination background layout="prev, pager, next" :total="1000"></el-pagination>
        </el-tab-pane>
        <el-tab-pane label="上传图片" name="upload">
          <el-upload
            class="avatar-uploader"
            action="https://jsonplaceholder.typicode.com/posts/"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <img v-if="imageUrl" :src="imageUrl" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-tab-pane>
      </el-tabs>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'my-image',
  data () {
    return {
      // 这是控制对框显示隐藏
      dialogVisible: false,
      // 控制选项卡选中谁
      activeName: 'image',
      // 请求素材列表的参数
      reqParams: {
        collect: false,
        page: 1,
        per_page: 8
      },
      // 上传图片预览的地址
      imageUrl: null
    }
  }
}
</script>

<style scoped lang="less">
.img-item {
  width: 150px;
  height: 120px;
  border: 1px dashed #ddd;
  display: inline-block;
  margin-right: 10px;
  img {
    width: 100%;
    height: 100%;
    display: block;
    //图片属性 让图片按照等比例缩放显示在容器内
    object-fit: contain;
  }
}
.img-btn {
  width: 150px;
  height: 150px;
  border: 1px dashed #ddd;
  img {
    width: 100%;
    height: 100%;
    display: block;
  }
}
</style>
