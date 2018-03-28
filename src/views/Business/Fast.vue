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
               phone: '',
               x: this.$route.params.type === 'house' ? '100%' : 0,
               type: this.$route.params.type || 'car',
               city: this.$store.state.city
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

                if (!this.$store.state.city) {
                  this.$router.push('/cityselect');
                  return Toast('请选择城市')
                }

                if (!this.user) {
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
                        city: this.city,   
                        latitude:'0',      
                        longitude: '0',    
                    },
                    realName: this.user,            // 真实姓名
                    telNo: this.phone               // 电话号码
                }, true).then(data=>{
                      Loader.hideAll()
                      if (data.returnCode == 0) {
                          this.$router.push("Status")
                      } else {
                          Toast(data.msg);
                      }
                })
            },

            baidumap (latitude, longitude) {
                var that = this
                window.getlocation = function (data) {
                    Loader.hideAll();
                    if (data.status == 0) {
                        var city = data.result.city
                        that.city = city
                        that.$store.state.city = city
                        Toast("定位到当前城市为：" + city);
                    } else {
                        Toast('地址解析失败，请手动选择城市')
                        that.$router.push('/cityselect')
                    }
                }

                Loader.show('正在定位...');
                var o = document.createElement('script');
                o.src = `http://api.map.baidu.com/geocoder/v2/?callback=getlocation&location=${latitude},${longitude}&output=json&pois=1&ak=PaY0aQpuk5ypaxL1bGH4y65nbitEd0u3`;
                document.documentElement.childNodes[0].appendChild(o);
            },

            wxGetLocation () {
                var that = this;
                // 调用微信定位接口
                wx.getLocation({
                    type: 'wgs84', // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
                    success: function (res) {
                        var latitude = res.latitude; // 纬度，浮点数，范围为90 ~ -90
                        var longitude = res.longitude; // 经度，浮点数，范围为180 ~ -180。
                        if (latitude && longitude) {
                          that.baidumap(latitude, longitude);
                        } else {
                          Toast('微信定位失败，请手动选择城市')
                          that.$router.push('/cityselect')
                        }
                    }
                });
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
            this.city = this.$store.state.city
        },
        beforeMount () {
            var that = this;
            this.city = '正在定位城市...';
            this.wxapi.getWxConfig({
                url: window.location.href.split('#')[0]
            }).then(_ => {
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

                                window.alert(latitude + "——" + longitude);

                                if (latitude && longitude) {
                                      window.getlocation = function (data) {
                                        
                                          window.alert(JSON.stringify(data));
                                          Loader.hideAll();

                                          if (data.status == 0) {
                                              var city = data.result.city
                                              Toast("定位到当前城市为：" + city);
                                              that.city = city
                                              this.$store.state.city = city
                                          } else {
                                              Toast('地址解析失败，请手动选择城市')
                                              that.$router.push('/cityselect')
                                          }
                                      }

                                      Loader.show('正在定位...');
                                      var o = document.createElement('script');
                                      o.src = `http://api.map.baidu.com/geocoder/v2/?callback=getlocation&location=${latitude},${longitude}&output=json&pois=1&ak=PaY0aQpuk5ypaxL1bGH4y65nbitEd0u3`;
                                      document.documentElement.childNodes[0].appendChild(o);
                                  } else {
                                      Toast('微信定位失败，请手动选择城市')
                                      that.$router.push('/cityselect')
                                  }
                            }
                        });
                    });
                    // config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。
                    wx.error(function(res){
                        that.city = "定位失败，请手动选择城市";
                        Toasrt('微信接口调用失败，请手动选择城市')
                        that.$router.push('/cityselect')
                    });
                } else {
                    Toast("获取微信配置失败" + _.msg);
                    that.city = "定位失败，请手动选择城市";
                    that.$router.push('/cityselect')
                }
            })
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
