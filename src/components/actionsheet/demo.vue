<template>
   <div id="app">
      <!-- <router-view :class="{view: true}" ></router-view> -->
      <button  @click="sheetVisible = true">点击上拉 action sheet</button>
      <mt-actionsheet :actions="actions" v-model="sheetVisible"></mt-actionsheet>
  </div>
</template>

<script>  
import mtActionsheet from 'components/actionsheet/actionsheet.vue'
  export default {
    name: 'app',
    data () {
      return {
        actions: [{
        name: '拍照',
        method: this.takePhoto
        }, {
          name: '从相册中选择',
          method: this.openAlbum
        }],
        sheetVisible: false
      }
    },
    methods: {
      takePhoto() {
        console.log('taking photo');
      },
      openAlbum() {
        console.log('opening album');
      }
    },
    components: {
      mtActionsheet
    },
    created () {
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
