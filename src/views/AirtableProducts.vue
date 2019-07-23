<template>
  <div class="airtable">
    <AirtableModule base="appP3Ar7WtMKMd6Hu/" table="Test%20Table/" />
    <AirtableModule base="apphjOSO84s4oUCKH/" table="Training%20Programs/" />
  </div>
</template>

<script>
import Color from "color";
import axios from "axios";
// import Airtable from "airtable";
import AirtableModule from "@/components/AirtableModule";

export default {
  name: "airtableproducts",
  components: {
    AirtableModule
  }

};
</script>

<style lang="scss" scoped>
label {
  background: rgba(29, 21, 21, 0.25);
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
