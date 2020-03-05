module.exports = {
  pages: {
    index: {
      entry: "src/main.js",
      template: "public/index.html",
      filename: "index.html",
      title: "泉州五中女生节",
      chunks: ["chunk-vendors", "chunk-common", "index"]
    }
  },
  css: {
    loaderOptions: {
      less: {
        modifyVars: {
          "@pink": "#f77984",
          "@canary": "#fcf4e7",
          "button-primary-background-color": "@pink",
          "button-primary-border-color": "@pink",
          "button-border-radius": "@border-radius-md",
          "pagination-item-default-color": "@pink",
          "tabs-nav-background-color": "@canary",
          "tabs-default-color": "@pink",
          "radio-checked-icon-color": "@pink",
          "nav-bar-icon-color": "@pink"
        }
      }
    }
  }
};
