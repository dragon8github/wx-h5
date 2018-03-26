<template>
  <div
    class="el-step"
    :style="style"
    :class="[
      !isSimple && `is-${$parent.direction}`,
      isSimple && 'is-simple',
      isLast && !space && !isCenter && 'is-flex',
      isCenter && !isVertical && !isSimple && 'is-center'
     ]">
    <!-- icon & line -->
    <div
      class="el-step__head"
      :class="`is-${currentStatus}`">
      <div
        class="el-step__line"
        :class="{activeLine : $parent.active > index}" 
        :style="isLast ? '' : { marginRight: $parent.stepOffset + 'px' }"
      >
        <i class="el-step__line-inner" :style="lineStyle"></i>
      </div>

      <div class="el-step__icon" :class="`is-${icon ? 'icon' : 'text'}`">
        <slot
          v-if="currentStatus !== 'success' && currentStatus !== 'error'"
          name="icon">
          <i v-if="icon" class="el-step__icon-inner" :class="[icon]"></i>
          <div class="el-step__icon-inner" v-if="!icon && !isSimple">{{ index + 1 }}</div>
        </slot>
        <i
          v-else
          :class="['el-icon-' + (currentStatus === 'success' ? 'check' : 'close')]"
          class="el-step__icon-inner is-status"
        >
        </i>
      </div>
    </div>
    <!-- title & description -->
    <div class="el-step__main">
      <div
        class="el-step__title"
        ref="title"
        :class="['is-' + currentStatus]">
        <slot name="title">{{ title }}</slot>
      </div>
      <div v-if="isSimple" class="el-step__arrow"></div>
      <div
        v-else
        class="el-step__description"
        :class="['is-' + currentStatus]">
        <slot name="description">{{ description }}</slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
    name: 'ElStep',

    props: {
      title: String,
      icon: String,
      description: String,
      status: String
    },

    data() {
      return {
        index: -1,
        lineStyle: {},
        internalStatus: ''
      };
    },

    beforeCreate() {
      this.$parent.steps.push(this);
    },

    beforeDestroy() {
      const steps = this.$parent.steps;
      const index = steps.indexOf(this);
      if (index >= 0) {
        steps.splice(index, 1);
      }
    },

    computed: {
      currentStatus() {
        return this.status || this.internalStatus;
      },
      prevStatus() {
        const prevStep = this.$parent.steps[this.index - 1];
        return prevStep ? prevStep.currentStatus : 'wait';
      },
      isCenter() {
        return this.$parent.alignCenter;
      },
      isVertical() {
        return this.$parent.direction === 'vertical';
      },
      isSimple() {
        return this.$parent.simple;
      },
      isLast() {
        const parent = this.$parent;
        return parent.steps[parent.steps.length - 1] === this;
      },
      stepsCount() {
        return this.$parent.steps.length;
      },
      space() {
        const { isSimple, $parent: { space } } = this;
        return isSimple ? '' : space ;
      },
      style: function() {
        const style = {};
        const parent = this.$parent;
        const len = parent.steps.length;

        const space = (typeof this.space === 'number'
          ? this.space + 'px'
          : this.space
            ? this.space
            : 100 / (len - 1) + '%');
        style.flexBasis = space;
        if (this.isVertical) return style;
        if (this.isLast) {
          style.maxWidth = 100 / this.stepsCount + '%';
        } else {
          style.marginRight = -this.$parent.stepOffset + 'px';
        }

        return style;
      }
    },

    methods: {
      updateStatus(val) {
        const prevChild = this.$parent.$children[this.index - 1];

        if (val > this.index) {
          this.internalStatus = this.$parent.finishStatus;
        } else if (val === this.index && this.prevStatus !== 'error') {
          this.internalStatus = this.$parent.processStatus;
        } else {
          this.internalStatus = 'wait';
        }

        if (prevChild) prevChild.calcProgress(this.internalStatus);
      },

      calcProgress(status) {
        let step = 100;
        const style = {};

        style.transitionDelay = 150 * this.index + 'ms';
        if (status === this.$parent.processStatus) {
          step = this.currentStatus !== 'error' ? 0 : 0;
        } else if (status === 'wait') {
          step = 0;
          style.transitionDelay = (-150 * this.index) + 'ms';
        }

        style.borderWidth = step ? '1px' : 0;
        this.$parent.direction === 'vertical'
          ? style.height = step + '%'
          : style.width = step + '%';

        this.lineStyle = style;
      }
    },
    mounted() {
      const unwatch = this.$watch('index', val => {
        this.$watch('$parent.active', this.updateStatus, { immediate: true });
        unwatch();
      });

    }
  };
</script>

<style scoped lang="scss">
@import "~@sass/_variables";
@import "~@sass/_func";

.el-step__head {
    position: relative;
    width: 100%
}

.el-step {
    position: relative;
    flex-shrink: 1
}

.el-step:last-of-type .el-step__line {
    display: none
}

.el-step:last-of-type.is-flex {
    flex-basis: auto!important;
    flex-shrink: 0;
    flex-grow: 0
}

.el-step:last-of-type .el-step__description,
.el-step:last-of-type .el-step__main {
    padding-right: 0
}


.el-step__head.is-process {
    color: #2d2f33;
    border-color: #2d2f33
}

.el-step__head.is-wait {
    color: #b4bccc;
    border-color: #b4bccc
}

.el-step__head.is-success {
    color: #67c23a;
    border-color: #67c23a
}

.el-step__head.is-error {
    color: #fa5555;
    border-color: #fa5555
}

