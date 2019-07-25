// This template is for the Airtable data source for exercises

<template>
  <div class="about">
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
      <label for="numberOfWorkoutColumns">
        Number Of Workout Columns:
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
    </div>
    <!-- <div class="records-loop" v-for="record in records">{{record.fields}}</div> -->
    <!-- RECORDS: {{ records }} -->
    <!-- <h1>Layout Construction For 5-3-1 Template</h1> -->
    <div :class="['workouts box', `col-${numberOfWorkoutColumns}`]">
      <!-- <div v-for="exercise in exerciseList" :class="['exercise box',`${exercise.fields.name}`]"></div> -->
      <div v-for="(exercise, i) in records">
        <h2>{{ exercise.fields.name }}</h2>
        <div class="training-cycle-header box">
          <label>
            1RM:
            <input
              type="number"
              class="oneRepMax"
              :style="`width: ${exercise.fields.oneRepMaxChars + .5}ch;`"
              id="oneRepMax"
              v-model="exercise.fields.oneRepMax"
              @input="setTrainingMaxLoad(exercise, i)"
            />
          </label>
          <label class="training-max box">Training Max: {{ exercise.fields.trainingMaxLoad }}</label>
          <div class="increment box">Increment by 5</div>
        </div>
        <div v-for="workout in exerciseWorkouts" :class="['workout box', `${workout.name}`]">
          <div class="workout-header box">
            <h2 class="workout-header-week-title box">{{workout.name }}</h2>
            <h3 class="workout-header-week-volume box">
              Total Volume: 
              <span class="data-item">{{ workoutVolume(exercise, workout) }}</span>
            </h3>
          </div>
          <div v-for="(row, x) in workoutDataRows" :class="['workout-row box', `${row.name}`]">
            <div
              v-for="(data, i) in workoutData"
              :class="['data-item box', `${data.name}`]"
              v-if="row.name === 'header'"
            >{{ data.name }}</div>
            <div
              v-for="(data, i) in workoutData"
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
import { mapGetters } from "vuex";
import Color from "color";
import store from "@/store";
import axios from "axios";
import AirtableModule from "@/components/AirtableModule";

export default {
  name: "training",
  components: {
    AirtableModule
  },
  data() {
    return {
      vuexExercises: [],
      // oneRepMax: 0,
      numberOfWorkoutColumns: 2,
      trainingMaxPercentage: 90,
      loadIncrement: 5,
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
          name: "Week One",
          reps: 5,
          percentages: [65, 75, 85],
          volume: null
        },
        {
          name: "Week Two",
          reps: 3,
          percentages: [70, 80, 90],
          volume: null
        },
        {
          name: "Week Three",
          reps: 1,
          percentages: [75, 85, 95],
          volume: null
        },
        {
          name: "Week Four - Recovery",
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
            this.loadIncrement
        ) * this.loadIncrement;
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
          Math.round(((perc / 100) * max * reps) / this.loadIncrement) *
            this.loadIncrement;
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
              this.loadIncrement
          ) * this.loadIncrement
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
              this.loadIncrement
          ) *
          this.loadIncrement *
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
  }
};
</script>

<style lang="scss" scoped>
.box {
  background: rgba(0, 0, 0, 0.1);
  color: white;
  font-weight: 300;
  // border: 1px solid rgba(50, 200, 255, 0.35);
  // border-radius: 5px;
  padding: 0.125rem;
  display: grid;
  grid-auto-columns: auto;
  grid-auto-rows: auto;
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

.workouts {
  background: #111;
  font-family: "Merriweather";
  // font-family: 'Nunito';
  // font-family: 'Muli';
  // font-family: 'Poppins';
  font-family: "Montserrat";

  grid-template-columns: repeat(2, 1fr);

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
  background: rgba(0, 0, 0, 0.75);
  padding: 1rem;
  border: 2px solid rgba(50, 255, 200, 0.25);
}

.workout {
  background: rgba(0, 0, 0, 0.5);
  border: 2px solid rgba(50, 255, 200, 0.5);
  display: flex;
  flex-direction: column;
}

.exercise {
  margin: 1rem;
  padding: 0;
  display: flex;
  flex-direction: column;
  border: 2px solid rgba(255, 0, 0, 0.25);
}

.workout-header {
  background: rgba(25, 75, 55, 0.5);
  display: flex;
  justify-content: space-around;
  flex-direction: column;
  // grid-template-columns: auto;
  // grid-template-rows: [title] 3rem auto;
  // grid-template-areas:
  //   "title"
  //   "data";
  justify-content: center;
  // border-bottom: 1px solid rgba(200,225,255,1);
}

.workout-header-week-title {
  grid-area: title;
  grid-column: 1/5;
  grid-row: 1/2;
  display: flex;
  align-content: center;
  justify-content: space-around;
  flex-direction: row;
  padding: 0;
  margin: 0.25rem 1rem;
  border: none;
  background: none;
  // background: rgba(0, 255, 255, 0.25);
}

.workout-header-week-volume {
  font-size: 90%;
  border: none;
  background: none;
  margin: 0.125rem;
  padding: 0.125rem;
  display: flex;
  // position: absolute;
  // right: 0;
  padding-right: 1rem;
  align-self: flex-end;
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
    background: rgba(0, 150, 55, 0.15);
  }
}

.workout-variables {
  font-family: 'Muli';
  display: flex;
  padding: 1rem;
  background: #333;
  color: #ccc;
}

.data-item {
  font-family: "Muli";
  border: none;
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
