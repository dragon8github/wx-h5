<template>
    <div class="CarSell">

        <navbar v-model="selected">
            <tabitem id="tab-container1" :fontSize="'32'">即将拍卖</tabitem>
            <tabitem id="tab-container2" :fontSize="'32'">拍卖进行</tabitem> 
            <tabitem id="tab-container3" :fontSize="'32'">拍卖完成</tabitem> 
        </navbar>

        <!-- <div class="ad" v-if="selected === 'tab-container1'"> 重要提示:请在竞拍前报名交保证金，参与竞拍 </div> -->
        <div class="ad"> 重要提示:请在竞拍前报名交保证金，参与竞拍 </div>

        <div class="search">
            <div class="search__left">
                <i class="search__icon"></i>
                <input type="text" class="search__input" placeholder="请输入品牌/型号" v-model="search" />
            </div>
            <div class="search__right" @click="searchFn"> 搜索 </div>
        </div>

        <tabcontainer  v-model="selected" swipeable>
            <tabcontaineritem  id="tab-container1" >
              <panel ref="pannel1" :_loadTop = "loadTop" :_loadBottom = "loadBottom" :_isEmpty="tag['1']['isEmpty']" :_bottomDisabled = "tag['1']['bottomDisabled']">
                  <div slot="body">
                     <item v-for="(item,index) in tag['1']['list']" :key="index"                           
                           :id="item.businessId"
                           :maindata="item"
                           :image="item.docs && item.docs[0] && item.docs[0].docUrl"
                           :name="item.vehicleBrand"
                           :money="item.startPrice"
                           :starttime="item.startPriceDate"
                           :city="item.vcehicleTerritory">
                     </item>
                  </div>
              </panel>
            </tabcontaineritem>

            <tabcontaineritem id="tab-container2">
              <panel ref="pannel2" :_loadTop = "loadTop" :_loadBottom = "loadBottom"  :_isEmpty="tag['2']['isEmpty']" :_bottomDisabled = "tag['2']['bottomDisabled']">
                  <div slot="body">
                      <item v-for="(item,index) in tag['2']['list']" :key="index"                            
                            :id="item.businessId"
                            :maindata="item"
                            :image="item.docs && item.docs[0] && item.docs[0].docUrl"
                            :name="item.vehicleBrand"
                            :money="item.startPrice"
                            :starttime="item.startPriceDate"
                            :city="item.vcehicleTerritory">
                      </item>
                  </div>
              </panel>
            </tabcontaineritem>

            <tabcontaineritem id="tab-container3">
              <panel ref="pannel3" :_loadTop = "loadTop" :_loadBottom = "loadBottom"  :_isEmpty="tag['3']['isEmpty']" :_bottomDisabled = "tag['3']['bottomDisabled']">
                  <div slot="body">
                      <item v-for="(item,index) in tag['3']['list']" :key="index"                            
                            :id="item.businessId"
                            :maindata="item"
                            :image="item.docs && item.docs[0] && item.docs[0].docUrl"
                            :name="item.vehicleBrand"
                            :money="item.startPrice"
                            :city="item.vcehicleTerritory"
                            :isFinish="true">
                      </item>
                  </div>
              </panel>
            </tabcontaineritem>
        </tabcontainer>
    </div>
</template>

<script>
 import item from '@myComponents/carsellitem.vue'

 // panel组件
 import panel from '@myComponents/panel.vue'

 // nav组件
 import navbar from '@components/navbar/navbar.vue'
 import tabitem from '@components/tabItem/tabItem.vue'

 // tabcontainer组件
 import tabcontainer from '@components/tabcontainer/tabcontainer.vue'
 import tabcontaineritem from '@components/tabContainerItem/tabContainerItem.vue'

 // Toast组件
 import Toast from '@components/toast/index.js'

 // 路由
 import Router from 'vue-router'

/**
 * 注意：type其实就是tag
 * 这是一一对应的。只是换一种理解和思维而已。
 */

