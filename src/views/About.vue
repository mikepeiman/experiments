<template>
<div class="about">
  <h1>This is an about page test</h1>
  <RadialLines />
</div>
</template>

<script>
// @ is an alias to /src
import RadialLines from "@/components/RadialLines.vue";

export default {
  name: "home",
  components: {
    RadialLines
  }
};
</script>