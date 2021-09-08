<template>
    <el-container id="container">
        <!--    博客预览条目-->
        <el-header height="400px">
            <div>
            <el-tooltip class="item" effect="dark" content="查看所有人的博客" placement="bottom">
            <el-button id="back" type="primary" icon="el-icon-back"
                       @click="toBlog" >博客大厅
            </el-button>
            </el-tooltip>
            </div>
                        <div class="demo-type">
                            <el-avatar :size="200" src="this.touXiang" @error="errorHandler">
                                <!--                    头像url 请求不到时显示默认头像-->
                                <img src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"/>
                            </el-avatar>
                        </div>

            <el-card class="info-card">
                <div  class="text item">
                    {{"已发博客  :"+this.blogLength}}
                </div>
                <div  class="text item">
                    {{"已获赞数 :"+this.totalThumb}}
                </div>
            </el-card>

                        <div >
                            <el-row class="edit">
                                <el-button type="primary" icon="el-icon-edit"  @click="toWriteBlog">
                                    开始创作
                                </el-button>
                            </el-row>
                        </div>
        </el-header>
        <el-main>
            <div>
                <el-card class="box-card"
                         v-for="(item,index) in blogCollection"
                         :item="item"
                         :index="index"
                         v-if="item.isActive"
                         :key="item.blogid">
                    <div slot="header" class="clearfix">
                        {{item.title}}
                    </div>
                    <div class="text item">
                        <el-row>
                            <el-col :span="21">
                                <el-switch
                                        v-model="item.visible"
                                        active-color="#13ce66"
                                        inactive-color="#ff4949"
                                        active-text="公开博客"
                                        inactive-text="私人博客"
                                        @change="reverseVisibility(item,index)">
                                </el-switch>
                            </el-col>
                            <el-col :span="2">
                                <el-button id="delete" type="danger" circle
                                           icon="el-icon-delete-solid" @click="deleteConfirm(item,index)"></el-button>
                            </el-col>
                            <el-col :span="1">
                                <el-button id="check" type="primary"
                                           icon="el-icon-view" circle @click="accessBlog(item,index)">
                                </el-button>
                            </el-col>
                        </el-row>
                    </div>
                </el-card>

                <el-pagination class="pager"
                               background
                               layout="total,  prev, pager, next, jumper"
                               :total="blogLength"
                               :hide-on-single-page="false"
                               :page-size="5"
                               @current-change="pageChange"

                >
                </el-pagination>
            </div>

        </el-main>
    </el-container>
</template>

