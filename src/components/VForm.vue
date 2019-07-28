<template>
  <form class="form-component">
    <label class="labels-and-inputs" v-for="(input, i) in inputs" :key="i">
      {{ input.name }}
      <input :type="input.type" :value="input.value" :placeholder="input.placeholder">
    </label>
    <button v-for="(button, i) in buttons" :key="`${i+button.name}`" @click="test.clickMethod" >{{ button.name }}
      {{ test.clickMethod}}
    </button>
  </form>
</template>

<script>
export default {
  name: "VForm",
  props: {
    inputs: Array,
    buttons: Array
  },
  data() {
    return {
      test: {
        clickMethod: 'test2'
      }
    }
  },
  methods: {
    setButtonEvents(e) {
      console.log('setButtonEvents fired')
      console.log(e.target)
    }
  }
}
</script>

<style lang="scss" scoped>
// parent component/view should display grid:
// .forms-view {
//   display: grid;
//   justify-content: center;
// }

.form-component {
  font-family: 'Montserrat';
  background: rgba(0,0,0,0.1);
  padding: 0 .5rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  justify-self: center;
  align-items: center;
  grid-row: 3;
  & label {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    padding: .5rem;
    & input {
      font-family: 'Montserrat';
      background: none;
      border: none;
      color: white;
      border-bottom: 1px solid rgba(50, 200, 255,0.5);
      padding: .25rem;
    }
  }
  & button {
    width: calc(100% + 1rem);
    font-family: 'Montserrat';
    font-weight: 300;
    font-size: 1rem;
    letter-spacing: .125ch;
    padding: 0.5rem;
    background: none;
    border: none;
    margin: 1rem .25rem 0 .25rem;
    border: 3px solid rgba(50, 200, 255, .5);
    transition: all .25s;
    color: white;
    &:hover {
      color: rgba(50, 200, 255, 1);
      background: rgba(50, 200, 255, .2);
      border-bottom: 3px solid rgba(50, 200, 255, 1);
    }
  }
}
</style>
