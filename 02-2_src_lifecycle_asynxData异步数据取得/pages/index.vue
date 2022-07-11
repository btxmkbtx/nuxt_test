<template>
  <div>
    <ul>
      <li v-for="(p, index) of topics" :key="index">
        {{ p.title }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "IndexPage",
  data() {
    return { topics: [] };
  },
  async asyncData({ $axios }) {
    let tab = "all",
      page = 1,
      limit = 20,
      mdrender = true;

    let res = await $axios.get(
      `https://cnodejs.org/api/v1/topics?tab=${tab}&page=${page}&limit=${limit}&mdrender=${mdrender}`
    );
    console.log(res.data.data);
    return {
      topics: res.data.data,
    };
  },
};
</script>
