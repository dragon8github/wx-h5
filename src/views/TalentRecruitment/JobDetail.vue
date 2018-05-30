<template>
    <div class="job-detail-wrap">
        <div class="job-detail">
            <h2 class="job-topic">
                Java高级开发工程师
            </h2>
            <div class="job-type">
                <p>职业类别:研发类</p>
                <p>工作地点:东莞南城</p>
                <!-- <p>发布时间:2018/05/06</p> -->
            </div>
            <h2 class="job-topic">
                任职要求
            </h2>
            <div class="job-zz">
                <p>1.负责系统的开发及维护工作，以及相关系统的架构及组件设计，制定开发方案；</p>
                <p>2.负责功能模块的项目需求分析、设计、开发，配合测试人员对产品需求进行测试。</p>
            </div>
            <h2 class="job-topic">
                任职资格
            </h2>
            <div class="job-zz">
                <p>1.本科以上学历，计算机相关专业；</p>
                <p>2.5年以上开发经验，2年互联网企业经验者，P2P平台，消费贷款系统优先；</p>
                <p>3.理解Java反射机制和常用的设计模式，熟悉基于J2EE的相关开源技术以及框架（Spring,Struts2, Mybatis）熟练使用MYSQL数据库以及PL/SQL。</p>
            </div>
        </div>
        <div class="job-email">
            若对岗位有兴趣可发简历至zhaopin@hongte.info，并在邮件正文中注明姓名、手机、申请岗位。
        </div>
    </div>
</template>
<style lang="scss" scoped>
    @import "../../sass/variables";
    @import "../../sass/func";
    .job-detail{
        margin-top: .24rem;
        padding: .4rem;
        background: #fff;
        .job-topic{
            color:#333;
            font-size: .48rem;
            margin: .8rem 0;
        }
        .job-type{
            padding-bottom: .266667rem;
            border-bottom:.026667rem solid #ebebeb;
            p {
                font-size: .373333rem;
                color:#666;
            }
        }
        .job-zz{
            p{
              font-size: .4rem;
              color:#333;  
            }
        }
    }
    .job-email{
        color:#666;
        font-size: .373333rem;
        text-align: center;
        padding:.6rem .4rem;
    }
</style>