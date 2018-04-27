<template>
  <div class="event-row focused">
    <div class="row-content">
    <div v-if="row.tournamentname" class="name">{{row.tournamentname}}</div>
    <div v-if="row.location" class="location">{{row.location}}</div>
    <span>
      <div v-if="row.price" class="price focused-event-info">${{row.price}}</div>
      <div v-if="row.type" class="type focused-event-info">Type: {{row.type}}</div>
      <a class="event-link" target="_blank" :href="row.link">
        <button v-if="row.link" class="link focused-event-info" @click.stop>
            More info
        </button>
      </a>
      <button @click="toggleEditing" class="link focused-event-info" @click.stop>
        <p class="event-link">Cancel</p>
      </button>
      <div v-if="date" class="date focused-event-info">{{date}}</div>
      <button @click="handleClickOfUnfocusButton" class="close-button">
        <svg class="close-tag" viewBox="0 0 52 52">
          <path stroke-width="6" stroke="currentcolor" d="M16 16 36 36 M36 16 16 36" />
        </svg>
      </button>
    </span>
    </div>
    <div>
      <p class="suggestion-caption">Suggest an edit to the event details:</p>
      <textarea class="suggestion-box" v-model="suggestionBody"/>
      <div class="suggestion-button-container">
      <button class="submit-suggestion-button">Send my suggestion!</button>
      </div>
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
  data() {
    return {
      suggestionBody: '',
    };
  },
  computed: {
    date() {
      const date = new Date(this.row.date);
      return `${date.getUTCMonth() +
        1}.${date.getDate()}.${date.getFullYear()}`;
    },
  },
  methods: {
    handleClickOfUnfocusedElement() {
      if (!this.row.focused) {
        this.$emit('click');
      }
    },
    handleClickOfUnfocusButton() {
      this.toggleEditing();
      if (this.row.focused) {
        this.$emit('click');
      }
    },
  },
};
</script>

<style src="../assets/css/row.css" />
<style src="../assets/css/row-focused.css" />

<style scoped>
.suggestion-box {
  width: 100%;
  display: block;
  resize: none;
  margin-bottom: 8px;
}
.row-content {
  margin-bottom: 16px;
}
.suggestion-caption {
  margin-bottom: 8px;
}
.submit-suggestion-button {
  margin: 0;
}
.suggestion-button-container {
  text-align: right;
}
</style>
