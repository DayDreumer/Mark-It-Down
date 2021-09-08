<template>
    <el-container id="container">
        <el-header height="400px" id="head">
            <div>
                <el-tooltip class="item" effect="dark" content="管理/创作你自己的博客" placement="bottom">
                    <el-button id="goto" type="primary" icon="el-icon-right"
                               @click="toMyBlog">个人博客
                    </el-button>
                </el-tooltip>
            </div>
            <!--            搜索栏-->
            <div class="input">
                <el-input placeholder="发现更多精彩" v-model="input" size="large">
                    <el-button slot="append" icon="el-icon-search" @click="search"></el-button>
                </el-input>
            </div>
            <!--            选择栏-->
            <div class="selection">
                <el-dropdown @command="handleSelection">
                    <el-button type="primary">
                        {{this.command}}<i class="el-icon-arrow-down el-icon--right"></i>
                    </el-button>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item command="a">时间优先</el-dropdown-item>
                        <el-dropdown-item command="b">热度优先</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
            </div>

        </el-header>

        <el-main id="main">

            <!-- 时间排序           博客显示栏-->
            <div v-if="!this.searchMode">

                <el-card class="box-card"
                         v-for="(item,index) in blogCollection"
                         :item="item"
                         :index="index"
                         v-if="item.isActive"
                         :key="item.blogid">
                    <div slot="header" class="clearfix">
                        <el-row>
                        <el-col :span="1">
                            <img :src="item.avatar" class="touxiang"> </img>
                        </el-col>
                        <el-col id="title" :span="23">
                        {{item.title}}
                        </el-col>
                        </el-row>
                    </div>
                    <div>
                        <el-row>
                            <el-col :span="2">
                           <span id="author">
                               作者：
                           </span>
                            </el-col>
                            <el-col :span="19">
                                <span id="username">
                                {{item.username}}
                                </span>
                            </el-col>
                            <el-col  :span="2">
                                <el-button class="thumb" type="danger" circle  v-if="item.isLiked"
                                            icon="el-icon-thumb"@click="thumbUp(item,index)">
                                </el-button>
                                <el-button class="thumb" type="info" circle  v-else
                                           icon="el-icon-thumb"@click="thumbUp(item,index)">
                                </el-button>
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
                               :total="this.blogLength"
                               :hide-on-single-page="false"
                               :page-size="5"
                               @current-change="pageChange"
                               :current-page.sync="currentPage"
                >
                </el-pagination>

            </div>

            <!-- 搜索模式           博客显示栏-->
            <div v-else>
                <el-card class="box-card"
                         v-for="(item,index) in blogCollection2"
                         :item="item"
                         :index="index"
                         v-if="item.isActive"
                         :key="item.blogid">
                    <div slot="header" class="clearfix" >
                        <el-row>
                            <el-col :span="1">
                                <el-avatar class="touxiang" :size="50" :fit="fill" src="item.avatar" @error="errorHandler">
                                    <img
                                            src="http://at.alicdn.com/t/font_2799380_intmfn9557s.ttf?t=1631100941650"
                                    />
                                </el-avatar>
                            </el-col>
                            <el-col id="title2" :span="23">
                                {{item.title}}
                            </el-col>
                        </el-row>
                    </div>
                    <div>
                        <el-row>
                            <el-col :span="2">
                           <span id="author2">
                               作者：
                           </span>
                            </el-col>
                            <el-col :span="19">
                                <span id="username2">
                                {{item.username}}
                                </span>
                            </el-col>
                            <el-col  :span="2">
                                <el-button class="thumb" type="danger" circle  v-if="item.isLiked"
                                           icon="el-icon-thumb"@click="thumbUp(item,index)">
                                </el-button>
                                <el-button class="thumb" type="info" circle  v-else
                                           icon="el-icon-thumb"@click="thumbUp(item,index)">
                                </el-button>
                            </el-col>
                            <el-col :span="1">
                                <el-button id="check2" type="primary"
                                           icon="el-icon-view" circle @click="accessBlog(item,index)">
                                </el-button>
                            </el-col>
                        </el-row>
                    </div>
                </el-card>

                <el-pagination class="pager"
                               background
                               layout="total,  prev, pager, next, jumper"
                               :total="this.blogLength2"
                               :hide-on-single-page="false"
                               :page-size="5"
                               @current-change="pageChange"
                               :current-page.sync="currentPage"
                >
                </el-pagination>

            </div>

        </el-main>

    </el-container>
</template>

