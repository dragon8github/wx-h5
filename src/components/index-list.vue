<template>
  <div class="mint-indexlist">
    <ul class="mint-indexlist-content" ref="content" :style="{ 'height': px2rem(currentHeight)}">
        <slot></slot>
    </ul>

    <div class="mint-indexlist-nav" @touchstart.stop="handleTouchStart" ref="nav">
      <ul class="mint-indexlist-navlist">
        <li class="mint-indexlist-navitem" v-for="section in sections">{{ section.index }}</li>
      </ul>
    </div>
    <div class="mint-indexlist-indicator" v-if="showIndicator" v-show="moving">{{ currentIndicator }}</div>
  </div>
</template>

<script>
  export default {
    name: 'mt-index-list',
    props: {
      height: Number,
      showIndicator: {
        type: Boolean,
        default: true
      }
    },
    data() {
      return {
        sections: [],
        navWidth: 0,
        indicatorTime: null,
        moving: false,
        firstSection: null,
        currentIndicator: '',
        currentHeight: this.height,
        navOffsetX: 0
      };
    },
    watch: {
      sections() {
        this.init();
      },
      height(val) {
        if (val) {
          this.currentHeight = val;
        }
      }
    },
    methods: {
      px2rem(v) {
        return window.px2rem(v) + 'rem';
      },
      init() {
        this.$nextTick(() => {
          this.navWidth = this.$refs.nav.clientWidth;
        });
        let listItems = this.$refs.content.getElementsByTagName('li');
        if (listItems.length > 0) {
          this.firstSection = listItems[0];
        }
      },
      handleTouchStart(e) {
        if (e.target.tagName !== 'LI') {
          return;
        }
        this.navOffsetX = e.changedTouches[0].clientX;
        this.scrollList(e.changedTouches[0].clientY);
        if (this.indicatorTime) {
          clearTimeout(this.indicatorTime);
        }
        this.moving = true;
        window.addEventListener('touchmove', this.handleTouchMove);
        window.addEventListener('touchend', this.handleTouchEnd);
      },
      handleTouchMove(e) {
        e.preventDefault();
        this.scrollList(e.changedTouches[0].clientY);
      },
      handleTouchEnd() {
        this.indicatorTime = setTimeout(() => {
          this.moving = false;
          this.currentIndicator = '';
        }, 500);
        window.removeEventListener('touchmove', this.handleTouchMove);
        window.removeEventListener('touchend', this.handleTouchEnd);
      },
      getTop (e) { 
        var offset=e.offsetTop; 
        if(e.offsetParent!=null) offset+=this.getTop(e.offsetParent); 
        return offset; 
      },
      scrollList(y) {
        let currentItem = document.elementFromPoint(this.navOffsetX, y);
        if (!currentItem || !currentItem.classList.contains('mint-indexlist-navitem')) {
          return;
        }
        this.currentIndicator = currentItem.innerText;
        let targets = this.sections.filter(section => section.index === currentItem.innerText);
        let targetDOM;

        if (targets.length > 0) {
          targetDOM = targets[0].$el;
          // let top = targetDOM.offsetTop
          // this.$refs.content.scrollTop = targetDOM.getBoundingClientRect().top - this.firstSection.getBoundingClientRect().top;
          var top = this.getTop(targetDOM);
          window.scrollTo(0, top)
        }
      }
    },
    mounted() {
      if (!this.currentHeight) {
        // window.scrollTo(0, 0);
        requestAnimationFrame(()=>{
          this.currentHeight = document.documentElement.clientHeight - this.$refs.content.getBoundingClientRect().top;
        });
      }
      this.init();
    }
  };
</script>


<style lang="scss" scope>
@import "~@sass/_variables";
@import "~@sass/_func";
.mint-indexlist {
    width: 100%;
    position: relative;
    // overflow: hidden;

    .mint-indexlist-content {
      margin: 0;
      padding: 0;
      // overflow: auto;
    }

    .mint-indexlist-nav {
      position: fixed;
      top: 50%;
      right: pxToRem(0px);
      transform: translateY(-50%);
      text-align: center;
      max-height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      z-index: 9999;
    }

    .mint-indexlist-navlist {
      padding: 0;
      margin: 0;
      list-style: none;
      max-height: 100%;
      display: flex;
      flex-direction: column;
    }

    .mint-indexlist-navitem {
      padding: pxToRem(5px) pxToRem(20px);
      font-size: pxToRem(30px);
      user-select: none;
      -webkit-touch-callout: none;
    }

    .mint-indexlist-indicator {
      position: fixed;
      width:  pxToRem(140px);
      height: pxToRem(140px);
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      text-align: center;
      line-height: pxToRem(140px);
      background-color: rgba(0, 0, 0, .7);
      border-radius: 5px;
      color: #fff;
      font-size: pxToRem(60px);
      z-index: 9999;
    }
}
</style>