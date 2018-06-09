<template>
    <div class="CarSellHistory">
        <div class="search">
            <div class="search__left">
                <i class="search__icon"></i>
                <input type="text" class="search__input" placeholder="请输入品牌/型号" v-model="search"  @change="searchFn"/>
            </div>
            <div class="search__right" @click="searchFn"> 搜索 </div>
        </div>

        <panel  :_loadTop = "loadTop" :_loadBottom = "loadBottom"  :_isEmpty="csHistoryList['isEmpty']" :_isError="csHistoryList['isError']" :_bottomDisabled = "csHistoryList['bottomDisabled']">
            <div slot="body">
                <item v-for="(item,index) in csHistoryList['list']" :key="index"                           
                    :id="item.businessId"
                    :maindata="item"
                    :image="item.docs && item.docs[0] && item.docs[0].docUrl"
                    :name="item.vehicleBrand"
                    :model="item.carModel"
                    :money="item.myPrice"
                    :starttime="item.startPriceDate"
                    :endtime="item.endPriceDate"
                    :city="item.vcehicleTerritory"
                    :isFinish="getEnd(item.endPriceDate)">
                </item>
            </div>
        </panel>
    </div>
</template>

<script>
 import item from '@myComponents/carsellitem.vue'

 // panel组件
 import panel from '@myComponents/panel.vue'

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
        search: '',
        where: {
            page: 1,                             // 分页索引，从1开始
            limit: 15,                           // 每次获取的条数
            vehicleBrand: '',                    // 车辆品牌
            carModel: '',                        // 车辆型号
            userId: this.$store.getters.AppData.userId
        },
        csHistoryList: {
            isSearch: false,
            isEmpty: false,
            bottomDisabled: false,
            isError: false,
            list: []
        }
    }
  },
  components: {
        item,
        panel,
  },
  methods: {
    getEnd (endPriceDate) {
      var nowtime = new Date().valueOf()
      var endtime = new Date(endPriceDate.replace(/\-/g, "/")).valueOf()
      return nowtime > endtime ? true : false
    },
    getData (success_cb, err_cb) {
        this.carapi.myBidCars(this.where).then(data => {
           if (data.returnCode == 0) {
              // 当请求数据不为空的时候，重置展示状态
              if (data.data.length > 0) {
                this.csHistoryList.bottomDisabled = false;
                this.csHistoryList.isEmpty = false;
                this.csHistoryList.isError = false;
              }
              success_cb && success_cb(data)
           } else {
              err_cb && err_cb(data.msg ? data : { msg: '网络异常' })
              this.csHistoryList.isError = true
           }
       })
    },
    loadTop (cb) {
        // 据我所知，下拉刷新需要重置一下搜索条件。
        this.resetWhere()
        this.search = '';
        this.getData(_ => {
            this.csHistoryList.list = _.data
            cb && cb()
        }, _=>{
            Toast(_.msg)
            cb && cb()
        }, true)
    },
    loadBottom (cb) {
        this.where.page++;
        this.getData(_ => {
            // 如果请求数据为空，那就禁止【上拉加载更多】，展示【没有更多数据啦~】
            if (_.data.length === 0) this.csHistoryList.bottomDisabled = true;
            this.csHistoryList.list.push(..._.data)
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
        this.csHistoryList.list = []

        this.getData(_ => {
            this.csHistoryList.isSearch = true
            this.csHistoryList.list = _.data
            if (!this.csHistoryList.list.length) {
              this.csHistoryList.isEmpty = true
              this.csHistoryList.bottomDisabled = false
            }
        }, _ => {
            Toast(_.msg);
            this.csHistoryList.isEmpty = true
        })
    },
    resetWhere () {
        this.where = {
            page: 1,                             // 分页索引，从1开始
            limit: 15,                           // 每次获取的条数
            vehicleBrand: '',                    // 车辆品牌
            carModel: '',                        // 车辆型号
            userId: this.$store.getters.userId
        }
    }
  },
  created () {
        this.getData(_ => {
            this.csHistoryList.list = _.data
            if (_.data.length === 0) this.csHistoryList.isEmpty = true
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
    margin-bottom: pxToRem(10px);
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