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
  background: #333;
  background-image:url('./assets/leather-nunchuck.png');
  color: #aaccee;
}

#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  height: 100vh;
  width: 100vw;
  color: #aaccee;
  // background: rgba(100, 200, 255, 0.5);
  display: grid;
  grid-template-rows: [nav] 80px [main] calc(100vh - 80px);
  // background-image: linear-gradient(rgb(0, 0, 0), rgb(243, 243, 243));
  // background-image: linear-gradient(rgba(0, 0, 0, .85), rgba(243, 243, 243, .5));
  position: fixed;
  background-size: 100%;
  background-position: fixed;
  background-repeat: repeat;
  overflow: auto;
}

.wrapper {
  display: grid;
  // grid-row: main;
  grid-template-columns: [left] 1fr [content] 10fr [right] 1fr;
  grid-template-rows: auto;
  grid-column-gap: 10px;
}

.content {
  grid-column: content;
  grid-row-start: 1;
  color: #eeefff;
  // grid-row: main;
  // background: rgba(0, 200, 0, 0.5);
}

#nav {
  // grid-column: content;
  grid-row: nav;
  padding: 30px;
  color: white;
  a {
    color: white;
    text-decoration: none;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}

.left {
  grid-column: left;
  // grid-row: main;
  // background: rgba(255, 0, 0, 0.5);
}

.right {
  grid-column: right;
  // grid-row: main;
  // background: rgba(0, 0, 255, 0.5);
}
</style>
