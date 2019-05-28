<template>
  <div class="about">
    <h1>This is an about page test</h1>
    <form class="radial-lines-settings-form">
      <input type="number" id="numLines" placeholder="10" v-on:keyup.enter="submitProps">Number of lines
      <input
        type="color"
        value="#2468ff"
        id="startColor"
        v-on:keyup.enter="submitProps"
      >Starting Color (hex)
      <figure class="hsla-group">
        <label for="hue">
          <input type="number" id="hue" v-on:keyup.enter="submitProps">Modify Hue
        </label>
        <label for="saturation">
          <input type="number" id="saturation" v-on:keyup.enter="submitProps">Modify Saturation
        </label>
        <label for="lightness">
          <input type="number" id="lightness" v-on:keyup.enter="submitProps">Modify Lightness
        </label>
        <label for="alpha">
          <input type="number" id="alpha" v-on:keyup.enter="submitProps">Modify Opacity
        </label>
      </figure>
            <figure class="line-size-group">
        <label for="radiusStart">
          <input type="number" id="radiusStart" v-on:keyup.enter="submitProps">Starting Radius
        </label>
        <label for="lineLength">
          <input type="number" id="lineLength" v-on:keyup.enter="submitProps">Line Length
        </label>
      </figure>
      <button class="button" @click="submitProps">Apply</button>
    </form>
    <RadialLines
      :numLines="numLines"
      :startColor="startColor"
      :radiusStart="radiusStart"
      :lineLength="lineLength"
      :H="H"
      :S="S"
      :L="L"
      :A="A"
      :renderSvg="renderSvg"
    />
  </div>
</template>

<script>
// @ is an alias to /src
import RadialLines from "@/components/RadialLines.vue";
import Color from 'color';

export default {
  name: "home",
  components: {
    RadialLines
  },
  data() {
    return {
      numLines: 5,
      startColor: "#00aaff",
      radiusStart: 100,
      lineLength: 100,
      H: 0,
      S: 0,
      L: 0,
      A: 0,
      renderSvg: false
    };
  },
  methods: {
    submitProps() {
      let startColor = parseInt(document.querySelector("#startColor").value);
      let numLines = parseInt(document.querySelector("#numLines").value);
      let radiusStart = parseInt(document.querySelector("#radiusStart").value);
      let lineLength = parseInt(document.querySelector("#lineLength").value);
      let H = parseInt(document.querySelector("#hue").value);
      let S = parseInt(document.querySelector("#saturation").value);
      let L = parseInt(document.querySelector("#lightness").value);
      let A = parseInt(document.querySelector("#alpha").value);
      this.H = H ? H : 0
      this.S = S ? S : 0
      this.L = L ? L : 0
      this.A = A ? A : 0
      this.startColor = startColor ? startColor : "#00aaff"
      this.numLines = numLines ? numLines : 5
      this.radiusStart = radiusStart ? radiusStart : 50
      this.lineLength = lineLength ? lineLength : 100
      this.renderSvg = !this.renderSvg;
      console.log('submitProps() values:')
      console.log(this.H)
      console.log(this.S)
      console.log(this.L)
      console.log(this.A)
      console.log(this.startColor)
      console.log(this.numLines)
      console.log(this.lineLength)
      console.log(this.radiusStart)
      
    }
  }
};
</script>

<style lang="scss" scoped>
.hsla-group, .line-size-group {
  display: flex;
  justify-content: space-around;
  margin: 1em 0 0 0;
  background: rgba(0, 0, 0, 0.25);
  padding: 0.5em;

  & input {
    display: flex;
    flex-direction: column;
    width: 5ch;
  }
}
</style>
