<template>
  <div>
      <button class="button" @click="handleClick" :disabled="disabled" >
          {{ this.text }}
      </button>
  </div>
</template>

<script>
export default {
    name: 'mybutton',
    methods: {
        handleClick(evt) {
          this.$emit('click', evt);
        },
        px2rem (v) {
            return window.px2rem(v)
        }
    },
    props: {
        disabled: Boolean,
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
