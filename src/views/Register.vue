<template>
  <div>
    <el-form
      :model="ruleForm"
      status-icon
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
      class="demo-ruleForm"
    >
      <el-form-item label="用户名" prop="username">
        <el-input
          type="text"
          v-model="ruleForm.username"
          autocomplete="off"
        ></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="pass">
        <el-input
          type="password"
          v-model="ruleForm.pass"
          autocomplete="off"
        ></el-input>
      </el-form-item>
      <el-form-item label="确认密码" prop="checkPass">
        <el-input
          type="password"
          v-model="ruleForm.checkPass"
          autocomplete="off"
        ></el-input>
      </el-form-item>
      <el-form-item label="邮箱" prop="email">
        <el-input
          type="text"
          v-model="ruleForm.email"
          autocomplete="off"
        ></el-input
        ><el-button @click="sendVeriCode('ruleForm')">发送验证码</el-button>
      </el-form-item>
      <el-form-item label="验证码" prop="code">
        <el-input v-model="ruleForm.code"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="toRegister('ruleForm')"
          >提交</el-button
        >
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "Register",
  data() {
    var validateUserName = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入用户名"));
      }
      callback();
    };
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.ruleForm.checkPass !== "") {
          this.$refs.ruleForm.validateField("checkPass");
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.ruleForm.pass) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    var validateEmail = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入邮箱"));
      }
      callback();
    };
    return {
      ruleForm: {
        username: "",
        pass: "",
        checkPass: "",
        email: "",
        code: "",
      },
      rules: {
        username: [{ validator: validateUserName, trigger: "blur" }],
        pass: [{ validator: validatePass, trigger: "blur" }],
        checkPass: [{ validator: validatePass2, trigger: "blur" }],
        email: [{ validator: validateEmail, trigger: "blur" }],
      },
    };
  },
  methods: {
    // 发送验证码
    sendVeriCode(formName) {
      var form = this._data.ruleForm;
      console.log(form);
      this.$refs[formName].validate((valid) => {
        if (valid) {
          /*
          发送POST请求
          */
           this.$axios.post("/sendEmail",{
           email:form.email
          }).then( res => {
         console.log(res);
        })
          alert("验证码发送成功，请注意查收");
        } else {
          console.log("发送失败，请稍后重试");
          return false;
        }
      });
    },
    // 注册
    toRegister(formName) {
      var form = this._data.ruleForm;
      console.log(form);
      this.$refs[formName].validate((valid) => {
        if (valid) {
           this.$axios.post("/regist",{
           username:form.username,
           password:form.pass,
           email:form.email,
           code:form.code
          }).then( res => {
         console.log(res);
        })
          alert("注册成功！");
          this.$router.push({name:'Home',params:{form}});
        } else {
          console.log("错误提交，请规范并完善您的信息。");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
  },
};
</script>

<style lang="scss" scoped>
</style>