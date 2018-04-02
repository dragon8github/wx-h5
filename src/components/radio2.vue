<template>
  <div class="mint-radiolist" @change="$emit('change', currentValue)">
    <x-cell v-for="(option, index) in options" style="background-image: none;" :key="index">
      <label class="mint-radiolist-label" slot="title">
        <span
          :class="{'is-right': align === 'right'}"
          class="mint-radio">
          <input
            class="mint-radio-input"
            type="radio"
            v-model="currentValue"
            :disabled="option.disabled"
            :value="option.value || option">
          <span class="mint-radio-core"></span>
        </span>
        <span class="mint-radio-label" v-text="option.label || option"></span>
      </label>
    </x-cell>
  </div>
</template>

<script>
import XCell from './../components/cell.vue'

/**
 * mt-radio
 * @module components/radio
 * @desc 单选框列表，依赖 cell 组件
 *
 * @param {string[], object[]} options - 选项数组，可以传入 [{label: 'label', value: 'value', disabled: true}] 或者 ['ab', 'cd', 'ef']
 * @param {string} value - 选中值
 * @param {string} title - 标题
 * @param {string} [align=left] - checkbox 对齐位置，`left`, `right`
 *
 * @example
 * <mt-radio v-model="value" :options="['a', 'b', 'c']"></mt-radio>
 */
export default {
  name: 'mt-radio',

  props: {
    title: String,
    align: String,
    options: {
      type: Array,
      required: true
    },
    value: String|Number
  },

  data() {
    return {
      currentValue: this.value
    };
  },

  watch: {
    value(val) {
      this.currentValue = val;
    },
    currentValue(val) {
      // 触发内置的Input事件，该事件的作用是更新组件上的model，第二个参数为更新的值
      this.$emit('input', val);
    }
  },

  components: {
    XCell
  }
};
</script>

<style lang="scss" scope>
@import "~@sass/_variables";
@import "~@sass/_func";

.mint-radiolist {

      @include flex(s);

      /* 李钊鸿添加 */            
      .mint-cell-wrapper {
          background-image: none !important;
          padding:0 !important;

          &:after {
              display: none;
          }
      }
  
      .mint-cell {
        padding: 0;
      }

      .mint-radiolist-label {
        display: block;
        padding:0 pxToRem(40px);
      }

      .mint-radiolist-title {
        font-size: pxToRem(30px);
        margin: pxToRem(30px);
        display: block;
        color: #333333;
      }  

      .mint-radio-label {
          vertical-align: middle;
          margin-left: pxToRem(5px);
          font-size: pxToRem(30px);
          line-height: pxToRem(55px);
      }
}

.mint-radio {
  &.is-right {
    float:right;
  }

  .mint-radio-input {
     display: none;

      &:checked {
        + .mint-radio-core {
          background-color: #fff;
          border-color: #999999;

          &::after {
            background-color: #ffba00;
            transform: scale(1);
          }
        }
      }

      &[disabled] + .mint-radio-core {
        background-color: #d9d9d9;
        border-color: #ccc;
      }
  }

  .mint-radio-core {
    box-sizing: border-box;
    display: inline-block;
    background-color: white;
    border-radius: 100%;
    border: 1px solid #999999;
    position: relative;
    height:pxToRem(20px * 2);
    width:pxToRem(20px * 2);
    vertical-align: middle;


   &::after {
     content: " ";
     border-radius: 100%;
     position: absolute;
     top:pxToRem(5.6px * 2);
     left:pxToRem(5.6px * 2);
     width:pxToRem(8px * 2);
     height:pxToRem(8px * 2);
     transition: transform .2s;
     transform: scale(0);
   }
  }
}
</style>
