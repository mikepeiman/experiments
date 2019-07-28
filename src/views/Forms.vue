<template>
  <div class="forms-view">
    <img alt="Vue logo" src="../assets/logo.png" />
    <VForm :inputs="inputs" :buttons="buttons" />
  </div>
</template>

<script>
// @ is an alias to /src
import VForm from "@/components/VForm.vue";

export default {
  name: "forms",
  components: {
    VForm
  },
  data() {
    return {
      inputs: [
        {
          name: 'Input One',
          value: 'input one',
          placeholder: 'input one',
          type: 'text'
        },
                {
          name: 'Input two',
          value: 'input two',
          placeholder: 'input two',
          type: 'text'
        },
                        {
          name: 'Input three',
          value: 'input three',
          placeholder: 'input three',
          type: 'text'
        }
      ],
      buttons: [
        {
          name: 'B1',
          clickMethod: 'testEvent2()'
        },
        {
          name: 'B2'
        }
      ]
    }
  },
  beforeCreate() {
    document.body.className = 'home'
  },
  methods: {
    clickEvent() {
      console.log('click event tested')
    },
    test2() {
      console.log('click event test2')
    }
  }
};
</script>

<style lang="scss" scoped>
div, span, img {
  justify-self: center;
}

.forms-view {
  display: grid;
  justify-content: center;
  align-items: center;
}
</style>

