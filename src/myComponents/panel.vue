<template>
<div class="page-loadmore-wrapper" ref="wrapper" :style="{ height: wrapperHeight}">
    <loadmore 
        :top-method="loadTop" 
        @bottom-status-change="handleBottomChange" 
        @top-status-change="handleTopChange" 
        :bottom-all-loaded="allLoaded" 
        ref="loadmore">

        <!-- 下拉刷新 -->
        <div slot="top" class="mint-loadmore-top">
            <div v-if="Top">
                <span v-show="topStatus !== 'loading'" :class="{ 'is-rotate': topStatus === 'drop' }">↓</span>
                <span v-show="topStatus === 'loading'"><spinner :show="true"></spinner></span>
            </div>
        </div>

        <!-- 循环输出数据源 -->
        <ul class="page-loadmore-list" v-infinite-scroll="loadData" infinite-scroll-disabled="loading" infinite-scroll-distance="50">
             <slot name="body"></slot>
             <!-- 没有数据的情况下输出 -->
             <div class="emptyDataDiv" v-if="_isEmpty">
                <div class='emptyDataImg'></div>
                <p class="emptyDataText" v-html="noThingText"></p>
             </div>
        </ul> 
      
        <!-- 上拉加载方式 -->
        <p v-if="loading" class="page-infinite-loading" id="page-infinite-loading">
            <spinner type="snake" class="page-loading-spinner"></spinner>
            加载中...
        </p>

        <!-- 当 _bottomDisabled 为true的时候，也就是没有更多数据需要加载的时候 -->
        <div class="allLoadDiv" v-if="_bottomDisabled">
            <div class="allLoadDiv__line"></div>
            <div class="allLoadDiv__text">{{ noMoreText }}</div>
            <!-- <div class='allLoadImg'></div> -->
            <!-- <p class="allLoadText">{{ noMoreText }}</p> -->
        </div>
    </loadmore>
</div>
</template>

<script>
//infiniteScroll无限加载组件
import infiniteScroll from '@components/infiniteScroll/infiniteScroll.js'

// pull-up-down组件
import loadmore from '@components/loadmore/loadmore.vue'

// loading组件
import spinner from '@components/spinner/spinner.vue'


