<template>
  <div class="animation-container" @click="run">
    <Frames :frames="frames" :index="index" :container="AnimationBox" />
  </div>
</template>

<script>
import Frames from './Frames';
import frames from './frames/frame-list';
import AnimationBox from './AnimationBox';

export default {
  components: {
    Frames,
  },
  data() {
    return {
      index: 0,
      animationInterval: undefined,
      animationTimeout: undefined,
      frames,
      AnimationBox,
    };
  },
  methods: {
    next() {
      if (this.index < frames.length - 1) {
        this.index += 1;
      } else {
        this.index = 0;
      }
    },
    previous() {
      if (this.index > 0) {
        this.index -= 1;
      } else {
        this.index = 0;
      }
    },
    run() {
      if (this.animationTimeout) clearTimeout(this.animationTimeout);
      if (this.animationInterval) clearInterval(this.animationInterval);
      this.index = 0;
      this.animationInterval = setInterval(() => {
        if (this.index < frames.length - 1) {
          this.index += 1;
        } else {
          clearInterval(this.animationInterval);
          this.animationTimeout = setTimeout(() => {
            this.index = 0;
            clearTimeout(this.animationTimeout);
            this.animationTimeout = setTimeout(() => {
              this.run();
            }, 800);
          }, 10000);
        }
        return null;
      }, 150);
    },
  },
  mounted() {
    this.animationTimeout = setTimeout(() => {
      this.run();
    }, 800);
  },
  beforeDestroy() {
    if (this.animationTimeout) clearTimeout(this.animationTimeout);
    if (this.animationInterval) clearInterval(this.animationInterval);
  },
};
</script>

<style>

</style>
