<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  mounted() {
    // 关闭浏览器窗口的时候清空浏览器缓存在localStorage的数据
    window.onbeforeunload = function () {
      var cookie = document.cookie;
      if (cookie.indexOf("username=") != -1) {
        // 刷新
      } else {
        var storage = window.localStorage;
        storage.clear();
      }
    };
  },
};
</script>

<style lang="scss">
</style>
