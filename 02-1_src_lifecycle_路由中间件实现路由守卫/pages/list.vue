<template>
  <div>列表页</div>
</template>

<script>
export default {
  name: "IndexPage",
  middleware() {
    console.log("写法二：Page component route middleware list auth");
  },
  validate({ params, query }) {
    console.log("validate的query参数:", query);
    if (query.hasOwnProperty("id") && query.id === "0") {
      return false;
    }
    console.log("validate的params参数:", params);
    if (params.hasOwnProperty("id") && params.id === "0") {
      return false;
    }
    return true;
  },
};
</script>
