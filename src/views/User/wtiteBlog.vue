<template>
    <div>
        <div class="title-box">
            <input type="text" class="title" v-model="article.title" placeholder="请输入标题..."/>
            <el-button type="text" @click="dialogVisible=true">提交</el-button>
        </div>
        <div class="app-container">
            <mavon-editor v-model="article.content" class="editor"/>
        </div>
        <el-dialog
                title="提示"
                :visible.sync="dialogVisible"
                width="30%"
                :before-close="handleClose">
            <span>确定要提交吗</span>
            <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">继续编辑</el-button>
    <el-button type="primary" @click="postArticle">确 定</el-button>
  </span>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        name: "wtiteBlog",
        data() {
            return {
                dialogVisible: false,
                article: {
                    title: "",
                    content: ""
                },
                value: ''
            };
        },
        methods: {
            //判断为空
            assertNotEmpty(target, msg) {
                if (!target) {
                    this.$message({
                        message: msg,
                        type: "warning",
                    });
                    return false;
                }
                return true;
            },
            //关闭窗口提示
            handleClose(done) {
                this.$confirm('确认关闭？');
                this.dialogVisible = false;
            },
            //发送博客方法
            postArticle() {
                if (this.assertNotEmpty(this.article.title, "文章标题不能为空")
                    && this.assertNotEmpty(this.article.content, "文章内容不能为空")) {
                    this.dialogVisible = false;
                    //multipart formdata类型
                    let params = new FormData();
                    params.append('title', this.title);
                    params.append('content', this.content);

                    this.$axios.post("http://10.128.245.60:8008/api/upload", params,
                    {
                        headers: { 'Content-Type': 'multipart/form-data' }
                    }).then(res => {
                        console.log(res);
                    })
                }
            }

        }
    }
</script>

<style lang="scss" scoped>
    .editor {
        height: 650px;
    }

    .title-box {
        display: grid;
        grid-template-columns: 22fr 2fr;
    }

    .title {
        background: none;
        color: #303133;
        text-indent: 0px;
        outline: none;
        font-size: 16px;
        font-weight: bold;
        display: block;

        border: none;
        border-bottom: 1px solid #e0e0e0;
        border-radius: 0;
        line-height: 1;
        overflow: visible;
        margin-bottom: 15px;
        padding: 4px;
    }

    .title:focus {
        border-color: #409eff;
    }

</style>


<style scoped>

</style>