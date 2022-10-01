<template>
  <div>
    <h1>头部</h1>
    <nuxt />
    <h1>尾部</h1>
  </div>
</template>

<script>
export default {
  head: {
    title: "默认布局",
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      {
        hid: "author",
        name: "author",
        content: "作者",
      },
      {
        hid: "description",
        name: "description",
        content: "网站描述",
      },
      {
        hid: "keywords",
        name: "keywords",
        content: "关键字",
      },
    ],
  },
};
</script>
