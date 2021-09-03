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
                <el-dropdown-item @click.native="toLogin"
                  >退出登录</el-dropdown-item
                >
              </el-dropdown-menu>
            </el-dropdown>
          </el-col>
          <!-- 
              当为登录时
            -->
          <el-button-group v-if="!isLogin">
            <el-button type="primary" @click="toLogin">登录</el-button>
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
    // 跳转到登录界面
    toLogin() {
      this.$router.push("/login");
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
    toSelfCenter() {
      
    },
    // 跳转到更改头像界面
    toChangeAvatar() {

    }
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
.el-button--primary{
  background-color: #D9B71C;
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
</style>