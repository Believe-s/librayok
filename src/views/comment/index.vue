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
              <!-- {{scope.row.comment_status}} -->
          </template>
        </el-table-column>
        <el-table-column label="操作" width="150px">
          <template slot-scope="scope">
            <el-button
              @click="toggleStatus(scope.row)"
              v-if="!scope.row.comment_status"
              type="success"
              size="mini"
            >打开评论</el-button>
            <el-button v-else @click="toggleStatus(scope.row)"  type="danger" size="mini">关闭评论</el-button>
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
        :total="total"
      ></el-pagination>
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
        response_type: 'comment'
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
    // 切换评论状态
    toggleStatus (row) {
      const text1 = '您确认要打开评论吗？'
      const text2 = '关闭后用户无法对该文章进行评论，您确认要关闭评论吗？'
      this.$confirm(row.comment_status ? text2 : text1, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async () => {
          const {
            data: { data }
          } = await this.$http.put('comments/status?article_id=' + row.id, {
            allow_comment: !row.comment_status
          })
          this.$message.success('修改状态成功')
          // 更新视图
          row.comment_status = data.allow_comment
          console.log(data)
        }).catch(() => {})
    },
    pager (newPage) {
      this.reqParams.page = newPage
      this.getComments()
    },
    async getComments () {
      const {
        data: { data }
      } = await this.$http.get('articles', { params: this.reqParams })
      console.log(data)
      this.comments = data.results
      // 给total赋值
      this.total = data.total_count
    }

  }
}
</script>

<style scoped lang="less">
</style>
