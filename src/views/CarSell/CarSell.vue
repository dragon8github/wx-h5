<template>
  <div class="car-sell">
    <!--汽车拍卖的tab-->
    <tabbar v-model="selected">
      <tabitem id="tab-container04">车辆信息</tabitem>
      <tabitem id="tab-container05">历史交易</tabitem>
    </tabbar>

    <!--消息及搜索-->
    <!-- <div class="ad"> 重要提示:请在竞拍前报名交保证金，参与竞拍 </div> -->

    <div class="search">
        <div class="search-left">
            <i class="search-icon"></i>
            <input type="text" class="search-input" placeholder="请输入品牌/型号" v-model="search" @change="searchFn"/>
        </div>
        <div class="search-right" @click="searchFn"> 搜索 </div>
    </div>

    <!--内容模块-->
    <tabcontainer v-model="selected">
      <tabcontaineritem id="tab-container04">
        <panel ref="pannel04" :_loadTop = "loadTop" :_loadBottom = "loadBottom" :_isEmpty="tag['04']['isEmpty']" :_isError="tag['04']['isError']" :_bottomDisabled = "tag['04']['bottomDisabled']" :noThingText="'暂时没有拍卖车辆'">
                <div slot="body">
                    <item v-for="(item,index) in tag['04']['list']" :key="index"    
                          :type="where.type"
                          :id="item.businessId"
                          :maindata="item"
                          :image="item.docs && item.docs[0] && item.docs[0].docUrl"
                          :name="item.vehicleBrand"
                          :model="item.carModel"
                          :money="item.startPrice"
                          :starttime="item.startPriceDate"
                          :endtime="item.endPriceDate"
                          :city="item.vcehicleTerritory">
                    </item>
                </div>
            </panel>
      </tabcontaineritem>
      
      <tabcontaineritem id="tab-container05">
        <panel ref="pannel05" :_loadTop = "loadTop" :_loadBottom = "loadBottom"  :_isEmpty="tag['05']['isEmpty']" :_isError="tag['05']['isError']" :_bottomDisabled = "tag['05']['bottomDisabled']" :noThingText="'暂时没有拍卖车辆'">
            <div slot="body">
                <item v-for="(item,index) in tag['05']['list']" :key="index"      
                      :type="where.type"                      
                      :id="item.businessId"
                      :maindata="item"
                      :image="item.docs && item.docs[0] && item.docs[0].docUrl"
                      :name="item.vehicleBrand"
                      :model="item.carModel"
                      :money="item.startPrice"
                      :starttime="item.startPriceDate"
                      :city="item.vcehicleTerritory">
                </item>
            </div>
        </panel>
      </tabcontaineritem>
      <!-- <tabcontaineritem id="tab-container3">
        <panel ref="pannel3" :_loadTop = "loadTop" :_loadBottom = "loadBottom"  :_isEmpty="tag['3']['isEmpty']" :_isError="tag['3']['isError']" :_bottomDisabled = "tag['3']['bottomDisabled']" :noThingText="'暂时没有拍卖车辆'">
            <div slot="body">
                <item v-for="(item,index) in tag['3']['list']" :key="index"                            
                      :id="item.businessId"
                      :maindata="item"
                      :image="item.docs && item.docs[0] && item.docs[0].docUrl"
                      :name="item.vehicleBrand"
                      :model="item.carModel"
                      :money="item.startPrice"
                      :city="item.vcehicleTerritory"
                      :isFinish="true">
                </item>
            </div>
        </panel>
      </tabcontaineritem> -->
    </tabcontainer>

  </div>
</template>

<style lang="scss">
  @import "../../sass/variables.scss";
  @import "../../sass/func.scss";
  // .ad {
  //   height: pxToRem(70px);
  //   background-color: #fffde3;
  //   line-height: pxToRem(70px);
  //   padding-left: pxToRem(30px);
  //   color: $font-txt-light;
  //   font-size: pxToRem(24px);
  //   margin-top: pxToRem(10px);
  // }
  .search {
    @include flex(b, center);
    padding: 0 pxToRem(30px);
    margin: pxToRem(10px) 0;
    background: $bg-white;
    font-size: pxToRem(32px);
    height: pxToRem(98px);
    .search-left {
      @include flex(b, center);
      flex: 1;
      .search-icon {
        @include bgImg(42px, 42px, '~@assets/carsell/search.png');
        margin-right: pxToRem(36px);
      }
      .search-input {
        flex: 1;
        -webkit-appearance: none;
        background: transparent;
        border: 0;
        font-size: pxToRem(32px);
        outline: 0;
        letter-spacing: pxToRem(2px);
      }
    }
    .search-right {
      color: $btn-font-primary;
      margin-left: pxToRem(20px);
    }
  }
