<template>
  <div class="login">
    <el-row :gutter="2" class="row">
      <el-col :span="10" :offset="1">
        <el-card shadow="always">
          <div slot="header">
            <span>日历</span>
          </div>
          <el-calendar class="calendar" v-model="value">
            <template slot="dateCell" slot-scope="{ date, data }">
              <div @click="showMemo(data)">
              <p  :class="data.is-selected ? 'is-selected' : ''">
                {{ data.day.split("-").slice(1).join("-") }}
                {{ judge(data.day) ? "💛" : "" }}
                {{ data.isSelected ? "✔️" : "" }}
              </p>
              <!-- <p>
                {{ judge(data.day) ? "💛" : "" }}
              </p> -->
              </div>
            </template>
          </el-calendar>
        </el-card>
      </el-col>
      <div v-if="showVisible">
        <el-col :span="10" :offset="1">
          <el-card>
            <div slot="header">
              <span>{{ tempdate }}</span>
            </div>
            <div>
              <el-input
                v-model="daily"
                type="textarea"
                :autosize="{ minRows: 5, maxRows: 15 }"
                placeholder="记录一下日程吧"
              ></el-input>
            </div>
            <div>
              <el-button style="float: right" @click="toSaveMemo">保存</el-button>
            </div>
          </el-card>
        </el-col>
      </div>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "HomePage",
  data() {
    return {
      backgroundDiv: {
        backgroundImage: "url(" + require("../assets/image/pic1.jpg") + ")",
        backgroundRepeat: "no-repeat",
        backgroundSize: "200px 200px auto",
      },
      value: new Date(),
      showVisible: false,
      tempdate: "",
      daily: "",
      array: [
        { date: "2021-09-22", context: "eat" },
        { date: "2021-09-23", context: "eat" },
        { date: "2021-09-24", context: "eat" },
      ],
      username: "2019212051"
    };
  },
  methods: {
    showMemo(data) {
      this.tempdate = data.day;
      this.showVisible = true;
      
    },
    judge(day) {
      for (var i = 0; i < this.array.length; i++) {
        if (day == this.array[i].date && this.array[i].context != "") {
          return true;
        }
      }
      return false;
    },
    toSaveMemo(){
      if(this.username != ""){
        alert("请先登录!");
      }else{
      //   this.$axios.post("https://autumnfish.cn/api/user/reg",{
      //   username: this.username,
      //   date_ : this.tempdate,
      //   memo : this.adily
      // }).then( res => {
      //   console.log(res.data);
      //   this.memo = "";
      // })
      this.daily = "";
      }
    }
  },
  created() {
    this.username = localStorage.getItem("username");
    if(this.username != ""){
      // this.$axios.post("",{
      //   username: this.username,
      // }).then( res => {
        
      // })
    }
  },
};
</script>

<style lang="scss" scoped>
.login {
  background: url("../assets/image/pic4.jpg");
  width: 99%;
  height: 90%;
  position: fixed;
  margin-top: -12px; /*上边距*/
  margin-left: -12px; /*左边距*/
  margin-bottom: -12px;
  margin-right: 0px;
  background-size: 100% 100%;
}
.el-card {
  background-color: rgb(192, 192, 192);
  opacity: 0.6;
  border-color: transparent;
  padding: 5px;
}
.row {
  padding-top: 8px;
  padding-bottom: 8px;
}
.calendar {
  height: 515px;
}
.calendar-title {
  padding: 5px;
}
.is-selected {
  color: #192ffa;
}
</style>