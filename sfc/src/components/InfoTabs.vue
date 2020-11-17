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

<script>
export default {
  name: "InfoTabs",
  props: {
    shipping: {
      required: true,
    },
    details: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      tabs: ["Shipping", "Details"],
      selectedTab: "Shipping",
    };
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
