<template>
    <div class="talent-recruit" style="margin-bottom:0.4rem;">
        <talent-nav :activated="activated"></talent-nav>
        <div class="join-us-swipe">
            <mt-swipe >
                <mt-swipe-item v-for="(banner,index) in bannerList" :key="index">
                    <img :src="banner" />
                </mt-swipe-item>
                <!-- <mt-swipe-item><img src="~@/assets/pic.png" /></mt-swipe-item>
                <mt-swipe-item><img src="~@/assets/pic.png" /></mt-swipe-item> -->
            </mt-swipe>
        </div>
        <div class="join-content">
            <div class="job-search">
                <input type="text" placeholder="请输入关键词" v-model="stationName"/>
                <button class=""  @click="search">搜索</button>
            </div>
            <div class="job-classify">
                <div class="jc-select" @click="selectJobClassify">
                    {{allType}}
                    <span class="icon"></span>
                </div>
                <div class="jc-select" @click="filterCity">
                    {{selectCity}}
                    <span class="icon"></span>
                </div>
            </div>
            
        </div>
        <div class="job-list-wrap" v-show="job.list && job.list.length > 0">
            <div class="job-item" v-for="(item,index) in job.list" :key="index" @click="gotoInfo(item)">
                <div class="ji-name">{{item.stationName}}</div>
                <div class="jt-class">
                    <div class="jt-type">
                        <span>{{item.typeName}}</span>
                        <span>|</span>
                        <span>{{item.stationPlaceName}}</span>
                    </div>
                    <!-- <div class="jt-date">{{item.date}}</div> -->
                </div>
            </div>
            <!-- <panel ref="pannel3" 
                :_loadTop = "loadTop" 
                :_loadBottom = "loadBottom"  
                :_isEmpty="job.isEmpty" 
                :_isError="job.isError" 
                :_bottomDisabled="job.bottomDisabled" 
                :Top="job.isTop"
                :Bottom="job.bottomDisabled"
                :overflow="job.overflow"
                :background="job.background"
                :noThingText="'暂时没有没有职位哦'"
            >
                <div slot="body">
                    <div class="job-item" v-for="(item,index) in job.list" :key="index" @click="gotoInfo(item)">
                        <div class="ji-name">{{item.name}}</div>
                        <div class="jt-class">
                            <div class="jt-type">
                                <span>{{item.type}}</span>
                                <span>|</span>
                                <span>{{item.addr}}</span>
                            </div>
                            <div class="jt-date">{{item.date}}</div>
                        </div>
                    </div>
                </div>
            </panel> -->
        </div>
        <div v-show="job.list.length <= 0" class="job-item-nodata">
          <p><img src="~@/assets/t_nodata.png" alt=""></p>
          暂无数据
        </div>
       <mt-popup
        v-model="typePopupVisiable"
        position="bottom">
            <mt-picker v-if="jobTypes" :slots="jobTypes" valueKey="name"  :itemHeight="60" :visible-item-count="3" @change="onTypeValuesChange"></mt-picker>
        </mt-popup>
        <mt-popup
        v-model="cityPopupVisiable"
        position="bottom">
            <div class="picker-toolbar">  
              <span @click="cityPopupVisiable = false">确定</span>
            </div>  
            <mt-picker v-if="cityList" :slots="cityList" valueKey="name"  :itemHeight="60" :visible-item-count="3" @change="onCityValuesChange"></mt-picker>
        </mt-popup>
    </div>
</template>
<script>
import TalentNav from "./TalentNav.vue"
import mtSwipe from "@components/swipe/swipe.vue"
import mtSwipeItem from "@components/swipe/swipe-item.vue"
import mtPopup from "@components/popup/popup.vue"
import mtPicker from "@components/picker2/picker.vue"
import Toast   from '@components/toast/index.js'
import methods from '../../methods.js'
// panel组件
import panel from "@myComponents/panel.vue";


