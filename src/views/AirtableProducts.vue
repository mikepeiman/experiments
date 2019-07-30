<template>
<div class="blog">
  <AirtableModule base="appP3Ar7WtMKMd6Hu/" table="Test%20Table/" @records="collectRecords($event)" :addRecord="newRecord" :recordToDelete="recordToDelete" :recordToUpdate="recordToUpdate" />
  <h1 class="title clear">Airtable Sample Data</h1>
  <div class="article clear">
    <div class="records-wrapper">
      <div class="record-details record-details-header" v-for="(record, i) in xyz" v-if="i === 0" :key="i+record" :record-id="record.id">
        <div class="single-record-heading single-record-display">#</div>
        <div class="single-record-heading single-record-display" v-for="field in Object.keys(record.fields)" v-if="field !== 'id'" :key="field" :value="field">{{field.toUpperCase()}}</div>
      </div>
      <div class="record-details" v-for="(record, i) in xyz" :key="i" :record-id="record.id">
        <div class="single-record-detail">{{i+1}}</div>
        <div class="single-record-detail single-record-display hide" v-for="(field, x) in record.fields" v-if="rowConditions(x)" :key="x" @click.prevent="enableUpdate" :value="field">{{field}}</div>
        <input class="single-record-detail single-record-input" v-for="(field, x) in record.fields" v-if="rowConditions(x)" :key="x" @click.prevent="updateRecord" :value="field" />
        <button class="delete" @click.prevent="deleteRecord">X</button>
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
  computed: {},
  methods: {
    rowConditions(x) {
      if (x !== "id") {
        return true;
      }
    },
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
      let id = e.target.parentElement.attributes[1].value;
      console.log(e);
      console.log(id);
      this.recordToDelete = id;
    },
    enableUpdate(e) {
      console.log("enableUpdate called");

      let p = e.target.parentElement;
      console.log(e);
      console.log(p);
      let id = e.target.parentElement.attributes[1].value;
      console.log(`ID: ${id}`);
      let x = document.querySelectorAll(`[record-id="${id}"]`);
      let y = document.getElementsByClassName("single-record-input");
      console.log(x);
      console.log(y);
      // x[0].classList.toggle('hide')
      // x[1].classList.toggle('hide')
      // p.classList.toggle('hide');
    },
    updateRecord(e) {
      console.log("updateRecord called on ");
      console.log(e.target.parentElement);
      console.log(e.target);
      e.target.select();
      this.recordToUpdate = e.target.id;
    },
    setWidthByChars(e) {
      console.log(`setWidthByChars called`);
      // let len = e.target.value.toString().length
      e.target.style.width = `${e.target.value.toString().length + 0.5}ch`;
      console.log(e.target.style.width);
    }
  }
};
</script>

<style lang="scss" scoped>
$main-blue: rgba(50, 200, 255, 0.5);

.record-details.hide,
.single-record-detail.hide {
  display: none;
}

input::selection {
  background: $main-blue;
}

input::-moz-selection {
  background: $main-blue;
}

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
        background-image: linear-gradient(-30deg,
        rgba(255, 68, 20, 0.35),
        rgba(75, 75, 255, 0.75));
    margin: .5rem 0 0 0;
    border: 1px solid rgba(50, 200, 255, 0.5);
    transition: all 0.25s;
    color: white;

    &:hover {
      color: white;
      background: rgba(50, 200, 255, 0.2);
          background-image: linear-gradient(30deg,
        rgba(255, 68, 20, 0.35),
        rgba(75, 75, 255, 0.75));
      border: 1px solid rgba(50, 200, 255, 1);
    }
  }
}

.records-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

.record-details {
  // pointer-events: none;
  z-index: 20;
  display: grid;
  grid-template-columns: [id] .5fr [make] 1fr [model] 1fr [version] 1fr [delete] 0.25fr;
  width: 60%;
  // margin-left: 10%;
  justify-items: flex-start;
  border-bottom: 0.5px solid rgba(0, 0, 0, 0.25);
  background-image: linear-gradient(-30deg,
      rgba(255, 68, 20, 0.15),
      rgba(75, 75, 255, 0.5));

  &.record-details-header {
    display: grid;
    grid-template-columns: [id] .5fr [make] 1fr [model] 1fr [version] 1fr [delete] 0.25fr;
    background-image: linear-gradient(-30deg,
        rgba(255, 68, 20, 0.35),
        rgba(75, 75, 255, 0.75));
    border-bottom: 0.5px solid rgba(255, 255, 255, 0.5);
  }

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

.single-record-heading {
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

.single-record-detail {
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

input.single-record-detail {
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
