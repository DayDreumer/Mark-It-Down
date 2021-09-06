<template>
  <div class="grid-content">
    <el-card>
      <div slot="header">
        <span>个人头像</span>
      </div>
      <img v-if="!progressFlag" class="head-img" :src="imageUrl" />
      <div v-show="progressFlag" class="head-img">
        <el-progress type="circle" :percentage="progressPercent"></el-progress>
      </div>
      <el-upload
        class="img-btn"
        action="#"
        :show-file-list="false"
        :before-upload="beforeAvatarUpload"
        :http-request="uploadImg"
      >
        <el-button type="success" plain round size="mini"
          >更改头像</el-button
        ></el-upload
      >
    </el-card>
    <el-card class="profile-entity">
      <div slot="header">
        <span>个人资料</span>
        <el-button
          style="float: right; padding: 3px 0"
          type="text"
          @click="modifyProfile"
          >修改</el-button
        >
      </div>
      <div class="profile-entity">用户名：{{ basicInfo.username }}</div>
      <div class="profile-entity">邮箱：{{ basicInfo.email }}</div>
      <div class="profile-entity">
        个性签名：{{ basicInfo.stylishSentence }}
      </div>
      <el-dialog
        title="修改提示"
        :visible.sync="profileChangeVisible"
        width="30%"
        :modal-append-to-body="false"
      >
        <div>
          用户名：<el-input></el-input>
        </div>
        <div>邮箱：<el-input></el-input></div>
        <div>个性签名：<el-input></el-input></div> 
        <div class="dialog-button">
          <el-row :gutter="20">
            <el-col :span="6" :offset="3"
              ><el-button @click="toCancel_profile">取消</el-button></el-col
            >
            <el-col :span="6" :offset="6"
              ><el-button @click="toSubmit_profile">确定</el-button></el-col
            >
          </el-row>
        </div>
      </el-dialog>
    </el-card>
    <el-card class="profile-entity">
      <div slot="header">
        <span>隐私设置</span>
      </div>
      <div>
        密码（已隐藏）<el-button type="text" @click="modifyPwd">修改</el-button>
      </div>
      <el-dialog
        title="修改提示"
        :visible.sync="pwdChangeVisible"
        width="30%"
        :modal-append-to-body="false"
      >
        <div class="dialog-button">
          <el-row :gutter="20">
            <el-col :span="6" :offset="3"
              ><el-button @click="toCancel_pwd">取消</el-button></el-col
            >
            <el-col :span="6" :offset="6"
              ><el-button @click="toSubmit_pwd">确定</el-button></el-col
            >
          </el-row>
        </div>
      </el-dialog>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "Account",
  data() {
    return {
      /*
        头像上传相关
        */
      progressFlag: false,
      progressPercent: 0,
      imageUrl:
        "http://10.28.173.235:8008/2019212051/2021/09/05/19-21-00/Ole-Johan Dahl照片.jpg",
      /*
      基本信息
      */ 
      basicInfo: {
        username: "ada",
        password: "",
        email: "123@qq.com",
        stylishSentence: "talk is cheap, show me your code.",
      },
      profileChangeVisible: false, //个人资料dialog显示位
      pwdChangeVisible: false, //密码修改dialog显示位
    };
  },
  methods: {
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },
    uploadImg(f) {
      console.log(f);
      this.progressFlag = true;
      let formdata = new FormData();
      formdata.append("image", f.file);
      axios({
        url: "",
        method: "post",
        data: formdata,
        headers: { "Content-Type": "multipart/form-data" },
        onUploadProgress: (progressEvent) => {
          // progressEvent.loaded:已上传文件大小
          // progressEvent.total:被上传文件的总大小
          this.progressPercent =
            (progressEvent.loaded / progressEvent.total) * 100;
        },
      })
        .then((res) => {
          // this.imageUrl = res.data.url
          console.log(res);
          if (this.progressPercent === 100) {
            this.progressFlag = false;
            this.progressPercent = 0;
          }
        })
        .then((error) => {
          console.log(error);
        });
    },
    modifyProfile(){
      this.profileChangeVisible = true;
    },
    toCancel_profile() {
      this.profileChangeVisible = false;
    },
    toSubmit_profile() {},
    modifyPwd() {
      this.pwdChangeVisible = true;
    },
    toCancel_pwd() {
      this.pwdChangeVisible = false;
    },
    toSubmit_pwd() {}
    },
  };
</script>

<style lang="scss" scoped>
.el-row {
  margin-bottom: 10px;
}
.el-col {
  border-radius: 4px;
}
.grid-content {
  border-radius: 4px;
}
.head-img {
  width: 100px;
  height: 100px;
  border-radius: 50%;
}
.text {
  font-size: 14px;
}
.item {
  margin-bottom: 18px;
}
.dialog-button {
  margin-top: 15px;
}
.profile-entity {
  margin-top: 10px;
  margin-bottom: 15px;
}
.el-card {
  margin-bottom: 10px;
}
</style>