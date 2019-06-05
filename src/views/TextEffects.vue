<template>
<div class="about">
<h1>CSS Text Effects</h1>
<p id="textToTransform">Malakaya</p>
<button @click="gettext">Get Text</button>
</div>
</template>

<script>
import Color from "color";

export default {
  name: "home",

  data() {
    return {
      oldInnerText: '',
      currentLetter: '',
      newHTML: ''
    };
  }, 
  methods: {
    gettext() {
      this.oldInnerText = document.querySelector('#textToTransform').textContent
      console.log(`text content: ${this.oldInnerText}`)
    }
  }
};
</script>

<style lang="scss" scoped>
h1 {
  color: black;
}
</style>
