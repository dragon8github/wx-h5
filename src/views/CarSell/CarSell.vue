<template>
    <div class="CarSell">

        <navbar v-model="selected">
            <tabitem id="tab-container1" :fontSize="'32'">即将拍卖</tabitem>
            <tabitem id="tab-container2" :fontSize="'32'">拍卖进行</tabitem> 
            <tabitem id="tab-container3" :fontSize="'32'">拍卖完成</tabitem> 
        </navbar>

        <div class="search">
            <div class="search__left">
                <i class="search__icon"></i>
                <input type="text" class="search__input" placeholder="请输入品牌/型号" v-model="search" />
            </div>
            <div class="search__right"> 搜索 </div>
        </div>

        <tabcontainer  v-model="selected" swipeable>
            <tabcontaineritem  id="tab-container1" >
              <panel :_loadTop = "loadTop" :_loadBottom = "loadBottom" :_isEmpty="tag['1']['isEmpty']" :_bottomDisabled = "tag['1']['bottomDisabled']">
                  <div slot="body">
                     <item v-for="(item,index) in tag['1']['list']" 
                           :key="index"
                           :maindata="item"
                           :image="item.docUrl"
                           :name="item.vehicleBrand"
                           :money="item.startPrice"
                           :time="item.etartPriceDate"
                           :city="item.city"
                           :id="item.priceID">
                     </item>
                  </div>
              </panel>
            </tabcontaineritem>

            <tabcontaineritem id="tab-container2">
              <panel :_loadTop = "loadTop" :_loadBottom = "loadBottom"  :_isEmpty="tag['2']['isEmpty']" :_bottomDisabled = "tag['2']['bottomDisabled']">
                  <div slot="body">
                      <item v-for="(item,index) in tag['2']['list']" 
                            :key="index"
                            :maindata="item"
                            :image="item.docUrl"
                            :name="item.vehicleBrand"
                            :money="item.startPrice"
                            :time="item.endBidTime"
                            :city="item.city"
                            :id="item.priceID">
                      </item>
                  </div>
              </panel>
            </tabcontaineritem>

            <tabcontaineritem id="tab-container3">
              <panel :_loadTop = "loadTop" :_loadBottom = "loadBottom"  :_isEmpty="tag['3']['isEmpty']" :_bottomDisabled = "tag['3']['bottomDisabled']">
                  <div slot="body">
                      <item v-for="(item,index) in tag['3']['list']" 
                            :key="index"
                            :maindata="item"
                            :image="item.docUrl"
                            :name="item.vehicleBrand"
                            :money="item.startPrice"
                            :time="item.endBidTime"
                            :city="item.city"
                            :id="item.priceID">
                      </item>
                  </div>
              </panel>
            </tabcontaineritem>
        </tabcontainer>

        
        <!-- <div class="nodata">
            <img class="nodata__image" src="~@assets/carsell/nodata.png" />
            <div class="nodata__text">你还没有拍卖数据</div>
            <div class="nodata__text">快去汽车拍卖看看吧</div>
        </div> -->
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

 import Toast from '@components/toast/index.js'


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
            '1':{ isSearch:false, isEmpty: false, bottomDisabled: false,  index: 1, list:[]},
            '2':{ isSearch:false, isEmpty: false, bottomDisabled: false, index: 2, list:[]},
            '3':{ isSearch:false, isEmpty: false, bottomDisabled: false, index: 3, list:[]}
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
    loadTop (cb) {
        window.setTimeout(cb, 1000);
    },
    getData (success_cb, err_cb) {
        this.carapi.selectAuctionsPage(this.where).then(data => {
           if (data.returnCode == 0) {
              success_cb && success_cb(data)
           } else {
              err_cb && err_cb(data.msg ? data : { msg: '网络异常'})
           }
       })
    },
    loadBottom (cb) {
        cb && cb();   
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
         if (this.tag[this.currTag].list.length == 0) {
             this.getData(_ => {
                this.tag[this.currTag].list = _
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

.search {
    @include flex(b, center);
    padding: 0 pxToRem(30px);
    margin-top: pxToRem(10px);
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