</style>
<script>
  import item from '@myComponents/carsellitem.vue'
  import tabbar from '@components/tabbar/tabbar.vue'
  import tabitem from '@components/tabItem/tabItem.vue'
  import tabcontainer from '@components/tabContainer/tabContainer.vue'
  import tabcontaineritem from '@components/tabContainerItem/tabContainerItem.vue'
  import panel from '@myComponents/panel.vue'
  import Toast from '@components/toast/index.js'


  export default {
    name: 'CarSell',
    components:{
      tabbar,
      tabitem,
      tabcontainer,
      tabcontaineritem,
      panel,
      item
    },
    data () {
      return {
        selected: 'tab-container04',
        search: '',
        where: {
              type: '04',        // [1.即将拍卖，2进行中，3.拍卖完成]
              page: 1,          // 分页索引，从1开始
              limit: 15,        // 每次获取的条数
              vehicleBrand: '', // 车辆品牌
              carModel: '',     // 车辆型号
        },
        tag: {
            '04':{ isSearch:false, isEmpty: false, bottomDisabled: false, list:[], isError: false },
            '05':{ isSearch:false, isEmpty: false, bottomDisabled: false, list:[], isError: false }
        },
        oldTag: null
      }
    },
    computed: {
        // 返回当前的tag对象
        currTag () {
          return this.tag[this.where.type]
        }
    },
    methods:{
        getData (success_cb, err_cb) {
          this.carapi.selectAuctionsPage(this.where).then(data => {
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
                //console.log('return data',data)
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
              this.currTag.list.push(...(_.data))
              cb && cb()
          }, _ => {
              // 这个还不太好弄，如果说你处于下拉状态，只是关闭还没有用。因为还是会不断的触发下拉。这是一个bug。需要改正。
              Toast(_.msg)
              cb && cb()
          }, true)
      },
      searchFn () {
          // 由于resetwhere也会清空search，所以先缓存起来吧
          this.resetWhere();
          // 添加搜索条件
          this.where.vehicleBrand = this.search
          this.where.carModel = this.search
          // 无论搜索的结果如何，都先把当前的内容给清空
          this.currTag.list = []

          this.getData(_ => {
              this.currTag.isSearch = true
              this.currTag.list = _.data
              if (!this.currTag.list.length) {
                this.currTag.isEmpty = true
                this.currTag.bottomDisabled = false;
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
      selected (curVal, oldVal) {
          // 存储切换前的tag索引
          this.oldTag = oldVal.substr(-2, 2)
          // 重置搜索条件
          this.resetWhere()
          this.search = '';
          // 【设置当前操作tag对象】
          this.where.type = curVal.substr(-2, 2)
          // 选项卡改变的时候，肯定需要进行fetch的，但如果原本的tag有值的话，那么就不需要更新了。先这样简单处理。
          // 这个页面，最好也加入active，就算更新出了问题，那也是以后的解决方案。
          //console.log(this.currTag)
          if (this.currTag.list.length == 0 || this.currTag.isSearch) {
              this.getData(_ => {
                  this.currTag.isSearch = false
                  this.currTag.list = _.data
                  if (_.data.length === 0) { 
                    this.currTag.isEmpty = true;
                    this.currTag.bottomDisabled = false;
                  }
              }, _ => {
                  Toast(_.msg)
              })
          }
      }
    },
    created () {
      if (this.currTag.list.length === 0) {
        this.getData(_ => {
            this.currTag.list = _.data
            if (_.data.length === 0) this.currTag.isEmpty = true;
        }, _ => {
            Toast(_.msg)
        })
      }
    }
  }
</script>
