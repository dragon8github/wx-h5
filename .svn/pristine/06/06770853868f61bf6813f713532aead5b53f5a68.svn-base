<template>
  
  <a class="mint-cell" @click="handleClick">
      <span class="mint-cell-mask" v-if="isLink"></span>
      <div class="mint-cell-left">
        <slot name="left"></slot>
      </div>
      <div class="mint-cell-wrapper">
          <div class="mint-cell-title">
              <slot name="icon">
                  <i v-if="icon" class="mintui" :class="'mintui-' + icon"></i>
              </slot>
              <slot name="title">
                  <span class="mint-cell-text" v-text="title"></span>
              </slot>
          </div>
          <div class="mint-cell-value" :class="{ 'is-link' : isLink }">
              <slot>
                  <span v-text="value"></span>
              </slot>
          </div>
      		<i v-if="isLink" class="mint-cell-allow-right"></i>
      </div>
      <div class="mint-cell-right">
          <slot name="right"></slot>
      </div>
  </a>
</template>

<script>
/**
 * mt-cell
 * @module components/cell
 * @desc 单元格
 * @param {string|Object} [to] - 跳转链接，使用 vue-router 的情况下 to 会传递给 router.push，否则作为 a 标签的 href 属性处理
 * @param {string} [icon] - 图标，提供 more, back，或者自定义的图标（传入不带前缀的图标类名，最后拼接成 .mintui-xxx）
 * @param {string} [title] - 标题
 * @param {string} [label] - 备注信息
 * @param {boolean} [is-link=false] - 可点击的链接
 * @param {string} [value] - 右侧显示文字
 * @param {slot} - 同 value, 会覆盖 value 属性
 * @param {slot} [title] - 同 title, 会覆盖 title 属性
 * @param {slot} [icon] - 同 icon, 会覆盖 icon 属性，例如可以传入图片
 *
 * @example
 * <mt-cell title="标题文字" icon="back" is-link value="描述文字"></mt-cell>
 * <mt-cell title="标题文字" icon="back">
 *   <div slot="value">描述文字啊哈</div>
 * </mt-cell>
 */
export default {
  name: 'mt-cell',

  props: {
    to: [String, Object],
    icon: String,
    title: String,
    label: String,
    isLink: Boolean,
    value: {},
    // 自定义的对外开放属性
    clickHandle: Function
  },

  computed: {
    // 定义一个方法
    href() {
      if (this.to && !this.added && this.$router) {
        const resolved = this.$router.match(this.to);
        if (!resolved.matched.length) return this.to;

        this.$nextTick(() => {
          this.added = true;
          this.$el.addEventListener('click', this.handleClick);
        });
        return resolved.path;
      }
      return this.to;
    }
  },

  methods: {
    // 被绑定的点击事件
    handleClick($event) {
      // 自定义的逻辑，为了可以书写click事件
      if (this.clickHandle) {
          this.clickHandle($event);
      } else if (this.to) {
        $event.preventDefault();
        this.$router.push(this.href);
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@import "~@sass/_variables";
@import "~@sass/_func";

.mint-cell {
    box-sizing: border-box;
    color: inherit;
    min-height: pxToRem(48px * 2);
    display: block;
    // overflow: hidden;
    text-decoration: none;
    background: #fff;


    &:first-child {
        .mint-cell-wrapper {
            background-origin: border-box;
        }
    }

    .mint-cell-wrapper {
        position: relative;
        align-items: center;
        justify-content: flex-start;
        box-sizing: border-box;
        display: flex;
        font-size: pxToRem(28px);
        line-height: 1;
        min-height: inherit;
        // overflow: hidden;
        padding: 0 pxToRem(30px);
        width: 100%;
        z-index: 1;
        &:after {
            @include border( 'bottom', #e5e5e5);
            // margin: 0 pxToRem(30px);
        }
    }

    .mint-cell-mask {
        &::after {
            background-color: #000;
            content: " ";
            opacity: 0;
            position: absolute 0;
        }
        &:active::after {
            opacity: 0.1;
        }
    }

    .mint-cell-text {
        vertical-align: middle;
    }

    .mint-cell-label {
        color: #888;
        display: block;
        font-size: pxToRem(12px * 2);
        margin-top: pxToRem(10px * 2);
        line-height: pxToRem(40px);

        &.mint-cell-label2 {
            text-align: right;
        }
    }

    img {
        vertical-align: middle;
    }

    .mint-cell-title {
        flex: 1;
        color: #222;

        img {
          margin-right: pxToRem(15px);
          height: pxToRem(40px);
          width: pxToRem(40px);
        }
    }

    .mint-cell-value {
        color: #333333;
        display: flex;
        align-items: center;
        justify-content: space-between;
        font-size: pxToRem(32px);

        .is-link {
            margin-right: pxToRem(24px * 2);
        }
    }

    .mint-cell-left {
        position: absolute;
        height: 100%;
        left: 0;
        transform: translate3d(-100%, 0, 0);
    }

    .mint-cell-right {
        position: absolute;
        height: 100%;
        right: 0;
        top: 0;
        transform: translate3d(100%, 0, 0);
        z-index: 1;
    }

    .mint-cell-allow-right::after {
        border: 2px solid #c8c8cd;
        border-bottom-width: 0;
        border-left-width: 0;
        content: " ";
        position: absolute;
        top: 50%;
        right: pxToRem(20px * 2);
        height: pxToRem(5px * 2);
        width: pxToRem(5px * 2);
        transform: translateY(-50%) rotate(45deg);
    }
}
</style>
