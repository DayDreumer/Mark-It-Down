<template>
    <el-container>
        <el-header height="250px">
            <div class="demo-type">
                <el-avatar :size="100" src="" @error="errorHandler">
                    <!--                    头像url 请求不到时显示默认头像-->
                    <!--                    <img src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"/>-->
                </el-avatar>
            </div>
            <el-divider></el-divider>
            <span id="blog">我的博客</span>
            <span id="draft">草稿箱</span>
            <span id="recycleBin">回收站</span>
            <el-divider></el-divider>
            <div >
                <span id="startWriting"> 进行一次创作</span>
                <el-row class="edit">
                    <el-button type="primary" icon="el-icon-edit" circle @click="toWriteBlog"></el-button>
                </el-row>
            </div>
        </el-header>

        <el-main id="main">

<!--            博客显示栏-->
            <div >
            <el-card class="box-card" v-for="(item,index) in blogCollection" :key="index">
                <div slot="header" class="clearfix">
                    <span>{{item.username}} 发布的：</span>
                    <el-button style="float: right; padding: 3px 0" :key=1
                               type="text" @click="accessBlog(item,index)">具体内容</el-button>
                </div>
                <div  class="text item">
                    {{item.title}}
                </div>
            </el-card>


            </div>
        </el-main>

        <el-dialog
                title="提示"
                :visible.sync="dialogVisible"
                width="30%"
                :modal-append-to-body="false"
                :before-close="backToHome">
            <span>您已退出 无法查看博客内容</span>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="goToLogin">去登陆</el-button>
            </span>
        </el-dialog>
    </el-container>
</template>

<script>
    export default {
        name: 'Blog',
        data() {
            return {
                blogPreview: {
                    title: "",
                    username: "",
                    timee:"",
                    blogid: ""
                },
                blogCollection: [256],
                blogLength:0,
                msg: {
                    localUsername: ""
                },
                dialogVisible:false
            }
        },
        created() {
            this.msg.localUsername = localStorage.getItem("username");
            console.log(1);
        },
        methods: {
            errorHandler() {
                return true
            },
            //跳转到写博客页面
            toWriteBlog() {
                this.$router.push("/User/writeBlog");
            },
            //未登录返回主页
            backToHome(){
                //this.dialogVisible=false;
                this.$router.push("/Home");
            },
            //去登陆访问登录组件
            goToLogin(){
                this.$router.push({
                    name:"Home",
                    params:{
                        sss:1
                    }
                });

            },
            getMyBlog(){
                //依据用户id拿到他的所有博客
                this.$axios({
                    url: 'http://10.28.173.235:8008/api/getPublicBlogs',
                    method: 'post',
                    data: this.msg.localUsername
                }).then(res=>{
                    console(res);
                    this.blogCollection=res;
                })
            },

            getAllBlog(){
                this.$axios({
                    url: 'http://10.28.173.235:8008/api/getPublicBlogs',
                    method: 'post',
                }).then(res=>{

                    this.blogCollection=res.data;
                    console.log("get all blogs");
                    this.blogLength=this.blogCollection.length;
                })
            },

            //查看博客具体内容
            accessBlog(item,index){
                this.$router.push({
                    name:"showBlog",
                    params:{blogID:item.blogid}
                })
            },
        },


        mounted() {
            //判断是否登录 不登陆无法使用博客功能
            console.log("blog start");
            this.getAllBlog();
            // if (!this.msg.localUsername) {
            //     this.dialogVisible=true;
            //
            // }

        }
    }

</script>

<style lang="scss" scoped>
    #blog {
        color: red;
        padding: 20px;
    }

    #draft {
        text-align: right;
        color: red;
        float: right;
        width: 15%
    }

    #recycleBin {
        text-align: right;
        color: red;
        float: right;
        width: 15%
    }

    .P {
        height: 100px;
    }

    .edit {
        float: right;
    }

    .block{
        padding:200px
        ;
        height: 1000px;
    }

    .main{
        height:1500px;
    }

    #startWriting{
        text-align: center;
        padding-top: 100px;
        padding-left: 550px;
    }
</style>