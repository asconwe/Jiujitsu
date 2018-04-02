<template>
  <transition-group name="tags">
    <div class="tag-box" v-for="(tag, index) in allTags" :key="tag">
      <p class="tag">{{tag}}</p>
      <button
        class="close-tag-button"
        @click="handleDelete(index)"
        :aria-labelledby="`Remove ${tag} from filter`">
        <svg class="close-tag" viewBox="0 0 52 52">
          <path stroke-width="6" stroke="currentcolor" d="M16 16 36 36 M36 16 16 36" />
        </svg>
      </button>
    </div>
  </transition-group>
</template>

<script>
export default {
  props: {
    allTags: {
      type: Array,
    },
    handleDelete: {
      type: Function,
      required: true,
    },
  },
};
</script>

<style>
.tag-box {
  display: inline-block;
  color: white;
  padding: 5px;
  margin: 5px 5px 0 0;
  transition: all 0.3s;
}
.tag {
  display: inline-block;
  margin-right: 5px;
  font-size: 14px;
}
.close-tag-button {
  padding: 0;
  border-radius: 8px;
  border: solid 1px #556;
  background: #334;
  width: 15px;
  height: 15px;
  cursor: pointer;
  display: inline-block;
  vertical-align: top;
}
.close-tag-button:hover {
  background: #667;
}
.close-tag {
  width: 100%;
  color: white;
}

.tags-leave-active {
  position: absolute;
}
.tags-enter,
.tags-leave-to {
  opacity: 0;
  transform: translateY(30px);
}
.tags-move {
  transition: transform 0.3s;
}
</style>
