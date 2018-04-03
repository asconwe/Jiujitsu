<template>
  <div class="t-group">
    <AnimatedIcon />
    <transition-group  name="list">
      <EventRow
        v-if="eventsEmpty"
        class="list-item"
        :event="{location: `No events for the dates and locations you\'ve specified.`}"
        key="emppty" />
      <EventRow
        v-else-if="focused"
        :unfocus="unsetFocusedEvent"
        :focused="focused"
        class="list-item"
        v-for="event in sortedEvents"
        :event="event"
        :key="`${event.tournamentname}${event.location}${event.date}`" />
      <EventRow
        v-else class="list-item"
        v-for="event in sortedEvents"
        :focus="setFocusedEvent"
        :event="event"
        :key="`${event.tournamentname}${event.location}${event.date}`" />
    </transition-group>
  </div>
</template>

<script>
import EventRow from './EventRow';
import sort from '../assets/sideEffectFreeSort';
import AnimatedIcon from './AnimatedIcon';

export default {
  components: {
    EventRow,
    AnimatedIcon,
  },
  props: {
    events: {
      type: Array,
      required: true,
    },
    itemsPerPage: {
      type: Number,
      default: 15,
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
  },
  computed: {
    eventsEmpty() {
      return this.filteredEvents.length === 0;
    },
    filteredEvents() {
      if (this.focusedEventIndex) {
        return [
          this.events.find(event => event.index === this.focusedEventIndex),
        ];
      }
      const nameFilteredEvents = this.filterByName(this.events);
      const stateFilteredEvents = this.filterByState(nameFilteredEvents);
      const locationFilteredEvents = this.filterByLocation(stateFilteredEvents);
      const priceFilteredEvents = this.filterByPrice(locationFilteredEvents);
      const typeFilteredEvents = this.filterByType(priceFilteredEvents);
      const dateFilteredEvents = this.filterByDate(typeFilteredEvents);
      return dateFilteredEvents;
    },
    sortedEvents() {
      // by price for  now
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
  },
  methods: {
    filterByName(events) {
      if (this.filterName.length > 0) {
        return events.filter(event =>
          this.filterName.includes(event.tournamentname),
        );
      }
      return events;
    },
    filterByState(events) {
      if (this.filterState.length > 0) {
        return events.filter(event => this.filterState.includes(event.state));
      }
      return events;
    },
    filterByLocation(events) {
      if (this.filterLocation.length > 0) {
        return events.filter(event =>
          this.filterLocation.includes(event.location),
        );
      }
      return events;
    },
    filterByType(events) {
      if (this.filterType.length > 0) {
        return events.filter(event => this.filterType.includes(event.type));
      }
      return events;
    },
    filterByPrice(events) {
      if (this.filterPrice.active) {
        return events.filter(
          event =>
            event.price > this.filterPrice.low &&
            event.price < this.filterPrice.high,
        );
      }
      return events;
    },
    filterByDate(events) {
      if (this.filterDate.length === 1) {
        const filterTime = this.filterDate[0].getTime();
        return events.filter((event) => {
          const eventDate = new Date(event.date);
          return eventDate.getTime() > filterTime;
        });
      }
      if (this.filterDate.length === 2) {
        const filterTimeStart = this.filterDate[0].getTime();
        const filterTimeEnd =
          this.filterDate[1].getTime() + (1000 * 60 * 60 * 24);
        return events.filter((event) => {
          const eventDate = new Date(event.date);
          const eventTime = eventDate.getTime();
          return eventTime > filterTimeStart && eventTime < filterTimeEnd;
        });
      }
      return events;
    },
    filterByPagination(events) {
      return events.slice(
        this.paginationIndex * this.itemsPerPage,
        (this.paginationIndex + 1) * this.itemsPerPage,
      );
    },
  },
};
</script>

<style>
.event {
  z-index: 1;
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
.event:hover {
  transform-style: preserve-3d;
  transform: translateY(1px) translateZ(-1em);
  transform: translateY(-1px);
  box-shadow: 2px 4px 8px #445;
}
.event:active {
  transform-style: preserve-3d;
  transform: translateY(1px) translateZ(-1em);
  box-shadow: 2px 3px 7px #334;
}
.event {
  position: relative;
}
.focused {
  transition: width 0.5s;
  width: 100%;
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
  border: solid 1px white;
  width: 100px;
  text-align: center;
  padding: 4px;
  margin-bottom: 0;
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
  line-height: 1.5em;
  margin-bottom: 4px;
}
.name {
  padding-bottom: 4px;
}
.list-item {
  transition: all 0.5s;
  display: inline-block;
  width: 100%;
}
.list-enter {
  opacity: 0;
  transform: translateX(-800px);
}
.list-leave-to {
  opacity: 0;
  transform: translateX(800px);
}
.list-leave-active {
  position: absolute;
}

.t-group span {
  width: 100%;
}
</style>
