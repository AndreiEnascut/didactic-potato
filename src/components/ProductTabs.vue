<template>
    <div>
        <ul>
            <span
                v-for="tab in tabs"
                :key="tab"
                class="tabs"
                :class="{ activeTab: selectedTab === tab }"
                @click="selectedTab = tab">{{ tab }}</span>
        </ul>

        <div v-show="selectedTab === 'Reviews'">
            <p v-if="!reviews.length">
                There are no reviews yet.
            </p>
            <ul v-else>
                <li v-for="(review, index) in reviews"
                    :key="index">
                    <p>{{ review.name }}</p>
                    <p>Rating:{{ review.rating }}</p>
                    <p>{{ review.review }}</p>
                </li>
            </ul>
        </div>

        <div v-show="selectedTab === 'Make a Review'">
            <product-review/>
        </div>

        <div v-show="selectedTab === 'Other'">
            <other-tabs/>
        </div>
    </div>
</template>

<script lang="ts">
    import { Component, Prop, Vue } from "vue-property-decorator";
    import ProductReview from "./Reviews/ProductReview.vue";
    import {ProductReviewProps} from "./Reviews/ProductReviewProps";
    import OtherTabs from "@/components/OtherTabs.vue";

    @Component({
        components: {
            OtherTabs,
            ProductReview,
        },
    })
    export default class ProductTabs extends Vue {
        @Prop({ required: true }) public reviews!: ProductReviewProps;

        tabs = ["Reviews", "Make a Review", "Other"];
        selectedTab = "Reviews";
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
