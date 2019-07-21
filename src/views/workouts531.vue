<template>
  <div class="workouts">
    <form action class="form-container">
      <h1>5-3-1!</h1>
      <section class="biometrics">
        <label for="height">
          Height
          <input type="text" class="biometrics" name="height" placeholder="(inches)" />
        </label>
        <label for="weight">
          Weight
          <input type="text" class="biometrics" name="weight" placeholder="(pounds)" />
        </label>
        <label :for="exerciseCombos[currentCombo].exercise1.name">
          {{ exerciseCombos[currentCombo].exercise1.name}}
          <input
            type="text"
            :class="exerciseCombos[currentCombo].exercise1.name"
            :name="exerciseCombos[currentCombo].exercise1.name"
            v-model="exerciseCombos[currentCombo].exercise1.max"
            placeholder="(pounds)"
          />
        </label>
        <label :for="exerciseCombos[currentCombo].exercise2.name">
          {{ exerciseCombos[currentCombo].exercise2.name}}
          <input
            type="text"
            :class="exerciseCombos[currentCombo].exercise2.name"
            :name="exerciseCombos[currentCombo].exercise2.name"
            v-model="exerciseCombos[currentCombo].exercise2.max"
            placeholder="(pounds)"
          />
        </label>
      </section>
      <section class="training-program">
        <section class="exercise-container" v-for="exercise in exercises">
          <div>
            <div class="exercise-headings">
              <h2>{{ exerciseCombos[currentCombo][Object.keys(exerciseCombos[currentCombo])[exercise-1]].name }}</h2>
              <h3>1RM: {{ exerciseCombos[currentCombo][Object.keys(exerciseCombos[currentCombo])[exercise-1]].max }}</h3>
            </div>
            <div class="week-container" v-for="week in weeks">
              <h2 class="week-title">Week {{ week }}</h2>
              <div class="sets">
                <div class="columns" v-for="column in columns" :style="`width: ${column.width}`">
                  {{ column.name }}
                  <div class="subset" v-for="subset in subsets">0</div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </section>
    </form>
  </div>
</template>

<script>
import Color from "color";

export default {
  name: "workouts531",

  data() {
    return {
      exerciseCombos: [
        {
          exercise1: {
            name: "Deadlift",
            max: null
          },
          exercise2: {
            name: "Press",
            max: null
          }
        },
        {
          exercise1: {
            name: "Squat",
            max: null
          },
          exercise2: {
            name: "Pullup",
            max: null
          }
        },
        {
          exercise1: {
            name: "Clean",
            max: null
          },
          exercise2: {
            name: "Dip",
            max: null
          }
        }
      ],
      currentCombo: 0,
      exercises: 2,
      weeks: 4,
      sets: 3,
      columns: [
        { name: "Reps", width: "10ch" },
        { name: "Load", width: "10ch" },
        { name: "%", width: "5ch" },
        { name: "Volume", width: "10ch" }
      ],
      subsets: 3,
      max1: 0,
      max2: 0
    };
  },
  beforeCreate() {
    document.body.className = "workouts";
  },
  computed: {
    getMax1() {
      let val = document.querySelector(
        `${this.exerciseCombos[currentCombo].exercise1.name}`
      ).value;
    },
    getMax2() {
      let val = document.querySelector(
        `${this.exerciseCombos[currentCombo].exercise2.name}`
      ).value;
    }
  },
  watch: {

  }
};
</script>

<style lang="scss">
body.workouts {
  background: rgba(0, 0, 0, 0);
  background-image: url("./../assets/tactile_noise.png");
  background-repeat: repeat;
  overflow: auto;
}
</style>

<style lang="scss" scoped>
.workouts {
  display: flex;
  flex-direction: column;
  justify-content: stretch;
  align-items: stretch;
  font-family: "Montserrat";
  // height: 100%;
}

.form-container {
  // height: 100%;
  // background: rgba(255, 200, 175, 0.25);
}
nav.exercises {
  display: flex;
  justify-content: space-around;
  & li {
    list-style: none;
    font-weight: 300;
    font-family: "Montserrat";
    padding: 0.5rem;
    border: 2px solid rgba(150, 200, 255, 0.65);
    background: rgba(150, 200, 255, 0.25);
    margin: 0.25rem;
    transition: all 0.25s;
    &:hover {
      background: rgba(100, 220, 255, 0.65);
    }
    &:active {
      background: rgba(100, 220, 255, 0.65);
    }
  }
  & a {
    text-decoration: none;
    font-weight: 300;
    font-family: "Montserrat";
  }
}
section.biometrics {
  // background: green;
  border-bottom: 2px solid rgba(150, 200, 255, 0.65);
  border-top: 2px solid rgba(150, 200, 255, 0.65);
  padding: 2rem 0 2rem 0;
}

section.training-program {
  display: flex;
  align-items: center;
  justify-content: center;
}
input {
  background: black;
  font-family: "Montserrat";
  border: 1px solid rgba(150, 200, 255, 0.65);
  color: rgba(150, 200, 255, 0.65);
  padding: 0.25rem;
  margin: 0 0.5rem;
}
input.biometrics {
}

.exercise-container {
  display: flex;
  flex-direction: column;
}

h2.week-title {
  font-size: 1.5rem;
  margin: 0 0 1rem 0;
  border-bottom: 1px solid rgba(150, 200, 255, 0.65);
}
.week-container {
  height: auto;
  // width: calc(100% - 4rem);
  padding: 1rem;
  margin: 1rem;
  background: rgba(150, 255, 20, 0.08);
  border: 1px solid white;
  display: flex;
  flex-direction: column;
  align-items: center;
  & .sets {
    display: flex;
    flex-direction: row;
  }
}
</style>
