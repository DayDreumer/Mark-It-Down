<template>
    <div>
        <el-button type="primary" @click="getJoke(3)">通信GET测试</el-button>
    <div v-for="item in receive_msg">{{item}}</div>
    <div @click="getPostData(form)">通信POST测试</div>
    </div>
</template>

<script>
import qs from 'qs'
export default {
  name: "Login",
  data() {
    return {
      receive_msg:[],
      form: {
        name: '111',
        password: '222',
      },
    };
  },
  methods: {
    getJoke(num){
      this.$axios.get("https://autumnfish.cn/api/joke/list?num="+num)
          .then(res=> {
            //console.log(res);
            this.receive_msg = res.data.jokes;

          })
    },
    getPostData(form){
      let msg = qs.stringify(form)
      console.log(msg)
      this.$axios.post("https://autumnfish.cn/api/user/reg",{
        username: 'jack',
      }).then( res => {
        console.log(res.data);
      })
    },
  },
};
</script>

<style lang="scss" scoped>

</style>