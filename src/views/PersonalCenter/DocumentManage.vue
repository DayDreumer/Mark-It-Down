<template>
  <div>
    <el-upload
      class="upload-demo"
      drag
      :data="msg"
      action="http://10.28.173.235:8008/api/upload"
      multiple
    >
      <i class="el-icon-upload"></i>
      <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
      <div class="el-upload__tip" slot="tip">
        只能上传jpg/png文件，且不超过500kb
      </div>
    </el-upload>
  </div>
</template>

<script>
export default {
  name: "DocumentManage",
  data() {
    return{
      msg:{
        username:'2019212051'
      }
    }
  },
  created(){
    this.msg.username = localStorage.getItem('username')
  }
};
</script>

<style lang="scss" scoped>
</style>