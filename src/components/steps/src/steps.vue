<template>
  <div
    class="el-steps" 
    :class="[!simple && 'el-steps--' + direction, simple && 'el-steps--simple']">
      <slot></slot>
  </div>
</template>

<script>
import Migrating from './migrating';

export default {
  name: 'ElSteps',

  mixins: [Migrating],

  props: {
    space: [Number, String],
    active: Number,
    direction: {
      type: String,
      default: 'horizontal'
    },
    alignCenter: Boolean,
    simple: Boolean,
    finishStatus: {
      type: String,
      default: 'finish'
    },
    processStatus: {
      type: String,
      default: 'process'
    }
  },

  data() {
    return {
      steps: [],
      stepOffset: 0
    };
  },

  methods: {
    getMigratingConfig() {
      return {
        props: {
          'center': 'center is removed.'
        }
      };
    }
  },

  watch: {
    active(newVal, oldVal) {
      this.$emit('change', newVal, oldVal);
    },

    steps(steps) {
      steps.forEach((child, index) => {
        child.index = index;
      });
    }
  }
};
</script>


<style scoped lang="scss">
@import "~@sass/_variables";
@import "~@sass/_func";


.el-steps {
    display: flex;
}

.el-steps--simple {
    padding: pxToRem(13px) 8%;
    border-radius: pxToRem(4px);
    background: #f5f7fa
}

.el-steps--horizontal {
    white-space: nowrap;
    width: 100%;
}

.el-steps--vertical {
    height: 100%;
    flex-flow: column
}


</style>