<script>
    export default {
        name: "myBlog",
        data() {
            return {
                blogCollection: [],
                msg: {
                    localUsername: ""
                },
                blogLength: 0,
                currentPage: 0,
                tt: true,
                dialogVisible: true,
                touXiang:"",
                totalThumb:0
            }
        },
        created() {
            this.msg.localUsername = localStorage.getItem("username");
            this.getMyBlog();
            this.getUserTouxiang();
        },
        methods: {
            errorHandler() {
                return true
            },
            toBlog() {
                //返回博客主页
                this.$router.push("/User/Blog");
            },
            toWriteBlog() {
                //跳转到写作页面
                this.$router.push("/User/writeBlog");
            },
            getUserTouxiang(){
                this.$axios({
                    url: 'http://10.28.173.235:8008/api/getUserTouxiang',
                    method: 'post',
                    data: {
                        username: this.msg.localUsername
                    }
                }).then(res=>{
                    this.touXiang=res.data;
                    console.log(this.touXiang);
                })
            },
            accessBlog(item, index) {
                //访问单条博客
                this.$router.push({
                    name: "showBlog",
                    params: {blogID: item.blogid}
                })
            },
            deleteConfirm(item, index) {
                this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$message({
                        type: 'success',
                        message: '删除成功!'
                    });
                    this.deleteBlog(item, index);
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            },
            deleteBlog(item, index) {
                //删除博客
                if ((index + 1) != 1 && (index + 1) % 5 == 1) {
                    this.currentPage--;
                }
                this.$axios({
                    url: 'http://10.28.173.235:8008/api/deleteBlog',
                    method: 'post',
                    data: {
                        blogid: item.blogid,
                        username: this.msg.localUsername
                    }
                }).then(res => {
                    this.blogCollection.splice(index, 1);
                    this.blogLength--;
                    this.pageReload(this.currentPage);
                })
            },
            reverseVisibility(item, index) {
                //更改博客可见与否
                let jk = item.visible;
                if (jk) {
                    jk = "1";
                } else {
                    jk = "0";
                }
                console.log(item.blogid);
                this.$axios({
                    url: 'http://10.28.173.235:8008/api/updateBlog',
                    method: 'post',
                    data: {
                        blogid: item.blogid,
                        username: this.msg.localUsername,
                        time_: item.time,
                        title: item.title,
                        content: item.content,
                        picture: item.picture,
                        visible: jk
                    }
                }).then(res => {
                    this.pageReload(this.currentPage);
                })
            },
            //拿到后端所有我的博客
            getMyBlog() {
                this.$axios({
                    url: 'http://10.28.173.235:8008/api/getAllBlogs',
                    method: 'post',
                    data: {
                        username: this.msg.localUsername
                    }
                }).then(res => {
                    let temp = JSON.parse(JSON.stringify(res.data));
                    for (var i = 0; i < temp.length; i++) {
                        let j = temp[i].visiable;
                        let k = false;
                        if (j == '1') {
                            k = true;
                        }
                        console.log(temp[i].visiable);
                        this.$set(this.blogCollection, i, {
                            title: temp[i].title,
                            username: temp[i].username,
                            time: temp[i].time_,
                            blogid: temp[i].blogid,
                            isActive: false,
                            visible: k,
                            count:temp[i].count
                        });
                        this.totalThumb+=this.blogCollection[i].count;
                    }
                    console.log("data get");
                    this.blogLength = this.blogCollection.length;
                    //this.isLoadingFinished=true;
                    this.pageChange(1);
                })
            },

            //换页时触发 拿到当前页面
            pageChange(val) {
                console.log("当前页面号" + this.currentPage);
                console.log(this.blogCollection);
                var i;
                if (val * 5 <= this.blogLength) {
                    i = 5;
                } else {
                    i = this.blogLength % 5;
                }
                for (var k = 0; k < this.blogLength; k++) {
                    this.blogCollection[k].isActive = false;
                }
                this.blogCollection
                for (var j = (val - 1) * 5, l = 0; l < i; j++, l++) {
                    this.blogCollection[j].isActive = true;
                }
                this.currentPage = val;
            },

            //页面刷新
            pageReload(pageOn) {
                console.log("当前页面号" + this.currentPage);
                console.log(this.blogCollection);
                var i;
                if (pageOn * 5 <= this.blogLength) {
                    i = 5;
                } else {
                    i = this.blogLength % 5;
                }
                for (var k = 0; k < this.blogLength; k++) {
                    this.blogCollection[k].isActive = false;
                }
                this.blogCollection
                for (var j = (pageOn - 1) * 5, l = 0; l < i; j++, l++) {
                    this.blogCollection[j].isActive = true;
                }
            },
        }
    }
</script>

<style scoped>
    #check {
        float: right;

    }

    #delete {

    }

    .pager {
        text-align: center;
    }

    .box-card {
        border-radius: 20px;
        border-color: #e0e0e0;
        width: 60%;
        margin-left: 275px;
        margin-top: 15px;
        margin-bottom: 15px;
    }
    .info-card{
        width: 200px;
        float:right;
        margin-top: -100px;
        margin-right:650px;
    }
    #back{
        margin-left: 100px;
        float: left;
    }
    #container {
        background-image: url(../../assets/image/hill.jpg);
        background-size: cover;
        background-repeat: no-repeat;
    }

    .demo-type{
        margin-top: 130px;
        margin-left:350px;
    }
    .edit{
        float:right;
        margin-right: 300px;
    }
    .clearfix{
        font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
        line-height: 1;
        font-size: x-large;
        font-style: italic;
        padding-left: 50px;
    }
</style>