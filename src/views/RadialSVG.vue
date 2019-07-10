<template>
  <div class="about">
    <div class="experiment">
      <form class="radial-lines-settings-form heading">
        <div class="heading">
          <h1>Radial SVG Line Generator</h1>
          <p>By Mike Peiman</p>
        </div>
        <figure class="line-size-group">
          <label for="numLines">
            <input
              type="number"
              id="numLines"
              placeholder="6"
              value="6"
              v-on:keyup.enter="submitProps"
            />Number of lines
          </label>
          <label for="startColor">
            <input
              type="color"
              value="#00aaff"
              id="startColor"
              v-model="startColor"
              v-on:keyup.enter="submitProps"
            />Starting Color (hex)
          </label>
          <label for="radiusStart">
            <input
              type="number"
              id="radiusStart"
              placeholder="50"
              value="50"
              v-on:keyup.enter="submitProps"
            />Starting Radius
          </label>
          <label for="lineLength">
            <input
              type="number"
              id="lineLength"
              placeholder="100"
              value="100"
              v-on:keyup.enter="submitProps"
            />Line Length
          </label>
          <label for="strokeWidth">
            <input
              type="number"
              id="strokeWidth"
              placeholder="15"
              value="15"
              v-on:keyup.enter="submitProps"
            />Line Width
          </label>
        </figure>

        <figure class="hsla-group">
          <label for="hue">
            <input
              type="number"
              id="hue"
              placeholder="40"
              value="40"
              v-on:keyup.enter="submitProps"
            />Modify Hue
          </label>
          <label for="saturation">
            <input
              type="number"
              id="saturation"
              placeholder="100"
              value="100"
              v-on:keyup.enter="submitProps"
            />Modify Saturation
          </label>
          <label for="lightness">
            <input
              type="number"
              id="lightness"
              placeholder="50"
              value="50"
              v-on:keyup.enter="submitProps"
            />Modify Lightness
          </label>
          <label for="alpha">
            <input
              type="number"
              id="alpha"
              placeholder="1"
              value="1"
              v-on:keyup.enter="submitProps"
            />Modify Opacity
          </label>
        </figure>

        <button class="button" :style="`background: ${startColor}`" @click="submitProps">Apply</button>
      </form>
      <RadialLines
        :numLines="numLines"
        :startColor="startColor"
        :radiusStart="radiusStart"
        :lineLength="lineLength"
        :strokeWidth="strokeWidth"
        :H="H"
        :S="S"
        :L="L"
        :A="A"
        :renderSvg="renderSvg"
      />
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import RadialLines from "@/components/RadialLines.vue";
import Color from "color";

export default {
  name: "radialSvg",
  components: {
    RadialLines
  },
  data() {
    return {
      numLines: 6,
      startColor: "#00aaff",
      radiusStart: 50,
      lineLength: 100,
      strokeWidth: 15,
      H: 40,
      S: 100,
      L: 50,
      A: 1,
      renderSvg: false
    };
  },
  methods: {
    submitProps() {
      let startColor = document.querySelector("#startColor").value;
      let numLines = parseInt(document.querySelector("#numLines").value);
      let radiusStart = parseInt(document.querySelector("#radiusStart").value);
      let lineLength = parseInt(document.querySelector("#lineLength").value);
      let strokeWidth = parseInt(document.querySelector("#strokeWidth").value);
      let H = parseInt(document.querySelector("#hue").value);
      let S = parseInt(document.querySelector("#saturation").value);
      let L = parseInt(document.querySelector("#lightness").value);
      let A = parseInt(document.querySelector("#alpha").value);
      this.H = H; //? H : 0;
      this.S = S; //? S : 0;
      this.L = L; //? L : 0;
      this.A = A; //? A : 0;
      this.startColor = startColor; //? startColor : "#00aaff";
      this.numLines = numLines; //? numLines : 5;
      this.radiusStart = radiusStart; //? radiusStart : 50;
      this.lineLength = lineLength; //? lineLength : 100;
      this.strokeWidth = strokeWidth;
      this.renderSvg = !this.renderSvg;
      console.log("submitProps() values:");
      console.log(this.H);
      console.log(this.S);
      console.log(this.L);
      console.log(this.A);
      console.log(this.startColor);
      console.log(this.numLines);
      console.log(this.lineLength);
      console.log(this.radiusStart);
    }
  }
};
</script>

<style lang="scss" scoped>
.heading {
  // background: rgba(0, 0, 0, 0.75);
  padding: 1em;
  justify-content: center;
  color: white;
}

.experiment {
  display: flex;
}

.button {
  padding: 1em;
  background: #00aaff;
  border: 1px solid rgba(0, 0, 0, 0.25);
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.2);
  margin: 1em 0 0 0;
  transition: all 0.25s;

  &:hover {
    background: lighten(#00aaff, 15%);
    box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.5);
  }
}

.hsla-group,
.line-size-group {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  // flex-direction: column;
  // justify-content: space-around;
  margin: 1em 0 0 0;
  font-size: 0.75em;
  // background: rgba(0, 0, 0, 0.25);
  padding: 0.5em;

  & input {
    display: flex;
    flex-direction: column;
    width: 7ch;
    text-align: left;
  }

  & label {
    text-align: left;
  }
}

form {
  background: rgba(0, 0, 0, 0.45);
}

input {
  border: none;
  padding: 4px;
  border-radius: 2px;
  background: rgba(black, 0.45);
  color: white;
  margin-bottom: 0.25rem;
}
</style>
