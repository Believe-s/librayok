<template>
  <div class="image-container">
    <!-- 图片按钮 -->
    <div class="img-btn" @click="openDialog()">
      <img src="../assets/images/default.png" alt />
    </div>
    <!-- 对话框 -->
    <el-dialog :visible.sync="dialogVisible" width="700px">
      <!-- v-model="activeName"是选中了tab选项卡 name属性的值 -->
      <!-- label="配置管理"选项卡文字 el-tab-pane内容就是对应的内容容器-->
      <el-tabs v-model="activeName" type="card">
        <el-tab-pane label="素材库" name="image" v-loading="loading">
          <!-- 单选框组 -->
          <div style="margin-bottom:10px">
            <el-radio-group size="small" @change="toggleImage()" v-model="reqParams.collect">
              <el-radio-button :label="false">全部</el-radio-button>
              <el-radio-button :label="true">收藏</el-radio-button>
            </el-radio-group>
          </div>
          <!-- 图片列表 -->
          <div class="img-item" v-for="item in images" :key="item.id">
            <img :src="item.url" alt />
          </div>
          <!-- 分页区域 -->
          <el-pagination
          v-if="total>reqParams.per_page"
          background
          layout="prev, pager, next"
          :page-size="reqParams.per_page"
          :current-page="reqParams.page"
          @current-change="peger"
          :total="total"
          ></el-pagination>
        </el-tab-pane>
        <el-tab-pane label="上传图片" name="upload">
          <el-upload
            class="avatar-uploader"
            action="https://jsonplaceholder.typicode.com/posts/"
            :show-file-list="false"
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
      // 加载中
      loading: false,
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
      total: 0,
      // 上传图片预览的地址
      imageUrl: null,
      // 素材列表
      images: []
    }
  },
  methods: {
    // 打开对话框
    openDialog () {
      this.dialogVisible = true
      // 渲染列表
      this.getImages()
    },
    // 获取列表
    async getImages () {
      this.loading = true
      const { data: { data } } = await this.$http.get('user/images', { params: this.reqParams })
      this.images = data.results
      this.total = data.total_count
      this.loading = false
    },
    // 素材列表分页
    peger (newPage) {
      this.reqParams.page = newPage
      this.getImages()
    },
    // 素材列表切换
    toggleImage () {
      this.reqParams.page = 1
      this.getImages()
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
