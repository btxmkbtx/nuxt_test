/*对比Vue-cli的代码会发现Nuxt的store文件不需要程序员自己手动创建并暴露store。
export default new Vuex.Store({
	actions,
	mutations,
	state
})
*/
export const state = () => ({
  token: "",
});

export const mutations = {
  setToken(state, token) {
    state.token = token;
  },
};

export const actions = {
  nuxtServerInit(store, context) {
    console.log(store, "nuxtServerInit store");
    store.commit("setToken", "token_info_369");
  },
};
