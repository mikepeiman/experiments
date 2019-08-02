module.exports = {
  devServer: {
    proxy: "http://localhost:8080/"
  },
  css: {
    loaderOptions: {
      sass: {
        data: `
        @import "@/styles/_backgrounds.scss";
        @import "@/styles/_colors.scss";
        @import "@/styles/_typography.scss";
      `
      }
    }
  },
  chainWebpack: (config) => {
    const svgRule = config.module.rule('svg');

    svgRule.uses.clear();

    svgRule
      .use('vue-svg-loader')
      .loader('vue-svg-loader');
  },
};