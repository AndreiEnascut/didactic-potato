<template>
    <div>
        <button
            @click="handleClick()">
            Click Me
        </button>
    </div>
</template>
<script lang="ts">
    import {Component, Vue} from 'vue-property-decorator';
    import {MutationTypes} from "@/store";

    @Component
    export default class Buybox extends Vue {
        handleClick() {
            this.$store.commit(MutationTypes.SET_MESSAGE, "hello ppl")
        }
    }
</script>
