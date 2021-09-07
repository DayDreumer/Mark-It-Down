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
        accept=".jpg"
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
        width="400px"
        height="700px"
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
          style="width: 98%"
          height="250px"
        >
          <el-table-column prop="date_" label="日期" width="120">
          </el-table-column>
          <el-table-column prop="filename" label="文件名" width="130">
          </el-table-column>
          <el-table-column prop="size_" label="文件大小" width="100">
          </el-table-column>
          <el-table-column label="操作" width="100">
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
      historyfileList: [],
      msg: {
        username: "2019212051",
        usage: 0
      },
    };
  },
  methods: {
    handlePreview(file) {
      console.log(file);
      if (file.raw.type.search("image") != -1) {
        this.previewVisible = true;
        this.previewPath = file.response.url;
      } else {
        alert("不支持预览");
      }
    },
    handleSuccess(res, file) {
      if (res.result == "success") {
        console.log(res);
        this.$axios
      .post("/getAllFiles", {
        username: this.msg.username,
      })
      .then((res) => {
        console.log(res.data);
        this.historyfileList = res.data;
      });
      }
      console.log(res);
    },
    handleError(res) {
      if (res.result == "fail") {
        alert("上传失败，请稍后重试。");
      }
    },
    handleChange(file, fileList) {
      // console.log(fileList);
      this.tempfileList = fileList.slice(-2);
    },
    // 删除文件
    toDelete(row) {
      console.log(row);
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          var username = this.msg.username;
          var filename = row.filename;
          var date_ = row.date_;
          this.$axios
            .post("/deleteFile", {
              username: username,
              filename: filename,
              date_: date_,
            })
            .then((res) => {
              if (res.data.result == "success") {
                this.$message({
                  type: "success",
                  message: "删除成功!",
                });
                this.$axios
                  .post("/getAllFiles", {
                    username: this.msg.username,
                  })
                  .then((res) => {
                    console.log(res.data);
                    this.historyfileList = res.data;
                  });
              }else{
                this.$message({
                type: "info",
                message: "删除失败,文件或已不存在",
                });
              }
              console.log(res);
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    // 下载文件
    toDownload(row) {
      var v = document.getElementById("download"); //获取html的el-link标签
      v.href = row.url; //赋值到href属性
    },
    toJump(row) {
      var filename = row.filename;
      let url = window.URL.createObjectURL(new Blob([row]), {
        type: "image/jpeg",
      });
      console.log(url);
      let link = document.createElement("a");
      link.style.display = "none";
      link.href = url;
      link.setAttribute("download", filename);
      document.body.appendChild(link);
      link.click();
      //释放URL对象所占资源
      window.URL.revokeObjectURL(url);
      //用完即删
      document.body.removeChild(link);
    },
  },
  created() {
    this.msg.username = localStorage.getItem("username");
    // console.log(this.msg.username);
    this.$axios
      .post("/getAllFiles", {
        username: this.msg.username,
      })
      .then((res) => {
        // console.log(res.data);
        this.historyfileList = res.data;
      });
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
.el-card{
  margin-bottom: 5px;
  width: 500px;
  padding: 5px;
   border-radius: 10px;
}
</style>