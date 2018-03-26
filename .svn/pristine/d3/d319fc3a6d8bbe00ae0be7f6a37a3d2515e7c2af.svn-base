<template>
  <div id="app">
      <navbar v-model="selected">
        <tabitem id="1">选项一</tabitem>
        <tabitem id="2">选项二</tabitem>
        <tabitem id="3">选项三</tabitem>
      </navbar>
  </div>
</template>

<script>
import navbar from 'components/navbar/navbar.vue'
import tabitem from 'components/tabItem/tabItem.vue'

  export default {
    name: 'app',
    data() {
      return {
        selected: '1'
      }
    },
    components: {
        navbar,
        tabitem
    }   
  }
</script>

<style lang="scss" scoped>
  @import "sass/variables";
  @import "sass/func";
  .view {
    width: pxToRem(750px);
    height: 100vh;
    margin: 0 auto;
    position: relative;
    transition: all .3s ease-in-out;
    box-sizing: border-box;
    background-color: $bg;
  }
</style>
