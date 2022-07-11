<template>
  <div>
    <h2>学生姓名：{{ name }}</h2>
    <h2>学生性别：{{ sex }}</h2>
    <input type="text" v-fbind:value="name" />
  </div>
</template>

<script>
//因为没有全局的Vue.use可用，所以需要导入使用
import fbind from "~/directives/fbind";
export default {
  name: "IndexPage",
  data() {
    return {
      name: "张三",
      sex: "男",
    };
  },
  // Nuxt框架会自动找到directives属性，并在后台帮我们调用Vue.directive
  directives: {
    fbind,
  },
};
</script>
