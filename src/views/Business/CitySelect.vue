<template>
 <div id="CitySelect">
    <p class="title">定位城市</p>
    <div class="cell">
        <div class="cell-left">{{ city ? city : '定位失败' }}</div>
        <div class="cell-right" @click="reset">重新定位</div>
    </div>

    <p class="title">热门选择</p>
    <div class="list">
        <ul class="list-ul" @click="selectHot">
          <li>东莞市</li>
          <li>深圳市</li>
          <li>广州市</li>
          <li>惠州市</li>
          <li>上海市</li>
          <li>佛山市</li>
        </ul>
    </div>

    <p class="title">选择城市</p>
    <index-list>
         <list-section v-for="(item, index) in alphabet" :key="index" :index="item.initial">
             <cell v-for="(cell, index2) in item.cells" :key="index2" :title="cell" :clickHandle="selectItem"></cell>
         </list-section>
    </index-list>
 </div>
</template>

<script>
  import indexList   from '@components/index-list'
  import listSection from '@components/index-section'
  import cell        from '@components/cell'
  import Toast       from '@components/toast/index.js'
  import Loader      from '@components/loader/index.js'

  export default {
        name: 'CitySelect',
        data () {
            return {
                city: this.$store.state.localcity || this.$store.state.city,
                alphabet: [{initial:'A',cells:['阿拉善盟','鞍山市','安庆市','安阳市','阿坝藏族羌族自治州','安顺市','阿里地区','安康市','阿克苏地区','阿勒泰地区','阿拉尔市','澳门特别行政区']},{initial:'B',cells:['北京市','保定市','包头市','巴彦淖尔市','本溪市','白山市','白城市','蚌埠市','亳州市','滨州市','佛山市','北海市','百色市','巴中市','毕节地区','保山市','宝鸡市','白银市','博尔塔拉蒙古自治州','巴音郭楞蒙古自治州']},{initial:'C',cells:['承德市','沧州市','赤峰市','朝阳市','常州市','滁州市','巢湖市','池州市','常德市','郴州市','潮州市','崇左市','成都市','楚雄彝族自治州','昌都地区','昌吉回族自治州']},{initial:'D',cells:['大同市','大连市','丹东市','大庆市','大兴安岭地区','东营市','德州市','东莞市','德阳市','达州市','大理白族自治州','德宏傣族景颇族自治州','迪庆藏族自治州','定西市']},{initial:'E',cells:['鄂尔多斯市','鄂州市','恩施土家族苗族自治州']},{initial:'F',cells:['抚顺市','阜新市','阜阳市','福州市','抚州市','防城港市']},{initial:'G',cells:['赣州市','广州市','桂林市','贵港市','广元市','广安市','甘孜藏族自治州','贵阳市','甘南藏族自治州','果洛藏族自治州','固原市']},{initial:'H',cells:['邯郸市','衡水市','呼和浩特市','呼伦贝尔市','葫芦岛市','哈尔滨市','鹤岗市','黑河市','淮安市','杭州市','湖州市','合肥市','淮南市','淮北市','黄山市','荷泽市','鹤壁市','黄石市','黄冈市','衡阳市','怀化市','惠州市','河源市','贺州市','河池市','海口市','红河哈尼族彝族自治州','汉中市','海东地区','海北藏族自治州','黄南藏族自治州','海南藏族自治州','海西蒙古族藏族自治州','哈密地区','和田地区']},{initial:'J',cells:['晋城市','晋中市','锦州市','吉林市','鸡西市','佳木斯市','嘉兴市','金华市','景德镇市','九江市','吉安市','济南市','济宁市','焦作市','荆门市','荆州市','江门市','揭阳市','嘉峪关市','金昌市','酒泉市']},{initial:'K',cells:['开封市','昆明市','克拉玛依市','克孜勒苏柯尔克孜自治州','喀什地区']},{initial:'L',cells:['廊坊市','临汾市','吕梁市','辽阳市','辽源市','连云港市','丽水市','六安市','龙岩市','莱芜市','临沂市','聊城市','洛阳市','漯河市','娄底市','柳州市','来宾市','泸州市','乐山市','凉山彝族自治州','六盘水市','丽江市','临沧市','拉萨市','林芝地区','兰州市','陇南市','临夏回族自治州']},{initial:'M',cells:['牡丹江市','马鞍山市','茂名市','梅州市','绵阳市','眉山市']},{initial:'N',cells:['南京市','南通市','宁波市','南平市','宁德市','南昌市','南阳市','南宁市','内江市','南充市','怒江傈僳族自治州','那曲地区']},{initial:'P',cells:['盘锦市','莆田市','萍乡市','平顶山市','濮阳市','攀枝花市','平凉市']},{initial:'Q',cells:['秦皇岛市','齐齐哈尔市','七台河市','衢州市','泉州市','青岛市','清远市','钦州市','黔西南布依族苗族自治州','黔东南苗族侗族自治州','黔南布依族苗族自治州','曲靖市','庆阳市','潜江市']},{initial:'R',cells:['日照市','日喀则地区']},{initial:'S',cells:['石家庄市','朔州市','沈阳市','四平市','松原市','双鸭山市','绥化市','上海市','苏州市','绍兴市','厦门市','三明市','上饶市','三门峡市','商丘市','十堰市','随州市','神农架','邵阳市','韶关市','深圳市','汕头市','汕尾市','三亚市','遂宁市','思茅市','山南地区','商洛市','石嘴山市','石河子市']},{initial:'T',cells:['天津市','唐山市','太原市','通辽市','铁岭市','通化市','泰州市','台州市','铜陵市','泰安市','铜仁地区','铜川市','天水市','吐鲁番地区','塔城地区','图木舒克市','台湾省','天门市']},{initial:'W',cells:['乌海市','乌兰察布市','无锡市','温州市','芜湖市','潍坊市','威海市','武汉市','梧州市','文山壮族苗族自治州','渭南市','武威市','吴忠市','乌鲁木齐市','五家渠市']},{initial:'X',cells:['邢台市','忻州市','兴安盟','锡林郭勒盟','徐州市','宿迁市','宿州市','宣城市','新余市','新乡市','许昌市','信阳市','襄樊市','孝感市','咸宁市','湘潭市','湘西土家族苗族自治州','西双版纳傣族自治州','西安市','咸阳市','西宁市','香港特别行政区','仙桃市']},{initial:'Y',cells:['阳泉市','运城市','营口市','延边朝鲜族自治州','伊春市','盐城市','扬州市','鹰潭市','宜春市','烟台市','宜昌市','岳阳市','益阳市','永州市','阳江市','云浮市','玉林市','宜宾市','雅安市','玉溪市','延安市','榆林市','玉树藏族自治州','银川市','伊犁哈萨克自治州']},{initial:'Z',cells:['张家口市','长治市','长春市','镇江市','舟山市','漳州市','淄博市','枣庄市','郑州市','周口市','驻马店市','长沙市','株洲市','张家界市','珠海市','湛江市','肇庆市','中山市','重庆市','自贡市','资阳市','遵义市','昭通市','张掖市','中卫市']}]
            }
        },
        methods: {
            reset () {
              if (this.is_weixn()) {
                  var that = this;
                  Loader.show('正在定位...', "A");
                  this.wxapi.getWxConfig({
                      url: window.location.href.split('#')[0]
                  }, true).then(_ => {
                      // 微信配置获取成功
                      if (+(_.returnCode) == 0) {

                          // 初始化微信配置
                          wx.config(_.data);
                  
                          // 微信初始化事件
                          wx.ready(function(){
                              // 调用微信定位接口
                              wx.getLocation({
                                  type: 'wgs84', // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
                                  success: function (res) {

                                      var latitude = res.latitude; // 纬度，浮点数，范围为90 ~ -90
                                      var longitude = res.longitude; // 经度，浮点数，范围为180 ~ -180。

                                      if (latitude && longitude) {
                                          // 百度回调函数
                                          window.getlocation = function (data) {
                                              // 坐标转换成功
                                              if (data.status == 0) {
                                                  Loader.hideAll();
                                                  // 获取城市
                                                  var city = data.result.addressComponent.city
                                                  that.city = city
                                                  that.$store.state.city = city
                                                  that.$store.state.localcity = city
                                                  Toast("定位到当前城市为：" + city);
                                                  that.$router.push('/fast')
                                              // 坐标转换失败
                                              } else {
                                                  Loader.hideAll();
                                                  Toast('坐标解析失败，请手动选择城市')
                                                  that.city = "坐标解析失败，请手动选择城市";
                                              }
                                          }

                                          // 防止百度地图迟迟没有回调，10秒后自动关闭
                                          window.setTimeout(_=>{
                                              Loader.hideAll();
                                          }, 10000)

                                          var o = document.createElement('script');
                                          o.src = `http://api.map.baidu.com/geocoder/v2/?callback=getlocation&location=${latitude},${longitude}&output=json&pois=1&ak=PaY0aQpuk5ypaxL1bGH4y65nbitEd0u3`;
                                          document.documentElement.childNodes[0].appendChild(o);
                                      } else {
                                          Loader.hideAll()
                                          Toast('微信定位失败，请手动选择城市')
                                          that.$router.push('/cityselect')
                                      }

                                  },
                                  fail: function (res) {
                                    Loader.hideAll();
                                    that.city = "定位失败，请手动选择城市";
                                  },
                                  // 用户拒绝定位服务
                                  cancel: function (res) {
                                     Loader.hideAll();
                                     that.city = "定位失败，请手动选择城市";
                                  },
                                  // 接口调用完成时执行的回调函数，无论成功或失败都会执行
                                  complete: function (res) {
                                     
                                  }
                              });
                          });

                          // wx.config信息验证失败会执行error函数
                          // 如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。
                          wx.error(function(res){
                              Loader.hideAll();
                              that.city = "定位失败，请手动选择城市";
                              Toasrt('微信接口调用失败，请手动选择城市')
                          });
                      } else {
                          Loader.hideAll();
                          Toast("获取微信配置失败" + _.msg);
                          that.city = "定位失败，请手动选择城市";
                      }
                  })
              }
            },
            selectItem (e, data) {
              this.city = data.title
              this.$store.state.localcity = data.title
              // this.$router.back()
              // 之所以不使用back，是害怕有路由问题 + 连按导致退两次
              this.$router.push('/fast')
            },
            selectHot (e) {
              if (e.target.nodeName === 'LI') {
                  this.city = e.target.innerText
                  this.$store.state.localcity = e.target.innerText
                  this.$router.push('/fast')
              }
            },
            is_weixn () {
                var ua = navigator.userAgent.toLowerCase();
                if(ua.match(/MicroMessenger/i)=="micromessenger") {
                    return true;
                } else {
                    return false;
                }
            }
        },
        components: {
            indexList,
            listSection,
            cell
        },
        beforeMount () {
        }
  }
</script>


<style lang="scss">
@import "~@sass/_variables";
@import "~@sass/_func";

#CitySelect {
    font-size: pxToRem(32px);
    overflow: scroll;

    .mint-cell-wrapper {
        margin-bottom: 0;
        padding: 0 pxToRem(20px);
    }

    .title {
      font-size: pxToRem(27px);
      color: #222222;
      line-height: pxToRem(69px);
      height: pxToRem(69px);
      padding: 0 pxToRem(31px);
      margin: pxToRem(10px) 0;
    }

    .cell {
        @include flex(false, center);
        justify-content: space-between;
        padding: 0 pxToRem(31px);
        height: pxToRem(88px);
        background-color: #ffffff;
        font-size: pxToRem(32px);


        .cell-left {
          
        }

        .cell-right {
            color: #0e6ae7;
        }
    }

    .list-ul {
      display: flex;
      justify-content: space-around;
      margin: 0 pxToRem(31px);
      flex-wrap: wrap;

      li{
        list-style: none;
        width: pxToRem(206px);
        height: pxToRem(88px);
        line-height: pxToRem(88px);
        text-align: center;
        background-color: #ffffff;
        margin-bottom: pxToRem(20px);
      }
    }
}

</style>
