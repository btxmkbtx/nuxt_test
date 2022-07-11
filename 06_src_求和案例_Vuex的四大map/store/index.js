/*对比Vue-cli的代码会发现Nuxt的store文件不需要程序员自己手动创建并暴露store。
export default new Vuex.Store({
	actions,
	mutations,
	state
})
*/
export const state = () => ({
  sum: 0, //当前的和
  school: "尚硅谷",
  subject: "前端",
});

export const mutations = {
  JIA(state, value) {
    console.log("mutations中的JIA被调用了");
    state.sum += value;
  },
  JIAN(state, value) {
    console.log("mutations中的JIAN被调用了");
    state.sum -= value;
  },
};

export const actions = {
  jiaOdd(context, value) {
    console.log("actions中的jiaOdd被调用了");
    if (context.state.sum % 2) {
      context.commit("JIA", value);
    }
  },
  jiaWait(context, value) {
    console.log("actions中的jiaWait被调用了");
    setTimeout(() => {
      context.commit("JIA", value);
    }, 500);
  },
};

export const getters = {
  bigSum(state) {
    return state.sum * 10;
  },
};
