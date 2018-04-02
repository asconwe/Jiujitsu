<template>
  <div class="row">
    <div class="caption">
      <slot name="caption"></slot>
    </div>
    <div class="filter-input">
      <slot name="filter-input"></slot>
    </div>
    <div class="filter-output">
      <slot name="filter-output"></slot>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style>
.row {
  font-size: 0px;
}
.caption {
  text-transform: uppercase;
  height: 50px;
  font-size: 14px;
  line-height: 50px;
  margin-left: 12px;
  width: 60px;
  display: inline-block;
}
.filter-input {
  display: inline-block;
  position: relative;
  margin-right: 10px;
  vertical-align: super;
}
.filter-output {
  display: inline-block;
}
</style>
