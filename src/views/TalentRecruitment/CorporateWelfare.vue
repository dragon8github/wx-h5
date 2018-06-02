<template>
    <div class="corporation-culture">
        <talent-nav :activated="activated"></talent-nav>
        <div class="cc-img">
            <img src="~@assets/pic_0.png" alt="">
        </div>
        <div class="cc-txt">
            <p class="cc-artical">
                鸿特金服一直坚持于科技创新、金融创新、服务创新，打造最具竞争力、价值感的创新型金融信息咨询服务平台。
            </p>
            <p class="cc-artical">
                截至2018年4月，公司在已全国主要城市已发展近300家分、子公司，员工近6000人。
            </p>
            <div class="cc-img-md">
                <img src="~@assets/pic_1.png" alt="">
            </div>
            <div class="cc-img-side">
                <div style="text-align:left;"><img src="~@assets/pic_2.png" alt=""></div>
                <div style="text-align:right;"><img src="~@assets/pic_3.png" alt=""></div>
            </div>
            <h2 class="cc-title">企业福利</h2>
            <p class="cc-artical">
                1.双休，依法享有国家法定假期、带薪工龄假期；
            </p>
            <p class="cc-artical">
                2.入职即购买七险一金，商业保险+员工互助基金，让你享受全方位的保障；
            </p>
            <p class="cc-artical">
                3.独特的团队活动与文化建设，让同事间相处无忧，工作轻松；
            </p>
            <p class="cc-artical">
                4.生日礼金、年度体检、花式下午茶、部门团建、畅饮咖啡机、员工豪华吧台、花样百出的中西式节日礼品；
            </p>
            <p class="cc-artical">
                5.三人篮球赛、登山大赛、户外拓展、趣味彩跑、迎春晚会等丰富的企业文化活动给你舞台，等你来High！
            </p>
        </div>
    </div>
</template>
<style lang="scss" scoped>
    @import "../../sass/variables";
    @import "../../sass/func";
    .corporation-culture{
        .cc-img{
            width: 100%;
            height: 4.173333rem;
            img{
                width: 100%;
                height: auto;
            }
        }
        .cc-txt{
            padding:0.4rem .4rem;
            background: #fff;
            .cc-artical{
                margin-top:0;
                margin-bottom: .266667rem;
                line-height: .8rem;
                font-size: .4rem;
                color:#666;
            }
        }
        .cc-img-md{
            width: 8.493333rem;
            height: 4.906667rem;
            margin:.533333rem auto .2rem;
            img{
                width: 100%;
                height: auto;
            }
        }
        .cc-img-side{
            width: 8.493333rem;
            height: 2.413333rem;
            margin:0 auto;
            @include flex(b,center);
            div {
                flex:1;
            }
            div:first-child{
                margin-right:.133333rem;
            }
            img{
                width: 100%;
                height: auto;
            }
        }
        .cc-title{
            margin-top:.933333rem;
            margin-bottom: .8rem;
            font-size: .64rem;
            color:#666;
            text-align: center;
            font-weight: normal;
        }
    }
</style>
<script>
    import TalentNav from './TalentNav.vue'
    export default {
        components:{
            TalentNav
        },
        data() {
            return {
                activated:'公司福利',
                welFareImg:[
                    '~@assets/pic_0.png',
                    '~@assets/pic_1.png',
                    '~@assets/pic_2.png',
                    '~@assets/pic_3.png',
                ]
            }
        }
    }
</script>

