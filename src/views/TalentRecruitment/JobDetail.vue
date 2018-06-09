<template>
    <div class="job-detail-wrap">
        <h2 class="job-topic jt-sepecial">
            {{stationInfo.stationName}}
        </h2>
        <div class="job-type">
            <p v-if="stationInfo.typeName">职业类别:{{stationInfo.typeName}}</p>
            <p v-if="stationInfo.stationPlaceName">工作地点:{{stationInfo.stationPlaceName}}</p>
            <p v-if="stationInfo.stationNumer">招聘人数:{{stationInfo.stationNumer}}</p>
            <p v-if="stationInfo.stationSalary">薪酬:{{stationInfo.stationSalary}}</p>
        </div>
        <h2 class="job-topic">
            岗位职责
        </h2>
        <div class="job-zz">
            <div v-html="stationInfo.stationDuty"></div>
            <!-- <p>2.负责功能模块的项目需求分析、设计、开发，配合测试人员对产品需求进行测试。</p> -->
        </div>
        <h2 class="job-topic">
            任职资格 
        </h2>
        <div class="job-zz">
            <div v-html="stationInfo.stationSeniority"></div>
            <!-- <p>2.5年以上开发经验，2年互联网企业经验者，P2P平台，消费贷款系统优先；</p>
            <p>3.理解Java反射机制和常用的设计模式，熟悉基于J2EE的相关开源技术以及框架（Spring,Struts2, Mybatis）熟练使用MYSQL数据库以及PL/SQL。</p> -->
        </div>
        <div class="job-email">
            有意向者可发送简历至zhaopin@hongte.info，并在标题注明：个人姓名+应聘岗位+城市
        </div>
    </div>
</template>
<script>
import { mapGetters } from 'vuex'

export default {
    computed: {
        ...mapGetters([
        'stationInfo',
        ])
    },
    created() {
        console.log(this.stationInfo)
    }
}
</script>

<style lang="scss">
    @import "../../sass/variables";
    @import "../../sass/func";
    .job-detail-wrap{
        margin-top:.226667rem;
    }
    .job-topic{
        color:#333;
        font-size: .48rem;
        width:100%;
        height: 1.066667rem;
        line-height: 1.066667rem;
        box-sizing: border-box;
        font-size: .48rem;
        color:#333;
        background: #f4f3f1;
        padding-left:.4rem;
        margin:0;
    }
    .jt-sepecial{
        background: #aa8451;
        color:#fff;
    }
    .job-type{
        margin:0;
        padding:.4rem;
        border-bottom:.026667rem solid #ebebeb;
        background: #fff;
        p {
            margin:0;
            font-size:.373333rem;
            color:#666;
            line-height:2;
        }
    }
    .job-zz{
        margin:0;
        padding:.4rem;
        border-bottom:.026667rem solid #ebebeb;
        background: #fff;
        p{
            margin:0 !important;
            font-size: .4rem;
            color:#333;  
            line-height:1.5;
        }
    }
    .job-email{
        color:#666;
        font-size: .373333rem;
        text-align: center;
        padding:.6rem .4rem;
        line-height:.64rem;
    }
</style>