<template>
<div>
test
  <component :is="listComponent" :list="filteredList"/>
</div>
</template>

<script>
export default {
  props: {
    list: {
      type: Array,
      required: true
    },
    criteria: {
      type: Array,
      required: true
    },
    listComponent: {
      required: true
    }
  },
  methods: {
    meetsAllCriteria(item, criteria) {
      console.log("test");

      const validItems = criteria.filter(criterion => criterion(item));
      return validItems.length === criteria.length;
    }
  },
  computed: {
    filteredList() {
      const list = this.list.filter(item =>
        this.meetsAllCriteria(item, this.criteria)
      );
      return list;
    }
  }
};
</script>

<style>

</style>
