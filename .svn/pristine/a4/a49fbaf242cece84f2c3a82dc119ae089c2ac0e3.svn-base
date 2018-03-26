<template>
   <div id="app">
      <!-- <router-view :class="{view: true}" ></router-view> -->
      <div class="page-infinite">
      <h1 class="page-title">Infinite Scroll</h1>
      <p class="page-infinite-desc">当即将滚动至列表底部时, 自动加载更多数据</p>
      <div class="page-infinite-wrapper" ref="wrapper" :style="{ height: wrapperHeight + 'px' }">
        <ul class="page-infinite-list" v-infinite-scroll="loadMore" infinite-scroll-disabled="loading" infinite-scroll-distance="50">
          <li v-for="item in list" class="page-infinite-listitem">{{ item }}</li>
        </ul> 
        <p v-show="loading" class="page-infinite-loading">
          <spinner type="snake"></spinner>
          加载中...
        </p>
      </div>
    </div>
  </div>
</template>

<script>  
import infiniteScroll from 'components/infiniteScroll/infiniteScroll.js'
import spinner from 'components/spinner/spinner.vue'
  export default {
    name: 'app',
     data() {
      return {
        list: [],
        loading: false,
        allLoaded: false,
        wrapperHeight: 0
      };
    },
    components: {
      spinner
    },
    methods: {
      loadMore() {
        window.alert("123");
        this.loading = true;
        setTimeout(() => {
          let last = this.list[this.list.length - 1];
          for (let i = 1; i <= 10; i++) {
            this.list.push(last + i);
          }
          this.loading = false;
        }, 2500);
      }
    },
    mounted() {
      this.wrapperHeight = document.documentElement.clientHeight - this.$refs.wrapper.getBoundingClientRect().top;
      for (let i = 1; i <= 20; i++) {
        this.list.push(i);
      }
    },
    created () {
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


  .page-infinite {
      .page-infinite-desc {
          text-align: center;
          color: #666;
          padding-bottom: 5px;
          border-bottom: solid 1px #eee;
      }
      .page-infinite-listitem {
            height: 50px;
            line-height: 50px;
            border-bottom: solid 1px #eee;
            text-align: center;
            &:first-child {
              border-top: solid 1px #eee;
            }
      }
      .page-infinite-wrapper {
        margin-top: -1px;
        overflow: scroll;
      }
      .page-infinite-loading {
        text-align: center;
        height: 50px;
        line-height: 50px;
        display:flex;
        align-items: center;
        flex-direction: column;
        p {
          display: inline-block;
          vertical-align: middle;
          margin-top:pxToRem(40px)
        }
      }
  }

/*
  @component-namespace page {
    @component infinite {
      @descendent desc {
        text-align: center;
        color: #666;
        padding-bottom: 5px;
        border-bottom: solid 1px #eee;
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
      @descendent loading {
        text-align: center;
        height: 50px;
        line-height: 50px;
        div {
          display: inline-block;
          vertical-align: middle;
          margin-right: 5px;
        }
      }
    }
  }
*/
</style>
