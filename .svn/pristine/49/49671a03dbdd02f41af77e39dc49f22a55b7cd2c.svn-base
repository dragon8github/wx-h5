<template>
  <div class="mint-navbar" :class="{ 'is-fixed': fixed }">
    <slot></slot>
  </div>
</template>

<script>
/**
 * mt-navbar
 * @module components/navbar
 * @desc 顶部 tab，依赖 tab-item
 *
 * @param {boolean} [fixed=false] - 固定底部
 * @param {*} selected - 返回 item component 传入的 value
 *
 * @example
 * <mt-navbar :selected.sync="selected">
 *   <mt-tab-item value="订单">
 *     <span slot="label">订单</span>
 *   </mt-tab-item>
 * </mt-navbar>
 *
 * <mt-navbar :selected.sync="selected" fixed>
 *   <mt-tab-item :value="['传入数组', '也是可以的']">
 *     <span slot="label">订单</span>
 *   </mt-tab-item>
 * </mt-navbar>
 *
 */
export default {
  name: 'mt-navbar',
  props: {
    fixed: Boolean,
    value: {}
  }
};
</script>

<style lang="scss" scoped>
  @import "~@sass/_variables";
  @import "~@sass/_func";
.mint-navbar {
    background-color: #fff;
    // border-bottom: pxToRem(1px) solid #d4d4d4;
    display: flex;
    text-align: center;
    color:#333;
    &.is-fixed {
        position: fixed 0 0 * 0;
        z-index: 1;
    }
    .mint-tab-item {
        padding: pxToRem(30px) 0;
        font-size: pxToRem(15px);
        &:last-child {
            border-right: 0;
        }
        &.is-selected {
            border-bottom: pxToRem(4px) solid #2DA5FF;
        }
    }
}
</style>