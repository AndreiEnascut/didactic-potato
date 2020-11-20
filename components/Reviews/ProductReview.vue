<template>
    <div>
        <pre>
            {{ errors }}
        </pre>
        <form class="review-form"
              @submit.prevent="onSubmit">
            <p>
                <label for="name">Name:</label>
                <input id="name"
                       v-model="name"/>
            </p>

            <p>
                <label for="review">Review:</label>
                <textarea id="review"
                          v-model="review"></textarea>
            </p>

            <p>
                <label for="rating">Rating:</label>
                <select id="rating"
                        v-model.number="rating">
                    <option>5</option>
                    <option>4</option>
                    <option>3</option>
                    <option>2</option>
                    <option>1</option>
                </select>
            </p>

            <p>
                <input type="submit"
                       value="Submit"/>
            </p>
        </form>
    </div>
</template>

<script lang="ts">
    import {Component, Vue} from "vue-property-decorator";
    import {EventBus, Events} from "@/utils/eventBus";
    import {ProductReviewProps} from "@/components/Reviews/ProductReviewProps";

    @Component
    export default class ProductReview extends Vue {
        public name: string = "";
        public review: string = "";
        public rating: string = "";

        public errors: string[] = [];

        onSubmit() {
            if (!this.hasErrors()) {
                const productReview: ProductReviewProps = {
                    name: this.name,
                    review: this.review,
                    rating: this.rating,
                };
                EventBus.$emit(Events.REVIEW_SUBMITTED, productReview);
            }
        }

        private hasErrors() {
            this.errors = [];

            if (!this.name) this.errors.push("Name required.");
            if (!this.review) this.errors.push("Review required.");
            if (!this.rating) this.errors.push("Rating required.");

            return this.errors.length
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
