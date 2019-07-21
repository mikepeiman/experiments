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
      `
      }
    }
  }
};