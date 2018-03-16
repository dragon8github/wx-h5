<template>
    <div class="CarSell">

        <navbar v-model="selected">
            <tabitem id="tab-container0" :fontSize="'32'">即将拍卖</tabitem>
            <tabitem id="tab-container1" :fontSize="'32'">拍卖进行</tabitem> 
            <tabitem id="tab-container2" :fontSize="'32'">拍卖完成</tabitem> 
        </navbar>

        <div class="search">
            <div class="search__left">
                <i class="search__icon"></i>
                <input type="text" class="search__input" placeholder="请输入品牌/型号" v-model="search" />
            </div>
            <div class="search__right"> 搜索 </div>
        </div>

        <tabcontainer  v-model="selected" swipeable>
            <tabcontaineritem  id="tab-container0" >
              <panel ref="pannel0" :_loadTop = "loadTop" :_loadBottom = "loadBottom" :_isEmpty="tag[0]['isEmpty']" :_bottomDisabled = "tag[0]['bottomDisabled']">
                  <div slot="body">
                     <item v-for="(item,index) in tag[0]['list']" 
                           :key="index"
                           :maindata="item"
                           :image="item.image"
                           :name="item.VehicleBrand"
                           :money="item.StartPrice"
                           :time="item.EtartPriceDate"
                           :city="item.city"
                           :id="item.priceID">
                     </item>
                  </div>
              </panel>
            </tabcontaineritem>

            <tabcontaineritem id="tab-container1">
              <panel ref="pannel1" :_loadTop = "loadTop" :_loadBottom = "loadBottom"  :_isEmpty="tag[1]['isEmpty']" :_bottomDisabled = "tag[1]['bottomDisabled']">
                  <div slot="body">
                      <item v-for="(item,index) in tag[1]['list']" 
                            :key="index"
                            :maindata="item"
                            :image="item.image"
                            :name="item.VehicleBrand"
                            :money="item.StartPrice"
                            :time="item.EndBidTime"
                            :city="item.city"
                            :id="item.priceID">
                      </item>
                  </div>
              </panel>
            </tabcontaineritem>

            <tabcontaineritem id="tab-container2">
              <panel ref="pannel1" :_loadTop = "loadTop" :_loadBottom = "loadBottom"  :_isEmpty="tag[1]['isEmpty']" :_bottomDisabled = "tag[1]['bottomDisabled']">
                  <div slot="body">
                      <item v-for="(item,index) in tag[2]['list']" 
                            :key="index"
                            :maindata="item"
                            :image="item.image"
                            :name="item.VehicleBrand"
                            :money="item.StartPrice"
                            :time="item.EndBidTime"
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

