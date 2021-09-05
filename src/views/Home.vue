<template>
  <div>
    <el-container>
      <el-header style="text-align: right; font-size: 12px">
        <el-row :gutter="20">
          <el-col :span="2"
            ><el-button type="text" @click="toHome()">首页</el-button></el-col
          >
          <el-col :span="2"
            ><el-button type="text" @click="toBlog()">博客</el-button></el-col
          >
          <el-col :span="2"
            ><el-button type="text" @click="toSchedule()">课表</el-button>
          </el-col>
          <!-- 
              当登录时
          -->
          <el-col :span="1" :offset="14" v-if="isLogin">
            <el-dropdown>
              <el-button type="mini" style="margin-right: 15px" circle>
                <el-avatar :size="42" icon="el-icon-user-solid"></el-avatar>
              </el-button>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item @click.native="toSelfCenter"
                  >个人中心</el-dropdown-item
                >
                <el-dropdown-item @click.native="exit"
                  >退出登录</el-dropdown-item
                >
              </el-dropdown-menu>
            </el-dropdown>
            <!-- <span>{{ userForm.username }}</span> -->
          </el-col>
          <!-- 
              当未登录时
            -->
          <el-button-group v-if="!isLogin">
            <el-button type="primary" @click="showLogin">登录</el-button>
            <!-- 
              弹出登录dialog
             -->
            <el-dialog
              title="用户登录"
              :visible.sync="loginTableVisble"
              center
              :modal-append-to-body="false"
            >
              <el-form :model="userForm" ref="userForm" :rules="rules">
                <el-form-item
                  label="用户名/邮箱"
                  :label-width="formLabelWidth"
                  prop="username"
                >
                  <el-input
                    v-model="userForm.username"
                    autocomplete="off"
                  ></el-input>
                </el-form-item>
                <el-form-item
                  label="密码"
                  :label-width="formLabelWidth"
                  prop="password"
                >
                  <el-input
                    type="password"
                    v-model="userForm.password"
                    autocomplete="off"
                  ></el-input>
                </el-form-item>
                <el-form-item>
                  <div class="right">
                    <el-link>
                    <el-button type="text" class="forget-pwd" @click="toFindPwd()">忘记密码？</el-button>
                    </el-link>
                  </div>
                </el-form-item>
              </el-form>
              <div slot="footer" class="dialog-footer">
                <el-button @click="toCancelDialog">取 消</el-button>
                <el-button type="primary" @click="toLogin('userForm')"
                  >确 定</el-button
                >
              </div>
            </el-dialog>

            <el-button type="primary" @click="showRegister">注册</el-button>
            <!-- 
              弹出注册Dialog
             -->
            <el-dialog
              title="用户注册"
              :visible.sync="registerTableVisble"
              center
              :modal-append-to-body="false"
            >
              <el-form :model="userForm" ref="userForm" :rules="rules">
                <el-form-item
                  label="用户名"
                  :label-width="formLabelWidth"
                  prop="username"
                >
                  <el-input
                    v-model="userForm.username"
                    autocomplete="off"
                  ></el-input>
                </el-form-item>
                <el-form-item
                  label="密码"
                  :label-width="formLabelWidth"
                  prop="password"
                >
                  <el-input
                    type="password"
                    v-model="userForm.password"
                    autocomplete="off"
                  ></el-input>
                </el-form-item>
                <el-form-item
                  label="确认密码"
                  :label-width="formLabelWidth"
                  prop="checkpassword"
                >
                  <el-input
                    type="password"
                    v-model="userForm.checkpassword"
                    autocomplete="off"
                  ></el-input>
                </el-form-item>
                <el-form-item
                  label="邮箱"
                  :label-width="formLabelWidth"
                  prop="email"
                >
                  <el-input
                    v-model="userForm.email"
                    autocomplete="off"
                  ></el-input> </el-form-item
                ><el-button @click="sendVeriCode('userForm')"
                  >发送验证码</el-button
                >
                <el-form-item label="验证码" :label-width="formLabelWidth">
                  <el-input
                    v-model="userForm.code"
                    autocomplete="off"
                  ></el-input>
                </el-form-item>
              </el-form>
              <div slot="footer" class="dialog-footer">
                <el-button @click="toCancelDialog">取 消</el-button>
                <el-button type="primary" @click="toRegister('userForm')"
                  >确 定</el-button
                >
              </div>
            </el-dialog>
          </el-button-group>
        </el-row>
      </el-header>

      <el-main>
        <router-view />
      </el-main>
    </el-container>
  </div>
</template>

