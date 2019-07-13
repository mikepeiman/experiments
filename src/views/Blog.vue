<template>
<div class="about">
<h1 class="title clear">Blog!</h1>
<h2 class="subtitle clear">Subtitle</h2>
<p class="article clear">Some text</p>
</div>
</template>

<script>
import Color from "color";

export default {
  name: "about",

  data() {
    return {
    };
  }, 
};
</script>

<style lang="scss" scoped>

.about {
  display: grid;
  grid-template-rows: [title] minmax(2em, 1fr) [subtitle] minmax(2em, 1fr) [article] minmax(2em, auto);
}

.clear {
  margin: 1rem 0;
  padding: 1rem 0;
  place-self: stretch;
}

.title {
  grid-row: title;
  background: rgba(0,0,255,0.5);
}
.subtitle {
  grid-row: subtitle;
  background: rgba(0,255,0,0.5);
}
.article {
  grid-row: article;
  background: rgba(255,0,0,0.5);
  min-height: 100px;
  max-height: 100%;
}

</style>  
