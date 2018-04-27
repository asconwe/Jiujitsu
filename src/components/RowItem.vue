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
    <EditingEventRow
      v-else-if="row.focused && editing"
      :toggle-editing="toggleEditing"
      @click="$emit('click')"
      :row="row" />
    <FocusedEventRow
      v-else-if="row.focused"
      :toggle-editing="toggleEditing"
      @click="$emit('click')"
      :row="row" />
    <EventRow
      v-else
      :toggle-editing="toggleEditing"
      @click="$emit('click')"
      :row="row"/>
  </span>
</template>

<script>
import EmptyRow from './EmptyRow';
import EventRow from './EventRow';
import ButtonRow from './ButtonRow';
import AdRow from './AdRow';
import FocusedEventRow from './FocusedEventRow';
import EditingEventRow from './EditingEventRow';

export default {
  props: {
    row: {
      type: Object,
      required: true,
    },
    editing: {
      type: Boolean,
    },
    toggleEditing: {
      type: Function,
    },
  },
  components: {
    EventRow,
    ButtonRow,
    AdRow,
    EmptyRow,
    EditingEventRow,
    FocusedEventRow,
  },
};
</script>

<style>

</style>
