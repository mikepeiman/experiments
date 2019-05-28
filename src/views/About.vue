<template>
<div class="about">
  <h1>This is an about page test</h1>
    <form class="radial-lines-settings-form">
    <input type="text" id="numLines" v-on:keyup.enter="submitProps">Number of lines
    <input type="text" id="startColor" v-on:keyup.enter="submitProps">Starting Color (hex)
    <button class="button" @click="submitProps">Apply</button>
  </form>
  <RadialLines :numLines="numLines" :startColor="startColor" :renderSvg="renderSvg" />
</div>
</template>

<script>
// @ is an alias to /src
import RadialLines from "@/components/RadialLines.vue";

export default {
  name: "home",
  components: {
    RadialLines
  },
  data() {
    return {
      numLines: '',
      startColor: '',
      renderSvg: false
    }
  },
  methods: {
    submitProps() {
      console.log('props submitted, renderSvg: ', this.renderSvg, this.numLines, this.startColor)
      this.startColor = document.querySelector('#startColor').value
      this.numLines = document.querySelector('#numLines').value
      this.renderSvg = !this.renderSvg
    }
  }
};
</script>