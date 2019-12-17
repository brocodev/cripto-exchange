<template>
  <div>
    <ring-loader
      class="mt-20"
      :loading="isLoading"
      :color="'#00aaff'"
      :size="'100px'"
    ></ring-loader>

    <px-assets-table :assets="assets" v-show="!isLoading" />
  </div>
</template>

<script>
import api from "@/api";
import RingLoader from "vue-spinner/src/RingLoader.vue";
import PxAssetsTable from "@/components/PxAssetsTable";

export default {
  name: "Home",
  components: {
    PxAssetsTable,
    RingLoader
  },
  data() {
    return {
      isLoading: false,
      assets: []
    };
  },
  created() {
    this.isLoading = true;
    api
      .getAssets()
      .then(assets => (this.assets = assets))
      .finally(() => (this.isLoading = false));
  }
};
</script>

<style lang="stylus" scoped></style>
