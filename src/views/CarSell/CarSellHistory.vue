<template>
    <div class="CarSellHistory">

        <!-- <navbar v-model="selected">
            <tabitem id="tab-container1" :fontSize="'32'">已报名</tabitem>
            <tabitem id="tab-container2" :fontSize="'32'">已竞买</tabitem> 
        </navbar> -->

        <div class="search">
            <div class="search__left">
                <i class="search__icon"></i>
                <input type="text" class="search__input" placeholder="请输入品牌/型号" v-model="search"  @change="searchFn"/>
            </div>
            <div class="search__right" @click="searchFn"> 搜索 </div>
        </div>

        <panel ref="pannel1" :_loadTop = "loadTop" :_loadBottom = "loadBottom"  :_isEmpty="tag['1']['isEmpty']" :_isError="tag['1']['isError']" :_bottomDisabled = "tag['1']['bottomDisabled']">
            <div slot="body">
                <item v-for="(item,index) in tag['1']['list']" :key="index"                           
                    :id="item.businessId"
                    :maindata="item"
                    :image="item.docs && item.docs[0] && item.docs[0].docUrl"
                    :name="item.vehicleBrand"
                    :model="item.carModel"
                    :money="item.startPrice"
                    :endtime="item.etartPriceDate"
                    :city="item.vcehicleTerritory"
                    :isFinish="getEnd(item.endBidTime)">
                </item>
            </div>
        </panel>

        <!-- <tabcontainer  v-model="selected" swipeable>
            <tabcontaineritem  id="tab-container1" >
              <panel ref="pannel1" :_loadTop = "loadTop" :_loadBottom = "loadBottom"  :_isEmpty="tag['1']['isEmpty']" :_isError="tag['1']['isError']" :_bottomDisabled = "tag['1']['bottomDisabled']">
                  <div slot="body">
                     <item v-for="(item,index) in tag['1']['list']" :key="index"                           
                           :id="item.businessId"
                           :maindata="item"
                           :image="item.docs && item.docs[0] && item.docs[0].docUrl"
                           :name="item.vehicleBrand"
                           :model="item.carModel"
                           :money="item.startPrice"
                           :endtime="item.etartPriceDate"
                           :city="item.vcehicleTerritory"
                           :isFinish="getEnd(item.endBidTime)">
                     </item>
                  </div>
              </panel>
            </tabcontaineritem>

            <tabcontaineritem id="tab-container2">
              <panel ref="pannel2" :_loadTop = "loadTop" :_loadBottom = "loadBottom"   :_isEmpty="tag['2']['isEmpty']" :_isError="tag['2']['isError']" :_bottomDisabled = "tag['2']['bottomDisabled']">
                  <div slot="body">
                      <item v-for="(item,index) in tag['2']['list']" :key="index"                            
                            :id="item.businessId"
                            :maindata="item"
                            :image="item.docs && item.docs[0] && item.docs[0].docUrl"
                            :name="item.vehicleBrand"
                            :model="item.carModel"
                            :money="item.startPrice"
                            :endtime="item.etartPriceDate"
                            :city="item.vcehicleTerritory"
                            :isFinish="true">
                      </item>
                  </div>
              </panel>
            </tabcontaineritem>
        </tabcontainer> -->
    </div>
</template>

<script>
 import item from '@myComponents/carsellitem.vue'

 // panel组件
 import panel from '@myComponents/panel.vue'

 // nav组件
 //import navbar from '@components/tabbar/tabbar.vue'
 //import tabitem from '@components/tab-item/tab-item.vue'

 // tabcontainer组件
 //import tabcontainer from '@components/tab-container/tab-container.vue'
 //import tabcontaineritem from '@components/tab-container-item/tab-container-item.vue'

 // Toast组件
 import Toast from '@components/toast/index.js'

 // 路由
 import Router from 'vue-router'

/**
 * 注意：type其实就是tag
 * 这是一一对应的。只是换一种理解和思维而已。
 */

