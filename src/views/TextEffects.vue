<template>
<div class="about">
<h1>CSS Text Effects</h1>
<p id="textToTransform">Malakaya</p>
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
      oldInnerText: '',
      textArray: [],
      currentLetter: '',
      lettersAsListItems: [],
      newHTML: '',
      newList: ''
    };
  }, 
  methods: {
    gettext() {
      this.oldInnerText = document.querySelector('#textToTransform').textContent
      console.log(`text content: ${this.oldInnerText}`)
    },
    convertLettersToList() {
      this.textArray = this.oldInnerText.split('')
      console.log(`array from string: ${this.textArray}`)
    },
    convertArrayToListItems() {
      this.lettersAsListItems = this.textArray.map(x => `<li>${x}</li>`)
      console.log(`new HTML: ${this.lettersAsListItems}`)
    },
    setNewHTML() {
      let parent = document.querySelector('#textToTransform')
      let ul = document.createElement('ul')
      ul.setAttribute('class', 'animated-text')
      
      this.lettersAsListItems.forEach(li => {
        ul.innerHTML += li
        // console.log(`li: ${li}`)
      })
      parent.appendChild(ul)
    }
  }
};
</script>

<style lang="scss" scoped>
h1 {
  color: black;
}
</style>
