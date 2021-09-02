<template>
  <div>
    <el-form ref="form" :model="form" :rules="rules" class="login-box">
      <h3 class="login-title">欢迎登陆</h3>
      <el-form-item label="账号" prop="name">
        <el-input
          type="text"
          placeholder="请输入用户名"
          v-model="form.name"
        ></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input
          type="password"
          placeholder="请输入密码"
          v-model="form.password"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('form')">登录</el-button>
        <el-button type="primary" @click="submitForm('form')">注册</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
var that = this;
export default {
  name: "Login",
  data() {
    return {
      form: {
        name: '',
        password: '',
      },
      rules: {
        name: [
          {
            required: true,
            message: '请输入用户名',
            trigger: 'blur',
          }
        ],
        password: [
          {
            required: true,
            message: '请输入密码',
            trigger: 'blur',
          }
        ],
      },
    };
  },
  methods: {
    submitForm(formName) {
      var form = this._data.form;
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert("submit!");
          console.log(form);
          // username = this._data.form.name;
          this.$router.push({name:'Home',params:{form}});
        } else {
          alert("用户名或密码错误")
          return false;
        }
      });
    },
  },
  created(){
    var that = this;
  }
};
</script>

<style lang="scss" scoped>
.login-box {
  width: 500px;
  margin: 150px auto;
  border: 1px solid #dcdfe6;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0 10px 20px grey;
}
.login-title {
  text-align: center;
}
</style>