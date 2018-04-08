<template>
<div >
  <div v-if="row.date && !row.focused" class="date">{{date}}</div>
  <div :class="`row ${row.focused ? 'focused' : 'unfocused'}`" @click="handleClickOfUnfocused">
    <div v-if="row.tournamentname" class="name">{{row.tournamentname}}</div>
    <div v-if="row.location" class="location">{{row.location}}</div>
    <span v-if="row.focused">
      <div v-if="row.price" class="price focused-event-info">${{row.price}}</div>
      <div v-if="row.type" class="type focused-event-info">Type: {{row.type}}</div>
      <button v-if="row.link" class="link focused-event-info" @click.stop>
        <a class="event-link" target="_blank" :href="row.link">More info</a>
      </button>
      <button class="link focused-event-info" @click.stop>
        <a class="event-link" target="_blank" :href="row.link">Edit</a>
      </button>
      <div v-if="date" class="date focused-event-info">{{date}}</div>
      <button @click="handleClickOfUnfocusButton" class="close-button">
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
    row: {
      type: Object,
      required: true
    },
    focus: {
      type: Function
    },
    unfocus: {
      type: Function
    },
    focused: {
      type: Boolean
    }
  },
  computed: {
    date() {
      const date = new Date(this.row.date);
      return `${date.getUTCMonth() +
        1}.${date.getDate()}.${date.getFullYear()}`;
    }
  },
  methods: {
    handleClickOfUnfocused() {
      if (!this.row.focused) {
        this.$emit("click");
      }
    },
    handleClickOfUnfocusButton() {
      console.log(this.row.focused);
      if (this.row.focused) {
        this.$emit("click");
      }
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
.row:hover {
  box-shadow: 2px 4px 8px #445;
}
.row:active {
  transform-style: preserve-3d;
  transform: translateY(2px) translateZ(-1em);
  box-shadow: 2px 3px 7px #334;
}
.focused {
  transition: width 0.5s;
  width: 100%;
  cursor: auto;
  min-height: 100px;
}
.unfocused {
  transition: width 0.5s;
}
.date.focused-event-info {
  position: absolute;
  bottom: 16px;
  right: 16px;
  margin-bottom: 0;
  font-size: 20px;
}
.focused-event-info {
  font-size: 16px;
  line-height: 20px;
  margin-bottom: 4px;
}
.link.focused-event-info {
  border: solid 1px #556;
  width: 100px;
  text-align: center;
  padding: 4px;
  margin-bottom: 0;
  cursor: pointer;
  background: none;
  margin-right: 4px;
}
.link.focused-event-info:hover {
  background: #445;
}
.event-link {
  color: white;
  text-decoration: none;
}
.date {
  float: left;
  padding-top: 16px;
}
.location {
  display: block;
  font-size: 16px;
  font-weight: bold;
  line-height: 20px;
  margin-bottom: 4px;
}
.name {
  padding-bottom: 4px;
}
.focused .location {
  padding-right: 100px;
}
.type {
  margin-bottom: 8px;
}
.close-button {
  cursor: pointer;
  position: absolute;
  top: 16px;
  right: 16px;
  background: none;
  color: white;
  border: solid 1px #556;
  border-radius: 50%;
  padding: 4px;
  width: 30px;
  height: 30px;
}

.close-button:hover {
  background: #445;
}
</style>
