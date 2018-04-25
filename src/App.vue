<template>
  <div id="app" ref="app">
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
      <List v-if="events.length > 0"
        :events="events"
        :pagination-index="paginationIndex"
        :items-per-page="10"
        :next-page="nextPage"
        :previous-page="previousPage"
        :set-focused-event="setFocusedEvent"
        :unset-focused-event="unsetFocusedEvent"
        :focused-event-index="focusedEventIndex"
        :focused="focused"
        :editing="editing"
        :toggle-editing="toggleEditing"
        :filter-state="filterState"
        :filter-date="filterDate"
        :sort-by="sortBy"/>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

import Landing from './components/Landing';
import List from './components/List';
import StateTagContainer from './components/StateTagContainer';
import DateRangeContainer from './components/DateRangeContainer';
import Header from './components/Header';
import db from './database/database';
import { readAllEvents, writeEventsFromChanges, updatedAt, saveUpdateTime } from './database/controller';

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
      events: [],
      paginationIndex: 0,
      sortBy: 'date',
      dateRange: [new Date()],
      filterState: [],
      filterDate: [new Date()],
      headerIsOpen: false,
      animating: false,
      focusedEventIndex: undefined,
      focused: false,
      editing: false,
      scrollTop: 0,
      scrollToInterval: undefined,
      db,
    };
  },
  mounted() {
    // read events from db
    readAllEvents()
      .then((events) => {
        console.log(events);
        if (events.length === 0) {
          // API.getAllEvents()
          saveUpdateTime();
          return axios.get('/api/changes');
        }
        this.events = events;
        saveUpdateTime();
        return axios.get(`/api/changes/${updatedAt()}`);
      })
      .then((result) => {
        console.log(result);
        if (result.data.length > 0) {
          writeEventsFromChanges(result.data);
          this.events = this.events.concat(result.data.map(change => change.eventId));
        }
      })
      .catch((err) => {
        console.log('err:::::', err);
      });
  },
  beforeDestroy() {
    clearInterval(this.scrollToInterval);
  },
  methods: {
    nextPage() {
      this.paginationIndex += 1;
    },
    previousPage() {
      this.paginationIndex -= 1;
    },
    setFocusedEvent(index) {
      this.scrollTop = this.$refs.app.scrollTop;
      this.focusedEventIndex = index;
    },
    unsetFocusedEvent() {
      this.focusedEventIndex = null;
      this.scrollApp(200);
    },
    scrollApp(duration) {
      const startPosition = this.$refs.app.scrollTop;
      const endPosition = this.scrollTop;
      const increment = (endPosition - startPosition) / (duration / 5);
      this.scrollToInterval = setInterval(() => {
        this.$refs.app.scrollTop += increment;
        if (this.$refs.app.scrollTop >= this.scrollTop) {
          clearInterval(this.scrollToInterval);
        }
      }, 2);
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
      this.paginationIndex = 0;
    },
    handleStateTagUpdate(arr) {
      this.filterState = arr;
      this.paginationIndex = 0;
    },
    ignoreScroll() {
      this.animating = true;
    },
    acceptScroll() {
      this.animating = false;
    },
    toggleEditing() {
      this.editing = !this.editing;
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
@supports (-webkit-overflow-scrolling: touch) {
  /* CSS specific to iOS devices */
  * {
      cursor: pointer;
  }
}

</style>
