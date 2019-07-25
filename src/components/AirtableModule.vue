<template>
  <div class="airtable-module">
    <div class="display-none emit-data" :on="$emit('records',records)"></div>
  </div>
</template>

<script>
import Color from "color";
import axios from "axios";
import Airtable from "airtable";

export default {
  name: "AirtableModule",
  props: {
    base: String,
    table: String
  },
  data() {
    return {
      records: [],
      API_URL: process.env.VUE_APP_AIRTABLE_URI,
      API_KEY: process.env.VUE_APP_AIRTABLE_API_KEY,
      BASE: this.base,
      TABLE: this.table
    };
  },
  beforeMount() {
    this.getData();
  },
  methods: {
    emitToParent() {
      this.$emit('childToParent', this.records)
    },
    getData() {
      axios({
        method: "get",
        url: this.API_URL + this.BASE + this.TABLE,
        headers: {
          Authorization: `Bearer ${this.API_KEY}`
        }
      }).then(res => {
        console.log(res)
        this.records = res.data.records;
        this.$store.commit('change', this.records)
      });
    },
    postData() {
      let productName = document.querySelector("#productName").value;
      let productVersion = document.querySelector("#productVersion").value;
      let productModel = document.querySelector("#productModel").value;
      console.log(`postData function called with ${productName}`);
      console.log(`postData function called with ${productModel}`);
      console.log(`postData function called with ${productVersion}`);
      axios({
        method: "post",
        url: this.API_URL + this.BASE + this.TABLE,
        headers: {
          Authorization: `Bearer ${this.API_KEY}`
        },
        data: {
          fields: {
            make: productName,
            model: productModel,
            version: productVersion
          }
        }
      }).then(res => {
        this.records = res.data.records;
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.display-none {
  display: none;
}
label {
  background: rgba(0, 0, 0, 0.25);
  padding: 0.5rem;
  justify-content: center;
  align-items: center;
  display: flex;
  & input {
    margin-left: 1rem;
  }
}

.product-form {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.products-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
.product-details {
  display: grid;
  grid-template-columns: [make] 1fr [model] 1fr [version] 1fr;
  width: 100%;
  justify-items: center;
}

.single-product-detail {
  display: flex;
  justify-content: flex-start;
}
.airtable-module {
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
  // background: rgba(0, 0, 255, 0.5);
}
.subtitle {
  grid-row: subtitle;
  // background: rgba(0, 255, 0, 0.5);
}
.article {
  grid-row: article;
  // background: rgba(255, 0, 0, 0.5);
  min-height: 100px;
  max-height: 100%;
}
</style>  
