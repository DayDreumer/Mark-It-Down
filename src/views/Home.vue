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
                <el-avatar :size="40" icon="el-icon-user-solid"></el-avatar>
              </el-button>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item @click.native="toChangeAvatar"
                  >更改头像</el-dropdown-item
                >
                <el-dropdown-item @click.native="toSelfCenter"
                  >个人中心</el-dropdown-item
                >
                <el-dropdown-item @click.native="exit"
                  >退出登录</el-dropdown-item
                >
              </el-dropdown-menu>
            </el-dropdown>
          </el-col>
          <!-- 
              当未登录时
            -->
          <el-button-group v-if="!isLogin">
            <el-button type="primary" @click="showLogin">登录</el-button>
            <!-- 
              弹出登录dialog
             -->
            <el-dialog title="用户登录" :visible.sync="loginTableVisble" center>
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
              </el-form>
              <div slot="footer" class="dialog-footer">
                <el-button @click="loginTableVisible = false">取 消</el-button>
                <el-button type="primary" @click="toLogin('userForm')"
                  >确 定</el-button
                >
              </div>
            </el-dialog>

            <el-button type="primary" @click="toRegister">注册</el-button>
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
  // props: ["form"],
  data() {
    return {
      isLogin: false, //$route.params.form.username
      username: "",
      loginTableVisble: false,
      formLabelWidth: "100px",
      userForm: {
        username: "",
        password: "",
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
      this.userForm.username = ''
      this.userForm.password = ''
    },
    // 跳转到注册界面
    toRegister() {
      this.$router.push("/register");
    },
    // 跳转到课程表界面
    toSchedule() {
      this.$router.push("/User/ClassSchedule");
    },
    // 跳转到博客界面
    toBlog() {
      this.$router.push("/User/Blog");
    },
    // 跳转回主界面
    toHome() {
      this.$router.push("/Home");
      this.this.username = "";
      this.isLogin = false;
    },
    // 跳转到个人中心
    toSelfCenter() {},
    // 跳转到更改头像界面
    toChangeAvatar() {},
    // 展示登录dialog
    showLogin() {
      this.loginTableVisble = true;
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
              if(res.data.data == null){
                alert(res.data.message);
              }else{
                console.log(res.data.data)
                var msg = res.data.data
                var pos1 = msg.search('亲爱的') + 3
                var pos2 = msg.search('用户')
                var pos3 = pos2 - pos1
                this.userForm.username = msg.substring(pos1, pos2);
                // console.log(msg.substring(pos1, pos2))
                // console.log(pos1+" "+pos2);
                this.isLogin = true
                this.loginTableVisble = false
              }
            });
        } else {
          alert("用户名或密码错误");
          return false;
        }
      });
    },
  },
  mounted() {
    this.username = "";
    this.isLogin = false;

    if (this.$route.params.form != null) {
      let datalist = JSON.parse(JSON.stringify(this.$route.params.form));
      console.log(datalist.username);
      this.username = datalist.username;
      if (datalist != null) {
        this.isLogin = true;
      }
    }
  },
};
</script>

<style lang="scss" scoped>
.el-header {
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
}
</style>