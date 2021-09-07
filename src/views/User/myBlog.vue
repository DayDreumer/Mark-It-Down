<template>
    <el-container>
        <!--    博客预览条目-->
        <el-header>


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
                        <el-switch
                                style="display: block"
                                v-model="item.visible"
                                active-color="#13ce66"
                                inactive-color="#ff4949"
                                active-text="公开博客"
                                inactive-text="私人博客"
                                @change="reverseVisibility(item,index)">
                        </el-switch>
                        <el-button type="text" @click="deleteConfirm(item,index)">删除</el-button>
                        <el-button style="float: right; padding: 3px 0" :key=1
                                   type="text" @click="accessBlog(item,index)">具体内容
                        </el-button>
                    </div>
                    <div class="text item">
                        {{item.title}}
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
                tt: true
            }
        },
        created() {
            this.msg.localUsername = localStorage.getItem("username");
            this.getMyBlog();
        },
        methods: {
            toBlog() {
                //返回博客主页
                this.$router.push("/User/Blog");
            },
            toWriteBlog() {
                //跳转到写作页面
                this.$router.push("/User/writeBlog");
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
                            visible: k
                        })
                    }
                    console.log(temp);
                    //console.log(this.blogCollection);
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
    .pager {
        text-align: center;
    }
    .box-card{
        border-radius: 20px;
        margin:20px;
    }
</style>