<template>
<div class="blog">
  <AirtableModule base="appP3Ar7WtMKMd6Hu/" table="Test%20Table/" @records="collectRecords($event)" :addRecord="newRecord" :recordToDelete="recordToDelete" :recordToUpdate="recordToUpdate" />
  <h1 class="title clear">Airtable Sample Data</h1>
  <div class="article clear">
    <div class="products-wrapper">
      <div class="product-details" >

        <div class="single-record-row display" v-for="(record, i) in xyz" :key="i" :id="record.id">
          <div class="single-product-detail">{{i+1}}</div>
          <div class="single-product-detail" v-for="(field, x) in record.fields" v-if="x !== 'id'" :key="x" @click.prevent="enableUpdate" :value="field">{{field}}</div>
          <button class="delete" :id="record.id" @click.prevent="deleteRecord">X</button>
        </div>
        <div class="single-record-row update" v-for="(record, i) in xyz" :key="i" :id="record.id">          
          <div class="single-product-detail">{{i+1}}</div>
          <input class="single-product-detail" v-for="(field, x) in record.fields" v-if="x !== 'id'" :key="x" @click.prevent="updateRecord" :value="field">
          <button class="delete" :id="record.id" @click.prevent="deleteRecord">X</button>
        </div>
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
import VueLocalStorage from "vue-localstorage";

export default {
  name: "AirtableExample",
  components: {
    AirtableModule
  },
  data() {
    return {
      records: [],
      newRecord: {},
      recordToDelete: "",
      recordToUpdate: "",
      xyz: []
    };
  },
  mounted() {
    console.log("this.$localStorage: ");
    console.log(this.$localStorage); // this one
    console.log(this.$localstorage);
    console.log(this.VueLocalStorage);
    console.log(this.ls);
  },
  methods: {
    collectRecords(xyz) {
      // this.records = records;
      this.$localStorage.set("test-airtable", JSON.stringify(xyz));
      this.xyz = JSON.parse(this.$localStorage.get("test-airtable"));
    },
    getData() {
      console.log("getData() in AirtableProducts");
      console.log(this.$localStorage.get("test-airtable"));
      this.records = this.$localStorage.get("test-airtable");
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
      };
    },
    deleteRecord(e) {
      console.log("deleteRecord called on ");
      console.log(e.target.id);
      this.recordToDelete = e.target.id;
    },
    enableUpdate(e) {
      console.log('enableUpdate called')
      console.log(e.target.parentNode)
    },
    updateRecord(e) {
      console.log("updateRecord called on ");
      console.log(e.target.parentNode.id);
      console.log(e.target)
      this.recordToUpdate = e.target.id;
    }
  }
};
</script>

<style lang="scss" scoped>
label {
  // background: rgba(0, 0, 0, 0.25);
  padding: 0.5rem;
  justify-content: center;
  align-items: center;
  display: flex;

  & input {
    margin-left: 1rem;
  }
}

.product-form {
  background: rgba(0, 0, 0, 0.1);
  padding: 0 0.5rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  justify-self: center;
  align-items: center;
  grid-row: 3;

  & label {
    display: flex;
    justify-content: space-between;
    justify-self: flex-end;
    width: 100%;
  }

  & button {
    width: calc(100% + 1rem);
    padding: 0.5rem;
    background: none;
    border: none;
    border-bottom: 3px solid rgba(50, 200, 255, 0.5);
    transition: all 0.25s;
    color: white;

    &:hover {
      color: rgba(50, 200, 255, 1);
      background: rgba(50, 200, 255, 0.2);
      border-bottom: 3px solid rgba(50, 200, 255, 1);
    }
  }
}

.products-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

.single-record-row {
  // pointer-events: none;
  z-index: 20;
  display: grid;
  grid-template-columns: [id] 1fr [make] 1fr [model] 1fr [version] 1fr [delete] 0.25fr;
  width: 60%;
  // margin-left: 10%;
  justify-items: flex-start;
  border-bottom: 0.5px solid rgba(0, 0, 0, 0.25);
  background-image: linear-gradient(-30deg,
      rgba(255, 68, 20, 0.15),
      rgba(75, 75, 255, 0.5));

  & button.delete {
    position: relative;
    height: 99%;
    right: 0;
    width: 100%;
    // top: -4px;
    background: rgba(238, 68, 20, 0.75);
    margin: 0;
    // margin-bottom: 1px;
    font-size: 0.75rem;
    -webkit-transition: all 0.25s;
    transition: all 0.25s;
    border: 2.25px solid rgba(238, 68, 20, 0.75);

    &:hover {
      background: rgba(255, 75, 60, 1);
      border: 2px solid rgba(255, 255, 255, 1);
      z-index: 10;
    }

  }

  &:hover {
    background-image: linear-gradient(-30deg,
        rgba(255, 68, 20, 0.35),
        rgba(75, 75, 255, 0.75));
    border-bottom: 0.5px solid rgba(255, 255, 255, 0.5);
    cursor: pointer;
  }
}

.single-product-detail {
  font-family: "Muli";
  display: flex;
  justify-content: flex-start;
  text-align: left;
  width: auto;
  padding: 0.25rem;
  border-bottom: 0.5px solid rgba(255, 255, 255, 0);

  &:hover {
    border-bottom: 0.5px dashed rgba(50, 200, 255, 1);
    background: rgba(0, 0, 0, 0.5);
    color: rgba(50, 200, 255, 1);
  }
}

input.single-product-detail {
  border: none;
  background: none;
  font-family: "Muli";
  color: white;
  font-size: 1rem;
  display: flex;
  justify-content: flex-start;
  text-align: left;
  width: auto;
  padding: 0.25rem;
  border-bottom: 0.5px solid rgba(255, 255, 255, 0);
}

.blog {
  display: grid;
  grid-template-rows: [title] minmax(2rem, 1fr) [article] minmax(2rem, auto);
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
