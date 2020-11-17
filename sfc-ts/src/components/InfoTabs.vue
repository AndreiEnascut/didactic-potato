<template>
  <div>
    <ul>
      <span
        class="tabs"
        :class="{ activeTab: selectedTab === tab }"
        v-for="(tab) in tabs"
        @click="selectedTab = tab"
        :key="tab"
        >{{ tab }}</span
      >
    </ul>

    <div v-show="selectedTab === 'Shipping'">
      <p>{{ shipping }}</p>
    </div>

    <div v-show="selectedTab === 'Details'">
      <ul>
        <li v-for="(detail, index) in details" :key="index">{{ detail }}</li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class InfoTabs extends Vue {
  @Prop({required: true}) shipping?: string;
  @Prop({required: true}) details: Array<string> = []
  
  tabs = ["Shipping", "Details"];
  selectedTab = "Shipping";
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