<script>
export default {
  name: "Home",
  data() {
    var validatePass2 = (rule, value, callback) => {
      console.log(value);
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.userForm.password) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    var validateEmail = (rule, value, callback) => {
      console.log(value);
      if (value === "") {
        callback(new Error("请输入邮箱"));
      }
      callback();
    };
    return {
      isLogin: false, //$route.params.form.username
      loginTableVisble: false, // 登录弹窗判断
      registerTableVisble: false, // 注册弹窗判断
      formLabelWidth: "100px",
      userForm: {
        username: "",
        password: "",
        checkpassword: "",
        email: "",
        code: "",
        air: "   ",
      },
      // 登录输入限制
      rules: {
        username: [
          {
            required: true,
            message: "请输入用户名",
            trigger: "blur",
          },
          {
            min: 0,
            max: 24,
            message: "长度需在 0 到 24 个字符",
            trigger: "blur",
          },
        ],
        password: [
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
        checkpassword: [{ validator: validatePass2, trigger: "blur" }],
        email: [{ validator: validateEmail, trigger: "blur" }],
      },
      gridData: [
        {
          title: "个人中心",
        },
        {
          title: "退出登录",
        },
      ],
    };
  },
  methods: {
    // 登出账户
    exit() {
      this.isLogin = false;
      document.cookie = "";
      localStorage.clear();
      this.$router.push("/home");
    },
    // 发送验证码
    sendVeriCode(formName) {
      var form = this.userForm;
      // console.log(form);
      this.$refs[formName].validate((valid) => {
        if (valid) {
          /*
          发送POST请求
          */
          this.$axios
            .post("/sendEmail", {
              email: form.email,
            })
            .then((res) => {
              console.log(res);
              if (res.data.message == "成功") {
                alert("验证码发送成功，请注意查收");
              } else {
                console.log("发送失败，请稍后重试");
              }
            });
        }
      });
    },
    // 跳转到课程表界面
    toSchedule() {
      this.$router.push("/user/classSchedule");
    },
    // 跳转到博客界面
    toBlog() {
      this.$router.push("/user/blog");
    },
    // 跳转回主界面
    toHome() {
      this.$router.push("/home");
    },
    // 跳转到个人中心
    toSelfCenter() {
      this.$router.push("/personalcenter/center");
    },
    // 展示登录dialog
    showLogin() {
      this.loginTableVisble = true;
      this.registerTableVisble = false;
    },
    showRegister() {
      this.registerTableVisble = true;
      this.loginTableVisble = false;
    },
    // 登录
    toLogin(formName) {
      // var form = this._data.form;
      // console.log(this);
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // console.log(form);
          this.$axios
            .post("/login", {
              username: this.userForm.username,
              password: this.userForm.password,
            })
            .then((res) => {
              if (res.data.data == null) {
                alert(res.data.message);
              } else {
                // 截取username
                var msg = res.data.data;
                var pos1 = msg.search("亲爱的") + 3;
                var pos2 = msg.search("用户");
                var pos3 = pos2 - pos1;
                this.userForm.username = msg.substring(pos1, pos2);
                localStorage.setItem("username", this.userForm.username);
                var _date = this.generateCookie();
                document.cookie =
                  "username=" + this.userForm.username + "; expires=" + _date;
                this.isLogin = true;
                this.loginTableVisble = false;
              }
            });
        } else {
          alert("用户名或密码错误");
          return false;
        }
      });
    },
    // 弹出注册Dialog
    toRegister(formName) {
      var form = this.userForm;
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$axios
            .post("/regist", {
              username: form.username,
              password: form.password,
              email: form.email,
              code: form.code,
            })
            .then((res) => {
              //  console.log(res);
              if (res.data.data == null) {
                alert(res.data.message);
              } else if (res.data.message == "成功") {
                alert(res.data.data);
                localStorage.setItem("username", form.username);
                // 生成cookie
                var _date = this.generateCookie();
                document.cookie =
                  "username=" + this.userForm.username + "; expires=" + _date;
                this.isLogin = true;
                this.registerTableVisble = false;
              }
            });
        }
      });
    },
    // 生成cookie
    generateCookie() {
      var _date = new Date();
      _date.setDate(_date.getDate() + 3);
      _date.toGMTString();
      return _date;
    },
    toCancelDialog() {
      this.registerTableVisble = false;
      this.loginTableVisble = false;
      this.userForm.username = localStorage.getItem("username");
      this.userForm.password = "";
      this.userForm.checkPassword = "";
      this.userForm.email = "";
      this.userForm.code = "";
    },
    toFindPwd(){
      
    }
  },
  created() {
    var tempName = localStorage.getItem("username");
    if (tempName != null) {
      this.userForm.username = tempName;
      this.isLogin = true;
    } else {
      this.isLogin = false;
    }
    // let datalist = JSON.parse(JSON.stringify(this.$route.params.form));
  },
};
</script>

<style lang="scss" scoped>
.el-header {
  position: relative;
  background-color: rgb(128, 128, 255);
  color: rgb(255, 255, 255);
  line-height: 60px;
}
.el-button--text {
  color: rgb(255, 255, 255);
  font-size: 20px;
}
.el-button--primary {
  background-color: #d9b71c;
  font-size: 20px;
}
.user-pop-up {
  background-color: rgb(255, 255, 255);
  border-color: rgb(165, 165, 165);
  border-radius: 5px;
  box-shadow: 0 5px 10px grey;
}
.el-link {
  text-align: center;
}
.login-box {
  width: 500px;
  margin: 150px auto;
  border: 1px solid #dcdfe6;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0 10px 20px grey;
  position: absolute;
}
.right {
  text-align: right;
}
.forget-pwd{
  color: rgb(3, 202, 228);
  font-size: 15px;
}
</style>