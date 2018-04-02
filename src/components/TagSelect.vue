<template>
  <select>
    <option v-for="option in options" :key="option" :value="option">{{option}}</option>
  </select>
</template>

<script>
export default {
  props: {
    options: {
      type: Array,
      required: true
    }
  }
};
</script>

<style>

</style>
