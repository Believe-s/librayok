<template>
  <div class="container">
    <el-card>
      <div slot="header">
        <my-bread>个人设置</my-bread>
      </div>
      <el-row>
        <el-col :span="12">
          <!-- 表单 -->
          <el-form :model="userForm" label-width="120px">
            <el-form-item label="编号:">{{userForm.id}}</el-form-item>
            <el-form-item label="手机号:">{{userForm.mobile}}</el-form-item>
            <el-form-item label="邮箱:">
              <el-input v-model="userForm.email"></el-input>
            </el-form-item>
            <el-form-item label="媒体名称:">
              <el-input v-model="userForm.name"></el-input>
            </el-form-item>
            <el-form-item label="媒体介绍:">
              <el-input type="textarea" v-model="userForm.intro"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="updataUser()">保存设置</el-button>
            </el-form-item>
          </el-form>
        </el-col>
        <el-col :span="12">
          <!-- ?上传头像 -->
          <el-upload
            class="avatar-uploader"
            action="http://ttapi.research.itcast.cn/mp/v1_0/user/photo"
            :show-file-list="false"
            :http-request="upload"
          >
            <img v-if="userForm.photo" :src="userForm.photo" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
          <p style="text-align:center">修改头像</p>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script>
import eventBus from '@/eventBus'
export default {
  data () {
    return {
      headers: {
        Authorization: 'Bearer ' + JSON.parse(window.sessionStorage.getItem('libray')).token
      },
      userForm: {
        id: null,
        name: null,
        intro: null,
        photo: null,
        email: null,
        mobile: null
      },
      imageUrl: null
    }
  },
  created () {
    // 获取用户资料
    this.getUser()
  },
  methods: {
    async getUser () {
      const {
        data: { data }
      } = await this.$http.get('user/profile')
      this.userForm = data
    },
    async updataUser () {
      const { data: { data } } = await this.$http.patch('user/profile', {
        name: this.userForm.name,
        intro: this.userForm.intro,
        email: this.userForm.email
      })
      this.$message.success('修改用户信息成功')
      // 让头部的用户名称和返回的用户名称同步
      // setting组件的数据传递给home组件
      eventBus.$emit('updateHeaderName', data.name)
      // 保存sessionStorage的信息
      const localUser = JSON.parse(window.sessionStorage.getItem('libray'))
      localUser.name = data.name
      window.sessionStorage.setItem('libray', JSON.stringify(localUser))
    },
    upload (data) {
      // 选择的图片
      // 把文件数据 放在 formData 中
      const formData = new FormData()
      formData.append('photo', data.file)
      this.$http.patch('user/photo', formData).then(res => {
        // 更新设置的头像
        this.userForm.photo = res.data.data.photo
        // 更新头部
        eventBus.$emit('updateHeaderPhoto', res.data.data.photo)
        // 更新本地存储
        const localUser = JSON.parse(window.sessionStorage.getItem('libray'))
        localUser.photo = res.data.data.photo
        window.sessionStorage.setItem('libray', JSON.stringify(localUser))
      })
    }
    // handleSuccess (res) {
    // res 获取新的地址 res.data.photo
    // el-upload默认的是post请求 此时需要patch
    // htpp-request 来覆盖默认的上传行为 自己来上传
    // }
  }
}
</script>

<style scoped lang="less">
</style>
