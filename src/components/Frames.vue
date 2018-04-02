<template>
  <component :is="container">
    <component :is="registeredFrames[index]" />
  </component>
</template>

<script>
import Vue from 'vue';

export default {
  props: {
    index: {
      type: Number,
      default: 0,
    },
    container: {
      type: Object,
    },
    frames: {
      type: Array,
      required: true,
    },
  },
  computed: {
    registeredFrames() {
      const registeredFrames = this.frames.map((frame, index) => {
        Vue.component(`frame${index}`, frame);
        return `frame${index}`;
      });
      return registeredFrames;
    },
  },
};
</script>

<style>

</style>
