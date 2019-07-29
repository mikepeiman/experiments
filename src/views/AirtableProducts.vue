<template>
  <div class="blog">
    <AirtableModule
      base="appP3Ar7WtMKMd6Hu/"
      table="Test%20Table/"
      @records="collectRecords($event)"
      :addRecord="newRecord"
      :recordToDelete="recordToDelete"
      :recordToUpdate="recordToUpdate"
      
    />
    <h1 class="title clear">Airtable Sample Data</h1>
    <div class="article clear">
      <div class="products-wrapper">
        <div class="product-details" v-for="(record, i) in xyz" :key="i" @click.prevent="updateRecord" :id="record.id">
          <div class="single-product-detail">{{ i+1 }}</div>
          <div class="single-product-detail">{{ record.fields.make }}</div>
          <div class="single-product-detail">{{ record.fields.model }}</div>
          <div class="single-product-detail">{{ record.fields.version}}</div>
          <button class="delete" :id="record.id" @click.prevent="deleteRecord">X</button>
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
      recordToDelete: '',
      recordToUpdate: '',
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
      console.log('deleteRecord called on ')
      console.log(e.target.id)
      this.recordToDelete = e.target.id
    },
    updateRecord(e) {
      console.log('updateRecord called on ')
      console.log(e.target.parentNode.id)
      this.recordToUpdate = e.target.id
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
.product-details {
  // pointer-events: none;
  z-index: 20;
  display: grid;
  grid-template-columns: [id] 1fr [make] 1fr [model] 1fr [version] 1fr [delete] .25fr;
  width: 90%;
  margin-left: 10%;
  justify-items: center;
  padding: .125rem;
  border-bottom: .5px solid rgba(0,0,0,0.25);
  & button.delete {
    // content: "X";
    // pointer-events: all;
    position: relative;
    right: 20%;
    background: rgba(238, 68, 20, 0.75);
    padding: 0.125rem 0.75rem;
    border-radius: 1rem;
    margin-left: -2rem;
    font-size: 0.75rem;
    transition: all .25s;
    border: 2px solid rgba(75, 75, 255,0);
      &:hover {
    background: rgba(255, 75, 60, 1);
    border: 2px solid rgba(255, 255, 255, 1);
  }
  }
  &:hover {
    background: rgba(255, 50, 50, 0.15);
    border-bottom: .5px solid rgba(255,255,255,0.5);
    cursor: pointer;
  }
}

.single-product-detail {
  font-family: "Muli";
  display: flex;
  justify-content: flex-start;
  text-align: left;
  width: 100%;
  padding: 0.25rem;
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
