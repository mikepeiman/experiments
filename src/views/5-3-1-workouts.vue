<template>
<div class="workouts">
<h1>5-3-1!</h1>
</div>
</template>

<script>
import Color from "color";

export default {
  name: "5-3-1-workouts",

  data() {
    return {
    };
  },
  beforeCreate() {
    document.body.className = 'workouts'
  }
};
</script>

<style lang="scss" scoped>

</style>
<style lang="scss">
body {
  background-image: url('/assets/tactile_noise.png');
  background-repeat: repeat;
}
</style>