export default {
  components: {
    TalentNav,
    mtSwipe,
    mtSwipeItem,
    mtPopup,
    mtPicker,
    panel
  },
  data() {
    return {
      typeId: "",
      cityId: "",
      allType: "所有分类",
      selectCity: "所有城市",
      activated: "加入我们",
      jobTypes: null,
      cityList:null,
      stationName: "",
      navList: [
        {
          path: "/JoinUs",
          name: "加入我们"
        },
        {
          path: "/CorporateWelfare",
          name: "公司福利"
        },
        {
          path: "/ContactUs",
          name: "联系我们"
        }
      ],
      bannerList: [
        "https://m.360buyimg.com/babel/jfs/t20761/88/245681533/100771/4f482734/5b068167N03df1383.jpg",
        "https://m.360buyimg.com/babel/jfs/t20815/284/157613044/102231/f3bcf02c/5afed147Nef8c3eec.png",
        "https://img1.360buyimg.com/pop/jfs/t17959/164/2242151507/87295/c65ca4b6/5aec1384N41688de1.jpg"
      ],
      job: {
        isTop: false,
        isError: false,
        isEmpty: false,
        bottomDisabled: false,
        overflow: "initial",
        background: "none",
        list: []
      },
      typePopupVisiable: false,
      cityPopupVisiable: false
    };
  },
  computed: {
    initParam() {
      return {
        typeId: this.typeId,
        cityId: this.cityId,
        stationName: this.stationName
      }
    },
  },
  methods: {
    search() {
      console.log(this.stationName)
      if(this.stationName == ''){
        Toast('请输入搜索关键字！')
      }else {
        this.loadData()
      }
    },
    selectJobClassify() {
      this.typePopupVisiable = true;
    },
    filterCity() {
      this.cityPopupVisiable = true;
    },
    onTypeValuesChange(picker, values) {
      this.allType = values[0].name
      this.typeId = values[0].type
      this.typePopupVisiable = false
      this.loadData(this.initParam)
      
    },
    onCityValuesChange(picker, values) {
      if(values[0] && values[0].provinceId){
        picker.setSlotValues(1, values[0].citys);
      }
      this.selectCity = values[1].name
      this.cityId = values[1].cityId
      //this.cityPopupVisiable = false
      this.loadData(this.initParam)
    },
    loadData() {
      if(this.initParam.cityId == '0') {
        this.initParam.cityId = ''
      }
      this.recruit.recruitListApp(this.initParam).then(res => {
        if(res.returnCode == 0){
          this.job.list = res.data
        }
      })
    },
    gotoInfo(item) {
      this.$store.dispatch('setStationInfo',item)
      this.$router.push('/JobDetail')
    },
    loadTop() {
      //目前无需分页
    },
    loadBottom() {
      //目前无需分页
    },
    initPickerData() {
      //职位类型
      this.jobTypes = [{
        flex: 1,
        values: [
          { type: "0", name: "所有分类" },
          { type: "1", name: "技术类" },
          { type: "2", name: "职能类" },
          { type: "3", name: "业务类" }
        ],
        className: "slot1"
      }]
      //城市选择
      this.recruit.getProviceCityApp().then(res => {
        if (res.returnCode == 0) {
          if (res.data && res.data.length > 0) {
              let allProvince = {
                provinceId: "0",
                provinceName: "所有城市",
                citys: [{
                  cityId: "0",
                  cityName: "所有城市"
                }]
              }
              res.data.unshift(allProvince);
              var newData =  methods.changeArrKey(res.data,'provinceName','cityName')
              this.cityList = [{
                  flex: 1,
                  values: newData,
                  defaultIndex:0,
                  className: 'slot1',
                  textAlign: 'center'
                }, {
                  divider: true,
                  content: '-',
                  className: 'slot2'
                }, {
                  flex: 1,
                  values: newData[0].citys,
                  defaultIndex:0,
                  className: 'slot3',
                  textAlign: 'center'
              }]
          }
        }
      })
    }
  },
  beforeMount() {
    this.initPickerData()
  },
  created() {
    this.loadData(this.initParam)
  }
};
</script>

<style lang="scss" scoped>
@import "../../sass/variables";
@import "../../sass/func";
.picker-slot{
  font-size: .6rem !important;
}
.talent-recruit {
  .join-us-swipe {
    width: 100%;
    height: 5rem;
    background: #fff;
    img {
      width: 100%;
    }
  }
  .join-content {
    margin: 0.266667rem 0 0 0;
    padding: 0.266667rem 0.4rem;
    background: #fff;
    .job-search {
      @include flex(b, center);
      height: 0.986667rem;
      width: 100%;
      input {
        outline: none;
        font-size: 0.373333rem;
        color: #333;
        padding-left: 0.266667rem;
        width: 100%;
        height: 100%;
        background: #eee;
        border: 0.026667rem solid #eaeaea;
        border-right: none;
        -webkit-appearance:none;
      }
      button {
        outline: none;
        border: none;
        width: 2rem;
        height: 0.986667rem;
        line-height: 0.986667rem;
        text-align: center;
        color: #fff;
        font-size: 0.4rem;
        background: #cfa972;
      }
    }
    .job-classify {
      @include flex();
      margin-top: 0.36rem;
      .jc-select {
        width: 3.466667rem;
        height: 0.986667rem;
        padding-left: 0.266667rem;
        line-height: 0.986667rem;
        font-size: 0.4rem;
        color: #333;
        border: 0.026667rem solid #eaeaea;
        position: relative;
        margin-right: 0.44rem;
        // select{
        //     border: none;
        //     outline: none;
        //     width: 100%;
        //     height: 100%;
        //     padding-left: .266667rem;
        //     appearance: none;
        //     -webkit-appearance: none;
        //     -moz-appearance: none;
        //     font-size: .4rem;
        //     color:#333;
        //     position: absolute;
        //     option{
        //         appearance: none;
        //         -webkit-appearance: none;
        //         -moz-appearance: none;
        //         outline: none;
        //         font-size: .12rem;
        //         color:#333;
        //         border:.013333rem solid #ccc;
        //     }
        // }
        .icon {
          display: block;
          content: "";
          width: 0.373333rem;
          height: 0.226667rem;
          background: url("~@assets/select_icon.png") no-repeat center;
          background-size: 100% 100%;
          position: absolute;
          right: 20px;
          top: 50%;
          margin-top: -0.12rem;
          pointer-events: none;
        }
      }
    }
  }
  .job-list-wrap {
    background: #fff;
    padding-top: 0.36rem;
    .job-item {
      border-top: 0.026667rem solid #ebebeb;
      padding: 0.533333rem 0.4rem 0.4rem 0.4rem;
      background: #fff;
      line-height: 0.933333rem;
      .ji-name {
        font-size: 0.48rem;
        color: #333;
      }
      .jt-class {
        @include flex(b, center);
        font-size: 0.36rem;
        color: #666;
      }
    }
  }
  .job-item-nodata{
    font-size: 0.45rem;
    color: #666;
    text-align: center;
    margin-top: 1.5rem;
  }
}
.picker-toolbar{
  text-align: right;
  background: #f5f5f5;
  padding-right:0.6rem;
  color:$font-primary;
  font-size: 0.48rem;
  height: 1rem;
  line-height: 1rem;
}
</style>