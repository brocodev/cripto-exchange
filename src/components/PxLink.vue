<template>
  <button
    @click="buttonClick"
    class="uppercase mr-5 hover:bg-blue-500 p-3 rounded-full hover:font-bold"
  >
    <slot></slot>
  </button>
</template>

<script>
export default {
  name: "PxLink",
  methods: {
    buttonClick() {
      this.$emit("click-link");
    }
  }
};
</script>
