<template>
  <div class="blog">
    <AirtableModule
      base="appP3Ar7WtMKMd6Hu/"
      table="Test%20Table/"
      @records="collectRecords($event)"
      :data="newRecord"
    />
    <h1 class="title clear">Airtable Sample Data</h1>
    <div class="article clear">
      <div class="products-wrapper">
        <div class="product-details" v-for="(record, i) in records" :key="i">
          <div class="single-product-detail">{{ i+1 }}</div>
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
import AirtableModule from "@/components/AirtableModule";

export default {
  name: "graphcms",
  components: {
    AirtableModule
  },
  data() {
    return {
      records: [],
      newRecord: {}
    };
  },
  created() {

  },
  methods: {
    collectRecords(records) {
      this.records = records;
    },
    postData() {
      let productName = document.querySelector("#productName").value;
      let productVersion = document.querySelector("#productVersion").value;
      let productModel = document.querySelector("#productModel").value;
      console.log(`postData function called with ${productName}`);
      console.log(`postData function called with ${productModel}`);
      console.log(`postData function called with ${productVersion}`);
      this.newRecord = {
        fields: {
          make: productName,
          model: productModel,
          version: productVersion
        }
      }
      // axios({
      //   method: "post",
      //   url: this.API_URL + this.BASE + this.TABLE,
      //   headers: {
      //     Authorization: `Bearer ${this.API_KEY}`
      //   },
      //   data: {
      //     fields: {
      //       make: productName,
      //       model: productModel,
      //       version: productVersion
      //     }
      //   }
      // }).then(res => {
      //   this.records = res.data.records;
      // });
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
  grid-template-columns: [id] 1fr [make] 1fr [model] 1fr [version] 1fr;
  width: 90%;
  margin-left: 10%;
  justify-items: center;
}

.single-product-detail {
  font-family: 'Muli';
  display: flex;
  justify-content: flex-start;
  text-align: left;
  width: 100%;
  padding: .125rem;
  border-bottom: .5px solid rgba(0,0,0,0.25);
}
.blog {
  display: grid;
  grid-template-rows: [title] minmax(2rem, 1fr) [article] minmax(
      2rem,
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
