<template>
<div>
  <div v-if="event.date && !focused" class="date">{{date}}</div>
  <div :class="`event ${focused ? 'focused' : 'unfocused'}`" @click="handleFocus">
    <div v-if="event.tournamentname" class="name">{{event.tournamentname}}</div>
    <div v-if="event.location" class="location">{{event.location}}</div>
    <span v-if="focused">
      <div v-if="event.price" class="price focused-event-info">${{event.price}}</div>
      <div v-if="event.type" class="type focused-event-info">Type: {{event.type}}</div>
      <div v-if="event.link" class="link focused-event-info" @click.stop>
        <a class="event-link" target="_blank" :href="event.link">More info</a>
      </div>
      <div v-if="date" class="date focused-event-info">{{date}}</div>
      <button @click="handleUnfocus" class="close-button">
        <svg class="close-tag" viewBox="0 0 52 52">
          <path stroke-width="6" stroke="currentcolor" d="M16 16 36 36 M36 16 16 36" />
        </svg>
      </button>
    </span>
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
    handleFocus() {
      if (!this.focused) {
        this.focus(this.event.index);
      }
    },
    handleUnfocus() {
      if (this.focused) {
        this.unfocus();
      }
    }
  }
};
</script>

<style>

</style>
