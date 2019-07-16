<template>
  <div class="about">
    <div class="experiment">
<!--       
      <form class="radial-lines-settings-form heading">
        <div class="heading">
          <h1>Shoot</h1>
          <p>A game by Mike Peiman</p>
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
      </form> -->

      <Shoot />

    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Shoot from "@/components/Shoot.vue";
import Color from "color";

export default {
  name: "shootgame",
  components: {
    Shoot
  },
  data() {
    return {
    };
  },
  methods: {
    submitProps() {
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
