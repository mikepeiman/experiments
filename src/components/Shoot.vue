<template>
  <div id="shoot" class="block-container">
    <!-- <svg id="svgLines" width="100%" height="100%" viewBox="-256 -256 512 512">
      <g class="radial-lines"></g>
    </svg>-->
  </div>
</template>

<script>
import Matter from "matter-js";

export default {
  name: "Shoot",
  mounted() {
    // Matter-js module loading and simple demo
    // module aliases
    var Engine = Matter.Engine,
      Render = Matter.Render,
      World = Matter.World,
      Bodies = Matter.Bodies;

    // create an engine
    var engine = Engine.create();

    // create a renderer
    var render = Render.create({
      element: document.querySelector('#shoot'),
      engine: engine
    });

    // create two boxes and a ground
    var boxA = Bodies.rectangle(400, 200, 80, 80);
    var boxB = Bodies.rectangle(450, 50, 80, 80);
    var ground = Bodies.rectangle(400, 610, 810, 60, { isStatic: true });

    // add all of the bodies to the world
    World.add(engine.world, [boxA, boxB, ground]);

    // run the engine
    Engine.run(engine);

    // run the renderer
    Render.run(render);
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

<style lang="scss" scoped>
.block-container {
  position: relative;
  overflow: hidden;
  width: 80vw;
  height: 80vh;
  justify-content: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  transition: all 0.5s;
  padding: 0;
  margin: 0;
}

.caption {
  position: absolute;
  bottom: 0;
  height: 30%;
  background: rgba(0, 0, 0, 0.75);
  color: white;
  text-shadow: 1px 1px rgba(0, 0, 0, 1);
  opacity: 1;
  transition: all 0.5s;
  transform: translateY(100%);
}

h2 {
  font-size: 2em;
}

p {
  font-size: 1.25em;
}

.block-container img {
  width: 100%;
  transition: all 0.5s;
  padding: 0;
  margin: 0;
  max-height: 100%;
  opacity: 0.65;
}

.image-figure {
  position: relative;
  height: 100%;
  background: rgba(0, 0, 0, 1);
  transition: all 0.5s;
}

.image-figure .caption {
  width: calc(100% - 1em);
  padding: 0 0 0 1em;
}

.block-container:hover {
}

.block-container:hover .caption {
  transform: translateY(0%);
}

.block-container:hover img {
  transform: translateY(-30%);
  opacity: 1;
  transition: all 0.5s;
}

.block-container:hover .image-figure {
  background: rgba(0, 0, 0, 0.25);
}

.caption:hover {
  opacity: 1;
}

.caption:hover:nth-child(n) {
  padding: 0 2em;
  width: calc(100% - 2em);
}

/* // **************************************
// If I just want it to fade in directly, use this below.
// I prefer the fade in + slide in with the above, because the padding and width are
// included in the "transition: all"
// **************************************
// .caption:nth-child(n) {
//   padding: 0 2em;
//   width: calc(100% - 2em);
// }
// ************************************** */

svg {
  background: rgba(50, 75, 100, 0.15);
  height: 100%;
  // width: 80vw;
  // margin: 10vh 10vw;

  transition: all 0.25s;
}

.radial-lines {
  opacity: 1;
  transition: opacity 0.25s, transform 0.75s;
}

// svg:hover .radial-lines {
//   transform: rotate(720deg);
//   opacity: 0.5;
// }

.block-container:hover .radial-lines {
  transform: rotate(720deg) scale(1.2);
  opacity: 1;
}

input {
  border: none;
  padding: 4px;
  border-radius: 2px;
  background: rgba(255, 255, 255, 0.25);
  color: white;
  margin-bottom: 0.25rem;
}
</style>
