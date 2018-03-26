<template>
  <div id="app">
      <div class="page-loadmore-wrapper" ref="wrapper" :style="{ height: wrapperHeight + 'px' }">
          <loadmore :top-method="loadTop" :bottom-method="loadBottom" @bottom-status-change="handleBottomChange" @top-status-change="handleTopChange" :bottom-all-loaded="allLoaded" ref="loadmore">
            <div slot="top" class="mint-loadmore-top" ref="loadImage">
              <span v-show="topStatus !== 'loading'" :class="{ 'is-rotate': topStatus === 'drop' }">↓</span>
              <span v-show="topStatus === 'loading'">
                 <spinner :show="true"></spinner>
              </span>
            </div>
            <ul class="page-loadmore-list">
              <li v-for="item in list" class="page-loadmore-listitem">{{ item }}</li>
            </ul>           
            <div slot="bottom" class="mint-loadmore-bottom">
              <span v-show="bottomStatus !== 'loading'" :class="{ 'is-rotate': bottomStatus === 'drop' }">↑</span>
              <span v-show="bottomStatus === 'loading'">
                 <spinner :show="true"></spinner>
              </span>
            </div>
          </loadmore>
      </div>
  </div>
</template>

<script>
import loadmore from 'components/loadmore/loadmore.vue'
import spinner from 'components/spinner/spinner.vue'
  export default {
    name: 'app',
    data () {
      return {
        list: [1,2,3,4,5,6,7,8,9,10,1,2,3,4,5,6,7,8,9,10,1,2,3,4,5,6,7,8,9,10],
        topStatus: '',
        bottomStatus: '',
        wrapperHeight: 0,
        allLoaded:false   // 当该值为true时，不再支持上拉
      }
    },
    components: {
      loadmore,
      spinner
    },
    methods: {
       handleTopChange (status) {
         this.topStatus = status;
        console.log("当前topStatus的状态为：",this.topStatus); // drop，loading,pull
        
      },
      handleBottomChange (status) {
        this.bottomStatus = status;
        console.log("当前bottomStatus的状态为：",this.bottomStatus); // drop，loading,pull
      },
      loadTop () {
        console.log("当我下拉到满足刷新条件，并且放手的时候，会触发这个事件");
        
        // 一定要使用箭头函数，这样this才能指向本对象，也就是Vue实例
        setTimeout(() => {
          this.$refs.loadmore.onTopLoaded();
        },1500)
      },
      loadBottom() {
        console.log("当我上拉到满足刷新条件，并且放手的时候，会触发这个事件");

         // 一定要使用箭头函数，这样this才能指向本对象，也就是Vue实例
        setTimeout(() => {
           for (let i = 1; i <= 10; i++) {
              this.list.push(i);
            }
          this.$refs.loadmore.onBottomLoaded();
        },1500)
      }
    },
    created () {
    },
    // elemefe.github.io/mint-ui/#/
    // https://github.com/ElemeFE/mint-ui/tree/master/example/pages
    // http://elemefe.github.io/mint-ui/#/pull-down
    // http://elemefe.github.io/mint-ui/#/pull-up
    // http://elemefe.github.io/mint-ui/#/tab-container
    // https://github.com/ElemeFE/mint-ui/blob/master/example/pages/tab-container.vue
    // http://elemefe.github.io/mint-ui/#/navbar
    // https://github.com/ElemeFE/mint-ui/blob/master/example/pages/navbar.vue
    mounted () {
      this.wrapperHeight = document.documentElement.clientHeight - this.$refs.wrapper.getBoundingClientRect().top;
    }    
  }
</script>

<style lang="scss" scoped>
  @import "sass/variables";
  @import "sass/func";
  .view {
    width: pxToRem(750px);
    height: 100vh;
    margin: 0 auto;
    position: relative;
    transition: all .3s ease-in-out;
    box-sizing: border-box;
    background-color: $bg;
  }

  .page-loadmore {
    .page-loadmore-desc {
        text-align: center;
        color: #666;
        padding-bottom: pxToRem(5px * 2);
        &:last-of-type {
          border-bottom: solid 1px #eee;
        }
    }
    .page-loadmore-listitem {
        height: pxToRem(50px * 2);
        line-height: pxToRem(50px * 2);
        border-bottom: solid 1px #eee;
        text-align: center;
        &:first-child {
          border-top: solid 1px #eee;
        }
    }
    .page-loadmore-wrapper {
        margin-top: -1px;
        overflow: scroll;
    } 
    .mint-spinner {
        display: inline-block;
        vertical-align: middle;
    }
  }
  .mint-loadmore-top, .mint-loadmore-bottom {
    span {
      display: inline-block;
      transition: .2s linear;
      vertical-align: middle;
      &.is-rotate {
        transform: rotate(180deg);
      }
    }
  }
 
/*
  @component-namespace page {
    @component loadmore {
      @descendent desc {
        text-align: center;
        color: #666;
        padding-bottom: 5px;
        &:last-of-type {
          border-bottom: solid 1px #eee;
        }
      }
      @descendent listitem {
        height: 50px;
        line-height: 50px;
        border-bottom: solid 1px #eee;
        text-align: center;
        &:first-child {
          border-top: solid 1px #eee;
        }
      }
      @descendent wrapper {
        margin-top: -1px;
        overflow: scroll;
      }
      .mint-spinner {
        display: inline-block;
        vertical-align: middle;
      }
    }
  }
  @component mint-loadmore-top {
    span {
      display: inline-block;
      transition: .2s linear;
      vertical-align: middle;
      @when rotate {
        transform: rotate(180deg);
      }
    }
  }
*/
</style>
