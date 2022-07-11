<template>
  <div>
    <h1>首页</h1>
    <a href="/list">a链接形式（开发中不可能用这种刷新页面的方式）</a>
    <br />
    <!-- Vue中借助router-link标签实现路由的切换 -->
    <!-- Nuxt中借助nuxt-link标签实现路由的切换 -->
    <nuxt-link to="/list">nuxt-link形式</nuxt-link>
    <br />
    <button @click="btxGotoList">js跳转</button>
  </div>
</template>

<script>
export default {
  name: "IndexPage",
  middleware: "pageAuth", //页面路由中间件写法一
  //middleware(){console.log("写法二：Page component route middleware auth");}
  methods: {
    btxGotoList() {
      this.$router.push({
        path: "/list",
        //query: { id: 1 },
        params: { b: 2 },
      });
    },
  },
};
</script>
