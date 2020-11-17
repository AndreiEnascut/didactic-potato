<template>
  <form class="review-form" @submit.prevent="onSubmit">
    <p>
      <label for="name">Name:</label>
      <input id="name" v-model="name" />
    </p>

    <p>
      <label for="review">Review:</label>
      <textarea id="review" v-model="review"></textarea>
    </p>

    <p>
      <label for="rating">Rating:</label>
      <select id="rating" v-model.number="rating">
        <option>5</option>
        <option>4</option>
        <option>3</option>
        <option>2</option>
        <option>1</option>
      </select>
    </p>

    <p>
      <input type="submit" value="Submit" />
    </p>
  </form>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { eventBus } from "../eventBus";
import { Review } from "../types"

@Component
export default class ProductReview extends Vue {
  name = null;
  review = null;
  rating = null;
  errors: string[] = [];

  onSubmit() {
    this.errors = [];
    if (this.name && this.review && this.rating) {
      const productReview: Review = {
        name: this.name,
        review: this.review,
        rating: this.rating,
      };
      eventBus.$emit("review-submitted", productReview);
      this.name = null;
      this.review = null;
      this.rating = null;
    } else {
      if (!this.name) this.errors.push("Name required.");
      if (!this.review) this.errors.push("Review required.");
      if (!this.rating) this.errors.push("Rating required.");
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
