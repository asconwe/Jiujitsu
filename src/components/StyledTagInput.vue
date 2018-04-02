<template>
<span id="tag-input">
    <transition  name="grow" mode="out-in" @enter="handleEnter">
      <span v-if="!adding" class="add-button-container">
        <button
          key="add-button"
          class="add-button"
          @click="handleClick"><PlusIcon class="plus-icon"/></button>
          </span>
      <TagInput
        v-else
        key="adding"
        class="tag-input-group"
        v-bind="$props"
        :handle-blur="handleBlur"
        :pass-input-ref="handleInputRef"></TagInput>
    </transition>
  </span>
</template>

<script>
import TagInput from './TagInput';
import PlusIcon from './PlusIcon';

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
  },
  components: {
    TagInput,
    PlusIcon,
  },
  data() {
    return {
      adding: false,
      inputRef: undefined,
    };
  },
  methods: {
    handleClick() {
      this.adding = true;
    },
    handleBlur() {
      this.adding = false;
    },
    handleEnter() {
      if (this.inputRef) this.inputRef.focus();
    },
    handleInputRef(ref) {
      this.inputRef = ref;
    },
  },
};
</script>

<style>
.add-button-container {
  display: inline-block;
  vertical-align: -40%;
  margin-right: 10px;
}
.add-button {
  position: relative;
  cursor: pointer;
  padding: 3px;
  background: none;
  border: solid 1px white;
  width: 20px;
  height: 20px;
  color: white;
  line-height: 0;
}
.add-button:hover {
  background: #445;
}
.add-button:active {
  background: #556;
}
.plus-icon {
  width: 100%;
}
#tag-input .grow-enter-active,
#tag-input .grow-leave-active {
  transition: opacity 0.2s;
}
#tag-input .grow-enter-active {
  opacity: 1;
}
#tag-input .grow-enter,
#tag-input .grow-leave-active {
  opacity: 0;
}
</style>
