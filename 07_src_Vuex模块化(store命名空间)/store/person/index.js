import axios from "axios";

export const state = () => ({
  personList: [{ id: "001", name: "张三" }],
});

export const mutations = {
  ADD_PERSON(state, value) {
    console.log("mutations中的ADD_PERSON被调用了");
    state.personList.unshift(value);
  },
};

export const actions = {
  addPersonWang(context, value) {
    if (value.name.indexOf("王") === 0) {
      context.commit("ADD_PERSON", value);
    } else {
      alert("添加的人必须姓王！");
    }
  },
  addPersonServer(context) {
    let tab = "all",
      page = 1,
      limit = 20,
      mdrender = true;
    axios
      .get(
        `https://cnodejs.org/api/v1/topics?tab=${tab}&page=${page}&limit=${limit}&mdrender=${mdrender}`
      )
      .then(
        (response) => {
          context.commit("ADD_PERSON", {
            id: context.state.personList.length,
            name: response.data.data[0].title,
          });
        },
        (error) => {
          alert(error.message);
        }
      );
  },
};

export const getters = {
  firstPersonName(state) {
    return state.personList[0].name;
  },
};
