<template>
  <div class="container">
    <el-card>
      <div slot="header">
        <my-bread>评论管理</my-bread>
      </div>
      <!-- 表格 -->
      <el-table :data="comments">
        <el-table-column label="标题" prop="title"></el-table-column>
        <el-table-column label="总评论数" prop="total_comment_count"></el-table-column>
        <el-table-column label="粉丝评论数" prop="fans_comment_count"></el-table-column>
        <el-table-column label="状态">
            <template slot-scope="scope">
                {{scope.row.comment_status?'正常':'关闭'}}
            </template>
        </el-table-column>
        <el-table-column label="操作" width="150px">
             <template slot-scope="scope">
                <el-button v-if="!scope.row.coment_status" type="success" size="mini">打开评论</el-button>
                <el-button v-else type="danger" size="mini">关闭评论</el-button>
            </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <el-pagination
      style="margin-top:20px"
      background
      :page-size="reqParams.per_page"
      :current-page="reqParams.page"
      @current-cahnge="pager"
      layout="prev, pager, next"
      :total="total"></el-pagination>
    </el-card>
  </div>
</template>

<script>
export default {
  data () {
    return {
      // 所有评论信息
      comments: [],
      // 提交后台的参数
      reqParams: {
        page: 1,
        per_page: 20,
        respones_type: 'comment'
      },
      // 总条数
      total: 0
    }
  },
  created () {
    // 获取所有评论信息
    this.getComments()
  },
  methods: {
    pager (newPage) {
      this.reqParams.page = newPage
      this.getComments()
    },
    async getComments () {
      const { data: { data } } = await this.$http.get('articles', { params: this.reqParams })
      this.comments = data.results
      // 给total赋值
      this.total = data.total_count
    }
  }
}
</script>

<style scoped lang="less">
</style>
