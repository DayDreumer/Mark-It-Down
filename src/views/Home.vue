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
            <el-col :span="1"><el-button type="text">首页</el-button></el-col>
            <el-col :span="1"><el-button type="text">博客</el-button></el-col>
            <el-col :span="1"><el-button type="text">分享</el-button></el-col>
            <el-col :span="6" :offset="6"
              ><el-input
                placeholder="搜索"
                prefix-icon="el-icon-search"
                v-model="input"
              >
              </el-input
            ></el-col>
            <el-col :span="3"
              ><el-button type="primary" icon="el-icon-user" circle></el-button
            ></el-col>
            <el-col :span="2"
              ><span>{{ username }}</span>
            </el-col>
            <el-button-group>
              <el-button type="primary" @click="toLogin">登录</el-button>
              <el-button type="primary">注册</el-button>
            </el-button-group>
          </el-row>
          <!-- <el-button type="text">我的文章</el-button>
          <el-button type="primary" icon="el-icon-user" circle></el-button> -->
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
  props: ["name"],
  data() {
    return {
      username: 'admin', //$route.params.form.name

    };
  },
  methods: {
    toLogin() {
      this.$router.push("/login");
    },
  },
};
</script>

<style lang="scss" scoped>
.el-header {
  background-color: #b3c0d1;
  color: rgb(99, 99, 99);
  line-height: 60px;
}
.el-aside {
  color: #333;
}
</style>