export default {
  name: 'CarSell',
  data () {
    return {
        selected: 'tab-container1',
        search: '',
        where: {
              type: '1',        // [1.即将拍卖，2进行中，3.拍卖完成]
              page: 1,          // 分页索引，从1开始
              limit: 15,        // 每次获取的条数
              vehicleBrand: '', // 车辆品牌
              carModel: '',     // 车辆型号
        },
        tag: {
            '1':{ isSearch:false, isEmpty: false, bottomDisabled: false, list:[] },
            '2':{ isSearch:false, isEmpty: false, bottomDisabled: false, list:[] },
            '3':{ isSearch:false, isEmpty: false, bottomDisabled: false, list:[] }
        },
        oldTag: null
    }
  },
  components: {
        item,
        navbar,
        tabitem,
        tabcontainer,
        tabcontaineritem,
        panel,
  },
  computed: {
      // 返回当前的tag对象
      currTag () {
        return this.tag[this.where.type]
      }
  },
  methods: {
    getData (success_cb, err_cb, isQuite = false) {
        this.carapi.selectAuctionsPage(this.where, isQuite).then(data => {
           if (data.returnCode == 0) {
              // 当请求数据不为空的时候，重置展示状态
              if (data.data.length > 0) {
                this.currTag.bottomDisabled = false;
                this.currTag.isEmpty = false;
              } else {
                this.currTag.isEmpty = true;
              }
              success_cb && success_cb(data)
           } else {
              err_cb && err_cb(data.msg ? data : { msg: '网络异常' })
           }
       })
    },

    loadTop (cb) {
        // 据我所知，下拉刷新需要重置一下搜索条件。
        this.resetWhere()
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
            if (_.data.length === 0) tag.bottomDisabled = true;
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
            this.currTag.list = _.data
            if (!this.currTag.list.length) {
              this.currTag.isEmpty = true
            }
        }, _ => {
            Toast(_.msg);
            this.currTag.isEmpty = true
        })
    },
    resetWhere () {
        this.where = {
              type: '1',        // [1.即将拍卖，2进行中，3.拍卖完成]
              page: 1,          // 分页索引，从1开始
              limit: 15,        // 每次获取的条数
              vehicleBrand: '', // 车辆品牌
              carModel: '',     // 车辆型号
        }
        this.search = '';
    }
  },
  watch: {
    // 通过监听navbar的切换（selected状态的变化），来请求数据并且赋值（仅加载一次）。
    selected (curVal, oldVal) {
         // 存储切换前的tag索引
         this.oldTag = oldVal.substr(-1, 1)
         // 重置搜索条件
         this.resetWhere();
         // 【设置当前操作tag对象】
         this.where.type = curVal.substr(-1, 1)

         // 选项卡改变的时候，肯定需要进行fetch的，但如果原本的tag有值的话，那么就不需要更新了。先这样简单处理。
         // 这个页面，最好也加入active，就算更新出了问题，那也是以后的解决方案。
         if (this.currTag.list.length == 0) {
             this.getData(_ => {
                this.currTag.list = _.data
             }, _ => {
                Toast(_.msg)
             })
         }
    }
  },
  beforeMount () {
      this.getData(_ => {
          this.currTag.list = _.data
       }, _ => {
          Toast(_.msg)
       })
  },
  activated () {

  }
}
</script>

<style lang="scss" scoped>
@import "~@sass/_variables";
@import "~@sass/_func";

.CarSell {
   
}

.ad {
  height: pxToRem(70px);
  background-color: #fffde3;
  line-height: pxToRem(70px);
  padding-left: pxToRem(30px);
  color: #666666;
  font-size: pxToRem(24px);
  margin-top: pxToRem(10px);
}

.search {
    @include flex(b, center);
    padding: 0 pxToRem(30px);
    margin: pxToRem(10px) 0;
    background: #fff;
    font-size: pxToRem(32px);
    height: pxToRem(98px);

    .search__left {
        @include flex(b, center);
        flex: 1;
    } 

    .search__right {
        color: #0e6ae7;
        margin-left: pxToRem(20px);
    }

    .search__icon {
        @include bg(42px, 42px, '~@assets/carsell/search.png')
        margin-right: pxToRem(36px);
    }

    .search__input {
        flex: 1;
        appearance: none;
        background: transparent;
        border: 0;
        font-size: pxToRem(32px);
        outline: 0;
        letter-spacing: pxToRem(2px);
    }
}

</style>