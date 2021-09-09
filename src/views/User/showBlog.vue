<template>
    <!-- 文章内容块 -->
    <article>
        <el-button id="back" type="primary" icon="el-icon-back"
        @click="backTo">返回</el-button>
        <div style="padding:20px">
            <el-row>
                <el-col :span="16">
                    <h1 class="blog-title" v-text="blog.title"></h1>
                </el-col>
                <el-col :span="6">
                    <p class="blog-title" >{{'📅:'+blog.time_}}</p>
                </el-col>
                <el-col :span="2">
                    <p class="blog-title"  font-weight="100">{{'👍：'+blog.count}}</p>
                </el-col>
            </el-row>
            <!-- 用<mavon-editor>标签显示文章内容 -->
            <mavon-editor :value="blog.content"
                          :subfield = "false"
                          :defaultOpen = "prop.defaultOpen"
                          :toolbarsFlag = "prop.toolbarsFlag"
                          :editable="prop.editable"
                          :scrollStyle="prop.scrollStyle"
                          :readmode="true"
                          :ishljs="true"
                          :codeStyle="codeStyle"
                          >
            </mavon-editor>
        </div>

    </article>

</template>

<script>
    export default {
        name: "showBlog",
        // components: {
        //     mavonEditor,
        // },
        data () {
            return {
                blog:{
                    title:" ",
                    content:" ",
                    time:" ",
                    blogid:" ",
                    picture:" ",
                    username:" "
                },
                msg:{
                    localUsername:" "
                },
            }
        },
        methods: {
            getBlogID(){
                this.blog.blogid=this.$route.params.blogID;
            },

            async getBlog(){

                this.$axios({
                    method:'post',
                    url:'/getBlog',
                    data:{
                        blogid:this.blog.blogid
                    }
                }).then(res =>{
                    //将返回的数据赋值给Blog
                    this.blog = res.data;
                    console.log(this.blog);
                })
            },

            backTo(){
                this.$router.go(-1);
            }
        },
        computed: {
            prop () {
                let data = {
                    subfield: false,// 单双栏模式
                    defaultOpen: 'preview',//edit： 默认展示编辑区域 ， preview： 默认展示预览区域
                    editable: false,
                    toolbarsFlag: false,
                    scrollStyle: true
                }
                return data
            }
        },
        created(){
            this.getBlogID();
            this.getBlog();
            this.msg.localUsername=localStorage.getItem("username");
        }
    }
</script>

<style scoped>

</style>