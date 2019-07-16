<template>
  <div>
    <h1>BLOG</h1>
    <section v-if="allPosts">
      <ul>
        <li v-for="post in allPosts" :key="post.id">
          <router-link :to="`/post/${post.slug}`" class="link">
            <div class="placeholder">
              <img
                :alt="post.title"
                :src="`https://media.graphcms.com/resize=w:100,h:100,fit:crop/${post.coverImage.handle}`"
              />
            </div>
            <h3>{{post.title}}</h3>
          </router-link>
        </li>
      </ul>
      <button v-if="postCount && postCount > allPosts.length" @click="loadMorePosts">
        {{loading ? 'Loading...' : 'Show more'}}
      </button>
    </section>
    <h2 v-else>
      Loading...
    </h2>
  </div>
</template>

<script>
import Color from "color";
import axios from "axios";
import Airtable from "airtable";

export default {
  name: "blog",
}
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
