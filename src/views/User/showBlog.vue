<template>
    <mavon-editor class="markdown"
                  :value="get_mark_data()"
                  :subfield = "false"
                  :defaultOpen = "prop.defaultOpen"
                  :toolbarsFlag = "prop.toolbarsFlag"
                  :editable="prop.editable"
                  :scrollStyle="prop.scrollStyle"
    ></mavon-editor>

</template>

<script>
    export default {
        name: "showBlog",
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
        methods:{
            //判断目标是否为空
            assertNotEmpty(target,msg){
                if(!target){
                    this.$message
                }
            }
        }

    }
</script>
.markdown{
    width:700px;
    margin: 0 auto;
}
<style scoped>

</style>