export default {
    data () {
        return {
            topStatus: '',
            bottomStatus: '',
            wrapperHeight: 0,
            allLoaded:true,  // 如果要开启【上拉加载模式】再把这个默认值改为:false，该值为true时，不支持上拉加载
            loading: false,
            isFirstloadData: true,  // 为了跳过首次执行带来的bug.这是一个单向锁，一旦关闭，永不开启
            isFirstloadBottom: true // 为了跳过首次执行带来的bug.这是一个单向锁，一旦关闭，永不开启
        }
    },
    props:{
        // 对外提供的接口：下拉事件的回调函数
        _loadTop : {
           type: Function
        },
        // 对外提供的接口：上拉事件的回调函数
        _loadBottom: {
           type: Function
        },
        // 数据是否为空？如果是的话放出公共的提示图片
        _isEmpty : {
            type: Boolean,
            default:false
        },
        // 是否关闭上拉加载功能
        _bottomDisabled: {
            type:Boolean,
            default:false
        },
        // 是否开启下拉刷新功能
        Top: {
            type:Boolean,
            default: true,
        },
        // 是否开启上拉加载更多功能
        Bottom: {
            type:Boolean,
            default: true,
        },
        // 没有更多数据时显示的文本
        noMoreText: {
            type:String,
            default: '已经到底了哦'
        },
        // 没有数据时显示的文本
        noThingText: {
            type:String,
            default: '你还没有拍卖数据<br />快去汽车拍卖看看吧'
        }
    },
    components: {
        loadmore,
        spinner
    },
    methods: {        
        handleTopChange (status) {
            this.topStatus = status;
        },
        handleBottomChange (status) {
            this.bottomStatus = status;
        },
        loadTop () {
            // 如果开启了Top下拉刷新功能,那么才可以执行回调函数
            if (this.Top) {
                 // 延迟1秒仅仅是为了视觉体验
                setTimeout(() => {
                    if (this.$refs.loadmore) {
                        this._loadTop(()=>{
                            this.$refs.loadmore.onTopLoaded();
                        });
                    }
                },500)
            // 如果不开启的情况下直接弹回即可
            } else {
                this.$refs.loadmore.onTopLoaded();
                // 防止拖拽事件冒泡发送click事件冒泡
                event.stopPropagation()
            }
        },
        loadData () {
            // 没有关闭上拉加载开关 并且 开启上拉加载更多功能的时候
            if (!this._bottomDisabled && this.Bottom) {
                // 跳过首次加载带来的bug
                // if (this.isFirstloadData) return this.isFirstloadData = false
                // 加载loading图
                this.loading = true;
                // 滚动到底部
                this.$nextTick(_ => { this.$refs.wrapper.scrollTop = this.$refs.wrapper.scrollHeight })
                // 这个setTimeout 仅仅为了视觉体验
                setTimeout(() => {
                    console.log(123);
                    this.loading = false;  
                    // 执行外部传递进来的_loadBottom函数，通常是异步加载数据，
                    this._loadBottom(() => {
                        // 传递一个cb回调函数回去。作用是结束loading图
                        this.loading = false;  
                    });
                }, 500)
            }
        }
    },
    mounted () {
        // 为什么这里要延迟650毫秒，由于路由转场动画花费了我400毫秒，这段期间，可能之前是界面有Footer元素，所以我需要先等它完全消失，所以事实上也就是给了250毫秒的等待时间
        setTimeout(() => {
            // 底部的高度
            let footerHeight = 0

            // 如果底部存在，那应该再减去底部的高度
            if (document.getElementsByClassName("cs-footer")[0]) footerHeight = document.getElementsByClassName("cs-footer")[0].clientHeight

            // 设置滚动区域的高度
            this.wrapperHeight = document.documentElement.clientHeight - this.$refs.wrapper.getBoundingClientRect().top - footerHeight  + 'px'

            // console.log(this.wrapperHeight, document.documentElement.clientHeight, this.$refs.wrapper.getBoundingClientRect().top,  footerHeight)
            // 当dom渲染完成后，再判断和渲染一次高度
            // 开发小故事：由于默认只有第一个展示出来，第二三个处于display:none的状态，所以他们的getBoundingClientRect().top获取时为 0 
            // 这会导致height设置错误。导致一系列错误。我的解决方案是，当切换的时候，让第二、三个来遵循第一个的高度即可解决
            this.$nextTick( _ => {
                 let height = getComputedStyle(document.querySelectorAll('.page-loadmore-wrapper')[0])["height"]
                 if (this.$refs.wrapper.getBoundingClientRect().top  === 0)  this.wrapperHeight = height
            })
        }, 0)
    }
  }
</script>


<style lang="scss" scoped>
@import "~@sass/_variables";
@import "~@sass/_func";

.page-loadmore-list {
    // margin-bottom:pxToRem(25px);
}
.page-loadmore-wrapper {
    overflow: scroll;
    background: #eee;
}
.mint-spinner {
    display: inline-block;
    vertical-align: middle;
}
.list-nodata {
    display: flex;
    justify-content: center;
    margin: 30px auto;
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

.page-infinite-loading {
    text-align: center;
    padding:pxToRem(30px) 0 pxToRem(60px) 0;
    display:flex;
    justify-content:center;
    align-items:center;
    font-size:pxToRem(35px);
    .page-loading-spinner {
        margin-right:pxToRem(15px);
    }
}

.emptyDataDiv,  {
    @include flex(c, c , c)
    .emptyDataImg {
        @include fullbg(306px, 200px, "~@assets/carsell/emptyData.png")
        margin-top:pxToRem(136px);
    }
    .emptyDataText {
        color: #666666;
        line-height: pxToRem(60px);;
        letter-spacing: pxToRem(1px);
        font-size:pxToRem(30px);
        margin-top:pxToRem(60px);
        text-align: center;
    }
    
}

.allLoadDiv {
    position: relative;
    height: pxToRem(100px);
    margin: 0 pxToRem(30px);

    .allLoadDiv__line {
        @include line(100px, #999);
    }
    .allLoadDiv__text {
        @include center;
        color: #999999;
        font-size:pxToRem(24px);
        z-index: 999;
        background: #f2f2f2;
        width: pxToRem(190px);
        text-align: center;
    }

    // .allLoadImg {
    //     width:pxToRem(250px);
    //     height:pxToRem(250px);
    //     background:url("~@assets/loading.png") no-repeat center center / cover;
    //     margin-top:pxToRem(20px);
    // }
    
    // .allLoadText {
    //     color:#000;
    //     font-size:pxToRem(32px);
    //     margin:pxToRem(20px);
    // }
}
</style>
