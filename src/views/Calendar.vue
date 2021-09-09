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
                <p :class="data.is - selected ? 'is-selected' : ''">
                  {{ data.day.split("-").slice(1).join("-") }}
                  {{ judge(data.day) ? "💛" : "" }}
                  {{ data.isSelected ? "✔️" : "" }}
                </p>
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
                :autosize="{ minRows: 10, maxRows: 15 }"
                placeholder="记录一下日程吧"
                resize="none"
              ></el-input>
            </div>
            <div>
              <el-button style="float: right" @click="toSaveMemo"
                >保存</el-button
              >
            </div>
          </el-card>
        </el-col>
      </div>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "calendar",
  data() {
    return {
      value: new Date(),
      showVisible: false,
      tempdate: "",
      daily: "",
      array: [
      ],
      username: "",
    };
  },
  methods: {
    showMemo(data) {
      // this.daily =
      this.tempdate = data.day;
      this.daily = this.findDaily(data.day);
      this.showVisible = true;
    },
    findDaily(day){
      for(var i=0;i<this.array.length;i++){
        if(day == this.array[i].date_){
          return this.array[i].context;
        }
      }
    },
    judge(day) {
      for (var i = 0; i < this.array.length; i++) {
        if (day == this.array[i].date_ && this.array[i].context != "") {
          return true;
        }
      }
      return false;
    },
    toSaveMemo() {
      if (localStorage.getItem("username") == null) {
        alert("请先登录!");
      } else if (this.daily != "") {
        this.$axios
          .post("/recordUpload", {
            username: this.username,
            date_: this.tempdate,
            context: this.daily,
          })
          .then((res) => {
            console.log("插入");
            console.log(res);
          });
        this.$axios
        .post("/getRecord", {
          username: this.username,
        })
        .then((res) => {
          console.log(res);
          this.array = res.data;
          console.log(this.array[0].context);
        });
      } else {
        this.$axios
          .post("/deleteRecord", {
            username: this.username,
            date_: this.tempdate,
            context: "",
          })
          .then((res) => {
            console.log("删除");
            console.log(res);
            // this.memo = "";
          });
          this.$axios
        .post("/getRecord", {
          username: this.username,
        })
        .then((res) => {
          console.log(res);
          this.array = res.data;
          console.log(this.array[0].context);
        });
      }
    },
  },
  created() {
    this.username = localStorage.getItem("username");
    console.log(this.username);
    if (localStorage.getItem("username") != null) {
      this.$axios
        .post("/getRecord", {
          username: this.username,
        })
        .then((res) => {
          console.log(res);
          this.array = res.data;
          console.log(this.array[0].context);
        });
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
  background-color: rgb(255, 255, 255);
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