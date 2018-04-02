<template>
  <span>
  <div :class="`dummy-header ${filtersOpen}`"></div>
  <div
    :class="`header ${filtersOpen}`"
    tabindex="1" ref="header"
    @blur.capture="handleFocusout"
    @webkitTransitionEnd="handleTransitionEnd"
    @msTransitionEnd="handleTransitionEnd"
    @transitionend="handleTransitionEnd"
    @oTransitionEnd="handleTransitionEnd">
    <button class="toggle-filter-menu" @click="toggleFilterMenu">
      <FilterIcon />
    </button>
    <h2 class="site-title">GRAPPLING CALENDAR</h2>
    <slot />
  </div>
  </span>
</template>

<script>
import FilterIcon from './FilterIcon';

export default {
  props: {
    animating: {
      type: Boolean,
      default: false,
    },
    ignoreScroll: {
      type: Function,
      required: true,
    },
    acceptScroll: {
      type: Function,
      required: true,
    },
    isOpen: {
      type: Boolean,
      default: false,
    },
    closeHeader: {
      type: Function,
      required: true,
    },
    openHeader: {
      type: Function,
      required: true,
    },
  },
  components: {
    FilterIcon,
  },
  computed: {
    filtersOpen() {
      return this.isOpen ? 'filters-open' : 'filters-closed';
    },
  },
  methods: {
    toggleFilterMenu() {
      this.ignoreScroll();
      if (this.isOpen) {
        this.closeHeader();
      } else {
        this.openHeader();
      }
    },
    handleFocusout(e) {
      if (e.path) {
        if (e.path.find(path => path.className === 'filter')) {
          return this.$refs.header.focus();
        }
      }
      if (e.relatedTarget === null) {
        this.closeHeader();
      }
      return null;
    },
    handleScroll() {
      if (!this.animating) {
        this.closeHeader();
      }
    },
    handleTransitionEnd() {
      this.acceptScroll();
    },
  },
  beforeMount() {
    window.addEventListener('scroll', this.handleScroll);
  },
  beforeDestroy() {
    window.removeEventListener('scroll', this.handleScroll);
  },
};
</script>

<style>
.header {
  z-index: 10;
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  height: 70px;
  padding-top: 70px;
  margin-bottom: 10px;
  background: #2b2b3c;
  overflow: hidden;
  box-shadow: 0 2px 5px #223;
}
.dummy-header {
  height: 70px;
  margin-bottom: 20px;
}
.toggle-filter-menu {
  position: absolute;
  top: 10px;
  left: 10px;
  width: 50px;
  height: 50px;
  color: #aab;
  background: none;
  padding: 0;
  border: none;
  cursor: pointer;
  border-radius: 50%;
}
.filters-closed {
  transition: height 0.3s;
}
.filters-open {
  transition: height 0.3s;
  height: 230px;
}
.site-title {
  position: absolute;
  top: 20px;
  right: 20px;
  color: #bbc;
  font-weight: bold;
  font-size: 30px;
}

@media only screen and (max-width: 433px) {
  .site-title {
    font-size: 25px;
  }
}
@media only screen and (max-width: 373px) {
  .site-title {
    font-size: 20px;
  }
}
</style>
