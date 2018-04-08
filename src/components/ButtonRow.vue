<template>
  <div :class="`row ${row.type}`" @click="$emit('click')">
    <span v-if="row.type === 'next'">next</span>
    <span v-if="row.type === 'previous'">back</span>
  </div>
</template>

<script>
export default {
  props: {
    row: {
      type: Object,
      required: true,
      valiator: ({ val }) => val.type === "next" || val.type === "previous"
    }
  }
};
</script>

<style scoped>
.row {
  z-index: 1;
  position: relative;
  margin-bottom: 15px;
  margin-right: 0;
  margin-left: auto;
  width: 70%;
  border-radius: 3px;
  box-shadow: 2px 3px 8px #445;
  transition: box-shadow 0.1s;
  background: #334;
  color: #cdd;
  font-size: 14px;
  font-weight: light;
  text-align: left;
  cursor: pointer;
  padding: 16px;
}
.previous {
  text-align: left;
}
.next {
  text-align: right;
}
</style>
