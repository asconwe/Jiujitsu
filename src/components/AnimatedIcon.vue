<template>
  <div class="animated-icon">
    <Animation class="content"></Animation>
  </div>
</template>

<script>
import Animation from './Animation';

export default {
  name: 'App',
  components: {
    Animation,
  },
};
</script>

<style>
.animated-icon {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.content {
  width: 150px;
  margin-right: auto;
  margin-left: auto;
  overflow: hidden;
  margin-top: -30px;
  margin-bottom: 30px;
  stroke-width: 2;
}
</style>
