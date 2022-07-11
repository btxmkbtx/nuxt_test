<template>
  <div>
    <div class="row">
      <div class="col-xs-2 col-xs-offset-2">
        <div class="list-group">
          <!-- Vue中借助router-link标签实现路由的切换 -->
          <!-- Nuxt中借助nuxt-link标签实现路由的切换 -->
          <nuxt-link class="list-group-item" active-class="active" to="/about"
            >About</nuxt-link
          >
          <nuxt-link class="list-group-item" active-class="active" to="/home"
            >Home</nuxt-link
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "IndexPage",
};
</script>
