<template>
  <div class="mint-spinner-snake" :style="{
    'border-top-color': spinnerColor,
    'border-left-color': spinnerColor,
    'border-bottom-color': spinnerColor,
    'height': spinnerSize,
    'width': spinnerSize,
    'border-width': spinnerBoderWidth
    }">
  </div>
</template>

<script>
  import common from './common.vue';

  export default {
    name: 'snake',

    mixins: [common]
  };
</script>

<style lang="scss" scoped>
  .mint-spinner-snake {
    animation: mint-spinner-rotate 0.8s infinite linear;
    border: 4px solid transparent;
    border-radius: 50%;
    margin:auto;
  }

  @keyframes mint-spinner-rotate {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
</style>
