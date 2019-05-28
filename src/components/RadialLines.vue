<template>
  <div class="block-container">
    <svg id="svgLines" width="100%" height="100%" viewBox="-256 -256 512 512">
      <g class="radial-lines"></g>
    </svg>
  </div>
</template>

<script>
import Color from "color";

export default {
  name: "RadialLines",
  props: ["numLines", "startColor", "renderSvg", "H", "S", "L", "A"],
  data() {
    return {
      render: this.renderSvg,
      tempColor: "",
      colorsArray: []
    };
  },
  watch: {
    renderSvg() {
      console.log(
        `From RadialLines.vue component: renderSvg prop: ${renderSvg}`
      );
    }
  },
  methods: {
    setLineAnonymous(
      startX,
      endX,
      startY,
      endY,
      strokeColor,
      strokeWidth,
      lineCap
    ) {
      let svgGroup = document.querySelector(".radial-lines");
      let line = document.createElementNS("http://www.w3.org/2000/svg", "line");
      line.setAttribute("x1", startX);
      line.setAttribute("x2", endX);
      line.setAttribute("y1", startY);
      line.setAttribute("y2", endY);
      line.setAttribute("stroke", strokeColor);
      line.setAttribute("stroke-width", strokeWidth);
      line.setAttribute("stroke-linecap", lineCap);
      // add in a class and id attribute, which will be added with variables in the makeRadiatingLines funtion below
      svgGroup.appendChild(line);
    },
    makeRadiatingLines(
      numberOfLines,
      radiusStart,
      radiusEnd,
      colors,
      strokeWidth,
      lineCap
    ) {
      // console.log("makeRadiatingLines called - colors object:");
      // console.log(colors);
      console.log(`makeRadiatingLines startColor: ${colors.startColor}`);
      let lineArray = [];
      let x1,
        x2,
        y1,
        y2,
        increase = (Math.PI * 2) / numberOfLines,
        angle = 0;
      let x = numberOfLines % 2;
      let y = Math.floor(numberOfLines / 2);
      this.generateColors(numberOfLines, colors, x, y);
      for (let i = 0; i <= numberOfLines; i++) {
        console.log(i);
        let line = {};
        // console.log(`x = i % 2: `);
        // console.log(y, x);

        // x
        //   ? console.log("x is true (non-zero)")
        //   : console.log("x is false (zero)");
        x1 = radiusStart * Math.cos(angle);
        y1 = radiusStart * Math.sin(angle);
        x2 = radiusEnd * Math.cos(angle);
        y2 = radiusEnd * Math.sin(angle);
        line.startX = x1;
        line.endX = x2;
        line.startY = y1;
        line.endY = y2;
        line.strokeColor = this.colorsArray[i]
        line.strokeWidth = strokeWidth;
        line.lineCap = lineCap;
        lineArray.push(line);
        angle += increase;
      }

      lineArray.forEach(line => {
        console.log(`inside lineArray.forEach`);
        this.setLineAnonymous(
          line.startX,
          line.endX,
          line.startY,
          line.endY,
          line.strokeColor,
          line.strokeWidth,
          line.lineCap
        );
      });
    },
    generateColors(numberOfLines, colors, x, y) {
      this.colorsArray = [];
      for (let i = 0; i < numberOfLines; i++) {
        console.log(`${i}: iteration in generateColors()`);
        if (i === 0) {
          let hslStartColor = Color(colors.startColor).hsl();
          this.tempColor = hslStartColor;
          this.colorsArray.push(hslStartColor);
          continue;
        }
        let hslColor = Color(this.tempColor).hsl();
        console.log("hslColor as HSL: " + hslColor);
        let hue = hslColor.hue();
        console.log("hslColor.hue(): " + hue);
        hue = hue + colors.H;
        console.log("newHue: " + hue);
        this.tempColor = hslColor.hue(hue);
        console.log("new this.tempColor: " + this.tempColor);
        this.colorsArray.push(this.tempColor);
      }
      console.log("colorsArray: ", this.colorsArray);
    },
    generateLines() {
      this.makeRadiatingLines(
        this.numLines,
        150,
        175,
        {
          startColor: this.startColor,
          H: parseInt(this.H),
          S: parseInt(this.S),
          L: parseInt(this.L),
          A: parseInt(this.A)
        },
        "15px",
        "round"
      );
    },
    clearLines() {
      let svgGroup = document.querySelector(".radial-lines");
      while (svgGroup.hasChildNodes()) {
        svgGroup.removeChild(svgGroup.firstChild);
      }
    }
  },
  mounted() {
    this.tempColor = this.startColor ? this.startColor : "#00aaff";
    this.generateLines();
  },
  watch: {
    numLines() {
      this.clearLines();
      this.generateLines();
    },
    startColor() {
      this.clearLines();
      this.generateLines();
    },
    H() {
      this.clearLines();
      this.generateLines();
    },
    S() {
      this.clearLines();
      this.generateLines();
    },
    L() {
      this.clearLines();
      this.generateLines();
    },
    A() {
      this.clearLines();
      this.generateLines();
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

<style lang="scss" scoped>
body {
  background: #f5f5f5;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 16px;
}

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
  height: 80vh;
  width: 80vw;
  margin: 10vh 10vw;
  transition: all 0.25s;
}

.radial-lines {
  opacity: 1;
  transition: opacity 0.25s, transform 0.75s;
}

svg:hover .radial-lines {
  transform: rotate(720deg);
  opacity: 0.5;
}
</style>
