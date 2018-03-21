<template>
  <div class="mint-loadmore">
    <div class="mint-loadmore-content" :class="{ 'is-dropped': topDropped || bottomDropped}" :style="{ 'transform': 'translate3d(0, ' + Remtranslate + 'rem, 0)' }">
      <slot name="top">
        <div class="mint-loadmore-top" v-if="topMethod">
          <spinner v-if="topStatus === 'loading'" class="mint-loadmore-spinner" :size="20" type="snake"></spinner>
          <span class="mint-loadmore-text">{{ topText }}</span>
        </div>
      </slot>
      <slot></slot>
      <slot name="bottom">
       <!-- <div class="mint-loadmore-bottom" v-if="bottomMethod">
          <spinner v-if="bottomStatus === 'loading'" class="mint-loadmore-spinner" :size="20" type="snake"></spinner>
          <span class="mint-loadmore-text">{{ bottomText }}</span>
        </div> -->
      </slot>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import "../../sass/variables.scss";
@import "../../sass/func.scss";
.mint-loadmore {
    overflow: hidden;
    

    .mint-loadmore-content {
      &.is-dropped {
        transition: .2s;
      }
    }

    .mint-loadmore-top, .mint-loadmore-bottom {
      text-align: center;
      height: pxToRem(50px * 2);
      line-height: pxToRem(50px * 2);
    }

    .mint-loadmore-top {
      margin-top: pxToRem(-50px * 2);
    }

    .mint-loadmore-bottom {
      margin-bottom: pxToRem(-50px * 2);
    }

    .mint-loadmore-spinner {
      display: inline-block;
      margin-right: pxToRem(5px * 2);
      vertical-align: middle;
    }

    .mint-loadmore-text {
      vertical-align: middle;
    }
}
</style>


