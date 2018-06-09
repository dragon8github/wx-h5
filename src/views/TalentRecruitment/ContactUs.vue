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
                <p>邮箱：zhaopin@hongte.info</p>
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
        position: fixed;
        bottom:.666667rem;
        left: 0;
        right: 0;
        margin: 0 auto;
        width: 9.2rem;
        .ca-item{
            margin:.4rem;
            padding-bottom: 0.24rem;
            font-size: .32rem;
            color:#666;
            line-height: .6rem;
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
const gdIconUrl = require('../../assets/gd_pos.png')
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
            zoom:15,
            center: [113.75435,23.013199]    
        });
        var marker = new AMap.Marker({
            position: [113.75435,23.013199],
            icon: new AMap.Icon({            
            size: new AMap.Size(40, 40),  //图标大小
            image: gdIconUrl,
            })     
        });
        marker.setMap(map);
        marker.on('click',function(e){
            marker.markOnAMAP({
                position:marker.getPosition()
            })
        })
        // var circle = new AMap.Circle({
        //     center: [113.75435,23.013199],
        //     radius: 35,
        //     fillOpacity:0.2,
        //     strokeWeight:1
        // })
        // circle.setMap(map);
        // map.setFitView()
        // var info = new AMap.InfoWindow({
        //     offset:new AMap.Pixel(0,-28)
        // })
        // info.open(map,marker.getPosition())

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


