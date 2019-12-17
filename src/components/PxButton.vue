<template>
  <!--
    v-on = "@"
    -->
  <button
    @click="buttonClick"
    class="focus:outline-none font-bold bg-transparent hover:bg-blue-500 text-gray-600 hover:font-semibold hover:text-white text-sm py-2 px-4 shadow rounded"
  >
    <beat-loader
      :loading="isLoading"
      :color="'#ddd'"
      :size="'8px'"
    ></beat-loader>

    <slot></slot>
  </button>
</template>

<script>
import BeatLoader from "vue-spinner/src/BeatLoader.vue";
export default {
  name: "PxButton",
  components: {
    BeatLoader
  },
  props: {
    isLoading: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    buttonClick() {
      this.$emit("custom-click");
    }
  }
};
</script>
