<template>
  <div class="about">
    <h1>This is an about page test</h1>
    <form class="radial-lines-settings-form">
      <input type="text" id="numLines" v-on:keyup.enter="submitProps">Number of lines
      <input
        type="color"
        value="#2468ff"
        id="startColor"
        v-on:keyup.enter="submitProps"
      >Starting Color (hex)
      <input-group class="input-group">
        <label for="xH">
          <input type="number" id="xH" v-on:keyup.enter="submitProps">Modify Hue
        </label>
        <label for="xS">
          <input type="number" id="xS" v-on:keyup.enter="submitProps">Modify Saturation
        </label>
        <label for="xL">
          <input type="number" id="xL" v-on:keyup.enter="submitProps">Modify Lightness
        </label>
        <label for="xA">
          <input type="number" id="xA" v-on:keyup.enter="submitProps">Modify Opacity
        </label>
      </input-group>
      <button class="button" @click="submitProps">Apply</button>
    </form>
    <RadialLines
      :numLines="numLines"
      :startColor="startColor"
      :xH="xH"
      :xS="xS"
      :xL="xL"
      :xA="xA"
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
      numLines: "",
      startColor: "#00aaff",
      xH: 0,
      xS: 0,
      xL: 0,
      xA: 0,
      renderSvg: false
    };
  },
  methods: {
    submitProps() {
      this.startColor = document.querySelector("#startColor").value;
      this.numLines = document.querySelector("#numLines").value;
      this.xH = document.querySelector("#xH").value;
      this.xS = document.querySelector("#xS").value;
      this.xL = document.querySelector("#xL").value;
      this.xA = document.querySelector("#xA").value;
      this.renderSvg = !this.renderSvg;
      console.log(
        "About.vue submitProps(): ",
        this.renderSvg,
        this.numLines,
        this.startColor
      );
    // let color = Color(startColor)
    // console.log('color object')
    // console.log(startColor)
    //     console.log('color value')
    // console.log(startColor.value)
    // console.log(Color(startColor.value).hsl())
    }
  }
};
</script>

<style lang="scss" scoped>
.input-group {
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
