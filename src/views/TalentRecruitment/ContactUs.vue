<template>
    <div class="contact-us">
        <talent-nav :activated="activated"></talent-nav>
        <div class="map" id="container"></div>
        <div class="corporation-address">
            <div class="ca-item">
                <p>联系电话：0769-23155466-6144</p>
            </div>
            <div class="ca-item">
                <p>公司地址：广东省东莞市南城街道鸿福路102号汇成大厦二楼</p>
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
        // background: url('~@assets/map.jpg') no-repeat;
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
    },
    mounted() {
        var map = new AMap.Map('container', {
            resizeEnable: true,
            zoom:11    
        });

        var marker = new AMap.Marker({
            position: [113.75435,23.013199],
        });
        marker.setMap(map);
        var circle = new AMap.Circle({
            center: [113.75435,23.013199],
            radius: 50,
            fillOpacity:0.2,
            strokeWeight:1
        })
        circle.setMap(map);
        map.setFitView()
        var info = new AMap.InfoWindow({
            offset:new AMap.Pixel(0,-28)
        })
        info.open(map,marker.getPosition())

        // var map = new BMap.Map("container");            // 创建Map实例
        // map.centerAndZoom(new BMap.Point(113.75435,23.013199), 11);
        
        //创建小狐狸
        // var pt = new BMap.Point(113.75435,23.013199);
        // var myIcon = new BMap.Icon("http://lbsyun.baidu.com/jsdemo/img/fox.gif", new BMap.Size(300,157));
        // var marker2 = new BMap.Marker(pt,{icon:myIcon});  // 创建标注
        // map.addOverlay(marker2);    

        // var local = new BMap.LocalSearch(map, {
        //     renderOptions: {map: map, panel: "r-result"}
        // });
        // local.search("餐饮");
    }
}
</script>


