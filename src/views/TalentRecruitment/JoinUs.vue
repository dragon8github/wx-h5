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
                <input type="text" placeholder="请输入关键词" v-model="keywords"/>
                <button class="">搜索</button>
            </div>
            <div class="job-classify">
                <div class="jc-select" @click="selectJobClassify">
                    所有分类
                    <!-- <select name="">
                        <option value="0">所有分类</option>
                        <option value="1">职能类</option>
                        <option value="2">技术类</option>
                        <option value="2">其他类</option>
                    </select> -->
                </div>
                <div class="jc-select" @click="selectCity">
                    所有城市
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
                    <div class="jt-date">{{item.date}}</div>
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
        <!-- <mt-popup
        v-model="popupVisible"
        position="bottom">
            
        </mt-popup> -->

        <!-- <mt-picker :slots="dateSlots" @change="onValuesChange" :show-toolbar="false"></mt-picker> -->
    </div>
</template>
<style lang="scss" scoped>
    @import "../../sass/variables";
    @import "../../sass/func";
    .talent-recruit {
        .join-us-swipe{
            width: 100%;
            height: 5rem;
            background: #fff;
            img{
                width: 100%;
            }
        }
        .join-content{
            margin:.266667rem 0 0 0;
            padding:.266667rem .4rem;
            background: #fff;
            .job-search{
                @include flex(b,center);
                height: .986667rem;
                width: 100%;
                input {
                    outline: none;
                    font-size: .373333rem;
                    color:#333;
                    padding-left: .266667rem;
                    width: 100%;
                    height: 100%;
                    background:#eee;
                    border:.026667rem solid #eaeaea;
                    border-right: none;
                }
                button {
                    outline: none;
                    border:none;
                    width: 2rem;
                    height: .986667rem;
                    line-height: .986667rem;
                    text-align: center;
                    color:#fff;
                    font-size: .4rem;
                    background: #cfa972;
                }
            }
            .job-classify{
                @include flex();
                margin-top:.36rem;
                .jc-select{
                    width: 3.466667rem;
                    height: .986667rem;
                    padding-left: .266667rem;
                    line-height: .986667rem;
                    font-size: .4rem;
                    color:#333;
                    border:.026667rem solid #eaeaea;
                    position: relative;
                    margin-right: .44rem;
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
                    &:after{
                        content: "";
                        width: .373333rem;
                        height: .226667rem;
                        background: url('~@assets/select_icon.png') no-repeat center;
                        position: absolute;
                        right: 20px;
                        top:50%;
                        margin-top:-0.12rem;
                        pointer-events: none;
                    }
                }
            }
        }
        .job-list-wrap{
            background: #fff;
            padding-top:.36rem;
            .job-item{
                border-top:.026667rem solid #ebebeb;
                padding:.533333rem 0.4rem .4rem 0.4rem;
                background: #fff;
                line-height: .933333rem;
                .ji-name{
                    font-size: .48rem;
                    color:#333;
                }
                .jt-class{
                    @include flex(b,center);
                    font-size: .36rem;
                    color:#666;
                }
            }
        }
    }
</style>
<script>
    import TalentNav from './TalentNav.vue'
    import mtSwipe from '@components/swipe/swipe.vue'
    import mtSwipeItem from '@components/swipe/swipe-item.vue'
    import mtPopup from '@components/popup/popup.vue'
    import mtPicker from '@/components/picker/index.vue'
     // panel组件
    import panel from '@myComponents/panel.vue'

    export default {
        components:{
            TalentNav,
            mtSwipe,
            mtSwipeItem,
            mtPopup,
            mtPicker,
            panel
        },
        data() {
            return {
                activated:'加入我们',
                dateSlots: [
                    {
                        flex: 1,
                        values: ['2016-01', '2016-02', '2016-03', '2016-04', '2016-05', '2016-06'],
                        className: 'slot1',
                        textAlign: 'right'
                    }, {
                        divider: true,
                        content: '-',
                        className: 'slot2'
                    }, {
                        flex: 1,
                        values: ['2016-01', '2016-02', '2016-03', '2016-04', '2016-05', '2016-06'],
                        className: 'slot3',
                        textAlign: 'left'
                    }
                ],
                keywords:'',
                navList: [
                    {
                        path:'/JoinUs',
                        name:'加入我们'
                    },
                    {
                        path:'/CorporateWelfare',
                        name:'公司福利'
                    },
                    {
                        path:'/ContactUs',
                        name:'联系我们'
                    }
                ],
                bannerList:[
                    'https://m.360buyimg.com/babel/jfs/t20761/88/245681533/100771/4f482734/5b068167N03df1383.jpg',
                    'https://m.360buyimg.com/babel/jfs/t20815/284/157613044/102231/f3bcf02c/5afed147Nef8c3eec.png',
                    'https://img1.360buyimg.com/pop/jfs/t17959/164/2242151507/87295/c65ca4b6/5aec1384N41688de1.jpg'
                ],
                classifyList:[
                    {
                        value:'0',
                        label:'职能类'
                    },
                    {
                        value:'1',
                        label:'技术类'
                    },
                    {
                        value:'2',
                        label:'销售类'
                    }
                ],
                job:{
                    isTop:false,
                    isError:false,
                    isEmpty: false, 
                    bottomDisabled: false,
                    overflow:'initial',
                    background:'none',
                    list:[
                        {
                            name:'UI设计师',
                            type:'设计类',
                            addr:'东莞市',
                            date:'2018-5-14'
                        },
                        {
                            name:'UI设计师',
                            type:'设计类',
                            addr:'东莞市',
                            date:'2018-5-14'
                        },
                        {
                            name:'UI设计师',
                            type:'设计类',
                            addr:'东莞市',
                            date:'2018-5-14'
                        }
                    ]
                },
                popupVisible:true
            }
        },
        methods: {
            selectJobClassify() {
                console.log('445')
            },
            selectCity() {

            },
            onValuesChange(picker, values) {
                // if (values[0] > values[1]) {
                //     picker.setSlotValue(1, values[0]);
                // }
            },
            loadTop() {

            },
            loadBottom() {
                
            }
        }
    }
</script>