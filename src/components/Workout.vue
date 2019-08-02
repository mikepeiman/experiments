<template>
  <div class="training-cycle">
    <div v-for="(exercise, i) in records" :key="i" :class="['exercise box',`${exercise.fields.name}`]">
      <div class="training-cycle-header box">
        <h2 class="exercise-name">{{ exercise.fields.name }}</h2>
        <div class="training-cycle-header-data">
          <label>
            1RM:
            <input
              type="number"
              class="oneRepMax"
              :style="`width: ${exercise.fields.oneRepMaxChars + .5}ch;`"
              v-model="exercise.fields.oneRepMax"
              @input="setTrainingMaxLoad(exercise, i)"
            />
          </label>
          <label>
            Training Max:
            <input
              disabled
              type="number"
              class="trainingMax"
              :style="`width: ${exercise.fields.oneRepMaxChars + .5}ch;`"
              v-model="exercise.fields.trainingMaxLoad"
              @input="setTrainingMaxLoad(exercise, i)"
            />
          </label>
        </div>
      </div>
      <div :class="['workout-cycle', selectRowsOrColumns === 'rows' ? 'rows' : 'columns']" >
        <div
          v-for="(workout, x1) in exerciseWorkouts"
          :class="['workout box', `${workout.name}`]"
          :style="`background: ${adjustAlpha(workout.name, baseColorBlue, -x1, 15)};`"
          :key="x1"
        >
          <div class="workout-header box">
            <h2 class="workout-header-week-title box">{{workout.name }}</h2>
            <h3 class="workout-header-week-volume box">
              <span>Workout</span>
              <span>Volume:</span>
              <span class="data-item">{{ workoutVolume(exercise, workout) }}{{ unit }}</span>
            </h3>
          </div>
          <div
            v-for="(row, x) in workoutDataRows"
            :key="x"
            :class="['workout-row box', `${row.name}`]"
            :style="`background: ${adjustAlpha(row.name, baseColorBlackClear, x, 20)};`"
          >
            <div
              v-for="(data, i) in workoutData"
              :key="i"
              :class="['data-item box', `${data.name}`]"
              v-if="row.name === 'header'"
            >{{ data.name }}</div>
            <div
              v-for="(data, i) in workoutData"
              :key="i"
              :class="['data-item box', `${data.name}`]"
              v-if="row.name === 'data'"
            >{{ dataCalc(exercise, workout, data, i, x) }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Color from "color";
import store from "@/store";
import axios from "axios";
import AirtableModule from "@/components/AirtableModule";

export default {
  name: "Workout",
  components: {
    AirtableModule
  },
  props: {
    records: Array,
    selectRowsOrColumns: String
  },
  data() {
    return {
      vuexExercises: [],
      baseColor1: "rgba(25,75,125,0.85)",
      baseColor2: "rgba(125,0,95,0.25)",
      baseColor3: "rgba(25,155,25,0.25)",
      baseColorBlue: "rgba(50, 200, 255, .25)",
      baseColorBlackClear: "rgba(0,0,0,0)",
      selectRowsOrColumns: "columns",
      // selectDisplayColumns: true,
      selectDisplayDensity: 0,
      numberOfWorkoutColumns: 3,
      unit: "lbs",
      trainingMaxPercentage: 90,
      incrementByValue: 5,
      currentLoad: 0,
      exercises: [],
      records: [],
      exerciseList: [
        {
          name: "Deadlift",
          oneRepMax: 385,
          trainingMaxPercentage: 0.9,
          trainingMaxLoad: 0
        },
        {
          name: "Press",
          oneRepMax: 225,
          trainingMaxPercentage: 0.9,
          trainingMaxLoad: 0
        }
      ],
      exerciseWorkouts: [
        {
          name: "Workout One",
          reps: 5,
          percentages: [65, 75, 85],
          volume: null
        },
        {
          name: "Workout Two",
          reps: 3,
          percentages: [70, 80, 90],
          volume: null
        },
        {
          name: "Workout Three",
          reps: 1,
          percentages: [75, 85, 95],
          volume: null
        },
        {
          name: "Recovery",
          reps: 5,
          percentages: [40, 50, 60],
          volume: null
        }
      ],
      workoutDataRows: [
        {
          name: "header",
          value: "data.name"
        },
        {
          name: "data",
          value: "data.value"
        },
        {
          name: "data",
          value: "data.value"
        },
        {
          name: "data",
          value: "data.value"
        }
      ],
      workoutData: [
        {
          name: "Reps",
          value: 5
        },
        {
          name: "Load",
          value: null
        },
        {
          name: "Percentage",
          value: 75
        },
        {
          name: "Volume",
          value: 925
        }
      ]
    };
  },
  methods: {
    adjustAlpha(name, color, x, y) {
      console.log(`adjustAlpha x ${x} y ${y}`);
      if (name === "Recovery") {
        return "rgba(55, 155, 55, .65)";
      } else {
        let c = Color(color);
        let newColor = c.object(); 
        newColor.alpha += (x * y) / 100;
        newColor = Color(newColor);
        return newColor;
      }
    },
    collectRecords(records) {
      this.records = records;
      records.forEach((record, i) => {
        record.trainingMaxLoad = this.setTrainingMaxLoad(record, i);
      });
    },
    setTrainingMaxLoad(exercise, i) {
      this.records[i].fields.trainingMaxLoad =
        Math.round(
          ((this.trainingMaxPercentage / 100) *
            this.records[i].fields.oneRepMax) /
            this.incrementByValue
        ) * this.incrementByValue;
      this.records[i].fields.oneRepMaxChars = this.records[
        i
      ].fields.trainingMaxLoad.toString().length;
    },
    workoutVolume(exercise, workout) {
      // console.log(`workoutVolume called for exercise ${exercise.fields.name} and workout ${workout.name}`)

      let reps = workout.reps;
      let workoutVolume = 0;
      let max = exercise.fields.trainingMaxLoad;
      workout.percentages.forEach(perc => {
        workoutVolume =
          workoutVolume +
          Math.round(((perc / 100) * max * reps) / this.incrementByValue) *
            this.incrementByValue;
      });
      // console.log(workoutVolume);
      return workoutVolume;
    },
    setWidthByChars(e) {
      console.log(`setWidthByChars called`);
      // let len = e.target.value.toString().length
      e.target.style.width = `${e.target.value.toString().length + 0.5}ch`;
      console.log(e.target.style.width);
    },
    dataCalc(exercise, workout, data, i, x) {
      if (data.name === "Reps") {
        // console.log(`this data is named "Reps"`)
        return workout.reps;
      }
      if (data.name === "Load") {
        // console.log(`this data is named "Load"`)
        return (
          Math.round(
            (exercise.fields.trainingMaxLoad * workout.percentages[x - 1]) /
              100 /
              this.incrementByValue
          ) * this.incrementByValue
        );
      }
      if (data.name === "Percentage") {
        // console.log(`this data is named "Percentage"`)
        return workout.percentages[x - 1];
      }
      if (data.name === "Volume") {
        // console.log(`this data is named "Volume"`)
        return (
          Math.round(
            (exercise.fields.trainingMaxLoad * workout.percentages[x - 1]) /
              100 /
              this.incrementByValue
          ) *
          this.incrementByValue *
          workout.reps
        );
      } else {
        return workout;
      }
    }
  },
  computed: {
    oneRepMax: {
      get: function(e) {
        console.log(`computed oneRepMax`);
      },
      set: function(e) {
        console.log("oneRepMax setter");
        console.log(this);
        return exercise.fields.oneRepMax;
      }
    }
  },
  mounted() {
    console.log(`training.vue created()`);
    console.log(this.$store);
    console.log(this.$store.getters);
    // this.trainingMaxPercentage = document.querySelector('#trainingMaxPercentage').value
  },
  watch: {
    oneRepMax() {
      let input = document.querySelector("#oneRepMax").value;
      console.log(
        `setTrainingMaxLoad input = document.querySelector('#oneRepMax').value ${input.length}`
      );
    }
  },
  beforeCreate() {
    document.body.className = "workouts";
  }
};
</script>

<style lang="scss">
// body.workouts {
//   background-image: url("~@/assets/brijan.gif");
//   background-repeat: repeat;
//   // background-image: linear-gradient(black, rgba(#333,0.05)), url('~@/assets/leather-nunchuck.png');
//   // background: #333;
// }
</style>


<style lang="scss" scoped>
$main-blue: rgba(50, 200, 255, 1);
.box {
  // background: rgba(0, 0, 0, 0.1);
  // color: white;
  // font-weight: 300;
  // border: 1px solid rgba(50, 200, 255, 0.35);
  // border-radius: 5px;
  // padding: 0.125rem;
  // display: grid;
  // grid-auto-columns: auto;
  // grid-auto-rows: auto;
  // border-bottom: 1px solid rgba(50, 200, 255, 1);
}

input {
  background: none;
  border: none;
  color: $main-blue;
  font-family: "Muli";
  font-size: 1.1rem;
  padding-left: 0.25rem;
  width: 5ch;
  border-bottom: 1px solid rgba(50, 200, 255, 1);
  margin: 0.5rem;
  justify-self: flex-end;
}

input[type="number"]::-webkit-inner-spin-button,
input[type="number"]::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

.selectRowsOrColumns {
  background: rgba(50, 200, 255, 0.5);
  margin: 0 1rem;
  border: 3px solid rgba(0, 0, 0, 0.25);
  color: #333;
  // font-family: 'Muli';

  & input[type="radio"] {
    display: none;
  }

  label {
    display: inline-block;
    padding: 0.5rem;
  }

  & input[type="radio"]:checked + label {
    background: rgba(50, 200, 255, 1);
  }
}

.selectRowsOrColumnsHeading {
  margin: 0 0.5rem;
  color: rgba(50, 200, 255, 1);
}

.workouts {
  // background: rgba(0,0,0, 0.2);
  // padding-top: 1rem;
  font-family: "Merriweather";
  // font-family: 'Nunito';
  // font-family: 'Muli';
  // font-family: 'Poppins';
  font-family: "Montserrat";
  // margin: 1rem;

  grid-template-columns: repeat(2, 1fr);
  grid-gap: 1rem;

  &.col-1 {
    grid-template-columns: repeat(1, 1fr);
  }

  &.col-2 {
    grid-template-columns: repeat(2, 1fr);
  }

  &.col-3 {
    grid-template-columns: repeat(3, 1fr);
  }

  &.col-4 {
    grid-template-columns: repeat(4, 1fr);
  }

  &.col-5 {
    grid-template-columns: repeat(5, 1fr);
  }

  &.col-6 {
    grid-template-columns: repeat(6, 1fr);
  }
}

.training-cycle-header {
  display: flex;
  justify-content: space-between;
  min-height: 70px;
}

.training-cycle-header-data {
  font-size: 0.75rem;
  align-self: center;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  padding-right: 0.5rem;
  input {
    margin: 0;
    font-size: 0.75rem;
  }
}

.trainingMax {
  color: #aaa;
  border-bottom: none;
  background: none;
}

.workout {
  display: flex;
  flex-direction: column;
  width: 100%;
  // background: rgba(125, 0, 95, 0.75);
}

.exercise {
  // margin: 1rem;
  padding: 0;
  display: flex;
  flex-direction: column;
  background: rgba(0, 50, 95, 0.25);
  // background: linear-gradient(150deg, rgba(155, 55, 55, 0.15), rgba(55, 75, 195, 0.15));
  border: 0.25rem solid rgba(0, 0, 0, 0.25);
}

.workout-cycle {
  display: flex;
  flex-direction: column;
  &.rows {
    flex-direction: row;
  }
}

h2.exercise-name {
  padding: 0 1rem;
  margin: 0.25rem;
  align-self: center;
}

.workout-header {
  background: rgba(255, 255, 255, 0.25);
  display: flex;
  justify-content: space-around;
  // grid-template-columns: auto;
  // grid-template-rows: [title] 3rem auto;
  // grid-template-areas:
  //   "title"
  //   "data";
  justify-content: center;
  // border-bottom: 1px solid rgba(200,225,255,1);
}

.workout-header-week-title {
  font-size: 1.25rem;
  grid-area: title;
  grid-column: 1/5;
  grid-row: 1/2;
  display: flex;
  width: 100%;
  align-content: center;
  align-self: center;
  justify-content: space-around;
  flex-direction: row;
  padding: 0;
  margin: 0.25rem 1rem;
  border: none;
  background: none;
  // background: rgba(0, 255, 255, 0.25);
}

.workout-header-week-volume {
  font-weight: 300;
  font-size: 0.75rem;
  border: none;
  background: none;
  margin: 0.125rem;
  padding: 0.125rem;
  display: flex;
  flex-direction: column;
  // position: absolute;
  // right: 0;
  padding-right: 1rem;
  align-self: center;
  &.data-item {
    font-weight: 900;
  }
}

.workout-header-week-volume .data-item {
  margin-left: 1rem;
}

.workout-header-column-headings {
  // background: rgba(55, 0, 55, 0.75);
}

.workout-row {
  display: grid;
  grid-area: data;
  grid-template-columns: [reps] 1fr [load] 1fr [percentage] 1fr [totVolume] 1fr;
  grid-template-areas: "reps load percentage totVolume";
  border: none;
  &.header {
    font-family: "Montserrat";
    font-weight: 300;
    font-size: 0.75rem;
  }
}

.workout-variables {
  font-family: "Muli";
  display: flex;
  align-items: center;
  padding: 1rem;
  margin-bottom: 1rem;
  background: #333;
  color: #ccc;
}

data.data-item {
  font-family: "Muli";
  border: none;
  font-weight: 300;
  color: red;
}

.reps {
  grid-area: reps;
}

.load {
  grid-area: load;
}

.percentage {
  grid-area: percentage;
}

.volume {
  grid-area: totVolume;
}
</style>
