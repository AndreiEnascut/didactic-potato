<template>
    <div class="product">
        <div class="product-image">
            <img :src="image"
                 alt="my_image"/>
        </div>

        <div class="product-info">
            <h1>{{ product }}</h1>
            <p v-if="inStock">
                In Stock
            </p>
            <p v-else>
                Out of Stock
            </p>

            <info-tabs :shipping="shipping"
                       :details="details"/>

            <div class="product-variants">
                <div
                    v-for="(variant, index) in variants"
                    :key="variant.variantId"
                    class="color-box"
                    :style="{ backgroundColor: variant.variantColor }"
                    @mouseover="updateProduct(index)">
                </div>
            </div>

            <button
                :disabled="!inStock"
                :class="{ disabledButton: !inStock }"
                @click="addToCart">
                Add to cart
            </button>
        </div>

        <product-tabs :reviews="reviews"/>
    </div>
</template>

<script lang="ts">
    import {Component, Prop, Vue} from "vue-property-decorator";
    import {EventBus, Events} from "@/eventBus";
    import {ProductReviewProps} from "@/components/Reviews/ProductReviewProps";
    import InfoTabs from "./InfoTabs.vue";
    import ProductTabs from "./ProductTabs.vue";
    import {apiResource, getStuff} from "@/api/apiService";
    import {AxiosResponse} from "axios";

    @Component({
        components: {
            InfoTabs,
            ProductTabs,
        },
    })
    export default class Product extends Vue {
        @Prop({required: true}) premium?: boolean;

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
        reviews: ProductReviewProps[] = [];

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

        created() {
            // TODO - custom query param request .. add type to that object
            const axiosResponsePromise: Promise<AxiosResponse> = getStuff(apiResource.HOUSES);

            axiosResponsePromise
                .then(response => {
                    // eslint-disable-next-line no-console
                    console.log(response);
                })
                .catch(error => {
                    // eslint-disable-next-line no-console
                    console.log(error);
                })
        }

        mounted() {
            EventBus.$on(Events.REVIEW_SUBMITTED, this.pushReview);
            EventBus.$on(Events.WINDOW_RESIZE, this.handleWindowResize);
        }

        destroy() {
            EventBus.$off(Events.REVIEW_SUBMITTED, this.pushReview);
            EventBus.$off(Events.WINDOW_RESIZE, this.handleWindowResize);
        }

        private handleWindowResize(): void {
            // eslint-disable-next-line no-console
            console.log("do some required window calculation")
        }

        private pushReview(productReview: ProductReviewProps): void {
            this.reviews.push(productReview);
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .product-variants {
        display: flex;
    }

    .product-variants div {
        margin-right: 10px;
    }
</style>
