export default ({ app }) => {
  app.router.beforeEach((to, from, next) => {
    console.log("前置全局路由守卫", to, from);
    if (to.name === null) {
      next("/error");
    }
    next();
  });

  app.router.afterEach((to, from) => {
    console.log("后置全局路由守卫", to, from);
  });
};
