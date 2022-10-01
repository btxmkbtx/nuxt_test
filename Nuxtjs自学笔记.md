# 官网

英文  

https://nuxtjs.org/docs/get-started/installation

中文

https://www.nuxtjs.cn/guide/installation

# 安装

 yarn安装 ：

```bash
$ yarn create nuxt-app <项目名>
```

  To get started:

        yarn dev

  To build & start for production:

        yarn build
        yarn start

或者用 npx安装（npx 在 NPM 版本 5.2.0 默认安装了）：

```bash
$ npx create-nuxt-app <项目名>
```

  To get started:

        npm run dev

  To build & start for production:

        npm run build
        npm run start

# 目录结构

## pages

页面文件目录，类似于vue-cli的views目录

## components

组件文件目录，与vue-cli的components目录相同

## static

用于存放应用的静态文件，此类文件不会被 Nuxt.js 调用 Webpack 进行构建编译处理。

服务器启动的时候，该目录下的文件会映射至应用的根路径 `/` 下。

**举个例子:** `/static/robots.txt` 映射至 `/robots.txt`

## store

用于组织应用的 [Vuex 状态树](http://vuex.vuejs.org/) 文件。 Nuxt.js 框架集成了 [Vuex 状态树](http://vuex.vuejs.org/) 的相关功能配置，

在 `store` 目录下创建一个 `index.js` 文件可激活这些配置。

## layouts

布局目录 `layouts` 用于组织应用的布局组件。通过<nuxt/>标签引入pages下的页面组件。

## middleware

`middleware` 目录用于存放实现路由拦截器的js文件。扮演的校色类似于路由守卫。

## plugins

插件目录 `plugins` 用于组织那些需要在 `根vue.js应用` 实例化之前需要运行的 Javascript 插件。

**导入插件的概念，相当于在vue-cli项目下的main.js文件中使用Vue.use(对应的插件)**

也可以实现全局路由守卫。

## nuxt.config.js 

`nuxt.config.js` 文件用于组织 Nuxt.js 应用的个性化配置，以便覆盖默认配置。

因为nuxt的结构中没有main.js，所以设置了这个nuxt.config.js 文件，用于做各种各样的配置。

# 生命周期

## 官方导图

https://nuxtjs.org/docs/concepts/nuxt-lifecycle

## Nuxt生命周期结构

Nuxt的生命周期分为服务端和客户端两部分，服务端的生命周期走完了才会进入客户端的生命周期。

**服务端生命周期**跟页面没有关系，任何一个页面加载前都会运行服务端生命周期。

## 服务端生命周期

### 服务端初始化（nuxtServerInit）

nuxtServerInit(store, context){}

参数store：vuex上下文

参数context：nuxt上下文

启用条件：创建了Vuex的store，并在actions中实装了该钩子函数

影响范围：全局；所有页面组件渲染前都会执行

举例:store/index.js

```js
export const state = {
  token: "",//项目启动进入localhost画面后
};

export const mutations = {
  setToken(state, token) {
    state.token = token;
  },
};

export const actions = {
  nuxtServerInit(store, context) {
    store.commit("setToken", "token_info_369");
    console.log(store, "nuxtServerInit store");
  },
};
```

为什么要在store(状态树)中实现服务端初始化呢?

代开「.nuxt/server.js」文件可以清楚的看到下面这段代码，nuxtServerInit这个钩子就是通过store的action来调用的。

```js
  /*
  ** Dispatch store nuxtServerInit
  */
  if (store._actions && store._actions.nuxtServerInit) {
    try {
      await store.dispatch('nuxtServerInit', app.context)
    } catch (err) {
      console.debug('Error occurred when calling nuxtServerInit: ', err.message)
      throw err
    }
  }
```

### 路由拦截器（middleware）

#### 路由拦截器类型

Route Middleware（路由拦截器）的类型一共有三种，与vue-cli的路由守卫相似。

1. 全局路由拦截器(Global)

   影响范围是全局的，所有页面组件渲染前都会执行，执行顺序在nuxtServerInit之后。

   配置在nuxt.config.js中。执行函数在middleware文件夹下的js文件中。

   例如

   ```js
   export default {
     ...,
     router: {
       middleware: "auth", //这个名称要与middleware文件夹下的文件名一致，这里对应的文件名为auth.js
     },
   };
   ```
   
2. Layout路由

   本质上就是通过全局路由，给当前上下文添加一些自定义属性，然后把这些属性传递给layout

   页面中的layout既可以设置成layout文件名，也可以设置成一个箭头函数，箭头函数的参数就是当前上下文。

   例：

   middleware：

   ```js
   export default function (ctx) {
     ctx.layoutName = "blog";
   }
   ```

   page：

   ```vue
   <template>
     <div>首页</div>
   </template>
   
   <script>
   export default {
     name: "App",
     layout: (ctx) => {
       console.log("当前上下文中指定的布局为：", ctx.layoutName);
       return ctx.layoutName ? ctx.layoutName : "default";
     }, //页面中的layout既可以设置成layout文件名，也可以设置成一个箭头函数，箭头函数的参数就是当前上下文。
   };
   </script>
   ```

3. 局部路由拦截器(Page Component)

   类似于vue-cli的独享守卫，只在配置所在页面组件渲染前执行。

   ```vue
   <template>
     <div>IndexPage</div>
   </template>
   
   <script>
   export default {
     name: "IndexPage",
     middleware: "pageAuth", //页面路由中间件写法一，middleware文件夹下新建pageAuth.js
     //middleware(){console.log("写法二：Page component route middleware auth");} //写法二不需要单独建立js文件
   };
   </script>
   ```

#### 拦截器参数

query：路由跳转显式参数

params：路由跳转隐式参数

```vue
<template>
  <div>IndexPage</div>
</template>

<script>
export default {
  name: "IndexPage",
  middleware({store,route,redirect,params,query,req,res}){} 
};
</script>
```

### 参数校验（validate）

validate({params, query}){ }

只配置并作用在页面组件中，用于校验路由参数

参数query：路由跳转显式参数

参数params：路由跳转隐式参数

返回值：返回True才能正常跳转。返回False跳转到框架内部的404页面

```vue
<template>
  <div>IndexPage</div>
</template>

<script>
export default {
  name: "IndexPage",
  validate({ params, query }) {
    console.log("validate参数:", query);
    if (query.id === "0") {
      return false;//404
    }
    return true;//正常跳转
  },
};
</script>
```

### ★异步请求（asyncData）

这个钩子非常重要，**限于页面组件**，components下的组件无法使用它，页面组件每次加载之前被调用。

它可以在服务端或路由更新之前被调用。在这个方法被调用的时候，第一个参数被设定为当前页面的**上下文对象**，

通常会在这个钩子中请求ajax数据。

**注意**：由于`asyncData`方法是在组件 **初始化** 前被调用的，所以在方法内是没有办法通过 `this` 来引用组件的实例对象。

这个钩子中的**this**指向**undefined**。

**既然this不能使用，那么返回值如何传出？**

使用return对象的方式，nuxt会帮我们自动的通过属性名做值的映射，例如↓

```js
export default {
  data() {
    return { project: 'default' }
  },
  asyncData(context) {
    // project的值自动被反映到data中的project中
    return { project: 'nuxt' }
  }
}
```

### ★异步请求（fetch）

fetch 方法用于在渲染页面前填充应用的状态树（store）数据， 与 asyncData 方法类似，

不同的是它不会设置组件的数据，它设置的是状态树（store）数据。

**警告**: 您无法在内部使用`this`获取**组件实例**，`fetch`是在**组件初始化之前**被调用

例如 `pages/index.vue`：

```vue
<template>
  <h1>Stars: {{ $store.state.stars }}</h1>
</template>

<script>
  export default {
    async fetch({ store, params }) {
      let { data } = await axios.get('http://my-api/stars')
      store.commit('setStars', data)
    }
  }
</script>
```

**Vuex**

如果要在`fetch`中调用并操作`store`，请使用`store.dispatch`，但是要确保在内部使用`async / await`等待操作结束：

```vue
<script>
  export default {
    async fetch({ store, params }) {
      await store.dispatch('GET_STARS')
    }
  }
</script>
```

store/index.js

```js
// ...
export const actions = {
  async GET_STARS({ commit }) {
    const { data } = await axios.get('http://my-api/stars')
    commit('SET_STARS', data)
  }
}
```

## 服务端与客户端共有的生命周期

- beforeCreate
- created

## 客户端生命周期

这部分就跟Vue的生命周期一样了

- beforeMount
- mounted
- beforeUpdate
- updated
- beforeDestroy
- destroyed

# 路由

## 区别于Vue的路由

Vue的路由实在router目录下的index.js手写的。

Nuxt的路由是根据pages目录下的文件结构自动生成的，生成在.nuxt/router.js文件中。

## 路由守卫实现

### 方式一：Middleware

利用nuxtjs自身的Route Middleware（路由拦截器）

与Vue-cli的守卫概念类似，Middleware的也可以分为**全局**与**局部**

1. 全局守卫

   影响范围是全局的，所有页面组件渲染前都会执行，执行顺序在nuxtServerInit之后。

   配置在nuxt.config.js中。执行函数在middleware文件夹下的js文件中。

   例如

   ```js
   export default {
     ...,
     router: {
       middleware: "auth", //这个名称要与middleware文件夹下的文件名一致，这里对应的文件名为auth.js
     },
   };
   
   ```

2. 局部守卫

   类似于vue-cli的独享守卫，只在配置所在页面组件渲染前执行。

   ```vue
   <template>
     <div>IndexPage</div>
   </template>
   
   <script>
   export default {
     name: "IndexPage",
     middleware: "pageAuth", //页面路由中间件写法一，middleware文件夹下新建pageAuth.js
     //middleware(){console.log("写法二：Page component route middleware auth");} //写法二不需要单独建立js文件
   };
   </script>
   ```

### 方式二：plugins

既然看到需要配置nuxt.config.js，就知道这个方式配置的路由守卫是全局的

nuxt.config.js中追加插件配置

```js
export default {
....

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: ["~/plugins/route.js"],
    
....
};
```

plugins文件夹下添加相应的route.js文件

```js
export default ({ app }) => {
  app.router.beforeEach((to, from, next) => {
    console.log("前置路由守卫", to, from);
    //业务逻辑
  });
};
```

### 方式三（不推荐）

导入模块@nuxtjs/router，该模块帮助我们用自定义的「router/index.js」覆盖掉nuxt自动生成的router.js文件。

之后就可以原封不动的利用vue-cli的路由守卫技术啦。

## 页面跳转

方式一（不推荐）：a标签，因为会刷新页面所以不推荐

```vue
<a href="/页面组件名">a链接形式</a>
```

方式二：nuxt-link标签

```vue
<nuxt-link to="/页面组件名">nuxt-link形式</nuxt-link>
```

方式三：js跳转，也就是vue的編程式路由

```vue
<template>
  <div>
    <button @click="btxGotoList">js跳转</button>
  </div>
</template>

<script>
export default {
  name: "IndexPage",
  methods: {
    btxGotoList() {
      this.$router.push("/list");
    },
  },
};
</script>
```

# nuxt.config.js 配置

## 自定义src根目录

```js
export default {
  srcDir: 'src'
}
```

代码结构预期效果

```
-| app/
---| node_modules/
---| nuxt.config.js
---| package.json
---| src/
------| assets/
------| components/
------| layouts/
------| middleware/
------| pages/
------| plugins/
------| static/
------| store/
```

## head配置

全局的头部信息配置，优先级**低于**页面组件内部的头部信息配置

```js
export default {
  head: {
    title: '标题',
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
        content:
          "网站描述",
      },
      {
        hid: "keywords",
        name: "keywords",
        content:
          "关键字",
      },
    ],
  }
}
```

## CSS配置

### 引入静态css文件

```js
export default {
  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ["~/static/reset.css"],
}
```

### scoped样式

一般情况下，scoped是一定会写的，因为担心式样冲突

1. 作用：让样式在局部生效，防止冲突。
2. 写法：```<style scoped>```

### Sass

```bash
yarn add --dev sass sass-loader@10
```

## plugins

### 引入第三方js库

以element-ui的引入爲例。

首先去插件对应的官网，查找安装方法

比如安装element-ui：https://element.eleme.io/#/en-US/component/installation

```bash
yarn add element-ui
```

然后在plugins文件夹下建立用于全局导入和使用插件的js文件，相当于vue-cli中main.js文件的作用

```js
import Vue from "vue";
import ElementUI from "element-ui";
Vue.use(ElementUI);
```

最后记得在配置文件中添加上面建立的pluginsjs文件

```js
export default {
  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  // 建立完插件文件后记得在这里导入插件文件
  plugins: ["~/plugins/element.js"],
}
```

### Nuxt中插件机制

參考資料↓

https://blog.csdn.net/weixin_44356673/article/details/107467614

## components

设置为true，自动查找组件，无需程序员在页面组件中手动import注册组件。

## modules

拓展核心功能，添加无限的集成。最常见到的就是集成axios。

### axios 安装与使用

#### 安装方式一（推荐）

```bash
yarn add @nuxtjs/axios
```

#### 安装方式二

```bash
yarn add axios
```

#### 两种安装方式比较

方式二是vue-cli的使用方式，在nuxt体系中也可以正常使用，但是需要在组件中手动导入，举例如下：

```vue
<script>
import axios from "axios"
export default {
  name: "IndexPage",
};
</script>
```

而方式一则可以在生命周期的异步数据钩子的上下文中直接拿到$axios

```vue
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
```

# Nuxt全局事件总线（inject）

vue-cli中通过向Vue原型挂载全局事件总线，来做任意组件间的通信。

nuxt的inject注入做的事情时一样的，只是代码实现不一样而已。

在插件的定义函数中，默认会传入一个方法类型的参数：inject

示例代码：plugins/hello.js

```js
export default ({ app }, inject) => {
  // 这样就把一个箭头函数，以属性$hello的形式注入到VM实例对象中了
  inject("hello", (msg) => console.log(`Hello ${msg}!`));
};
```

完成全局注入后，在所有可以拿到Vue实例对象的地方都可以调用被注入的方法。

如状态树中的this：store/index.js

```js
export const mutations = {
  changeHelloValue(state, newValue) {
    this.$hello(newValue);
  },
};
```

再比如生命周期的异步数据

```vue
<script>
export default {
  async asyncData(ctx) {
    //console.log("ctx", ctx);
    //全局上下文和app实例对象上都被挂在了注入的对象。
    ctx.$hello("这里是生命周期asyncData")
    ....
  },
};
</script>
```

# 状态树Vuex

## 与vue-cli的比较

对比Vue-cli的代码会发现，Nuxt的store文件不需要程序员通过Vuex.Store自己手动创建并暴露store。

只需要把把编写的actions，mutations，state，getters分别暴露出去，Nuxt框架会自动帮我们调用Vuex.Store来处理。

以尚硅谷Vue2.0中的求和案例为例，store/index.js示例代码如下

```js
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
```

## Vuex模块化编码

nuxt会直接根据store文件夹下的相对路径文件名来做模块化处理。

在vuex的四大map中使用时，命名空间规则如下

```vue
  computed: {
    ...mapState("count/counter", ["sum", "school", "subject"]),

    ...mapGetters("count/counter", ["bigSum"]),
  },
  methods: {
    ...mapMutations("count/counter", { increment: "JIA", decrement: "JIAN" }),

    ...mapActions("count/counter", {
      incrementOdd: "jiaOdd",
      incrementWait: "jiaWait",
    }),
  },
```

store文件夹下结构如下

```
-| store/
---| count/
------| counter.js
---| person/
------| index.js
```

# layouts

## 加载原来

nuxt框架会首先加载layout，在根据页面组件的layout属性，将页面组件加载到对应的layout中。

layout属性的默认值是default。

如果既不给页面指定layout，layouts文件夹下也没有default.vue模板，那么加载时就会视为没有布局，直接加载页面。

## 默认布局

pages与layouts文件夹下结构如下

```
-| src/
---| layouts/
------| default.vue
---| pages/
------| index.vue
```

default.vue

<nuxt />标签会自动去pages下找index文件进行加载，并替换掉自己。

```vue
<template>
  <div>
    <h1>默认布局</h1>
    <nuxt />
  </div>
</template>
```

index.vue

```vue
<template>
  <div>首页</div>
</template>

<script>
export default {
  name: "App",
};
</script>
```

## 自定义布局

pages与layouts文件夹下结构如下

```
-| src/
---| layouts/
------| blog.vue
---| pages/
------| post.vue
```

blog.vue

文件名会自动变成布局的key，被nuxt框架识别

```vue
<template>
  <div>
    <div>My blog navigation bar here</div>
    <Nuxt />
  </div>
</template>
```

post.vue

指定页面组件的layout属性，值为想要指定的layout文件名，nuxt会自动根据layout属性值将该页面组件导入到对应的layout中。

```vue
<template>
  <div>Your template</div>
</template>

<script>
export default {
  layout: "blog",//通过文件名来映射指定的布局文件
  // page component definitions
};
</script>
```

# directives

实现vue-cli中的自定义指令示例代码效果，fbind

1，定义自定义指令

src\directives\fbind.js

```vue
<template>
  <div>Your template</div>
</template>

<script>
export default {
  layout: "blog",//通过文件名来映射指定的布局文件
  // page component definitions
};
</script>
```

2，手动导入自定义指令

3，在组件的对象定义中加入directives

src\pages\index.vue

```vue
<template>
  <div>
    <h2>学生姓名：{{ name }}</h2>
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
    };
  },
  // Nuxt框架会自动找到directives属性，并在后台帮我们调用Vue.directive
  directives: {
    fbind,
  },
};
</script>

```

# $nuxt

nuxt脚手架项目启动后，会向window上挂在一个Vue实例对象：$nuxt

debug打印window会看到挂载着的$nuxt是一个Vue实例对象

1. *Window {window: Window, self: Window, document: document, name: '', location: Location, …}*

2. 1. **0**: global {window: global, self: global, location: {…}, closed: false, frames: global, …}
   2. **$nuxt**: Vue

##