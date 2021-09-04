<template>
    <!-- 文章内容块 -->
    <article>
        <div style="padding:20px" v-highlight>
            <h1 class="blog-title" v-text="Blog.title"></h1>
            <!-- 用<mavon-editor>标签显示文章内容 -->
            <mavon-editor :value="blog.content"
                          :subfield = "false"
                          :defaultOpen = "prop.defaultOpen"
                          :toolbarsFlag = "prop.toolbarsFlag"
                          :editable="prop.editable"
                          :scrollStyle="prop.scrollStyle">
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
                }
            }
        },
        methods: {
            async getBlog(){

                const res = await this.$axios({
                    method:'post',
                    url:'http://10.28.173.235:8008/api/getBlog',
                    data:{
                        blogid:"2021/09/04/17:32:38-919440676@qq.com"
                    }
                })
                //将返回的数据赋值给Blog
                this.Blog = res.data
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
            this.getBlog()
        }
    }
</script>

<style scoped>

</style>