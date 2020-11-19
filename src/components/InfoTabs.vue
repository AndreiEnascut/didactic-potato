<template>
    <div>
        <ul>
            <span
                v-for="(tab) in tabs"
                :key="tab"
                class="tabs"
                :class="{ activeTab: selected === tab }"
                @click="selected = tab">{{ tab }}</span>
        </ul>

        <div v-show="selected === 'Shipping'">
            <p>{{ shipping }}</p>
        </div>

        <div v-show="selected === 'Details'">
            <ul>
                <li v-for="(detail, index) in details"
                    :key="index">
                    {{ detail }}
                </li>
            </ul>
        </div>
    </div>
</template>

<script lang="ts">
    import {Component, Prop, Vue} from 'vue-property-decorator';

    @Component
    export default class InfoTabs extends Vue {
        @Prop({required: true}) shipping?: string;
        @Prop({required: true}) details!: string[];

        tabs = ['Shipping', 'Details'];
        selected = "Shipping";
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
