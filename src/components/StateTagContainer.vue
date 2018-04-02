<template>
  <FilterRow>
    <span slot="caption">{{caption}}</span>
    <StyledTagInput
      slot="filter-input"
      placeholder="Add comma separated states"
      :tags="allTags"
      :superValidator="validateState"
      :onTagAdd="handleTagAdd"/>
    <TagList :handle-delete="handleDelete" slot="filter-output" :all-tags="allTags"/>
  </FilterRow>
</template>

<script>
import StyledTagInput from './StyledTagInput';
import FilterRow from './FilterRow';
import TagList from './TagList';
import states from '../assets/states';

export default {
  props: {
    onTagUpdate: {
      type: Function,
      required: false,
    },
    caption: {
      default: 'States',
      type: String,
    },
  },
  components: {
    StyledTagInput,
    FilterRow,
    TagList,
  },
  data() {
    return {
      allTags: [],
      states,
    };
  },
  methods: {
    validateState(acc, val) {
      const foundState = states.find(
        state =>
          state.abbr === val.toUpperCase() ||
          state.full.toUpperCase() === val.toUpperCase(),
      );
      if (
        foundState &&
        !this.allTags.includes(foundState.abbr) &&
        !acc.includes(foundState.abbr)
      ) {
        return acc.concat(foundState.abbr);
      }
      return acc;
    },
    handleDelete(index) {
      this.allTags = [
        ...this.allTags.slice(0, index),
        ...this.allTags.slice(index + 1),
      ];
      this.onTagUpdate(this.allTags);
    },
    handleTagAdd(tags) {
      this.allTags = tags;
      this.onTagUpdate(this.allTags);
    },
  },
};
</script>

<style>
.filter-input .tag-input-group {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100%;
  height: 50px;
  border: none;
  border-top: solid 1px #334;
  line-height: 0;
  padding: 0 50px 0 0;
  text-transform: uppercase;
}

.filter-input .tag-input-group button {
  width: 50px;
  height: 100%;
  margin: 0;
  border: 0;
  color: white;
  background: #334;
}

@keyframes flash {
  from {
    background: yellow;
  }
  to {
    background: white;
  }
}
.filter-input .tag-input-group input {
  width: 100%;
  height: 100%;
  padding-left: 4px;
  border: none;
  animation-name: flash;
  animation-duration: 1.5s;
  animation-delay: 0.1s;
}

@media only screen and (min-width: 600px) {
  .filter-input .tag-input-group {
    display: inline-block;
    position: relative;
    height: 35px;
    padding: 0;
  }
  .filter-input .tag-input-group input {
    width: 300px;
  }
  .filter-input .submit-button {
    display: none;
  }
}
</style>
