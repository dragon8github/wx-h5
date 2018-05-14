<template>
 <div id="Fast">
        <div class="city" @click="cityselect">
            <a class="city__icon"></a>
            <div class="city__text">{{ city ? `${city}` : '点击定位城市' }}</div>
        </div>
        <div class="banner">
              <div class="banner-img">
                    <img src="~@assets/fc_img.png">
              </div>
              <div class="banner-text">
                  <div class="banner-text-header">极速放款,急您所急!</div>
                  <div class="banner-text-text">
                      <p>大额借贷，资金及时雨</p>
                      <p>线上申请更便捷</p>
                  </div>
              </div>
        </div>

        <div style='background-color:#fff'>
                 <div class="navbar">
                      <div class="navbar-item" @click="goCar"   :class="{active: type==='car'}"  >一点车贷</div>
                      <div class="navbar-item" @click="goHouse" :class="{active: type==='house'}">鸿特微贷</div>
                      <a class="line" :style="{ transform: `translateX(${x})`}"></a>
                 </div>

                 <div class="form">
                      <mt-field placeholder = '请输入姓名'     v-model = 'user'  :maxlength="16"></mt-field>
                      <mt-field placeholder = '请输入手机号码' v-model = 'phone' :maxlength="16"></mt-field>
                      <mt-button :text="'立即申请'" :disable="user === '' || phone === ''" @click="go"></mt-button>
                 </div>
        </div>

        <div class="buttontext">
           本司承诺会保护您的个人隐私，您的资料仅用于申请抵押贷款,<br>
           不会以任何形式泄露给其他机构或人员。
        </div>

 </div>
</template>

