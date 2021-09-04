<template>
  <div>
    <el-card>
      <el-upload
        class="upload-demo"
        drag
        :data="msg"
        :file-list="tempfileList"
        action="http://10.28.173.235:8008/api/upload"
        multiple
        :on-success="handleSuccess"
        :on-error="handleError"
        :on-preview="handlePreview"
        :on-change="handleChange"
      >
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
        <div class="el-upload__tip" slot="tip">
          只能上传jpg/png文件，且不超过500kb
        </div>
      </el-upload>
      <el-dialog
        title="图片预览"
        :visible.sync="previewVisible"
        width="50%"
        height="50%"
        center
        :modal-append-to-body="false"
      >
        <img width="100%" height="100%" :src="previewPath" />
      </el-dialog>
    </el-card>
    <el-card>
      <div slot="header">
        <span>历史上传记录</span>
      </div>
      <div>
        <el-table
          :data="historyfileList"
          border
          style="width: 65%"
          height="250px"
        >
          <el-table-column prop="date" label="日期" width="200">
          </el-table-column>
          <el-table-column prop="filename" label="文件名" width="200">
          </el-table-column>
          <el-table-column prop="size" label="文件大小" width="200">
          </el-table-column>
          <el-table-column label="操作" width="188">
            <template slot-scope="scope">
              <!-- <el-link id="download" :underline="false" :herf="tempUrl" target="_blank">
                <el-button type="text" size="medium" @click="toDownload(scope.row)">下载</el-button>
                </el-link> -->
              <el-button type="text" size="medium" @click="toJump(scope.row)"
                >下载</el-button
              >

              <el-button type="text" size="medium" @click="toDelete(scope.row)"
                >删除</el-button
              >
            </template>
          </el-table-column>
        </el-table>
      </div>
    </el-card>
  </div>
</template>

<script>
// 时间（到秒 username filenmae
export default {
  name: "DocumentManage",
  data() {
    return {
      tempUrl: "",
      previewVisible: false,
      previewPath: "",
      tempfileList: [],
      historyfileList: [
        {
          filename: "a.jpg",
          date: "2020-10-10",
          dateDetail: "",
          size: "2.2Mb",
          subscript: 0,
          url: "http://10.28.173.235:8008/2019212051/2021/09/04/Ole-Johan Dahl照片.jpg",
        },
      ],
      msg: {
        username: "2019212051",
      },
    };
  },
  methods: {
    handlePreview(file) {
      console.log(file);
      if (file.raw.type.search(image) != -1) {
        this.previewVisible = true;
        this.previewPath = file.response.url;
      } else {
        alert("不支持预览");
      }
    },
    handleSuccess(res, file) {
      console.log(res);
    },
    handleError(res) {
      alert("上传失败，请稍后重试。");
    },
    handleChange(file, fileList) {
      // console.log(fileList);
      this.tempfileList = fileList.slice(-2);
    },
    // 删除文件
    toDelete(row) {
      console.log(row);
      var username = this.msg.username;
      var filename = row.filename;
      var date = "";
      // this.$axios.post("",{
      //   username: username,
      //   filename: filename
      // }).then( res => {
      //   console.log(res.data);
      // })
    },
    // 下载文件
    toDownload(row) {
      var v = document.getElementById("download"); //获取html的el-link标签
      v.href = row.url; //赋值到href属性
    },
    toJump(row) {
      let that = this;
      this.$http.files().then((res) => {
        let hreLocal = row.url;
        let picname = row.filename;
        this.downloadByBlob(hreLocal, picname);
      });
    },
    downloadByBlob(url, name) {
      let image = new Image();
      image.setAttribute("crossOrigin", "anonymous");
      image.src = url;
      image.onload = () => {
        let canvas = document.createElement("canvas");
        canvas.width = image.width;
        canvas.height = image.height;
        let ctx = canvas.getContext("2d");
        ctx.drawImage(image, 0, 0, image.width, image.height);
        canvas.toBlob((blob) => {
          let url = URL.createObjectURL(blob);
          download(url, name);
          // 用完释放URL对象
          URL.revokeObjectURL(url);
        });
      };
    },
   download(href, name) {
  let eleLink = document.createElement('a')
  eleLink.download = name
  eleLink.href = href
  eleLink.click()
  eleLink.remove()
}
  },
  created() {
    this.msg.username = localStorage.getItem("username");
  },
};
</script>

<style lang="scss" scoped>
.box {
  height: 100%;
  overflow: auto;
}
.el-scrollbar__wrap {
  overflow-x: hidden;
}
</style>