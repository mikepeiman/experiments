<template>
  <div class="training">
    <AirtableModule
      base="apphjOSO84s4oUCKH/"
      table="Wendler531/"
      @records="collectRecords($event)"
    />
    <div class="workout-variables box">
      <label for="trainingMaxPercentage">
        Training Maximum Percentage (%)
        <input
          type="number"
          name="trainingMaxPercentage"
          style="width: 2.5ch;"
          @change="setWidthByChars"
          @input="setWidthByChars"
          v-model="trainingMaxPercentage"
          id="trainingMaxPercentage"
          value="90"
          placeholder="%"
        />
      </label>
      <label for="incrementByValue">
        Increment By:
        <input
          type="number"
          @change="setWidthByChars"
          @input="setWidthByChars"
          name="incrementByValue"
          style="width: 1.5ch;"
          min="1"
          max="50"
          v-model="incrementByValue"
          id="incrementByValue"
          value="5"
          placeholder="5"
        />
      </label>
      <div class="selectRowsOrColumns">
        <span class="selectRowsOrColumnsHeading">Select Display:</span>
        <input
          type="radio"
          @change="setWidthByChars"
          @input="setWidthByChars"
          name="selectRowsOrColumns"
          v-model="selectRowsOrColumns"
          id="selectDisplayRows"
          value="rows"
          checked
        />
        <label for="selectDisplayRows" class>Rows</label>
        <input
          type="radio"
          @change="setWidthByChars"
          @input="setWidthByChars"
          name="selectRowsOrColumns"
          v-model="selectRowsOrColumns"
          id="selectDisplayColumns"
          value="columns"
        />
        <label for="selectDisplayColumns" class>Columns</label>
      </div>
      <label for="numberOfWorkoutColumns" v-if="selectRowsOrColumns === 'columns'">
        how many columns?
        <input
          type="number"
          name="numberOfWorkoutColumns"
          style="width: 1.5ch;"
          min="1"
          max="8"
          v-model="numberOfWorkoutColumns"
          id="numberOfWorkoutColumns"
          value="2"
          placeholder="2"
        />
      </label>

      <label for="selectDisplayDensity">
        Display Density:
        <input
          type="number"
          @change="setWidthByChars"
          @input="setWidthByChars"
          name="selectDisplayDensity"
          style="width: 1.5ch;"
          min="1"
          max="3"
          v-model="selectDisplayDensity"
          id="selectDisplayDensity"
          value="1"
          placeholder="1"
        />
      </label>
    </div>

    <TrainingCycle :records="records" :selectRowsOrColumns="selectRowsOrColumns" :numberOfWorkoutColumns="numberOfWorkoutColumns" />
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Color from "color";
import store from "@/store";
import axios from "axios";
import AirtableModule from "@/components/AirtableModule";
import TrainingCycle from "@/components/TrainingCycle";

export default {
  name: "training",
  components: {
    AirtableModule,
    TrainingCycle,
  },
  data() {
    return {
      vuexExercises: [],
      baseColor1: "rgba(25,75,125,0.85)",
      baseColor2: "rgba(125,0,95,0.25)",
      baseColor3: "rgba(25,155,25,0.25)",
      baseColorBlackClear: "rgba(0,0,0,0)",
      selectRowsOrColumns: "columns",
      // selectDisplayColumns: true,
      selectDisplayDensity: 0,
      numberOfWorkoutColumns: 3,
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
          name: "Workout Four",
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
    adjustAlpha(color, x, y) {
      console.log(`adjustAlpha x ${x} y ${y}`)
      let c = Color(color);
      let newColor = c.object();
      newColor.alpha += (x * y) / 100;
      newColor = Color(newColor);
      return newColor;
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

<style lang="scss" scoped>
body.workouts {
  // background-image: url("~@/assets/brijan.gif");
  // background-repeat: repeat;
  // background-image: linear-gradient(black, rgba(#333,0.05)), url('~@/assets/leather-nunchuck.png');
  // background: #333;
}

.box {
  // background: rgba(0, 0, 0, 0.1);
  color: white;
  font-weight: 300;
  // border: 1px solid rgba(50, 200, 255, 0.35);
  // border-radius: 5px;
  // padding: 0.125rem;
  display: grid;
  grid-auto-columns: auto;
  grid-auto-rows: auto;
  // border-bottom: 1px solid rgba(50, 200, 255, 1);
}

input {
  background: none;
  border: none;
  color: rgba(50, 200, 255, 1);
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

input[type="number"] {
  -moz-appearance: textfield;
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
}
.training-cycle-header-data {
  align-self: center;
  padding-right: 2rem;
}

.trainingMax {
  color: #aaa;
  border-bottom: 1px solid #aaa;
}

.workout {
  display: flex;
  flex-direction: column;
  // background: rgba(125, 0, 95, 0.75);
}

.exercise {
  // margin: 1rem;
  padding: 0;
  display: flex;
  flex-direction: column;
  // background: rgba(0, 50, 95, 0.75);
  border: 0.25rem solid rgba(0, 0, 0, 0.25);
}

.workout-cycle {
  display: flex;
  flex-direction: row;
}

h2.exercise-name {
  padding: 0 1rem;
}

.workout-header {
  background: rgba(0, 0, 0, 0.25);
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
  font-size: 70%;
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

.data-item {
  font-family: "Muli";
  border: none;
  font-weight: 300;
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
