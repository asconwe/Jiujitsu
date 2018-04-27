<template>
<div >
  <div class="date">{{date}}</div>
  <div class="event-row unfocused" @click="handleClickOfUnfocused">
    <div v-if="row.tournamentname" class="name">{{row.tournamentname}}</div>
    <div v-if="row.location" class="location">{{row.location}}</div>
  </div>
</div>
</template>

<script>
export default {
  props: {
    row: {
      type: Object,
      required: true,
    },
    focus: {
      type: Function,
    },
    unfocus: {
      type: Function,
    },
    focused: {
      type: Boolean,
    },
    toggleEditing: {
      type: Function,
    },
  },
  computed: {
    date() {
      const date = new Date(this.row.date);
      return `${date.getUTCMonth() +
        1}.${date.getDate()}.${date.getFullYear()}`;
    },
  },
  methods: {
    handleClickOfUnfocused() {
      if (!this.row.focused) {
        this.$emit('click');
      }
    },
    handleClickOfUnfocusButton() {
      if (this.row.focused) {
        this.$emit('click');
      }
    },
  },
};
</script>

<style src="../assets/css/row.css" />

