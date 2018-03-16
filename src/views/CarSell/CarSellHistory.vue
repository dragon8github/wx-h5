<template>
    <div class="CarSellHistory">

        <navbar v-model="selected">
            <tabitem id="tab-container0" :fontSize="'32'">已竞买</tabitem>
            <tabitem id="tab-container1" :fontSize="'32'">已报名</tabitem> 
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
                           :image="item.image"
                           :name="item.name"
                           :money="item.money"
                           :time="item.time"
                           :city="item.city"
                           :id="item.id">
                     </item>
                  </div>
              </panel>
            </tabcontaineritem>

            <tabcontaineritem id="tab-container1">
              <panel ref="pannel1" :_loadTop = "loadTop" :_loadBottom = "loadBottom"  :_isEmpty="tag[1]['isEmpty']" :_bottomDisabled = "tag[1]['bottomDisabled']">
                  <div slot="body">
                      <item v-for="(item,index) in tag[1]['list']" 
                            :key="index"
                            :image="item.image"
                            :name="item.name"
                            :money="item.money"
                            :time="item.time"
                            :city="item.city"
                            :id="item.id">
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

export default {
  name: 'CarSellHistory',

  data () {
    return {
        selected: 'tab-container0',
        search: '',
        where: {
              tag: 0,          // 标签页[0：已竞买，1：已报名]
              type: '',        // 型号
              business_id: '', // 拍卖编号
              page_index: 1,   // 分页索引，从1开始
              page_size: 15    // 每次获取的条数
        },
        tag: {
            '0':{ isSearch:false, isEmpty: false, isLoading: false, LoadingTimer: 0, list:[
               { image: '', name: '奔驰B级车 A 200 时尚型奔驰B级车 A 200 时尚型', money: '15,000', time: '2018/03/20', city: '东莞市', id: 'HTPM201702281234' },
              { image: '', name: '奔驰A级车 A 200 时尚型奔驰B级车 A 200 时尚型', money: '15,000', time: '2018/03/20', city: '东莞市', id: 'HTPM201702281234' },
              { image: '', name: '奔驰A级车 A 200 时尚型奔驰B级车 A 200 时尚型', money: '15,000', time: '2018/03/20', city: '东莞市', id: 'HTPM201702281234' },
              { image: '', name: '奔驰A级车 A 200 时尚型奔驰B级车 A 200 时尚型', money: '15,000', time: '2018/03/20', city: '东莞市', id: 'HTPM201702281234' },
              { image: '', name: '奔驰A级车 A 200 时尚型奔驰B级车 A 200 时尚型', money: '15,000', time: '2018/03/20', city: '东莞市', id: 'HTPM201702281234' }, ], bottomDisabled: true, index: 0},
            '1':{ isSearch:false, isEmpty:false,isLoading: false, LoadingTimer: 0, list:[
                 { image: '', name: '奔驰B级车 A 200 时尚型奔驰B级车 A 200 时尚型', money: '15,000', time: '2018/03/20', city: '东莞市', id: 'HTPM201702281234' },
                { image: '', name: '奔驰A级车 A 200 时尚型奔驰B级车 A 200 时尚型', money: '15,000', time: '2018/03/20', city: '东莞市', id: 'HTPM201702281234' },
                { image: '', name: '奔驰A级车 A 200 时尚型奔驰B级车 A 200 时尚型', money: '15,000', time: '2018/03/20', city: '东莞市', id: 'HTPM201702281234' },
                { image: '', name: '奔驰A级车 A 200 时尚型奔驰B级车 A 200 时尚型', money: '15,000', time: '2018/03/20', city: '东莞市', id: 'HTPM201702281234' },
                { image: '', name: '奔驰A级车 A 200 时尚型奔驰B级车 A 200 时尚型', money: '15,000', time: '2018/03/20', city: '东莞市', id: 'HTPM201702281234' }], bottomDisabled: false, index: 1}
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

.CarSellHistory {
   
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