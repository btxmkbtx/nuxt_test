<template>
  <div>Your template</div>
</template>

<script>
export default {
  layout: (ctx) => {
    console.log("当前上下文中指定的布局为：", ctx.layoutName);
    return ctx.layoutName ? ctx.layoutName : "default";
  }, //页面中的layout既可以设置成layout文件名，也可以设置成一个箭头函数，箭头函数的参数就是当前上下文。
  // page component definitions
};
</script>
