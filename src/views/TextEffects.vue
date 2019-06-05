<template>
<div class="about">
  <h1>CSS Text Effects</h1>

  <div class="text-effects-container">
    <p id="textToTransform">Malakaya</p>
  </div>
  <button @click="gettext">Get Text</button>
  <button @click="convertLettersToList">String to array</button>
  <button @click="convertArrayToListItems">Array to list items</button>
  <button @click="setNewHTML">Set new HTML</button>
</div>
</template>

<script>
import Color from "color";

export default {
  name: "home",

  data() {
    return {
      oldInnerText: "",
      textArray: [],
      currentLetter: "",
      lettersAsListItems: [],
      newHTML: "",
      newList: ""
    };
  },
  methods: {
    gettext() {
      this.oldInnerText = document.querySelector(
        "#textToTransform"
      ).textContent;
      console.log(`text content: ${this.oldInnerText}`);
    },
    convertLettersToList() {
      this.textArray = this.oldInnerText.split("");
      console.log(`array from string: ${this.textArray}`);
    },
    convertArrayToListItems() {
      this.lettersAsListItems = this.textArray.map(
        (x, i) => `<li style="transition-delay: ${i / 10}s">${x}</li>`
      );
      console.log(`new HTML: ${this.lettersAsListItems}`);
    },
    setNewHTML() {
      let original = document.querySelector("#textToTransform");
      let ul = document.createElement("ul");
      ul.setAttribute("class", "animated-text");

      this.lettersAsListItems.forEach((li, i) => {
        // li.setAttribute('style', `transition-duration: ${i}`)
        ul.innerHTML += li;
        console.log(`li: ${i}: ${li}`);
      });
      original.replaceWith(ul);
    }
  }
};
</script>

<style lang="scss">
.text-effects-container {
  display: flex;
  justify-content: center;
  padding: 2em;
}

ul.animated-text {
  display: flex;
  list-style: none;
  margin: 0;
  padding: 0;
}

ul.animated-text li {
  font-size: 2em;
  letter-spacing: 1ch;
  transform: rotate(0deg) translateY(0px);
  filter: blur(0px);
  transition: all 2s;
}

ul:hover li {
  transform: rotate(45deg) translateY(-200px);
  filter: blur(20px);
  opacity: 0;
  // transition: all 2s;
}
</style>
