<template>
    <div>
        <div class="title-box">
            <input type="text" class="title" v-model="article.title" placeholder="请输入标题..."/>
            <el-button type="text" @click="dialogVisible=true">提交</el-button>
        </div>
        <div class="app-container">
            <mavon-editor ref=md @imgAdd="$imgAdd" @imgDel="$imgDel" v-model="article.content" class="editor" />
        </div>
        <el-dialog
                title="提示"
                :visible.sync="dialogVisible"
                width="30%"
                :modal-append-to-body="false"
                >
            <span>请选择博客类型</span>
            <div class="visible">
            <el-radio v-model="radio" label="1">公开</el-radio>
            <el-radio v-model="radio" label="2">私有</el-radio>
            </div>
            <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">继续编辑</el-button>
    <el-button type="primary" @click="upLoad" >确 定</el-button>
  </span>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        name: "writeBlog",
        data() {
            return {
                radio:"1",
                sum:0,
                img_file:{},
                dialogVisible: false,
                article: {
                    title: "",
                    content: "",
                    picture:[],
                    visible:false
                },
                msg:{
                    localUsername:""
                },
                value: '',
                //组件选择
                toolbars:{
                    // undo:false,
                    // redo:false
                }
            };
        },

        created(){
            this.msg.localUsername = localStorage.getItem("username");

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
            //提交成功提示
            handleSubmit() {
                this.$notify({
                    title: '提交成功',
                    message: '在我的博客中查看最新博客',
                    type: 'success'
                });
            },


            mounted(){
                console.log(1231);
            },
            //图片上传函数
            $imgAdd(pos, $file){
                // 第一步.将图片上传到服务器.
                var formdata = new FormData();
                formdata.append('file', $file);
                this.$axios({
                    url: '/upload',
                    method: 'post',
                    data: formdata,
                    headers: { 'Content-Type': 'multipart/form-data' },
                }).then((res) => {
                    var data=JSON.stringify(res.data);
                    var str = data;
                    console.log(res);
                    var place1 = str.indexOf("http");
                    var str = str.substr(place1);
                    var place2 = str.indexOf("}");
                    var str= str.replace("\"}","");
                    this.$refs.md.$img2Url(1+this.sum, str);
                    this.article.picture.push(str);
                    this.sum++;
                })
            },
            $imgDel(pos){
                delete this.img_file[pos];
            },
            upLoad(){
                if (this.assertNotEmpty(this.article.title, "文章标题不能为空")
                && this.assertNotEmpty(this.article.content, "文章内容不能为空")) {
                            if(this.radio=='1'){
                                this.article.visible="1";
                            }
                            else{
                                this.article.visible="0";
                            }
                            this.$axios({
                                url: '/blogUpload',
                                method: 'post',
                                data: {
                                    content: this.article.content,
                                    username: this.msg.localUsername,
                                    title: this.article.title,
                                    picture: this.article.picture,
                                    visible: this.article.visible
                                }
                            }).then((res) => {
                                this.handleSubmit();
                                this.$router.push("/User/myBlog");
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

    .visible{
        padding:30px;

    }
</style>


<style scoped>

</style>