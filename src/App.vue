<template>
  <div id="app">
    <transition :name="transitionName" @afterLeave="clearTransition">
        <keep-alive include = "Fast,Borrow,Repay,CarSell,CarSellHistory,CarSellApply,Register,Sign,Identity">
            <router-view class="view"></router-view>
        </keep-alive> 
    </transition>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'app',
  data () {
    return {
       isFirst: true,
       AndroidVersion: 6
    }
  },
  methods: {
    clearTransition () {
        this.$store.commit('transition/setTransition', '');
    }
  },
  watch: {
      $route(to, from, next) {
        // 第一次不需要进行动画
        if (this.isFirst) {
            this.$store.dispatch('setSiteMap', { name: to.name, path: to.path })
            return this.isFirst = !this.isFirst;
        }

        // 任何的组件都可以修改这个变量，修改之后，下一次的跳转就不会有动画，但又立刻会被修改回来。
        if (this.$store.state.nextNotTransition) {
            return this.$store.state.nextNotTransition = false
        }

        // 根据地图链的概念来判断是向左还是向右开始动画
        // 如果 Android 版本是6.0以下那就不用进行动画了
        // 当然，苹果都允许进行动画
        if (this.AndroidVersion >= 6) {
            if (to.path === this.$store.getters.siteMap) {
                this.$store.commit('transition/setTransition', 'turn-off');
            } else {
                this.$store.commit('transition/setTransition', 'turn-on');
            }
        }

        this.$store.dispatch('setSiteMap', { name: to.name, path: to.path })
      }
  },
  computed: {
      ...mapState('transition', ['transitionName']),
  },
  beforeMount () {
    var a = /Android(.+?);/.exec(window.navigator.userAgent)
    if (a) {
        this.AndroidVersion = +(a[1].trim().substr(0, 1));
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "~@sass/_variables";
  @import "~@sass/_func";

  .view {
      // height: 100vh;
       height: 100%;
       margin: 0 auto;
       transition: all .3s ease-in-out;
       box-sizing: border-box;
       background-color: #f2f2f2;
       position: absolute;
       left: 0;
       right: 0;
       top: 0;
       // bottom: 0;
       z-index: 1;
       overflow-y: scroll;
  }

  // Page Turn on Transian Effect
  .turn-on {
    &-enter {
      transform: translate3d(100%, 0, 0);
    }
    &-leave-to {
      transform: translate3d(-20%, 0, 0);
    }
    &-enter-active, &-leave-active  {
      transition: transform .40s ease;
    }
  }

  // Page Turn Off Transian Effect
  .turn-off {
      &-enter {
        transform: translate3d(-20%, 0, 0);
        z-index: 0
      }
      &-leave-to {
        transform: translate3d(100%, 0, 0);
      }
      &-leave-active {
        z-index: 2;
      }
      &-enter-active, &-leave-active  {
        transition: transform .40s ease;
      }
  }
</style>
