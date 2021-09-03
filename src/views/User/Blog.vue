<template>
    <el-container>
        <el-header height="200px">
            <div class="demo-type">
                <el-avatar :size="100" src="https://empty" @error="errorHandler">
                    <!--                    头像url 请求不到时显示默认头像-->
                    <img src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"/>
                </el-avatar>
            </div>
            <el-divider></el-divider>
            <span id="blog">我的博客</span>
            <span id="draft">草稿箱</span>
            <span id="recycleBin">回收站</span>
            <el-divider></el-divider>
        </el-header>
        <el-main>
            <div class="P">
                <el-row class="edit">
                    <el-button type="primary" icon="el-icon-edit" circle @click="toWriteBlog"></el-button>
                </el-row>
            </div>


            <el-divider content-position="center">已经到底了哦~</el-divider>
        </el-main>
    </el-container>
</template>

<script>
    export default {
        name: 'Blog',
        data(){
            return{
                blogContent:{
                    word:"",
                    img:""
                },
                blogCollection:[256]
            }
        },
        methods: {
            errorHandler() {
                return true
            },
            //跳转到写博客页面
            toWriteBlog(){
                this.$router.push("/User/writeBlog");
            }
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
    .P{
        height: 100px;
    }
    .edit{
        float:right;
    }
</style>