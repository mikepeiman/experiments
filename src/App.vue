<template>
<div id="app">
  <div id="nav">
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link> |
    <router-link to="/blog">Blog</router-link> |
    <router-link to="/experiments">Experiments</router-link>
  </div>
  <div class="wrapper">
    <div class="content">
      <router-view />
    </div>

    <div class="left"></div>
    <div class="right"></div>
  </div>
</div>
</template>

<style lang="scss">
body {

  height: 100vh;
  margin: 0;
  padding: 0;
  background: rgba(10, 30, 20, 0.2);
}

#app {

  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  // grid-column: content;
  // grid-row: main;
  background: rgba(255, 200, 255, 0.5);

}

.wrapper {
  display: grid;
  grid-template-columns: [left] 1fr [content] 10fr [right] 1fr;
  grid-template-rows: [nav] 100px [main] auto;
  grid-column-gap: 10px;
}
.content {
  grid-column: content;
}
#nav {
  grid-row: nav;
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}

.left {
  grid-column: left;
  background: rgba(255, 0, 0, 0.5);
  width: 50px;
}

.right {
  grid-column: right;
  background: rgba(0, 0, 255, 0.5);
  width: 50px;
}
</style>
