<template>
  <div :class="`t-group ${this.direction}`">
    <AnimatedIcon />
    <RowItem
      class="list-item"
      v-for="row in composedRows"
      :row="row"
      :key="row._id"
      :editing="editing"
      :toggle-editing="toggleEditing"
      @click="handleRowClick(row._id)" />
  </div>
</template>

<script>
import filterList from './filter-list/filter';
import RowItem from './RowItem';
import sort from '../assets/sideEffectFreeSort';
import AnimatedIcon from './AnimatedIcon';

export default {
  components: {
    RowItem,
    AnimatedIcon,
  },
  props: {
    events: {
      type: Array,
      required: true,
    },
    itemsPerPage: {
      type: Number,
      default: 5,
    },
    paginationIndex: {
      type: Number,
      default: 0,
    },
    sortBy: {
      type: String,
      default: 'date',
    },
    filterName: {
      type: Array,
      default: () => [],
    },
    filterDate: {
      type: Array,
      default: () => [new Date()],
    },
    filterState: {
      type: Array,
      default: () => [],
    },
    filterLocation: {
      type: Array,
      default: () => [],
    },
    filterPrice: {
      type: Object,
      default: () => ({
        low: 80,
        high: 100,
        active: false,
      }),
    },
    filterType: {
      type: Array,
      default: () => [],
    },
    setFocusedEvent: {
      type: Function,
    },
    unsetFocusedEvent: {
      type: Function,
    },
    focusedEventIndex: {
      type: Number,
    },
    focused: {
      type: Boolean,
    },
    editing: {
      type: Boolean,
    },
    nextPage: {
      type: Function,
    },
    previousPage: {
      type: Function,
    },
    toggleEditing: {
      type: Function,
    },
  },
  data() {
    return {
      direction: 'left',
    };
  },
  computed: {
    eventsEmpty() {
      return this.filteredEvents.length === 0;
    },
    filteredEvents() {
      if (this.focusedEventIndex) {
        return [
          {
            // eslint-disable-next-line
            ...this.events.find(event => event._id === this.focusedEventIndex),
            focused: true,
          },
        ];
      }
      const filteredEvents = filterList(this.events, [this.filterByState, this.filterByDate]);
      return filteredEvents;
    },
    sortedEvents() {
      const sortMethods = {
        price(sortedVal, unsortedVal) {
          return (
            (parseFloat(sortedVal.price) || -1) -
            (parseFloat(unsortedVal.price) || -1)
          );
        },
        priceInverted(sortedVal, unsortedVal) {
          return (
            (parseFloat(unsortedVal.price) || -1) -
            (parseFloat(sortedVal.price) || -1)
          );
        },
        date(sortedVal, unsortedVal) {
          const sortedDate = new Date(sortedVal.date);
          const unsortedDate = new Date(unsortedVal.date);
          return sortedDate.getTime() - unsortedDate.getTime();
        },
        dateInverted(sortedVal, unsortedVal) {
          const sortedDate = new Date(sortedVal.date);
          const unsortedDate = new Date(unsortedVal.date);
          return unsortedDate.getTime() - sortedDate.getTime();
        },
      };

      return sort(this.filteredEvents, sortMethods[this.sortBy]);
    },
    paginatedEvents() {
      return this.filterByPagination(this.sortedEvents);
    },
    composedRows() {
      // insert ad somewhere in here

      // if empty
      if (this.paginatedEvents.length === 0) {
        return [{ type: 'empty', _id: 'empty' }];
      }
      // not empty
      // if not on first page
      if (this.sortedEvents.length > this.itemsPerPage) {
        // and not on last page
        if (this.paginationIndex > 0) {
          // and not on last page
          if (
            this.paginationIndex <
            Math.floor(this.sortedEvents.length / this.itemsPerPage)
          ) {
            return [
              { type: 'previous', _id: 'previous' },
              ...this.paginatedEvents,
              { type: 'next', _id: 'next' },
            ];
          }
          // on last page
          return [
            { type: 'previous', _id: 'previous' },
            ...this.paginatedEvents,
          ];
        }
        // on first page
        return [...this.paginatedEvents, { type: 'next', _id: 'next' }];
      }
      return [...this.paginatedEvents];
    },
  },
  methods: {
    filterByName(event) {
      if (this.filterName.length > 0) {
        return this.filterName.includes(event.tournamentname);
      }
      return true;
    },
    filterByState(event) {
      if (this.filterState.length > 0) {
        return this.filterState.includes(event.state);
      }
      return true;
    },
    filterByType(event) {
      if (this.filterType.length > 0) {
        return this.filterType.includes(event.type);
      }
      return true;
    },
    filterByPrice(event) {
      if (this.filterPrice) {
        return (
          event.price > this.filterPrice.low &&
          event.price < this.filterPrice.high
        );
      }
      return true;
    },
    filterByDate(event) {
      if (this.filterDate.length === 1) {
        const filterTime = this.filterDate[0].getTime();
        const eventDate = new Date(event.date);
        return eventDate.getTime() > filterTime;
      }
      if (this.filterDate.length === 2) {
        const filterTimeStart = this.filterDate[0].getTime();
        const filterTimeEnd = this.filterDate[1].getTime() + (1000 * 60 * 60 * 24);
        const eventDate = new Date(event.date);
        const eventTime = eventDate.getTime();
        return eventTime > filterTimeStart && eventTime < filterTimeEnd;
      }
      return true;
    },
    filterByPagination(events) {
      if (events.length >= this.itemsPerPage) {
        return events.slice(
          this.paginationIndex * this.itemsPerPage,
          (this.paginationIndex + 1) * this.itemsPerPage,
        );
      }
      return events;
    },
    handleRowClick(_id) {
      // If it is an event-row, it has a numeric key
      if (!isNaN(parseInt(_id, 10))) {
        const index = parseInt(_id, 10);
        if (this.focusedEventIndex !== index) {
          return this.setFocusedEvent(index);
        }
        return this.unsetFocusedEvent(index);
      }
      if (_id === 'next') {
        this.direction = 'left';
        return this.nextPage();
      }
      if (_id === 'previous') {
        this.direction = 'right';
        return this.previousPage();
      }
      return null;
    },
  },
};
</script>

<style>
.t-group span {
  width: 100%;
}
</style>
