<template>
<div>
  <div v-if="event.date && !focused" class="date">{{date}}</div>
  <div :class="`event ${focused ? 'focused' : 'unfocused'}`" @click="handleClick">
    <div v-if="event.tournamentname" class="name">{{event.tournamentname}}</div>
    <div v-if="event.location" class="location">{{event.location}}</div>
    <!-- <div v-if="event.price" class="price">${{event.price}}</div>
    <div v-if="event.type" class="type">{{event.type}}</div>
    <div v-if="event.link" class="link"><a :href="event.link">More info</a></div> -->
  </div>
</div>
</template>

<script>
export default {
  props: {
    event: {
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
  },
  computed: {
    date() {
      const date = new Date(this.event.date);
      return `${date.getUTCMonth() +
        1}.${date.getDate()}.${date.getFullYear()}`;
    },
  },
  methods: {
    handleClick() {
      if (this.focused) {
        this.unfocus();
      }
      if (this.focus) {
        this.focus(this.event.index);
      }
    },
  },
};
</script>

<style>
.focused {
  transition: width 0.5s;
  width: 100%;
}
.unfocused {
  transition: width 0.5s;
}
</style>
