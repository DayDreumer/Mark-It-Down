<template>
  <div>
    <el-upload
      ref="upload"
      class="upload-demo"
      action="#"
      multiple
      :before-upload="onBeforeUpload"
      :auto-upload="false"
      :file-list="fileList"
      :http-request="addFileToFormData"
    >
      <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
      <el-button
        style="margin-left: 10px"
        size="small"
        type="success"
        @click="upload"
        >点击上传</el-button
      >
    </el-upload>
  </div>
</template>

<script>
export default {
  name: "MyDocument",
  data() {
    return {
      fileFormData: null, // 将要上传的formdata数据
      percentage: 0, // 存放上传百分比
      fileList: [
        {
          name: "food.jpeg",
          url: "https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100",
        },
      ],
    };
  },
  methods: {
    onBeforeUpload(file) {},
    addFileToFormData(file) {
      this.fileFormData.append("file[]", file.file);
      console.log(this.fileFormData.getAll("file[]"));
    },
    upload() {
      const formData = this.fileFormData;
      //const fn = this.uploadProgress; // 我们自己处理上传进度的函数

      axios({
        method: "post",
        url: "http://10.128.214.22:2001/",
        headers: {
          "Content-Type": "multipart/form-data",
        },
        data: formData,
        //onUploadProgress: fn, // `onUploadProgress` 允许为上传处理进度事件
      });
    },
  },
  created() {
    this.fileFormData = new FormData();
  },
};
</script>

<style lang="scss" scoped>
</style>