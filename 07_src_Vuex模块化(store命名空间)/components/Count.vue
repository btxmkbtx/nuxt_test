<template>
  <div>
    <h1>当前求和为：{{ sum }}</h1>
    <h3>当前求和放大10倍为：{{ bigSum }}</h3>
    <h3>我在{{ school }}，学习{{ subject }}</h3>
    <select v-model.number="n">
      <option value="1">1</option>
      <option value="2">2</option>
      <option value="3">3</option>
    </select>
    <button @click="increment(n)">+</button>
    <button @click="decrement(n)">-</button>
    <button @click="incrementOdd(n)">当前求和为奇数再加</button>
    <button @click="incrementWait(n)">等一等再加</button>
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from "vuex";
export default {
  name: "Count",
  data() {
    return {
      n: 1, //用户选择的数字
    };
  },
  computed: {
    // 对象写法，状态树由nuxt框架交给mapState对象写法下的箭头函数的入参
    ...mapState({
      sum: (state) => state.count.counter.sum,
      school: (state) => state.count.counter.school,
      subject: (state) => state.count.counter.subject,
    }),
    // 数组写法，原理和vue-cli版本一样，只不过命名空间的解析从Vuex.Store的modules搬家到了这里的mapkey
    //...mapState("count/counter", ["sum", "school", "subject"]),

    ...mapGetters("count/counter", ["bigSum"]),
  },
  methods: {
    ...mapMutations("count/counter", { increment: "JIA", decrement: "JIAN" }),

    ...mapActions("count/counter", {
      incrementOdd: "jiaOdd",
      incrementWait: "jiaWait",
    }),
  },
  mounted() {
    const x = mapState("count/counter", {
      he: "sum",
      xuexiao: "school",
      xueke: "subject",
    });
    console.log(x);
  },
};
</script>

<style lang="css">
button {
  margin-left: 5px;
}
</style>