.el-step__head.is-finish {
    color: #409EFF;
    border-color: #409EFF
}

.el-step__icon {
    position: relative;
    z-index: 1;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    width: pxToRem(56px);
    height: pxToRem(56px);
    font-size: pxToRem(14px * 2);
    box-sizing: border-box;
    transition: .15s ease-out
}

.el-step__icon.is-text {
    border-radius: 50%;
}

.el-step__icon.is-icon {
    width: pxToRem(40px * 2)
}

.el-step__icon-inner {
    display: inline-block;
    user-select: none;
    text-align: center;
    font-weight: 700;
    line-height: 1;
    color: #0e6ae7;
}

.el-step__icon-inner[class*=el-icon]:not(.is-status) {
    font-size: pxToRem(25px * 2);
    font-weight: 400
}

.el-step__icon-inner.is-status {
    -webkit-transform: translateY(pxToRem(1px * 2));
    transform: translateY(pxToRem(1px * 2))
}

.el-step__line {
    position: absolute;
    border-color: inherit;
    background-color: #5797ee;
    opacity: 0.3;

    &.activeLine {
       background-color: #fff;
       opacity: 1;
    }
}

.el-step__line-inner {
    display: block;
    border-width: pxToRem(1px * 2);
    border-style: solid;
    border-color: inherit;
    transition: .15s ease-out;
    box-sizing: border-box;
    width: 0;
    height: 0
}

.el-step__main {
    white-space: normal;
    text-align: left
}

.el-step__title {
    font-size: pxToRem(14px * 2);
    // line-height: pxToRem(38px * 2)
}


.el-step__title.is-process {
    color: #ffffff;
}

.el-step__title.is-wait {
    color: #5797ee;
}

.el-step__title.is-success {
    color: #67c23a
}

.el-step__title.is-error {
    color: #fa5555
}

.el-step__title.is-finish {
    color: #fff;
}

.el-step__description {
    padding-right: 10%;
    margin-top: pxToRem(-5px);
    font-size: pxToRem(12px * 2);
    line-height: pxToRem(20px * 2);
    font-weight: 400
}

.el-step__description.is-process {
    color: #2d2f33
}

.el-step__description.is-wait {
    color: #b4bccc
}

.el-step__description.is-success {
    color: #67c23a
}

.el-step__description.is-error {
    color: #fa5555
}

.el-step__description.is-finish {
    color: #409EFF
}

.el-step.is-horizontal {
    display: inline-block
}

.el-step.is-horizontal .el-step__line {
    width: 70%;
    height: pxToRem(2px);
    top: pxToRem(40px);
    left: 0;
    right: 0
}

.el-step.is-vertical {
    display: flex
}

.el-step.is-vertical .el-step__head {
    flex-grow: 0;
    width: pxToRem(24px * 2)
}

.el-step.is-vertical .el-step__main {
    padding-left: pxToRem(10px * 2);
    flex-grow: 1
}

.el-step.is-vertical .el-step__title {
    line-height: pxToRem(24px * 2);
    padding-bottom: pxToRem(8px * 2)
}

.el-step.is-vertical .el-step__line {
    width: pxToRem(2px * 2);
    top: 0;
    bottom: 0;
    left: pxToRem(11px * 2)
}

.el-step.is-vertical .el-step__icon.is-icon {
    width: pxToRem(24px * 2)
}

.el-step.is-center .el-step__head,
.el-step.is-center .el-step__main {
    text-align: center
}

.el-step.is-center .el-step__description {
    padding-left: 20%;
    padding-right: 20%
}

.el-step.is-center .el-step__line {
    left: 65%;
    // left: 50%;
    right: -50%
}

.el-step.is-simple {
    display: flex;
    align-items: center
}

.el-step.is-simple .el-step__head {
    width: auto;
    font-size: 0;
    padding-right: pxToRem(10px * 2)
}

.el-step.is-simple .el-step__icon {
    background: 0 0;
    width: pxToRem(16px * 2);
    height: pxToRem(16px * 2);
    font-size: pxToRem(12px * 2)
}

.el-step.is-simple .el-step__icon-inner[class*=el-icon]:not(.is-status) {
    font-size: pxToRem(18px * 2)
}

.el-step.is-simple .el-step__icon-inner.is-status {
    -webkit-transform: scale(.8) translateY(pxToRem(1px * 2));
    transform: scale(.8) translateY(pxToRem(1px * 2))
}

.el-step.is-simple .el-step__main {
    position: relative;
    display: flex;
    align-items: stretch;
    flex-grow: 1
}

.el-step.is-simple .el-step__title {
    font-size: pxToRem(16px * 2);
    line-height: pxToRem(20px * 2)
}

.el-step.is-simple:not(:last-of-type) .el-step__title {
    max-width: 50%;
    word-break: break-all
}

.el-step.is-simple .el-step__arrow {
    flex-grow: 1;
    display: flex;
    align-items: center;
    justify-content: center
}

.el-step.is-simple .el-step__arrow::after,
.el-step.is-simple .el-step__arrow::before {
    content: '';
    display: inline-block;
    position: absolute;
    height: pxToRem(15px * 2);
    width: pxToRem(1px * 2);
    background: #b4bccc
}

.el-step.is-simple .el-step__arrow::before {
    transform: rotate(-45deg) translateY(-pxToRem(4px * 2));
    transform-origin: 0 0
}

.el-step.is-simple .el-step__arrow::after {
    transform: rotate(45deg) translateY(pxToRem(4px * 2));
    transform-origin: 100% 100%
}

.el-step.is-simple:last-of-type .el-step__arrow {
    display: none
}
</style>
