<template>
  <div>
    <el-container>
      <el-aside width="200px">
        <el-menu :default-openeds="['1']">
          <el-submenu index="1">
            <template slot="title">动态</template>
            <el-menu-item-group>
              <el-menu-item index="1-1">
                <router-link to="/moment/follow">我关注的</router-link>
              </el-menu-item>
              <el-menu-item index="1-2">
                <router-link :to="{ name: 'MomentDeliver', params: { num: 2 } }"
                  >我发布的</router-link
                >
              </el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="2">
            <template slot="title">个人中心</template>
            <el-menu-item-group>
              <el-menu-item index="2-1">我的文章</el-menu-item>
              <el-menu-item index="2-2">课表查询</el-menu-item>
              <el-menu-item index="2-3"
                ><router-link to="/PersonalCenter/MyDocument"
                  >我的资料</router-link
                ></el-menu-item
              >
            </el-menu-item-group>
          </el-submenu>
        </el-menu>
      </el-aside>

      <el-container>
        <el-header style="text-align: right; font-size: 8px">
          <el-row :gutter="20">
            <el-col :span="2"
              ><el-button type="text" @click="toHome()">首页</el-button></el-col
            >
            <el-col :span="2"
              ><el-button type="text" @click="toBlog()">博客</el-button></el-col
            >
            <el-col :span="2"
              ><el-button type="text" @click="toSchedule()"
                >课表</el-button
              ></el-col
            >
            <el-col :span="8" v-if='isLogin'
              ><el-button type="primary" icon="el-icon-user" circle>
                </el-button>
                <span>{{ $route.params.form.username }}</span>
                </el-col>
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
    </el-container>
  </div>
</template>

<script>
export default {
  name: "Home",
  props: ["form"],
  data() {
    return {
      isLogin: false, //$route.params.form.name
    };
  },
  methods: {
    // 跳转到登录界面
    toLogin() {
      this.$router.push("/login");
    },
    // 跳转到注册界面
    toRegister(){
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
    },
    put(){
      var val = this.$route.params.form;
      console.log(val);
    }
  },
  mounted(){
    let datalist = JSON.parse(JSON.stringify(this.$route.params.form));
    console.log(datalist.username);
    if (datalist != null){
        this.isLogin = true
    }
    // this.username = datalist.name;
    // var _name = this.username.Getter('name');
    // console.log(_name);
  }
};
</script>

<style lang="scss" scoped>
.el-header {
  background-color: rgb(128, 128, 255);
  color: rgb(255, 255, 255);
  line-height: 60px;
}
.el-aside {
  color: #333;
}
.el-button {
  color: white;
}
</style>