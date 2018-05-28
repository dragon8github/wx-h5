<template>
    <div class="contact-us">
        <talent-nav :activated="activated"></talent-nav>
        <div class="map"></div>
        <div class="corporation-address">
            <div class="ca-item">
                <p>联系电话：</p>
                <p>0769-23155466-6144</p>
            </div>
            <div class="ca-item">
                <p>公司地址：</p>
                <p>广东省东莞市南城街道鸿福路102号汇成大厦二楼</p>
            </div>
        </div>
    </div>
</template>
<style lang="scss" scoped>
    @import "../../sass/variables";
    @import "../../sass/func";
    .map{
        width: 100%;
        height: 100%;
        background: url('~@assets/map.jpg') no-repeat;
        background-size: 100% 100%;
    }
    .corporation-address{
        background: #fff;
        margin: 0 .4rem;
        position: fixed;
        bottom:.666667rem;
        width: 9.2rem;
        .ca-item{
            margin:.4rem;
            padding-bottom: 0.24rem;
            font-size: .4rem;
            color:#666;
            line-height: .8rem;
            border-bottom:.026667rem solid #ebebeb;
            p{
                margin:0;
            }
        }
        .ca-item:last-child{
            border:none;
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
            activated:"联系我们"
        }
    }
}
</script>