<script>
    export default {
        name: 'Blog',
        data() {
            return {
                fill:"fill",
                currentPage: 0,
                blogPreview: {
                    title: "",
                    username: "",
                    timee: "",
                    blogid: "",
                    isActive: false
                },
                //blogCollection: [256],
                blogCollection: [],
                blogCollection2: [],
                blogLength: 0,
                blogLength2: 0,
                searchLength: 0,
                msg: {
                    localUsername: ""
                },
                dialogVisible: false,
                isLoadingFinished: false,
                input: "",
                command: "时间优先",
                searchMode: false,
                hotMode:false,
                tx:[]
            }
        },

        methods: {
            errorHandler(){
                return true;
            },
            handleSelection(command) {
                if (command == 'a') {
                    this.command = '时间优先';
                    this.getAllBlog();
                } else if (command = 'b') {
                    this.command = '热度优先';
                    this.getHotBlog();
                }
            },
            errorHandler() {
                return true
            },
            search() {
                console.log(this.input);
                //有东西
                if (this.input) {
                    this.searchMode = true;

                    for (var i = 0, j = 0; j < this.blogLength; j++) {
                        //console.log(this.blogCollection[j].title.indexOf(this.input));
                        if (this.blogCollection[j].title.indexOf(this.input) >= 0) {
                            this.$set(this.blogCollection2, i, {
                                title: this.blogCollection[j].title,
                                username: this.blogCollection[j].username,
                                time: this.blogCollection[j].time,
                                blogid: this.blogCollection[j].blogid,
                                isActive: this.blogCollection[j].isActive,
                                isLiked:this.blogCollection[j].isLiked,
                                avatar:this.blogCollection[j].avatar
                            });
                            i++;
                        }

                    }
                    console.log(this.blogCollection2);
                    this.blogLength2 = this.blogCollection2.length;
                    if(!this.blogLength2){
                        this.$alert('未能找到相关博客', '提示', {
                            confirmButtonText: '确定'
                        });
                        this.getAllBlog();
                    }
                    this.pageChange(1);
                }
                //没东西
                else {
                    this.searchMode = false;
                    this.getAllBlog();
                }
            },
            //搜索时重载
            searchReload() {

            },
            //跳转到写博客页面
            toWriteBlog() {
                this.$router.push("/User/writeBlog");
            },
            //跳转到我的博客页面
            toMyBlog() {
                if (this.msg.localUsername) {
                    this.$router.push("/User/myBlog");
                } else {
                    this.$alert('登陆后查看个人博客', '提示', {
                        confirmButtonText: '确定',
                        callback: action => {
                            this.$message({
                                type: 'info',
                                message: '右上角登录'
                            });
                        }
                    });
                }
            },
            //未登录返回主页
            backToHome() {
                //this.dialogVisible=false;
                this.$router.push("/Home");
            },
            //去登陆访问登录组件
            goToLogin() {
                this.$router.push({
                    name: "Home",
                    params: {}
                });

            },
            //判断是否喜欢
            isLiked  (id) {
                console.log(id);
                var that=this;
                that.$axios({
                    url: '/findALike',
                    method: 'post',
                    data:{
                        username:that.msg.localUsername,
                        blogid:id
                    }
                }).then(res=>{
                    if(res.data){
                       console.log('like');
                    }
                    else{
                        console.log('not like');
                    }
                })
            },
            //点赞触发
            thumbUp(item,index){
                this.$axios({
                    url: '/giveALike',
                    method: 'post',
                    data:{
                        username:this.msg.localUsername,
                        blogid:item.blogid
                    }
                }).then(res=>{
                    this.isLiked(item.blogid);
                    item.isLiked=!item.isLiked;
                })
            },
            //获取头像
            // getAvatar(){
            //     for(var i=0;i<this.blogLength;i++){
            //         this.$axios({
            //             url:'/getUserTouxiang',
            //             method:'post',
            //             data:{
            //                 username:this.blogCollection[i].username
            //             }
            //         }).then((res)=>{
            //             let temp = JSON.parse(JSON.stringify(res.data));
            //             this.$set(this.tx,i,{
            //                 avatar:temp
            //             });
            //         })
            //     }
            // },
            // test(){
            //     let xxx=JSON.parse(JSON.stringify(this.tx));
            //     console.log(this.tx);
            //     console.log(xxx);
            //     console.log(this.blogCollection);
            // },
            //拿到后端所有可见博客
            getAllBlog() {
                this.searchMode=false;
                var that=this;
                this.$axios({
                    url: '/getPublicBlogs',
                    method: 'post',
                    data:{
                        username:this.msg.localUsername
                    }
                }).then(res => {
                    let temp = JSON.parse(JSON.stringify(res.data));
                    for (var i = 0; i < temp.length; i++) {
                       // that.$options.methods.isLiked(temp[i].blogid);
                        //console.log(this.likeOrNot);
                        let fubao=true;
                        if(temp[i].isLiked=='0'){
                            fubao=false
                        }
                        this.$set(this.blogCollection, i, {
                            title: temp[i].title,
                            username: temp[i].username,
                            time: temp[i].time_,
                            blogid: temp[i].blogid,
                            isActive: false,
                            isLiked:fubao,
                            avatar:temp[i].touxiang
                        })
                    }
                    console.log("data get")
                    this.blogLength = this.blogCollection.length;
                    //this.isLoadingFinished=true;
                    let that=this;
                    //this.getAvatar();
                    //
                    console.log(this.blogCollection);
                    this.pageChange(1);
                })
            },

            //获得所有可见博客（按热度排序）
            getHotBlog(){
                this.searchMode=false;
                this.$axios({
                    url: '/getPublicHotBlogs',
                    method: 'post',
                    data:{
                        username:this.msg.localUsername
                    }
                }).then(res => {
                    let temp = JSON.parse(JSON.stringify(res.data));
                    for (var i = 0; i < temp.length; i++) {
                        let fubao=true;
                        if(temp[i].isLiked=='0'){
                            fubao=false
                        }
                        this.$set(this.blogCollection, i, {
                            title: temp[i].title,
                            username: temp[i].username,
                            time: temp[i].time_,
                            blogid: temp[i].blogid,
                            isActive: false,
                            isLiked:fubao
                        })
                    }
                    console.log("data get")
                    this.blogLength = this.blogCollection.length;
                    //this.getAvatar();
                    this.pageChange(1);
                })
            },

            //查看单条博客具体内容
            accessBlog(item, index) {
                this.$router.push({
                    name: "showBlog",
                    params: {blogID: item.blogid}
                })
            },


            //换页时触发 拿到当前页面
            pageChange(val) {
                this.currentPage=val;
                if (!this.searchMode) {
                    console.log("当前页面号" + this.currentPage);
                    this.currentPage = val;
                    var i;
                    if (val * 5 <= this.blogLength) {
                        i = 5;
                    } else {
                        i = this.blogLength % 5;
                    }
                    for (var k = 0; k < this.blogLength; k++) {
                        this.blogCollection[k].isActive = false;
                    }
                    for (var j = (val - 1) * 5, l = 0; l < i; j++, l++) {
                        this.blogCollection[j].isActive = true;
                    }
                } else {
                    this.pageChange2(val);
                }
            },

            pageChange2(n) {
                this.currentPage = n;
                console.log(this.blogCollection2);
                var i;
                if (n * 5 <= this.blogLength2) {
                    i = 5;
                } else {
                    i = this.blogLength2 % 5;
                }
                for (var k = 0; k < this.blogLength2; k++) {
                    this.blogCollection2[k].isActive = false;
                }
                for (var j = (n - 1) * 5, l = 0; l < i; j++, l++) {
                    this.blogCollection2[j].isActive = true;
                }
            }
        },

        created() {
            this.msg.localUsername = localStorage.getItem("username");
            this.getAllBlog();
        },

        mounted() {
            //判断是否登录 不登陆无法使用博客功能
            console.log("blog start");
        }
    }

