<template>
  <div>
    <el-card>
      <div slot="header">
        <span>个人头像</span>
      </div>
      <img v-if="!progressFlag" class="head-img" :src="imageUrl" />
      <el-upload
        class="img-btn"
        action="#"
        :show-file-list="false"
        :before-upload="beforeAvatarUpload"
        :http-request="uploadImg"
      >
      <el-button type="success" plain round size="mini"
          >更改头像</el-button
        >
      </el-upload
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
        <div>用户名：<el-input v-model="tempInfo.username"></el-input></div>
        <div>邮箱：<el-input v-model="tempInfo.email"></el-input></div>
        <div>
          个性签名：<el-input v-model="tempInfo.stylishSentence"></el-input>
        </div>
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
        <!-- <div>旧密码：<el-input v-model="tempInfo.password"></el-input></div> -->
        <el-form :model="pwdForm" ref="pwdForm" :rules="pwdrule">
          <el-form-item
            label="旧密码"
            :label-width="formLabelWidth"
            prop="oldpassword"
          >
            <el-input
              type="password"
              v-model="pwdForm.oldpassword"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item
            label="新密码"
            :label-width="formLabelWidth"
            prop="newpassword"
          >
            <el-input
              type="password"
              v-model="pwdForm.newpassword"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item
            label="确认新密码"
            :label-width="formLabelWidth"
            prop="double_newpassword"
          >
            <el-input
              type="password"
              v-model="pwdForm.double_newpassword"
              autocomplete="off"
            ></el-input>
          </el-form-item>
        </el-form>
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
    var validatePass2 = (rule, value, callback) => {
      // console.log(value);
      if (value !== this.pwdForm.newpassword) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    var validateoldpwd = (rule, value, callback) => {
      // console.log(value);
      if (value !== this.basicInfo.password) {
        callback(new Error("与原先密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      /*
        头像上传相关
        */
      progressFlag: false,
      progressPercent: 0,
      imageUrl: "",
      /*
      基本信息
      */
      basicInfo: {
        username: "",
        password: "",
        email: "",
        stylishSentence: "",
      },
      tempInfo: {
        username: "",
        password: "",
        email: "",
        stylishSentence: "",
      },
      profileChangeVisible: false, //个人资料dialog显示位
      pwdChangeVisible: false, //密码修改dialog显示位
      /*
      修改密码
      */
      pwdForm: {
        oldpassword: "",
        newpassword: "",
        double_newpassword: "",
      },
      formLabelWidth: "100px",
      pwdrule: {
        oldpassword: [{ validator: validateoldpwd, trigger: "blur" }],
        newpassword: [
          {
            required: true,
            message: "请输入密码",
            trigger: "blur",
          },
          {
            min: 8,
            max: 24,
            message: "长度需在 8 到 24 个字符",
            trigger: "blur",
          },
        ],
        double_newpassword: [
          {
            validator: validatePass2,
            trigger: "blur",
          },
        ],
      },
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
      formdata.append("file", f.file);
      formdata.append("username", this.basicInfo.username);
      formdata.append("usage", 1);
      this.$axios({
        url: "/upload",
        method: "post",
        data: formdata,
        headers: { "Content-Type": "multipart/form-data" },
        onUploadProgress: (progressEvent) => {
          // progressEvent.loaded:已上传文件大小
          // progressEvent.total:被上传文件的总大小
          this.progressPercent =
            (progressEvent.loaded / progressEvent.total) * 100;
        },
      }).then((res) => {
        if (res.data.result == "success") {
          console.log(res);
          this.imageUrl = res.data.url;
          localStorage.setItem("avatarUrl", this.imageUrl);
          if (this.progressPercent === 100) {
            this.progressFlag = false;
            this.progressPercent = 0;
          }
        } else {
          alert("上传失败");
          this.progressFlag = false;
          this.progressPercent = 0;
        }
      });
    },
    modifyProfile() {
      this.profileChangeVisible = true;
      this.pwdChangeVisible = false;
    },
    toCancel_profile() {
      this.profileChangeVisible = false;
      this.tempInfo.username = this.basicInfo.username;
      this.tempInfo.email = this.basicInfo.email;
      this.tempInfo.stylishSentence = this.basicInfo.stylishSentence;
    },
    toSubmit_profile() {
      this.$axios
        .post("/updateUser", {
          username: this.basicInfo.username,
          newUsername: this.tempInfo.username,
          newEmail: this.tempInfo.email,
          newQianming: this.tempInfo.stylishSentence,
        })
        .then((res) => {
          console.log(res);
          if(res.data.message == "成功"){
            var temppwd = this.basicInfo.password
            this.basicInfo = this.tempInfo
            this.basicInfo.password = temppwd
            this.profileChangeVisible = false;
          }
        });
    },
    modifyPwd() {
      this.pwdChangeVisible = true;
    },
    toCancel_pwd() {
      this.pwdChangeVisible = false;
      this.pwdForm.oldpassword = "";
      this.pwdForm.newpassword = "";
      this.pwdForm.double_newpassword = "";
    },
    toSubmit_pwd() {
      this.$axios
        .post("/changePassword", {
          email: this.basicInfo.email,
          password: this.pwdForm.oldpassword,
          newPassword: this.pwdForm.newpassword,
          newPasswordRepeat: this.pwdForm.double_newpassword,
        })
        .then((res) => {
          console.log(res.data);
          if (res.data.message == "成功") {
            alert(res.data.data);
            this.basicInfo.password = this.pwdForm.newpassword;
            this.toCancel_pwd();
          }
        });
    },
  },
  created() {
    this.basicInfo.username = localStorage.getItem("username");
    // 获取个人信息
    this.$axios
      .post("/getUser", {
        username: this.basicInfo.username,
      })
      .then((res) => {
        // 成功时
        if (res.data != "") {
          // 存取信息
          if(res.data.touxiang != null){
            this.imageUrl = res.data.touxiang;
          }else{
            this.imageUrl = "https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
          }
          this.basicInfo.password = res.data.password;
          this.basicInfo.email = res.data.email;
          this.basicInfo.stylishSentence = res.data.qianming;
          // 临时表信息存储
          this.tempInfo.username = this.basicInfo.username;
          this.tempInfo.email = this.basicInfo.email;
          this.tempInfo.stylishSentence = this.basicInfo.stylishSentence;
        } else {
          alert("获取个人信息失败，请刷新重试");
        }
      });
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
.head-img {
  width: 100px;
  height: 100px;
  border-radius: 50%;
}
.head-progress{
  width: 50px;
  height: 50px;
  border-radius: 20px;
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
  margin-bottom: 5px;
  width: 400px;
  padding: 5px;
   border-radius: 10px;
}
</style>