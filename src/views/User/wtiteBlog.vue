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
                :before-close="handleClose">
            <span>确定要提交吗</span>
            <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">继续编辑</el-button>
    <el-button type="primary" @click="uploadimg">确 定</el-button>
  </span>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        name: "wtiteBlog",
        data() {
            return {
                img_file:{},
                dialogVisible: false,
                article: {
                    title: "",
                    content: ""
                },
                value: '',
                //组件选择
                toolbars:{
                    // undo:false,
                    // redo:false
                }
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
            },
            //imgAdd
            $imgAdd(pos, $file){
                // 缓存图片信息
                this.img_file[pos] = $file;
            },
            $imgDel(pos){
                delete this.img_file[pos];
            },
            //上传(一起发）
            // uploadimg($e){
            //     var formdata = new FormData();
            //     //识别所有图片 加入数组准备上传
            //
            //     for(var _img in this.img_file){
            //         formdata.append('file', this.img_file[_img]);
            //     }
            //     this.$axios({
            //         url: 'http://10.28.173.235:8008/api/blogUpload',
            //         method: 'post',
            //         data: formdata,
            //         headers: { 'Content-Type': 'multipart/form-data' },
            //     }).then((res) => {
            //
            //         for (var img in res) {
            //             // $vm.$img2Url 详情见本页末尾
            //             //$vm.$img2Url(img[0], img[1]);
            //         }
            //     })
            // }

            //上传（连续发）
            uploadimg($e){
                //识别所有图片 加入数组准备上传
                //先上传图片
                for(var _img in this.img_file){
                    var formdata = new FormData();
                    formdata.append('file', this.img_file[_img]);
                    this.$axios({
                        url: 'http://10.28.173.235:8008/api/upload',
                        method: 'post',
                        data: formdata,
                        headers: { 'Content-Type': 'multipart/form-data' },
                    }).then((res) => {
                        var str=res.data;
                        var place=str.indexOf("http");
                        var str1=str.substr(place);
                        this.$refs.md.$img2Url(_img,str1);
                    })
                }
                //返回url 再次发送文字
                console.log(this.article.content);
                this.$axios({
                    url:'http://10.28.173.235:8008/api/blogUpload',
                    method:'post',
                    data: {
                        content:this.article.content,
                        username:"919440676@qq.com",
                        title:this.article.title,
                        picture:["321","afae32"]
                    }
                }).then((res)=>{
                    console.log(res);
                })

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