<script type="text/babel">
  import spinner from '../spinner/spinner.vue';
  export default {
    components: {
      'spinner': spinner
    },
    props: {
      maxDistance: {
        type: Number,
        default: 0
      },
      autoFill: {
        type: Boolean,
        default: true
      },
      distanceIndex: {
        type: Number,
        default: 2
      },
      topPullText: {
        type: String,
        default: '下拉刷新'
      },
      topDropText: {
        type: String,
        default: '释放更新'
      },
      topLoadingText: {
        type: String,
        default: '加载中...'
      },
      topDistance: {
        type: Number,
        default: 60  
      },
      topMethod: {
        type: Function
      },
      bottomPullText: {
        type: String,
        default: '上拉刷新'
      },
      bottomDropText: {
        type: String,
        default: '释放更新'
      },
      bottomLoadingText: {
        type: String,
        default: '加载中...'
      },
      bottomDistance: {
        type: Number,
        default: 60 
      },
      bottomMethod: {
        type: Function
      },
      bottomAllLoaded: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        Remtranslate : 0,  // 李钊鸿加入的变量
        isMove: false,     // 李钊鸿加入的变量
        translate: 0,
        scrollEventTarget: null,
        containerFilled: false,
        topText: '',
        topDropped: false,
        bottomText: '',
        bottomDropped: false,
        bottomReached: false,
        direction: '',
        startY: 0,
        startScrollTop: 0,
        currentY: 0,
        topStatus: '',
        bottomStatus: ''
      };
    },

    watch: {
      // 李钊鸿加入了监听：为了改为rem不太可能一个一个去修改，我的想法是用一个新状态代替它
      translate (curVal, oldVal) {    
        this.$store.dispatch('set_translateY',curVal)
        this.Remtranslate = curVal / this.$store.getters.fontSize 
      },
      topStatus(val) {
        this.$emit('top-status-change', val);
        switch (val) {
          case 'pull':
            this.topText = this.topPullText;
            break;
          case 'drop':
            this.topText = this.topDropText;
            break;
          case 'loading':
            this.topText = this.topLoadingText;
            break;
        }
      },

      bottomStatus(val) {
        this.$emit('bottom-status-change', val);
        switch (val) {
          case 'pull':
            this.bottomText = this.bottomPullText;
            break;
          case 'drop':
            this.bottomText = this.bottomDropText;
            break;
          case 'loading':
            this.bottomText = this.bottomLoadingText;
            break;
        }
      }
    },

    methods: {
      onTopLoaded() {
        this.translate = 0;
        setTimeout(() => {
          this.topStatus = 'pull';
        }, 200);
      },

      onBottomLoaded() {
        this.bottomStatus = 'pull';
        this.bottomDropped = false;
        this.$nextTick(() => {
          this.translate = 0;
        });
        if (!this.bottomAllLoaded && !this.containerFilled) {
          this.fillContainer();
        }
      },

      getScrollEventTarget(element) {
        let currentNode = element;
        while (currentNode && currentNode.tagName !== 'HTML' &&
          currentNode.tagName !== 'BODY' && currentNode.nodeType === 1) {
          let overflowY = document.defaultView.getComputedStyle(currentNode).overflowY;
          if (overflowY === 'scroll' || overflowY === 'auto') {
            return currentNode;
          }
          currentNode = currentNode.parentNode;
        }
        return window;
      },

      getScrollTop(element) {
        if (element === window) {
          return Math.max(window.pageYOffset || 0, document.documentElement.scrollTop);
        } else {
          return element.scrollTop;
        }
      },

      bindTouchEvents() {
        this.$el.addEventListener('touchstart', this.handleTouchStart);
        this.$el.addEventListener('touchmove', this.handleTouchMove);
        this.$el.addEventListener('touchend', this.handleTouchEnd);
      },

      init() {
        this.topStatus = 'pull';
        this.bottomStatus = 'pull';
        this.topText = this.topPullText;
        this.scrollEventTarget = this.getScrollEventTarget(this.$el);
        if (typeof this.bottomMethod === 'function') {
          this.fillContainer();
          this.bindTouchEvents();
        }
        if (typeof this.topMethod === 'function') {
          this.bindTouchEvents();
        }
      },

      fillContainer() {
        if (this.autoFill) {
          this.$nextTick(() => {
            if (this.scrollEventTarget === window) {
              this.containerFilled = this.$el.getBoundingClientRect().bottom >=
                document.documentElement.getBoundingClientRect().bottom;
            } else {
              this.containerFilled = this.$el.getBoundingClientRect().bottom >=
                this.scrollEventTarget.getBoundingClientRect().bottom;
            }
            if (!this.containerFilled) {
              this.bottomStatus = 'loading';
              this.bottomMethod();
            }
          });
        }
      },

      checkBottomReached() {
        if (this.scrollEventTarget === window) {
          return document.body.scrollTop + document.documentElement.clientHeight >= document.body.scrollHeight;
        } else {
          return this.$el.getBoundingClientRect().bottom <= this.scrollEventTarget.getBoundingClientRect().bottom + 1;
        }
      },

      handleTouchStart(event) {
        this.startY = event.touches[0].clientY;
        this.startScrollTop = this.getScrollTop(this.scrollEventTarget);
        this.bottomReached = false;
        if (this.topStatus !== 'loading') {
          this.topStatus = 'pull';
          this.topDropped = false;
        }
        if (this.bottomStatus !== 'loading') {
          this.bottomStatus = 'pull';
          this.bottomDropped = false;
        }
      },

      handleTouchMove (event) {
        // 李钊鸿加入的代码:当进行左右滑动的时候，不能进行上下滑动
        if (this.$store.state.translateX != '0') return false; 

        if (this.startY < this.$el.getBoundingClientRect().top && this.startY > this.$el.getBoundingClientRect().bottom) {
          return;
        }

        // 李钊鸿加入的变量：变量的意义是，保存是否有滑动过的记录，好用做判断
        this.isMove = true

        this.currentY = event.touches[0].clientY;
        let distance = (this.currentY - this.startY) / this.distanceIndex;
        this.direction = distance > 0 ? 'down' : 'up';

        // 李钊鸿加入的代码，为了监听Y轴的变化
        this.$store.dispatch('set_translateY', distance - this.startScrollTop)

        if (typeof this.topMethod === 'function' && this.direction === 'down' &&
            this.getScrollTop(this.scrollEventTarget) === 0 && this.topStatus !== 'loading') {

            event.preventDefault();
            event.stopPropagation();

            if (this.maxDistance > 0) {
              this.translate = distance <= this.maxDistance ? distance - this.startScrollTop : this.translate;
            } else {
              this.translate = distance - this.startScrollTop;
            }

            if (this.translate < 0) {
              this.translate = 0;
            }

            /* 李钊鸿在此添加了px => rem兼容性 */
            let topDistance = this.topDistance * this.$store.getters.dataDpr;
            this.topStatus = this.translate >= topDistance ? 'drop' : 'pull';
        }

        if (this.direction === 'up') {
            this.bottomReached = this.bottomReached || this.checkBottomReached();
        }

        if (typeof this.bottomMethod === 'function' && this.direction === 'up' &&
            this.bottomReached && this.bottomStatus !== 'loading' && !this.bottomAllLoaded) {

            event.preventDefault();
            event.stopPropagation();

            if (this.maxDistance > 0) {
              this.translate = Math.abs(distance) <= this.maxDistance
                ? this.getScrollTop(this.scrollEventTarget) - this.startScrollTop + distance : this.translate;
            } else {
              this.translate = this.getScrollTop(this.scrollEventTarget) - this.startScrollTop + distance;
            }

            if (this.translate > 0) {
              this.translate = 0;
            }

            /* 李钊鸿在此添加了px => rem兼容性 */
            let bottomDistance = this.bottomDistance * this.$store.getters.dataDpr;
            this.bottomStatus = -this.translate >= bottomDistance ? 'drop' : 'pull';
        }

      },

      handleTouchEnd() {        
        // 下拉刷新的弹回机制
        if (this.direction === 'down' && this.getScrollTop(this.scrollEventTarget) === 0 && this.translate > 0) {
          this.topDropped = true;
          if (this.topStatus === 'drop') {
             /* 李钊鸿在此添加了px => rem兼容性 */
            let topDistance = this.topDistance * this.$store.getters.dataDpr;
            this.translate = topDistance;
            this.topStatus = 'loading';
            this.topMethod();
          } else {
            setTimeout(_ => {
              this.translate = '0';
              this.topStatus = 'pull';
            },1)
          }
        }

        // 上拉加载更多的弹回机制（暂没有使用）
        if (this.direction === 'up' && this.bottomReached && this.translate < 0) {
          this.bottomDropped = true;
          this.bottomReached = false;
          if (this.bottomStatus === 'drop') {
             /* 李钊鸿在此添加了px => rem兼容性 */
            let bottomDistance = this.bottomDistance * this.$store.getters.dataDpr;
            this.translate = bottomDistance;
            this.bottomStatus = 'loading';
            this.bottomMethod();
          } else {
            setTimeout(_ => {
              this.translate = '0';
              this.bottomStatus = 'pull';
            },1)
          }
        }

        // 李钊鸿加入的代码: 主要是为了解决：当我下拉刷新时，如果拖拉的位置刚好再item的上面，那么会冒泡导致点击到item的元素，可能会进入内页。
        // 这是冒泡导致的。所以停止冒泡是很好的解决方法。不过左右滑动的时候就不阻止了
        if (this.isMove && this.$store.state.translateX == 0) {
            event.preventDefault();
            event.stopPropagation();
        }

        this.direction = ''; 
        this.isMove = false
      }
    },

    mounted() {
      this.init();

    }
  };
</script>

