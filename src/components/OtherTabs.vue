<template>
    <div>
        <p>Message: {{ $store.getters.message }}</p>

        <!--    where are the books ?   -->
        <ul v-if="books.length">
            <li v-for="(book, index) in books"
                :key="index">
                {{ book.name }}
            </li>
        </ul>

        <ul v-if="houses.length">
            <li v-for="(house, index) in houses"
                :key="index">
                {{ house.name }}
            </li>
        </ul>
    </div>
</template>
<script lang="ts">
    import {Component, Vue} from 'vue-property-decorator';
    import {Getter} from "vuex-class";

    @Component
    export default class OtherTabs extends Vue {
        @Getter("books") public books!: []
        @Getter("houses") public houses!: []
    }
</script>
