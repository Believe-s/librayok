<template>
  <div class="container">
    <el-card>
      <div slot="header">
        <my-bread>素材管理</my-bread>
      </div>
      <div style="margin-bottom:20px">
        <!-- 按钮式单选框 -->
        <el-radio-group size="small" @change="search()" v-model="reqParams.collect">
          <el-radio-button :label="false">全部</el-radio-button>
          <el-radio-button :label="true">收藏</el-radio-button>
        </el-radio-group>
        <!-- 添加素材按钮 -->
        <el-button type="success" size="small" style="float:right">添加素材</el-button>
      </div>
      <ul class="img-list">
          <li v-for="item in images" :key="item.id">
              <img :src="item.url" alt="">
              <div class="fot">
                  <span class="el-icon-star-off" :class="{red:item.is_collected}"></span>
                  <span class="el-icon-delete"></span>
              </div>
          </li>
      </ul>
      <el-pagination
      background
      layout="prev, pager, next"
      :total="1000">
      </el-pagination>
    </el-card>
  </div>
</template>

<script>
export default {
  data () {
    return {
      // 请求参数
      reqParams: {
        collect: false,
        page: 1,
        per_page: 10
      },
      // 素材列表
      images: []
    }
  },
  created () {
    // 获取素材列表
    this.getImages()
  },
  methods: {
    search () {
      this.reqParams.page = 1
      this.getImages()
    },
    async getImages () {
      const { data: { data } } = await this.$http.get('user/images', { params: this.reqParams })
      this.images = data.results
    }
  }
}
</script>

<style scoped lang="less">
.img-list {
    list-style: none;
    margin: 0;
    padding: 0;
    overflow: hidden;
    li{
        width: 300px;
        height: 300px;
        float: left;
        border: 1px dashed #eee;
        margin-right: 20px;
        margin-bottom: 20px;
        position: relative;
        img{
            width: 100%;
            height: 100%;
            display: block;
        }
        .fot{
            width: 100%;
            height: 30px;
            line-height: 30px;
            color: #ffffff;
            background: rgba(0, 0, 0, .5);
            position: absolute;
            left: 0;
            bottom: 0;
            text-align: center;
            span{
                margin: 0 37px;
                &.red{
                    color: red;
                }
            }
        }
    }
}
</style>
