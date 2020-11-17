<template>
  <div class="product">
    <div class="product-image">
      <img :src="image" alt="" />
    </div>

    <div class="product-info">
      <h1>{{ product }}</h1>
      <p v-if="inStock">In Stock</p>
      <p v-else>Out of Stock</p>

      <info-tabs :shipping="shipping" :details="details"></info-tabs>

      <div
        class="color-box"
        v-for="(variant, index) in variants"
        :key="variant.variantId"
        :style="{ backgroundColor: variant.variantColor }"
        @mouseover="updateProduct(index)"
      ></div>

      <button
        v-on:click="addToCart"
        :disabled="!inStock"
        :class="{ disabledButton: !inStock }"
      >
        Add to cart
      </button>
    </div>

    <product-tabs :reviews="reviews"></product-tabs>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { eventBus } from "../eventBus";
import { Review } from "../types";
import InfoTabs from "./InfoTabs.vue";
import ProductTabs from "./ProductTabs.vue";

@Component({
  components: {
    InfoTabs,
    ProductTabs,
  },
})
export default class Product extends Vue {
  @Prop({ required: true }) premium = true;

  product = "Socks";
  brand = "Vue Mastery";
  selectedVariant = 0;
  details = ["80% cotton", "20% polyester", "Gender-neutral"];
  variants = [
    {
      variantId: 2234,
      variantColor: "green",
      variantImage:
        "https://www.vuemastery.com/images/challenges/vmSocks-green-onWhite.jpg",
      variantQuantity: 10,
    },
    {
      variantId: 2235,
      variantColor: "blue",
      variantImage:
        "https://www.vuemastery.com/images/challenges/vmSocks-blue-onWhite.jpg",
      variantQuantity: 0,
    },
  ];
  reviews: Review[] = [];

  addToCart() {
    this.$emit("add-to-cart", this.variants[this.selectedVariant].variantId);
  }

  updateProduct(index: number) {
    this.selectedVariant = index;
  }

  get title() {
    return this.brand + " " + this.product;
  }
  get image() {
    return this.variants[this.selectedVariant].variantImage;
  }
  get inStock() {
    return this.variants[this.selectedVariant].variantQuantity;
  }
  get shipping() {
    if (this.premium) {
      return "Free";
    }
    return 2.99;
  }

  mounted() {
    eventBus.$on("review-submitted", (productReview: Review) => {
      this.reviews.push(productReview);
    });
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
