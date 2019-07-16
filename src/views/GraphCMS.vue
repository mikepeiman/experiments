<template>
  <div class="blog">
    <h1 class="title clear">Blog!</h1>
    <h2 class="subtitle clear">Subtitle</h2>
    <div class="article clear">
      <div class="products-wrapper">
        <div class="product-details" v-for="record in records">
          <div class="single-product-detail">{{ record.fields.make }}</div>
          <div class="single-product-detail">{{ record.fields.model }}</div>
          <div class="single-product-detail">{{ record.fields.version}}</div>
        </div>
      </div>
    </div>
    <form class="product-form">
      <label for="productName">
        Product name
        <input type="text" name="productName" id="productName" />
      </label>
      <label for="productModel">
        Product model
        <input type="text" name="productModel" id="productModel" />
      </label>
      <label for="productVersion">
        Product version
        <input type="text" name="productVersion" id="productVersion" />
      </label>
      <button @click.prevent="postData()">Add New Record</button>
      <button @click.prevent="getData()">Refresh Records View</button>
    </form>
  </div>
</template>

<script>
import Color from "color";
import axios from "axios";
import Airtable from "airtable";

export default {
  name: "GraphCMS",

  data() {
    return {
      records: [],
      API_URL: process.env.VUE_APP_AIRTABLE_URI,
      API_KEY: process.env.VUE_APP_AIRTABLE_API_KEY,
      BASE: "appP3Ar7WtMKMd6Hu/",
      TABLE: "Test%20Table/"
    };
  },
  created() {
    // let airtable = new Airtable({ apiKey: this.API_KEY, endpointUrl: this.API_URL });
    this.getData();
  },
  methods: {
    getData() {
      // const API_URL = process.env.VUE_APP_AIRTABLE_URI;
      // const API_KEY = process.env.VUE_APP_AIRTABLE_API_KEY;
      // const BASE = process.env.VUE_APP_AIRTABLE_BASE;
      axios({
        method: "get",
        url: this.API_URL + this.BASE + this.TABLE,
        headers: {
          Authorization: `Bearer ${this.API_KEY}`
        }
      }).then(res => {
        this.records = res.data.records;
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
.blog {
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
