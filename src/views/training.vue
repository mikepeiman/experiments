<template>
<div class="about">
  <h1>Layout Construction For 5-3-1 Template</h1>
  <div class="workouts box">
    <!-- <div v-for="exercise in exerciseList" :class="['exercise box',`${exercise.name}`]"></div> -->
    <div v-for="(exercise, i) in exerciseList">
      <h2>{{ exercise.name }}</h2>
      <div class="training-cycle-header box">
        <label>
          1RM:
          <input type="number" class="oneRepMax" v-model="exercise.oneRepMax" @input="setTrainingMaxLoad(exercise, i)" />
        </label>
        1RM: {{ exercise.oneRepMax }}
        <label class="training-max box">
          Training Max: {{ exercise.trainingMaxLoad }}
        </label>
        <div class="increment box">Increment by 5</div>
      </div>
      <div v-for="workout in exerciseWorkouts" :class="['workout box', `${workout.name}`]">
        <div class="workout-header box">
          <h2 class="workout-header-week-title box">{{workout.name }} || Total Volume: {{ workoutVolume(exercise, workout) }}</h2>

          <div v-for="(row, x) in workoutDataRows" :class="['workout-row box', `${row.name}`]">
            <div v-for="(data, i) in workoutData" :class="['workout-row-data box', `${data.name}`]" v-if="row.name === 'header'">{{ data.name }}</div>
            <div v-for="(data, i) in workoutData" :class="['workout-row-data box', `${data.name}`]" v-if="row.name === 'data'">{{ dataCalc(exercise, workout, data, i, x) }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import Color from "color";

export default {
  name: "about",

  data() {
    return {
      exerciseList: [{
          name: "Deadlift",
          oneRepMax: 385,
          trainingMaxPercentage: 0.9,
          trainingMaxLoad: 345
        },
        {
          name: "Press",
          oneRepMax: 225,
          trainingMaxPercentage: 0.9,
          trainingMaxLoad: 185
        }
      ],
      exerciseWorkouts: [{
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
      workoutDataRows: [{
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
      workoutData: [{
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
      ],
      trainingMaxPercentage: 0.9,
      loadIncrement: 5,
      currentLoad: 0
    };
  },
  // beforeMount: {
  //   initTrainingMaxLoad(exercise, i) {
  //     return this.exerciseList[i - 1].trainingMaxLoad ?
  //       this.exerciseList[i - 1].trainingMaxLoad :
  //       (this.exerciseList[i - 1].trainingMaxLoad =
  //         this.exerciseList[i - 1].trainingMaxPercentage *
  //         this.exerciseList[i - 1].oneRepMax);
  //   }
  // },
  methods: {
    workoutVolume(exercise, workout) {
      console.log(`workoutVolume`)

      let reps = workout.reps
      let workoutVolume = 0
      let max = exercise.trainingMaxLoad
      workout.percentages.forEach(perc => {
        console.log(perc)
        workoutVolume = workoutVolume + (Math.round(perc/100 * max * reps / this.loadIncrement) * this.loadIncrement)
        console.log(`reps ${reps}, max ${max}, workoutVolume ${workoutVolume}`)
      })
      return workoutVolume
    },
    setTrainingMaxLoad(exercise, i) {
      console.log(`setTrainingMaxLoad called with ${i}`);
      console.log(this.exerciseList[i]);
      console.log(this.exerciseList[i].trainingMaxLoad);
      this.exerciseList[i].trainingMaxLoad =
        this.exerciseList[i].trainingMaxPercentage *
        this.exerciseList[i].oneRepMax;
    },
    dataCalc(exercise, workout, data, i, x) {
      // return this.oneRepMax;
      // console.log(`This is dataCalc workout i = ${i}, x = ${x}`)
      // console.log('exercise')
      // console.log(exercise)
      // console.log('workout')
      // console.log(workout)
      // console.log('data')
      // console.log(data)

      if (data.name === "Reps") {
        // console.log(`this data is named "Reps"`)
        return workout.reps;
      }
      if (data.name === "Load") {
        // console.log(`this data is named "Load"`)
        // console.log(this.setTrainingMaxLoad(exercise, i))
        return (
          Math.round(
            (exercise.trainingMaxLoad * workout.percentages[x - 1]) /
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
        return Math.round(
          ((exercise.trainingMaxLoad * workout.percentages[x - 1]) /
              100) /
            this.loadIncrement) *
          this.loadIncrement * workout.reps;
        }
        else {
          return workout;
        }
        // return (this.trainingMaxLoad * this.scaleLoadByPercentage)
      }
    },
    computed: {
      // setOneRepMax() {
      //   console.log(this.oneRepMax);
      //   this.oneRepMax = document.querySelector(".oneRepMax").value;
      //   console.log(`Second time ${this.oneRepMax}`);
      // },

      // trainingMaxLoad() {
      //   return this.oneRepMax * this.trainingMaxPercentage
      // },
      // oneRepMax() {
      //   return 385
      // },

    }
  };
</script>

<style lang="scss" scoped>
.box {
  background: rgba(0, 0, 0, 0.1);
  color: rgba(150, 200, 255, 0.85);
  border: 1px solid rgba(50, 200, 255, 0.15);
  // border-radius: 5px;
  padding: 0.25rem;
  display: grid;
  grid-auto-columns: auto;
  grid-auto-rows: auto;
}

.workouts {
  background: #333;
  grid-template-columns: 1fr 1fr;
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
  flex-direction: column;
  grid-template-columns: auto;
  grid-template-rows: [title] 3rem auto;
  grid-template-areas:
    "title"
    "data";
  justify-content: center;
}

.workout-header-week-title {
  grid-area: title;
  grid-column: 1/5;
  grid-row: 1/2;
  align-content: center;
  padding: 0;
  margin: 0;
  background: rgba(0, 255, 255, 0.25);
}

.workout-header-column-headings {
  background: rgba(255, 0, 255, 0.25);
}

.workout-row {
  display: grid;
  grid-area: data;
  grid-template-columns: [reps] 1fr [load] 1fr [percentage] 1fr [totVolume] 1fr;
  grid-template-areas: "reps load percentage totVolume";
}

.workout-row-header {
  background: rgba(255, 150, 255, 0.25);
}

.workout-row-data {}

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