<script>
  import mtField from '@components/field/field.vue'
  import Toast   from '@components/toast/index.js'
  import Loader  from '@components/loader/index.js'
  import mtButton  from '@myComponents/button.vue'

  export default {
        name: 'Fast',
        data () {
            return {
               user: '',
               phone: this.$store.state.phone || '',
               x: this.$route.params.type === 'house' ? '100%' : 0,
               type: this.$route.params.type || 'car',
               city: this.$store.state.localcity || this.$store.state.city,
               latitude: 0,
               longitude: 0,
               address: '',
               district: '',
               province: ''
            }
        },
        methods: {
            goCar () {
                this.type = 'car'
            },
            goHouse () {
                this.type = 'house'
            },
            go () {
                this.city = this.city.trim()
                this.user = this.user.trim()
                this.phone = this.phone.trim()

                if (!this.city) {
                  this.$router.push('/cityselect');
                  return Toast('请选择城市')
                }

                if (['null', 'undefined', 'nan'].indexOf(this.user.toLocaleLowerCase()) >= 0) {
                    return Toast('非法用户名')
                } else if (!this.user) {
                    return Toast('姓名不能为空')
                } else if (this.user.length > 16) {
                    return Toast('姓名不能大于16位')
                }

                if (!/^1\d{10}$/.test(this.phone)) {
                     return Toast('请输入正确的手机号码')
                }

                this.fast();
            },
            cityselect () {
                this.$router.push('/cityselect')
            },
            fast () {
                let _type = this.type === 'house' ? '1' : '2'
                let _typetext = this.type === 'house' ? "正在提交房速贷业务..." : "正在提交车易贷业务...";

                Loader.show(_typetext);
                this.xdapi.fastApplyFor({
                    businessType: _type,          
                    location: {
                        province: this.province,
                        city: this.city,   
                        district: this.district,
                        address: this.address,
                        longitude: this.latitude,  
                        latitude: this.latitude  
                    },
                    realName: this.user, // 真实姓名
                    telNo: this.phone    // 电话号码
                }, true).then(data=>{
                      Loader.hideAll()
                      if (data.returnCode == 0) {
                            this.$store.dispatch('set_fastphone', this.phone).then(_=>{
                                this.$router.push("/Status/" + this.type)
                            })
                      } else {
                          Toast(data.msg);
                      }
                })
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
        watch: {
            type (newVal, oldVal) {
                if (newVal === 'car') {
                    this.x = 0
                } else if (newVal === 'house') {
                    this.x = '100%'
                }
            }
        },
        components: {
            mtField,
            mtButton
        },
        activated () {
            this.city = this.$store.state.localcity || this.$store.state.city
        },
        beforeMount () {
             var that = this;
                Loader.show('正在定位...', "A");
                this.wxapi.getWxConfig({
                    url: window.location.href.split('#')[0]
                }, true).then(_ => {
                    console.log(_.returnCode)
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
                                                that.$store.state.city = city
                                                that.city      = city
                                                that.province  = data.result.addressComponent.province
                                                that.district  = data.result.addressComponent.district
                                                that.address   = data.result.formatted_address
                                                that.longitude = longitude
                                                that.latitude  = latitude
                                                Toast("定位到当前城市为：" + city);
                                            // 坐标转换失败
                                            } else {
                                                Loader.hideAll();
                                                Toast('坐标解析失败，请手动选择城市')
                                                that.city = "坐标解析失败，请手动选择城市";
                                            }
                                        }

                                        // 防止百度地图迟迟没有回调，10秒后自动关闭
                                        window.setTimeout(_=>{
                                            Loader.hideAll()
                                        }, 10000)

                                        var o = document.createElement('script');
                                        o.src = `http://api.map.baidu.com/geocoder/v2/?callback=getlocation&location=${latitude},${longitude}&output=json&pois=1&ak=PaY0aQpuk5ypaxL1bGH4y65nbitEd0u3`;
                                        document.documentElement.childNodes[0].appendChild(o);
                                    } else {
                                        Loader.hideAll()
                                        Toast('微信定位失败，请手动选择城市')
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
            // if (this.is_weixn()) {
            //     var that = this;
            //     Loader.show('正在定位...', "A");
            //     this.wxapi.getWxConfig({
            //         url: window.location.href.split('#')[0]
            //     }, true).then(_ => {
                    
            //         // 微信配置获取成功
            //         if (+(_.returnCode) == 0) {
            //             alert('res',JSON.stringify(_.data))
            //             // 初始化微信配置
            //             wx.config(_.data);
            //             // 微信初始化事件
            //             wx.ready(function(){
            //                 // 调用微信定位接口
            //                 wx.getLocation({
            //                     type: 'wgs84', // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
            //                     success: function (res) {

            //                         var latitude = res.latitude; // 纬度，浮点数，范围为90 ~ -90
            //                         var longitude = res.longitude; // 经度，浮点数，范围为180 ~ -180。

            //                         if (latitude && longitude) {
            //                             // 百度回调函数
            //                             window.getlocation = function (data) {
            //                                 // 坐标转换成功
            //                                 if (data.status == 0) {
            //                                     Loader.hideAll();
            //                                     // 获取城市
            //                                     var city = data.result.addressComponent.city
            //                                     that.$store.state.city = city
            //                                     that.city      = city
            //                                     that.province  = data.result.addressComponent.province
            //                                     that.district  = data.result.addressComponent.district
            //                                     that.address   = data.result.formatted_address
            //                                     that.longitude = longitude
            //                                     that.latitude  = latitude
            //                                     Toast("定位到当前城市为：" + city);
            //                                 // 坐标转换失败
            //                                 } else {
            //                                     Loader.hideAll();
            //                                     Toast('坐标解析失败，请手动选择城市')
            //                                     that.city = "坐标解析失败，请手动选择城市";
            //                                 }
            //                             }

            //                             // 防止百度地图迟迟没有回调，10秒后自动关闭
            //                             window.setTimeout(_=>{
            //                                 Loader.hideAll()
            //                             }, 10000)

            //                             var o = document.createElement('script');
            //                             o.src = `http://api.map.baidu.com/geocoder/v2/?callback=getlocation&location=${latitude},${longitude}&output=json&pois=1&ak=PaY0aQpuk5ypaxL1bGH4y65nbitEd0u3`;
            //                             document.documentElement.childNodes[0].appendChild(o);
            //                         } else {
            //                             Loader.hideAll()
            //                             Toast('微信定位失败，请手动选择城市')
            //                         }
            //                     },
            //                     fail: function (res) {
            //                       Loader.hideAll();
            //                       that.city = "定位失败，请手动选择城市";
            //                     },
            //                     // 用户拒绝定位服务
            //                     cancel: function (res) {
            //                        Loader.hideAll();
            //                        that.city = "定位失败，请手动选择城市";
            //                     },
            //                     // 接口调用完成时执行的回调函数，无论成功或失败都会执行
            //                     complete: function (res) {
                                   
            //                     }
            //                 });
            //             });

            //             // wx.config信息验证失败会执行error函数
            //             // 如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。
            //             wx.error(function(res){
            //                 Loader.hideAll();
            //                 that.city = "定位失败，请手动选择城市";
            //                 Toasrt('微信接口调用失败，请手动选择城市')
            //             });
            //         } else {
            //             Loader.hideAll();
            //             Toast("获取微信配置失败" + _.msg);
            //             that.city = "定位失败，请手动选择城市";
            //         }
            //     })
            // }
        }
  }
</script>


<style lang="scss">
@import "~@sass/_variables";
@import "~@sass/_func";

#Fast {
    .mint-cell {
        background-color: #fff;

        .mint-cell-wrapper {
            border-radius: pxToRem(10px);
            border: solid pxToRem(2px) #c8c7cc;
            padding: 0 pxToRem(30px);
            margin-bottom: pxToRem(30px);
        }
    }
}

.city {
    @include flex(s, c);
    background: #fff;
    height:  pxToRem(90px);
    padding-left: pxToRem(30px);
    margin-bottom: pxToRem(20px);
    
    .city__icon {
      @include bg(35px, 40px, '~@assets/local.png')
      margin-right: pxToRem(24px);
    }

    .city__text {
      font-size: pxToRem(30px);
      color: #222222;
    }
}

.banner {
    width: 100%;
    height: pxToRem(300px);
    margin-bottom: pxToRem(20px);
    display: flex;
    align-items: center;
    justify-content: center;
    background: #fff;

    .banner-img img {
        width: pxToRem(293px);
        height: pxToRem(198px);
    }

    .banner-text {
        padding-left: pxToRem(30px);
    }

    .banner-text-header {
        color: #222222;
        font-size: pxToRem(36px);
    }

    .banner-text-text {
        color: #999999;
        font-size: pxToRem(24px);
    }
}




.navbar {
    position: relative;
    height: pxToRem(88px);
    font-size: 0;

    .navbar-item {
        color: #999999;
        font-size: pxToRem(36px);
        line-height: pxToRem(88px);
        width: 50%;
        text-align: center;
        display: inline-block;
    }

    .navbar-item.active {
        color: #0e6ae7;
    }

    .line {
        content: '';
        width: pxToRem(375px);
        height: pxToRem(4px);
        background-color: #0e6ae7;
        position: absolute;
        bottom: 0;
        left: 0;
        transition: .3s ease;
    }
}


.form {
    margin: pxToRem(30px);
}


.buttontext {
    font-size: pxToRem(24px);
    line-height: pxToRem(36px);
    color: #999;
    margin: pxToRem(30px);
    word-break: keep-all;
}
</style>
