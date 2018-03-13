<template>
  <div>
      <button class="button" @click="handleClick" :disable="disable">
          {{ this.text }}
      </button>
  </div>
</template>

<script>
export default {
    name: 'mybutton',
    methods: {
        handleClick(evt) {
          if (!this.disable)  this.$emit('click', evt);
        }
    },
    props: {
        disable: Boolean,
        text: String
    }
};

</script>

<style lang='scss' scoped>
@import "~@sass/_variables";
@import "~@sass/_func";

.button {
    width: 100%;
    height: pxToRem(100px);
    background-color: #0e6ae7;
    border-radius: pxToRem(10px);
    font-size: pxToRem(36px);
    margin-bottom: pxToRem(30px);
    color: #fff;
    letter-spacing: pxToRem(2px);
    border: 0;

    &[disable] {
        background-color:#ccc;
    }
}
</style>
