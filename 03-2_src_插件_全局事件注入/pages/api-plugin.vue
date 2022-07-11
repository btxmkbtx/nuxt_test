<template>
  <div>
    <h1>Mountains</h1>
    <p>List of mountains coming from our API Plugin:</p>
    <ul v-for="mountain in mountains" :key="mountain.slug">
      <li>
        {{ mountain.title }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  async asyncData(ctx) {
    //console.log("ctx", ctx);
    //打印全局上下文就可以看到，全局上下文和app实例对象上都被挂在了注入的方法。
    //const mountains = await ctx.app.$nuxtApi("mountains");
    const mountains = await ctx.$nuxtApi("mountains");
    return { mountains };
  },
};
</script>
