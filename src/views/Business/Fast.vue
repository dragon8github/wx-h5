<template>
 <div id="Fast">
        <div class="city" @click="cityselect">
            <a class="city__icon"></a>
            <div class="city__text">{{ city ? `当前定位城市：${city}` : '点击定位城市' }}</div>
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

                if (!this.city) {
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
                this.api.fastApplyFor({
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
                      if (data.ReturnCode == 0) {
                          this.$router.push("Status")
                      } else {
                          Toast(data.msg);
                      }
                })
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
