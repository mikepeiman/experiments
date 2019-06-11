<template>
<div class="experiments">
  <h1>Experiments, Learning Projects and Fun Stuff</h1>
  <div class="nav-container">
    <nav class="experiments-nav">
      <router-link to="/experiments/radialSVG">Radial SVG Generator</router-link>
      <router-link to="/experiments/text-effects">CSS Text Effects</router-link>
    </nav>
  </div>
</div>
</template>

<script>
import Color from "color";

export default {
  name: "experiments",

  data() {
    return {};
  },
};
</script>

<style lang="scss" scoped>
h1 {
  color: black;
}
.nav-container {
  display: grid;
  grid-template-columns: 40% 1fr 40%;
  grid-template-areas: empty content empty;
  background: rgba(0,0,0,0.25);
}
.experiments-nav {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  text-align: left;
  grid-column: 2/3;
}

a {
  text-decoration: none;
  color: #00ccff;
    padding: 1em;
  background: rgba(255,255,255,0.25);
  border-bottom: 1px solid #00ccff;
  border-left: 3px solid #00ccff;

  &:hover {
    color: #00aacc;
    background: rgba(255,255,255,0.5);
  }

  &:visited {
    color: #00aacc;
  }
}
</style>