export default {
  name: 'CarSell',

  data () {
    return {
        selected: 'tab-container0',
        search: '',
        where: {
              tag: 0,          // 标签页[1.即将拍卖，2进行中，3.拍卖完成]
              type: '',        // 型号
              business_id: '', // 拍卖编号
              page_index: 1,   // 分页索引，从1开始
              page_size: 15    // 每次获取的条数
        },
        tag: {
            '0':{ isSearch:false, isEmpty: false, isLoading: false, LoadingTimer: 0, list:[
                { image: '', VehicleBrand: '奔驰B级车 A 200 时尚型奔驰B级车 A 200 时尚型', StartPrice: '15,000', EtartPriceDate: '2018/03/20', VehicleTerritory: '东莞市', priceID: 'HTPM201702281234' },
                { image: '', VehicleBrand: '奔驰A级车 A 200 时尚型奔驰B级车 A 200 时尚型', StartPrice: '15,000', EtartPriceDate: '2018/03/20', VehicleTerritory: '东莞市', priceID: 'HTPM201702281234' },
                { image: '', VehicleBrand: '奔驰A级车 A 200 时尚型奔驰B级车 A 200 时尚型', StartPrice: '15,000', EtartPriceDate: '2018/03/20', VehicleTerritory: '东莞市', priceID: 'HTPM201702281234' },
                { image: '', VehicleBrand: '奔驰A级车 A 200 时尚型奔驰B级车 A 200 时尚型', StartPrice: '15,000', EtartPriceDate: '2018/03/20', VehicleTerritory: '东莞市', priceID: 'HTPM201702281234' },
                { image: '', VehicleBrand: '奔驰A级车 A 200 时尚型奔驰B级车 A 200 时尚型', StartPrice: '15,000', EtartPriceDate: '2018/03/20', VehicleTerritory: '东莞市', priceID: 'HTPM201702281234' }, ], bottomDisabled: true, index: 0},
            '1':{ isSearch:false, isEmpty:false,isLoading: false, LoadingTimer: 0, list:[
                { image: '', VehicleBrand: '奔驰B级车 A 200 时尚型奔驰B级车 A 200 时尚型', StartPrice: '15,000', EndBidTime: '2018/03/20', VehicleTerritory: '东莞市', priceID: 'HTPM201702281234' },
                { image: '', VehicleBrand: '奔驰A级车 A 200 时尚型奔驰B级车 A 200 时尚型', StartPrice: '15,000', EndBidTime: '2018/03/20', VehicleTerritory: '东莞市', priceID: 'HTPM201702281234' },
                { image: '', VehicleBrand: '奔驰A级车 A 200 时尚型奔驰B级车 A 200 时尚型', StartPrice: '15,000', EndBidTime: '2018/03/20', VehicleTerritory: '东莞市', priceID: 'HTPM201702281234' },
                { image: '', VehicleBrand: '奔驰A级车 A 200 时尚型奔驰B级车 A 200 时尚型', StartPrice: '15,000', EndBidTime: '2018/03/20', VehicleTerritory: '东莞市', priceID: 'HTPM201702281234' },
                { image: '', VehicleBrand: '奔驰A级车 A 200 时尚型奔驰B级车 A 200 时尚型', StartPrice: '15,000', EndBidTime: '2018/03/20', VehicleTerritory: '东莞市', priceID: 'HTPM201702281234' }], bottomDisabled: false, index: 1},
            '2':{ isSearch:false, isEmpty:false,isLoading: false, LoadingTimer: 0, list:[
                { image: '', VehicleBrand: '奔驰B级车 A 200 时尚型奔驰B级车 A 200 时尚型', StartPrice: '15,000', EndBidTime: '2018/03/20', VehicleTerritory: '东莞市', priceID: 'HTPM201702281234' },
                { image: '', VehicleBrand: '奔驰A级车 A 200 时尚型奔驰B级车 A 200 时尚型', StartPrice: '15,000', EndBidTime: '2018/03/20', VehicleTerritory: '东莞市', priceID: 'HTPM201702281234' },
                { image: '', VehicleBrand: '奔驰A级车 A 200 时尚型奔驰B级车 A 200 时尚型', StartPrice: '15,000', EndBidTime: '2018/03/20', VehicleTerritory: '东莞市', priceID: 'HTPM201702281234' },
                { image: '', VehicleBrand: '奔驰A级车 A 200 时尚型奔驰B级车 A 200 时尚型', StartPrice: '15,000', EndBidTime: '2018/03/20', VehicleTerritory: '东莞市', priceID: 'HTPM201702281234' },
                { image: '', VehicleBrand: '奔驰A级车 A 200 时尚型奔驰B级车 A 200 时尚型', StartPrice: '15,000', EndBidTime: '2018/03/20', VehicleTerritory: '东莞市', priceID: 'HTPM201702281234' }], bottomDisabled: false, index: 1}
        },
        myData: [{
              "priceID": "c9552579-aa68-44f6-8bdd-f9ab9767c2fc",
              "bond": 324,
              "priceincrease": 500,
              "startPriceDate": 1519610400000,
              "starBidTime": 1519783200000,
              "endBidTime": 1519869600000,
              "conStartDate": 1519783200000,
              "conEndDate": 1519869600000,
              "vieStartDate": 1519783200000,
              "vieEndDatee": null,
              "vie": null,
              "contact": null,
              "paymentTime": 1520737200000,
              "tranType": "债权转让",
              "pickupMethod": "门店自提",
              "paymentMethod": "竞买成功后，尾款线下支付",
              "bidRule": null,
              "disposalUnit": "234234",
              "contacts": "4234",
              "telephone": "13798587542",
              "account": "23423",
              "bank": "234234",
              "cardNo": "1385652546254254854",
              "vehicleBrand": "SDF",
              "carproduction": "国产",
              "carColour": "ASD",
              "carModel": "ASDF",
              "displacement": "3.00L",
              "engineNumber": "fg59567845hj",
              "frameNumber": "asdfasd867856",
              "cehicleTerritory": null,
              "useProperty": null,
              "insuranceDate": 1519833600000,
              "inspectionDate": 1509465600000,
              "mileage": 8222,
              "registerDate": 1509552000000,
              "mortgageState": "抵押",
              "tools": "23423423",
              "taxation": null,
              "transactionMode": null,
              "position": null,
              "files": "23423423",
              "remarks": null,
              "startPrice": 34234,
              "illegal": null,
              "etartPriceDate": 1519869600000
        }],
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
        return this.tag[this.where.tag]
      }
  },
  methods: {
    loadTop (cb) {
        window.setTimeout(cb, 1000);
    },
    getData () {
        // this.xdapi.getRepayingList({
        //       pageIndex: '1',  // 页数
        //       pageSize: '10'   // 数量
        // }).then(data=>{
        //     if (data.ReturnCode == 0) {
        //         console.log(data);
        //     } else {
        //         console.log(data);
        //         Toast(data.msg);
        //     }
        // })
    },
    loadBottom (cb) {
         this.currTag.list.push(
             { image: '', name: '奔驰B级车 B 200 时尚型奔驰B级车 B 200 时尚型', money: '15,000', time: '2018/03/20', city: '东莞市', id: 'HTPM201702281234' },
             { image: '', name: '奔驰B级车 B 200 时尚型奔驰B级车 B 200 时尚型', money: '15,000', time: '2018/03/20', city: '东莞市', id: 'HTPM201702281234' },
             { image: '', name: '奔驰B级车 B 200 时尚型奔驰B级车 B 200 时尚型', money: '15,000', time: '2018/03/20', city: '东莞市', id: 'HTPM201702281234' },
             { image: '', name: '奔驰B级车 B 200 时尚型奔驰B级车 B 200 时尚型', money: '15,000', time: '2018/03/20', city: '东莞市', id: 'HTPM201702281234' },
             { image: '', name: '奔驰B级车 B 200 时尚型奔驰B级车 B 200 时尚型', money: '15,000', time: '2018/03/20', city: '东莞市', id: 'HTPM201702281234' });
         cb && cb();   
    },
    resetWhere () {
        this.where = {
              tag: 0,          // 标签页[0：已竞买，1：已报名]
              type: '',        // 型号
              business_id: '', // 拍卖编号
              page_index: 1,   // 分页索引，从1开始
              page_size: 15    // 每次获取的条数
        };
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
         this.where.tag =  curVal.substr(-1, 1)
    }
  },
  beforeMount () {
    
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