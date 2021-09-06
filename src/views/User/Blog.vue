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

            <el-card class="box-card"
                     v-for="(item,index) in blogCollection"
                     :item="item"
                     :index="index"
                     v-if="item.isActive"
                     :key="item.blogid">
                <div slot="header" class="clearfix">
                    <span>{{item.username}} 发布的：</span>
                    <el-button style="float: right; padding: 3px 0" :key=1
                               type="text" @click="accessBlog(item,index)">具体内容</el-button>
                </div>
                <div  class="text item">
                    {{item.title}}
                </div>
            </el-card>

                <el-pagination class="pager"
                                background
                                layout="total,  prev, pager, next, jumper"
                                :total="this.blogLength"
                                :hide-on-single-page="false"
                                :page-size="5"
                                @current-change="pageChange"
                               :current-page.sync="currentPage"
                               >
                </el-pagination>

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
                currentPage:0,
                blogPreview: {
                    title: "",
                    username: "",
                    timee:"",
                    blogid: "",
                    isActive:false
                },
                //blogCollection: [256],
                blogCollection:[
                ],
                blogForOnePage:[
                ],
                blogLength:0,
                msg: {
                    localUsername: ""
                },
                dialogVisible:false,
                isLoadingFinished:false
            }
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
            //拿到后端所有可见博客
             getAllBlog(){
                this.$axios({
                    url: 'http://10.28.173.235:8008/api/getPublicBlogs',
                    method: 'post',
                }).then(res=>{
                    let temp=JSON.parse(JSON.stringify(res.data));
                    for(var i=0;i<temp.length;i++){
                        this.$set(this.blogCollection,i,{
                            title: temp[i].title,
                            username: temp[i].username,
                            time:temp[i].time_,
                            blogid: temp[i].blogid,
                            isActive:false
                        })
                    }
                    console.log("data get")
                    this.blogLength=this.blogCollection.length;
                    //this.isLoadingFinished=true;
                    this.pageChange(1);
                })
            },

            //查看单条博客具体内容
            accessBlog(item,index){
                this.$router.push({
                    name:"showBlog",
                    params:{blogID:item.blogid}
                })
            },

            //换页时触发 拿到当前页面
            pageChange(val){
                console.log("当前页面号"+this.currentPage);
                console.log(this.blogCollection);
                var i;
                if(val*5<=this.blogLength){
                    i=5;
                }
                else{
                    i=this.blogLength%5;
                }
                for(var k=0;k<this.blogLength;k++){
                    this.blogCollection[k].isActive=false;
                    // this.$set(this.blogCollection,k,{
                    //     isActive:false
                    // })
                }
                this.blogCollection
                for(var j=(val-1)*5,l=0;l<i;j++,l++){
                     this.blogCollection[j].isActive=true;
                    // this.$set(this.blogCollection,k,{
                    //     isActive:true
                    // });
                }
                for(var k=0;k<this.blogLength;k++){
                    console.log(this.blogCollection[k].isActive);
                }
            },
        },

        created() {
            this.msg.localUsername = localStorage.getItem("username");
            this.getAllBlog();
        },

        mounted() {
            //判断是否登录 不登陆无法使用博客功能
            console.log("blog start");
            // this.pageChange(1);
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

    .pager{
        text-align: center;
    }
</style>