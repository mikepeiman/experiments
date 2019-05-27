<template>
<div class="block-container">
  <svg id="svgLines" width="100%" height="100%" viewBox="-256 -256 512 512">
        <g class="radial-lines"></g>
      </svg>
</div>
</template>

<script>
export default {
  name: "RadialLines",
  props: {
    msg: String
  },
  methods: {
    setLineAnonymous(startX, endX, startY, endY, strokeColor, strokeWidth, lineCap) {
      let svg = document.querySelector('.radial-lines')
      let line = document.createElementNS("http://www.w3.org/2000/svg", "line");
      line.setAttribute('x1', startX);
      line.setAttribute('x2', endX);
      line.setAttribute('y1', startY);
      line.setAttribute('y2', endY);
      line.setAttribute('stroke', strokeColor);
      line.setAttribute('stroke-width', strokeWidth);
      line.setAttribute('stroke-linecap', lineCap);
      // add in a class and id attribute, which will be added with variables in the makeRadiatingLines funtion below
      svg.appendChild(line)
    },
    makeRadiatingLines(numberOfLines, radiusStart, radiusEnd, colors, strokeWidth, lineCap) {
      console.log('makeRadiatingLines called - colors object:')
      console.log(colors)
      console.log(`makeRadiatingLines startColor: ${colors.startColor}`)
      let lineArray = []
      // function setColor(colors) {
      //   // return colors
      //   line.setAttribute('stroke', "#ffff00");
      // }
      let x1, x2,
        y1, y2,
        increase = Math.PI * 2 / numberOfLines,
        angle = 0

      for (let i = 0; i <= numberOfLines; i++) {
        // console.log(i)    
        let line = {}
        x1 = radiusStart * Math.cos(angle)
        y1 = radiusStart * Math.sin(angle)
        x2 = radiusEnd * Math.cos(angle)
        y2 = radiusEnd * Math.sin(angle)
        line.startX = x1
        line.endX = x2
        line.startY = y1
        line.endY = y2
        line.strokeColor = this.setColor(colors.startColor, colors.setH, colors.setS, colors.setL, colors.setA, i)
        line.strokeWidth = strokeWidth
        line.lineCap = lineCap
        // console.log(line)
        lineArray.push(line)
        angle += increase
      }

      lineArray.forEach(line => {
        console.log(`inside lineArray.forEach`)
        // console.log(line)
        this.setLineAnonymous(line.startX, line.endX, line.startY, line.endY, line.strokeColor, line.strokeWidth, line.lineCap)
      })
    },
    setColor(startColor, setH, setS, setL, setA, i) {
      // console.log('startColor: ' + startColor)
      // let newColor = Color(startColor)
      // console.log('newColor: ' + newColor)
      return startColor
    }
  },
  mounted() {
    this.makeRadiatingLines(25, 150, 175, {
      startColor: "#123456",
      setH: '',
      setS: '',
      setL: '',
      setA: ''
    }, "15px", "round")
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

<style lang="scss" scoped>body {
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
  align-items: center;
  transition: all .5s;
  padding: 0;
  margin: 0;
}
.caption {
  position: absolute;
  bottom: 0;
  height: 30%;
  background: rgba(0,0,0,0.75);
  color: white;
  text-shadow: 1px 1px rgba(0,0,0,1);
  opacity: 1;
  transition: all .5s;
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
  transition: all .5s;
  padding: 0;
  margin: 0;
  max-height: 100%;
  opacity: 0.65;
}
.image-figure {
  position: relative;
  height: 100%;
  background: rgba(0,0,0,1);
  transition: all .5s;
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
  transition: all .5s;
}
.block-container:hover .image-figure {
  background: rgba(0,0,0,.25);
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
  background: rgba(50,75,100,0.15);
  height: 80vh;
  width: 80vw;
  margin: 10vh 10vw;
  transition: all .25s;
}
.radial-lines {
  opacity: 0.1;
  transition: opacity .25s, transform .75s;
}
svg:hover .radial-lines {
  transform: rotate(720deg);
  opacity: 1;
}
</style>
