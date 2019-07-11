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
    this.runSlingshot();
    // Matter-js module loading and simple demo
    // module aliases

  },
  methods: {
    runSlingshot() {
      var Example = Example || {};

      Example.slingshot = function() {
        var Engine = Matter.Engine,
          Render = Matter.Render,
          Runner = Matter.Runner,
          Composites = Matter.Composites,
          Events = Matter.Events,
          Constraint = Matter.Constraint,
          MouseConstraint = Matter.MouseConstraint,
          Mouse = Matter.Mouse,
          World = Matter.World,
          Bodies = Matter.Bodies;

        // create engine
        var engine = Engine.create(),
          world = engine.world;

        // create renderer
        var render = Render.create({
          element: document.querySelector('#shoot'),
          engine: engine,
          options: {
            width: window.innerWidth,
            height: window.innerHeight,
            showAngleIndicator: true
          }
        });

        Render.run(render);

        // create runner
        var runner = Runner.create();
        Runner.run(runner, engine);

        // add bodies
        var ground = Bodies.rectangle(395, 600, 815, 50, { isStatic: true }),
          rockOptions = { density: 0.004 },
          rock = Bodies.polygon(170, 450, 8, 20, rockOptions),
          anchor = { x: 170, y: 450 },
          elastic = Constraint.create({
            pointA: anchor,
            bodyB: rock,
            stiffness: 0.05
          });

        var pyramid = Composites.pyramid(500, 300, 9, 10, 0, 0, function(x, y) {
          return Bodies.rectangle(x, y, 25, 40);
        });

        var ground2 = Bodies.rectangle(610, 250, 200, 20, { isStatic: true });

        var pyramid2 = Composites.pyramid(550, 0, 5, 10, 0, 0, function(x, y) {
          return Bodies.rectangle(x, y, 25, 40);
        });

        World.add(engine.world, [
          ground,
          pyramid,
          ground2,
          pyramid2,
          rock,
          elastic
        ]);

        Events.on(engine, "afterUpdate", function() {
          if (
            mouseConstraint.mouse.button === -1 &&
            (rock.position.x > 190 || rock.position.y < 430)
          ) {
            rock = Bodies.polygon(170, 450, 7, 20, rockOptions);
            World.add(engine.world, rock);
            elastic.bodyB = rock;
          }
        });

        // add mouse control
        var mouse = Mouse.create(render.canvas),
          mouseConstraint = MouseConstraint.create(engine, {
            mouse: mouse,
            constraint: {
              stiffness: 0.2,
              render: {
                visible: false
              }
            }
          });

        World.add(world, mouseConstraint);

        // keep the mouse in sync with rendering
        render.mouse = mouse;

        // fit the render viewport to the scene
        Render.lookAt(render, {
          min: { x: 0, y: 0 },
          max: { x: 800, y: 600 }
        });

        // context for MatterTools.Demo
        return {
          engine: engine,
          runner: runner,
          render: render,
          canvas: render.canvas,
          stop: function() {
            Matter.Render.stop(render);
            Matter.Runner.stop(runner);
          }
        };
      };
      console.log('example')
      console.log(Example)
      Example.slingshot();
    }
  }
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
  background-image: black;
  z-index: 99;
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
