<template>
  <span class="row-container">
    <ButtonRow
      v-if="row.type === 'next'"
      @click="$emit('click')"
      :row="row"/>
    <ButtonRow
      v-else-if="row.type === 'previous'"
      @click="$emit('click')"
      :row="row"/>
    <AdRow
      v-else-if="row.type === 'ad'"
      @click="$emit('click')"
      :row="row"/>
    <EmptyRow
      v-else-if="row.type === 'empty'"
      :row="row" />
    <EventRow
      v-else-if="row.focused"
      @click="$emit('click')"
      :row="row" />
    <EventRow
      v-else
      @click="$emit('click')"
      :row="row"/>
  </span>
</template>

<script>
import EmptyRow from './EmptyRow';
import EventRow from './EventRow';
import ButtonRow from './ButtonRow';
import AdRow from './AdRow';

export default {
  props: {
    row: {
      type: Object,
      required: true,
    },
  },
  components: {
    EventRow,
    ButtonRow,
    AdRow,
    EmptyRow,
  },
};
</script>

<style>

</style>
