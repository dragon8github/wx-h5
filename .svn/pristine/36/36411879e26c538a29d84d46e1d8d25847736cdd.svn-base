<template>
  <div @change="$emit('change', currentValue)" class="mint-checklist" :class="{ 'is-limit': max <= currentValue.length }">
    <label class="mint-checklist-title" v-text="title"></label>
    <x-cell v-for="(option,index) in options" :key="index">
      <label class="mint-checklist-label" slot="title">
        <span
          :class="{'is-right': align === 'right'}"
          class="mint-checkbox">
          <input
            class="mint-checkbox-input"
            type="checkbox"
            v-model="currentValue"
            :disabled="option.disabled"
            :value="option.value || option">
          <span class="mint-checkbox-core"></span>
        </span>
        <span class="mint-checkbox-label" v-text="option.label || option"></span>
      </label>
    </x-cell>
  </div>
</template>

<script>
import XCell from './../components/cell.vue';

/**
 * mt-checklist
 * @module components/checklist
 * @desc 复选框列表，依赖 cell 组件
 *
 * @param {(string[]|object[])} options - 选项数组，可以传入 [{label: 'label', value: 'value', disabled: true}] 或者 ['ab', 'cd', 'ef']
 * @param {string[]} value - 选中值的数组
 * @param {string} title - 标题
 * @param {number} [max] - 最多可选的个数
 * @param {string} [align=left] - checkbox 对齐位置，`left`, `right`
 *
 *
 * @example
 * <mt-checklist :v-model="value" :options="['a', 'b', 'c']"></mt-checklist>
 */
export default {
  name: 'mt-checklist',

  props: {
    max: Number,
    title: String,
    align: String,
    options: {
      type: Array,
      required: true
    },
    value: Array
  },

  components: { XCell },

  data() {
    return {
      currentValue: this.value
    };
  },

  computed: {
    limit() {
      return this.max < this.currentValue.length;
    }
  },

  watch: {
    value(val) {
      this.currentValue = val;
    },

    currentValue(val) {
      if (this.limit) val.pop();
      this.$emit('input', val);
    }
  }
};
</script>

<style scoped lang="scss">
@import "~@sass/_variables";
@import "~@sass/_func";

.mint-checklist {

  .mint-cell {
    padding: 0;
  }

  .mint-checklist-label {
    display: block;
    padding: 0 pxToRem(10px * 2);
  }

  .mint-checklist-title {
    color: #888;
    display: block;
    font-size: pxToRem(12px * 2);
    margin: pxToRem(8px * 2);
  }

  .is-limit {
    .mint-checkbox-core:not(:checked) {
      background-color: #d9d9d9;
      border-color: #d9d9d9;
    }
  }
}

  .mint-checkbox {
    .is-right {
      float: right;
    }

    + .mint-checkbox-label {
      vertical-align: middle;
      margin-left: pxToRem(6px * 2);
    }

    .mint-checkbox-input {
      display: none;

      &:checked {
        + .mint-checkbox-core {
          background-color: #26a2ff;
          border-color: #26a2ff;

          &::after {
            border-color: #fff;
            transform: rotate(45deg) scale(1);
          }
        }
      }

      &[disabled] + .mint-checkbox-core {
        background-color: #d9d9d9;
        border-color: #ccc;
      }
    }

    .mint-checkbox-core {
      display: inline-block;
      background-color: #fff;
      border: pxToRem(1px * 2) solid #ccc;
      position: relative;
      width: pxToRem(36px);
      height: pxToRem(36px);
      vertical-align: middle;

      &::after {
        border: pxToRem(2px * 2) solid transparent;
        border-left: 0;
        border-top: 0;
        content: " ";
        position: absolute;
        top: pxToRem(3px * 2);
        left: pxToRem(6px * 2);
        width: pxToRem(4px * 2);
        height: pxToRem(8px * 2);
        transform: rotate(45deg) scale(0);
        transition: transform .2s;
      }
    }
  }
</style>
