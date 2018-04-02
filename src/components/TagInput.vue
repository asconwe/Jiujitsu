<template>
<form class="input-form" @submit.prevent="handleSubmit">
  <input
    type="text"
    class="tag-input flash"
    :placeholder="placeholder"
    ref="input"
    v-model="tag"
    @blur="handleBlur"
    @keydown.enter="$emit('submit')"/>
  <button class="submit-button" @click="$emit('submit')">+</button>
</form>
</template>

<script>
export default {
  props: {
    validator: {
      type: Function,
      default: () => true,
    },
    superValidator: {
      type: Function,
    },
    onTagAdd: {
      type: Function,
      required: true,
    },
    tags: {
      type: Array,
      required: true,
    },
    placeholder: {
      type: String,
      default: 'Add comma separated tags',
    },
    handleBlur: {
      type: Function,
      default: () => undefined,
    },
    passInputRef: {
      type: Function,
    },
  },
  data() {
    return {
      tag: '',
    };
  },
  methods: {
    handleSubmit() {
      const tagInput = this.tag.split(',');
      this.tag = '';
      const newTags = typeof tagInput === 'object' ? tagInput : [tagInput];
      const trimmedTags = newTags.map(tag => tag.trim());
      const allTags =
        this.superValidator !== undefined
          ? trimmedTags.reduce(this.superValidator, []).concat(this.tags || [])
          : trimmedTags.filter(this.validator).concat(this.tags || []);
      this.onTagAdd(allTags);
    },
  },
  mounted() {
    if (this.passInputRef) this.passInputRef(this.$refs.input);
  },
};
</script>

<style>

</style>
