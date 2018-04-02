<template>
  <FilterRow>
    <span slot="caption">Dates</span>
    <DateRangeInput slot="filter-input" :range="range" :on-range-edit="onRangeUpdate"/>
  </FilterRow>
</template>

<script>
import DateRangeInput from './DateRangeInput';
import FilterRow from './FilterRow';

export default {
  props: {
    onRangeUpdate: {
      type: Function,
    },
  },
  components: {
    DateRangeInput,
    FilterRow,
  },
  data() {
    return {
      range: [new Date()],
    };
  },
};
</script>

<style>

</style>