</script>

<style lang="scss" scoped>
    .thumb{

    }

    #title {
        font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
        line-height: 1;
        font-size: x-large;
        font-style: italic;
        padding-left: 50px;
        padding-top: 15px;
    }

    #author {
        font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
        line-height: 1;
        font-size: large;
    }

    #username {
        font-family: "Gill Sans Ultra Bold";
        line-height: 1;
        font-size: large;
    }

    #title2 {
        font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
        line-height: 1;
        font-size: x-large;
        font-style: italic;
        padding-left: 50px;
        padding-top: 15px;
    }

    #author2 {
        font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
        line-height: 1;
        font-size: large;
    }

    #username2 {
        font-family: "Gill Sans Ultra Bold";
        line-height: 1;
        font-size: large;
    }

    #container {
        background-image: url(../../assets/image/pexels-ricardo-esquivel-1563256.jpg);
        background-size: cover;
        background-repeat: no-repeat;
        margin-left: -12px;
        margin-right: -15px;
        margin-top:-10px;
    }

    .input {
        padding-top: 150px;
        text-align: center;
        width: 80%;
        margin: auto;
        line-height: 100px;
    }

    /*#startWriting{*/
    /*    text-align: center;*/
    /*    padding-top: 100px;*/
    /*    padding-left: 550px;*/
    /*}*/

    #goto {
        float: right;
        margin-right: 150px;
        margin-top: 50px;
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

    .selection {
        margin-top: 100px;
        float: right;
        margin-right: 300px;
    }

    .el-card__header{
        padding-top: 10px;
        padding-bottom: 10px;
    }

    .touxiang{
        width:100%;
        height:100%;
        border-radius:40%;
    }
</style>