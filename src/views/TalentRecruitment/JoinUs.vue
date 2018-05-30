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
                <button class="">搜索</button>
            </div>
            <div class="job-classify">
                <div class="jc-select" @click="selectJobClassify">
                    {{allType}}
                </div>
                <div class="jc-select" @click="filterCity">
                    {{selectCity}}
                </div>
            </div>
            
        </div>
        <div class="job-list-wrap">
            <div class="job-item" v-for="(item,index) in job.list" :key="index" @click="gotoInfo(item)">
                <div class="ji-name">{{item.name}}</div>
                <div class="jt-class">
                    <div class="jt-type">
                        <span>{{item.type}}</span>
                        <span>|</span>
                        <span>{{item.addr}}</span>
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
       <mt-popup
        v-model="typePopupVisiable"
        position="bottom">
            <mt-picker :slots="jobTypes" valueKey="name" :visible-item-count="3" @change="onTypeValuesChange"></mt-picker>
        </mt-popup>

        <mt-popup
        v-model="cityPopupVisiable"
        position="bottom">
            <!-- <div class="picker-toolbar">  
                <span class="mint-datetime-action mint-datetime-cancel">取消</span>  
                <span class="mint-datetime-action mint-datetime-confirm">确定</span>  
            </div>   -->
            <mt-picker v-if="addressSlots" :slots="addressSlots" valueKey="name" :visible-item-count="3" @change="onCityValuesChange"></mt-picker>
        </mt-popup>
    </div>
</template>
<script>
import TalentNav from "./TalentNav.vue";
import mtSwipe from "@components/swipe/swipe.vue";
import mtSwipeItem from "@components/swipe/swipe-item.vue";
import mtPopup from "@components/popup/popup.vue";
import mtPicker from "@components/picker2/picker.vue";
import panel from "@myComponents/panel.vue";
import { mapGetters } from 'vuex'

export default {
  components: {TalentNav, mtSwipe, mtSwipeItem, mtPopup, mtPicker, panel },
  data() {
    return {
      areaData: null,
      addressSlots: null,
      typeId: "",
      cityId: "",
      allType: "所有分类",
      selectCity: "所有城市",
      activated: "加入我们",
      jobTypes: [{flex: 1, values: [{ type: "0", name: "所有分类" }, { type: "1", name: "技术类" }, { type: "2", name: "职能类" }, { type: "3", name: "业务类" } ], className: "slot1"} ],
      secondCity: [],
      stationName: "",
      navList: [{path: "/JoinUs", name: "加入我们"}, {path: "/CorporateWelfare", name: "公司福利"}, {path: "/ContactUs", name: "联系我们"} ],
      bannerList: ["https://m.360buyimg.com/babel/jfs/t20761/88/245681533/100771/4f482734/5b068167N03df1383.jpg", "https://m.360buyimg.com/babel/jfs/t20815/284/157613044/102231/f3bcf02c/5afed147Nef8c3eec.png", "https://img1.360buyimg.com/pop/jfs/t17959/164/2242151507/87295/c65ca4b6/5aec1384N41688de1.jpg"],
      classifyList: [{value: "0", label: "职能类"}, {value: "1", label: "技术类"}, {value: "2", label: "销售类"} ],
      job: {isTop: false, isError: false, isEmpty: false, bottomDisabled: false, overflow: "initial", background: "none", list: [{name: "UI设计师", type: "设计类", addr: "东莞市", date: "2018-5-14"}, {name: "UI设计师", type: "设计类", addr: "东莞市", date: "2018-5-14"}, {name: "UI设计师", type: "设计类", addr: "东莞市", date: "2018-5-14"} ] },
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
    setCityData (provinceId) {
        let cityList = []
        // 从所有数据中，找到对应省份id的城市
        for (var i = 0; i < this.areaData.length; i++) {
            // 找到对应省份id的城市
            if (this.areaData[i].provinceId == provinceId) {
                // 拿到该省份所有的城市
                let cityList = this.areaData[i].citys
                // 转化一下key的名字，我们约定必须为.name
                for (var j = 0; j < cityList.length; j++) {
                    // 我们约定必须为.name
                    cityList[j].name = cityList[j].cityName
                }
                // 返回中断循环
                return cityList
            }
        }
        // 默认返回一个空数组
        return cityList
    },
    selectJobClassify() {
      this.typePopupVisiable = true;
    },
    filterCity() {
      this.cityPopupVisiable = true;
    },
    onTypeValuesChange(picker, values) {
      this.allType = values[0].name;
      this.typeId = values[0].type;
      //this.typePopupVisiable = false;
      //this.loadData(this.initParam);
      // if (values[0] > values[1]) {
      //     picker.setSlotValue(1, values[0]);
      // }
    },
    onCityValuesChange(picker, values) {
        var provinceId = values[0].provinceId
        picker.setSlotValues(1, this.setCityData(provinceId));
    },
    loadData() {
      this.recruit.recruitListApp(this.initParam).then(res => {
        console.log(res);
      });
    },
    loadTop() {
      //目前无需分页
    },
    loadBottom() {
      //目前无需分页
    }
  },
  beforeMount() {
    this.recruit.getProviceCityApp().then(res => {
        if (res.returnCode == 0) {
            // 初始区域数据
            this.areaData = res.data
            this.areaData.unshift({ provinceId:'0', provinceName:'所有城市', citys:[{cityId: '0', cityName: '所有城市'}] })

            // 初始化省份列表
            var provinceList = []
            for (var i = 0; i <  this.areaData.length; i++) {
                provinceList.push({name: this.areaData[i].provinceName, provinceId: this.areaData[i].provinceId})
            }

            // 初始化picker数据
            this.addressSlots = [
                {
                  flex: 1,
                  values: provinceList,
                  className: "slot1"
                },{
                  flex: 1,
                  values: [{cityId: '0', name: '所有城市'}],
                  className: "slot3",
                  textAlign: "center"
            }]
        }
    })
  }
};
</script>

<style lang="scss" scoped>
@import "../../sass/variables";
@import "../../sass/func";
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
        &:after {
          content: "";
          width: 0.373333rem;
          height: 0.226667rem;
          background: url("~@assets/select_icon.png") no-repeat center;
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
}
</style>