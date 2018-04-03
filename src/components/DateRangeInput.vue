<template>
    <form @submit.prevent="handleSubmit" class="date-form">
      <p class="range text-start">
        Start
      </p>
      <input
        class="date-input range start"
        type="date"
        @change="handleStart"
        :min="today.toJSON().slice(0, 10)"
        :value="start" />
      <transition name="fade" mode="out-in" @after-enter="handleAfterEnter">
        <span v-if="showRangeEnd" class="end-group">
          <input
            class="date-input range end"
            type="date" @change="handleEnd"
            :min="localStart || today.toJSON().slice(0, 10)"
            ref="rangeEnd" :value="end" />
          <p class="range text-end">End</p>
        </span>
        <button v-else class="range button" @click="showEnd">Add End Date</button>
      </transition>
    </form>
</template>

<script>
export default {
  props: {
    onRangeEdit: {
      type: Function,
    },
    dateRange: {
      type: Array,
      validator: (arr) => {
        const filtArr = arr.filter(val => val instanceof Date);
        return arr.length < 3 && filtArr.length === arr.length;
      },
      default: () => [new Date()],
    },
  },
  data() {
    return {
      today: new Date(),
      localStart: '',
      localEnd: '',
      showRangeEnd: false,
    };
  },
  computed: {
    start() {
      return this.localStart || this.dateRange[0].toJSON().slice(0, 10);
    },
    end() {
      return this.localEnd || this.dateRange[1]
        ? this.localEnd || this.dateRange[1].toJSON().slice(0, 10)
        : this.start;
    },
  },
  methods: {
    handleSubmit() {
      const range = this.localEnd
        ? [new Date(this.start), new Date(this.end)]
        : [new Date(this.start)];
      this.onRangeEdit(range);
    },
    handleStart(e) {
      this.localStart = e.target.value;
      this.handleSubmit();
    },
    handleEnd(e) {
      if (!e.target.value) {
        this.showRangeEnd = false;
        this.localEnd = null;
      } else {
        this.localEnd = e.target.value;
      }
      this.handleSubmit();
    },
    showEnd() {
      this.showRangeEnd = true;
    },
    showStart() {
      this.showRangeStart = true;
    },
    handleAfterEnter() {
      if (this.$refs.rangeEnd) this.$refs.rangeEnd.click();
    },
  },
};
</script>

<style scoped>
form.date-form {
  font-size: 0px;
}
input.date-input {
  position: relative;
  padding: 6px;
  vertical-align: top;
  font-size: 16px;
}
.date-input::-webkit-calendar-picker-indicator {
    position: absolute;
    width: 100%;
    opacity: 0;
}
.date-input::-webkit-inner-spin-button {
  display: none;
}
.date-input::-webkit-clear-button {
  z-index: 10
}
.range {
  padding: 6px;
  display: inline-block;
  height: 30px;
  background: none;
  border: solid 1px white;
  border-radius: 0px;
  color: white;
  font-family: "Roboto", sans-serif;
  font-weight: lighter;
  font-size: 14px;
  line-height: 16px;
  margin: 0;
}
.start,
.text-end {
  border-left: none;
}
.text-start,
.end {
  border-right: none;
}

.text-start,
.text-end {
  width: 80px;
}
.text-end {
  text-align: right;
}
.button {
  cursor: pointer;
}
.button:hover {
  background: #445;
}
.button:active {
  background: #556;
}
.end-group {
  display: block;
}
.fade-enter-active,
.fade-leave-active {
  transition: all 0.2s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
  width: 0px;
}
</style>
