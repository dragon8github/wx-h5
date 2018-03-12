<template>
  <div id="app">
      <tabcontainer  v-model="active" swipeable>
        <tabcontaineritem style="background:red" id="tab-container1">
          <li v-for="n in 10" title="tab-container 1">{{ n }}</li>
        </tabcontaineritem>
         <tabcontaineritem style="background:yellow" id="tab-container2">
          <li v-for="n in 5" title="tab-container 2">{{ n }}</li>
        </tabcontaineritem>
         <tabcontaineritem style="background:blue" id="tab-container3">
          <li v-for="n in 3" title="tab-container 3">{{ n }}</li>
        </tabcontaineritem>
      </tabcontainer>
  </div>
</template>

<script>
import tabcontainer from 'components/tabcontainer/tabcontainer.vue'
import tabcontaineritem from 'components/tabContainerItem/tabContainerItem.vue'

  export default {
    name: 'app',
    data() {
      return {
        active: 'tab-container1'
      }
    },
    components: {
      tabcontainer,
      tabcontaineritem
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