export default {
  name: 'CarSellHistory',
  data () {
    return {
        phone: this.$store.state.phone,
        selected: 'tab-container1',
        search: '',
        where: {
            type: '2',                           // 1.已报名，2已竞买
            telephone: this.$store.state.phone,  // 手机号码
            page: 1,                             // 分页索引，从1开始
            limit: 15,                           // 每次获取的条数
            vehicleBrand: '',                    // 车辆品牌
            carModel: '',                        // 车辆型号
        },
        tag: {
            '1':{ isSearch:false, isEmpty: false, bottomDisabled: false, list:[], isError: false },
            '2':{ isSearch:false, isEmpty: false, bottomDisabled: false, list:[], isError: false },
        },
        oldTag: null,
        __token__: ''
    }
  },
  components: {
        item,
        panel,
  },
  computed: {
      // 返回当前的tag对象
      currTag () {
        return this.tag[this.where.type]
      }
  },
  methods: {
    getEnd (endBidTime) {
      var nowtime = new Date().valueOf()
      var endtime = new Date(endBidTime.replace(/\-/g, "/")).valueOf()
      return nowtime > endtime ? true : false
    },
    getData (success_cb, err_cb, isQuite = false,isLogin = true) {
        this.carapi.selectAuctionReg(this.where, isQuite,isLogin).then(data => {
            console.log(data)
           if (data.returnCode == 0) {
              this.currTag.isError = false;
              // 当请求数据不为空的时候，重置展示状态
              if (data.data.length > 0) {
                this.currTag.bottomDisabled = false;
                this.currTag.isEmpty = false;
                this.currTag.isError = false;
              }
              success_cb && success_cb(data)
           } else {
              err_cb && err_cb(data.msg ? data : { msg: '网络异常' })
              this.currTag.isError = true
           }
       })
    },
    loadTop (cb) {
        // 据我所知，下拉刷新需要重置一下搜索条件。
        this.resetWhere()
        this.search = '';
        this.getData(_ => {
            this.currTag.list = _.data
            cb && cb()
        }, _=>{
            Toast(_.msg)
            cb && cb()
        }, true)
    },
    loadBottom (cb) {
        // 兼容一种特殊情况,只在多个tag且用户操作过急的情况才可能发生
        if (this.$refs[`pannel${this.where.type}`].loading === false) {
          this.$refs[`pannel${this.oldTag}`].$el.scrollTop = 0
          return cb && cb()
        }
        // 页面索引++
        this.where.page++;
        this.getData(_ => {
            // 如果请求数据为空，那就禁止【上拉加载更多】，展示【没有更多数据啦~】
            if (_.data.length === 0) this.currTag.bottomDisabled = true;
            this.currTag.list.push(..._.data)
            cb && cb()
        }, _ => {
            // 这个还不太好弄，如果说你处于下拉状态，只是关闭还没有用。因为还是会不断的触发下拉。这是一个bug。需要改正。
            Toast(_.msg)
            cb && cb()
        }, true)
    },
    searchFn () {
        this.resetWhere();
        this.where.vehicleBrand = this.search
        this.where.carModel = this.search

        this.currTag.list = []
        this.getData(_ => {
            this.currTag.isSearch = true
            this.currTag.list = _.data
            if (!this.currTag.list.length) {
              this.currTag.isEmpty = true
              this.currTag.bottomDisabled = false
            }
        }, _ => {
            Toast(_.msg);
            this.currTag.isEmpty = true
        })
    },
    resetWhere () {
        this.where = {
              // 保持type哦~
              type: this.where.type,  // [1.即将拍卖，2进行中，3.拍卖完成]
              page: 1,                // 分页索引，从1开始
              limit: 15,              // 每次获取的条数
              vehicleBrand: '',       // 车辆品牌
              carModel: '',           // 车辆型号
        }
    }
  },
  watch: {
    // 通过监听navbar的切换（selected状态的变化），来请求数据并且赋值（仅加载一次）。
    // selected (curVal, oldVal) {
    //      // 存储切换前的tag索引
    //      this.oldTag = oldVal.substr(-1, 1)
    //      // 重置搜索条件
    //      this.resetWhere()
    //      this.search = '';
    //      // 【设置当前操作tag对象】
    //      this.where.type = curVal.substr(-1, 1)
    //      // 骚操作
    //      this.setTitle(['已报名','已竞买'][+(this.where.type) - 1])

    //      // 选项卡改变的时候，肯定需要进行fetch的，但如果原本的tag有值的话，那么就不需要更新了。先这样简单处理。
    //      // 这个页面，最好也加入active，就算更新出了问题，那也是以后的解决方案。
    //      if (this.currTag.list.length == 0|| this.currTag.isSearch) {

    //          this.getData(_ => {
    //             this.currTag.isSearch = false
    //             this.currTag.list = _.data
    //             if (_.data.length === 0) { 
    //               this.currTag.isEmpty = true;
    //               this.currTag.bottomDisabled = false;
    //             }
    //          }, _ => {
    //             Toast(_.msg)
    //          })
    //      }
    // }
  },
  created () {
      //首先判断一下是否有登录，按目前逻辑来走，在手机运营商这一块是不需要作判断的
    //   if(!this.$store.getters.AppData.isLogin) {
    //       //跳转至原生登录
    //     let bridge = this.Bridge
    //     // bridge 的初始化完成事件.必须在此事件之后再开始页面的生命周期，否则期间使用bridge 很可能由于未初始化完成而找不到插件函数报错
    //     bridge.deviceReady(null, () => {
    //         // 获取设备信息API
    //         bridge.exec('Login', () => {
    //             // 登录成功之后返回
    //             console.log('success')
    //         }, () => {
    //             console.log('err')
    //         }, {
    //             'key': 'APP_DATA'
    //         })
    //     })
    //   }else {

    //   }
      this.getData(_ => {
          this.currTag.list = _.data
          if (_.data.length === 0) this.currTag.isEmpty = true;
       }, _ => {
          Toast(_.msg)
       })
    }
}
</script>

<style lang="scss" scoped>
@import "~@sass/_variables.scss";
@import "~@sass/_func.scss";

.CarSellHistory {
   overflow: visible;
}

.search {
    @include flex(b, center);
    padding: 0 pxToRem(30px);
    margin: pxToRem(10px) 0;
    background: $bg-white;
    font-size: pxToRem(32px);
    height: pxToRem(98px);

    .search__left {
        @include flex(b, center);
        flex: 1;
    } 

    .search__right {
        color: $font-primary;
        margin-left: pxToRem(20px);
    }

    .search__icon {
        @include bgImg(42px, 42px, '~@assets/carsell/search.png');
        margin-right: pxToRem(36px);
    }

    .search__input {
        flex: 1;
        -webkit-appearance: none;
        background: transparent;
        border: 0;
        font-size: pxToRem(32px);
        outline: 0;
        letter-spacing: pxToRem(2px);
    }
}

</style>