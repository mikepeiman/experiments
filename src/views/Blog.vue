<template>
  <div class="about">
    <h1 class="title clear">Blog!</h1>
    <h2 class="subtitle clear">Subtitle</h2>
    <p class="article clear">Some text</p>
    <div v-for="record in records">
      {{ record }}
    </div>
  </div>
</template>

<script>
import Color from "color";
import axios from "axios";
import Airtable from "airtable";

export default {
  name: "about",

  data() {
    return {
      records: [],
      API_URL: process.env.VUE_APP_AIRTABLE_URI,
      API_KEY: process.env.VUE_APP_AIRTABLE_API_KEY,
      BASE: 'appP3Ar7WtMKMd6Hu/',
      TABLE: 'Test%20Table/'
    };
  },
  created() {
    // let airtable = new Airtable({ apiKey: this.API_KEY, endpointUrl: this.API_URL });
    this.getData()
  },
  methods: {
    getData() {
      // const API_URL = process.env.VUE_APP_AIRTABLE_URI;
      // const API_KEY = process.env.VUE_APP_AIRTABLE_API_KEY;
      // const BASE = process.env.VUE_APP_AIRTABLE_BASE;
      axios({
        url: this.API_URL + this.BASE + this.TABLE,
        headers: {
          Authorization: `Bearer ${this.API_KEY}`
        }
      }).then((res => {
        this.records = res.data.records;
      }));
    }
  }
};
</script>

<style lang="scss" scoped>
.about {
  display: grid;
  grid-template-rows: [title] minmax(2em, 1fr) [subtitle] minmax(2em, 1fr) [article] minmax(
      2em,
      auto
    );
}

.clear {
  margin: 1rem 0;
  padding: 1rem 0;
  place-self: stretch;
}

.title {
  grid-row: title;
  background: rgba(0, 0, 255, 0.5);
}
.subtitle {
  grid-row: subtitle;
  background: rgba(0, 255, 0, 0.5);
}
.article {
  grid-row: article;
  background: rgba(255, 0, 0, 0.5);
  min-height: 100px;
  max-height: 100%;
}
</style>  
