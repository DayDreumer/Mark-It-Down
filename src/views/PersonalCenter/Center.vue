<template>
  <div>
    <el-container>
      <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
        <el-menu default-active="index">
          <el-menu-item index="1" @click="toAccount">
            <i class="el-icon-menu"></i>
            <span slot="title">账户信息</span>
          </el-menu-item>
          <el-menu-item index="2" @click="toDocumentManage">
            <i class="el-icon-folder"></i>
            <span slot="title">个人文件管理</span>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <el-main>
        <router-view />
      </el-main>
    </el-container>
  </div>
</template>

<script>
export default {
  name: "Center",
  data() {
    return {
      index: 1,
      username: "",
    };
  },
  methods: {
    toDocumentManage() {
      this.index = 2;
      this.$router.push("/personalcenter/documentmanage");
    },
    toAccount() {
      this.index = 1;
      this.$router.push("/personalcenter/account");
    },
  },
};
</script>

<style lang="scss" scoped>
.el-aside {
  height: 500px;
}
.el-main {
  margin-bottom: 10px;
  padding-bottom: 10px;
  padding-top: 0px;
}
</style>