<template>
  <div id="app">
    <Header
      :animating="animating"
      :ignore-scroll="ignoreScroll"
      :accept-scroll="acceptScroll"
      :is-open="headerIsOpen"
      :open-header="openHeader"
      :close-header="closeHeader">
      <div class="filter">
        <StateTagContainer class="filter-row" :on-tag-update="handleStateTagUpdate"/>
        <DateRangeContainer class="filter-row" :on-range-update="handleDateRangeUpdate"/>
      </div>
    </Header>
    <div class="list-container">
      <List
        :events="events"
        :setFocusedEvent="setFocusedEvent"
        :unsetFocusedEvent="unsetFocusedEvent"
        :focusedEventIndex="focusedEventIndex"
        :focused="focused"
        :filter-state="filterState"
        :filter-date="filterDate"
        :sort-by="sortBy"/>
    </div>
  </div>
</template>

<script>
import Landing from './components/Landing';
import List from './components/List';
import StateTagContainer from './components/StateTagContainer';
import DateRangeContainer from './components/DateRangeContainer';
import Header from './components/Header';
import events from './data';

export default {
  name: 'App',
  components: {
    Landing,
    List,
    StateTagContainer,
    DateRangeContainer,
    Header,
  },
  data() {
    return {
      events: events.map((event, index) => ({ ...event, index })),
      sortBy: 'date',
      dateRange: [new Date()],
      filterState: [],
      filterDate: [new Date()],
      headerIsOpen: false,
      animating: false,
      focusedEventIndex: undefined,
      focused: false,
    };
  },
  methods: {
    setFocusedEvent(index) {
      this.focusedEventIndex = index;
      this.focused = true;
    },
    unsetFocusedEvent() {
      this.focusedEventIndex = null;
      this.focused = false;
    },
    openHeader() {
      this.headerIsOpen = true;
    },
    closeHeader() {
      this.headerIsOpen = false;
    },
    sort(column) {
      if (this.sortBy === column) {
        this.sortBy = `${column}Inverted`;
      } else {
        this.sortBy = column;
      }
    },
    handleDateRangeUpdate(range) {
      this.filterDate = range;
    },
    handleStateTagUpdate(arr) {
      this.filterState = arr;
    },
    ignoreScroll() {
      this.animating = true;
    },
    acceptScroll() {
      this.animating = false;
    },
  },
};
</script>

<style src="./assets/css/reset.css"/>

<style>
* {
  box-sizing: border-box;
}
body, html {
  height: 100%;
}
#app {
  position: relative;
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  width: 100%;
  overflow-x: hidden;
  overflow-y: auto;
  height: 100%;
}
.list-container {
  max-width: 600px;
  width: 100%;
  padding: 0 16px;
  margin-right: auto;
  margin-left: auto;
}
.filter-row {
  color: white;
  width: 100%;
  overflow: hidden;
  text-align: left;
  border-top: solid 0.5px #556;
  white-space: nowrap;
  padding-top: 10px;
  padding-bottom: 10px;
}
</style>
