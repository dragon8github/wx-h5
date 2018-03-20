<template>
 <div id="Register">
       <div class="form">
            <mt-field topLabel = '手机号'   :errTopLabel = 'user_errTopLabel'     type = "number"     placeholder = '请输入11位手机号码'  v-model = 'user'     :maxlength = '11'></mt-field>
            <mt-field topLabel = '设置密码' :errTopLabel = 'pwd_errTopLabel'      type = "password"   placeholder = '请输入6位数字或字母' v-model = 'pwd'      :maxlength = '16'></mt-field> 
            <mt-field topLabel = '验证码'   :errTopLabel = 'validate_errTopLabel' type = "number"     placeholder = '请输入6位验证码'     v-model = 'validate' :maxlength = '6' :clearText='false'>
                <getvalidate slot="icon" @click="getCode"></getvalidate>
            </mt-field>

            <div class="topLabelhide" @click="fade" :class="{mtb60: !hide_validate}">
                <!-- 标题 -->
                <span>邀请人手机号码</span>
                <!-- 图标 -->
                <i class="hideicon" :class="{ iconopen : hide_validate}"></i>
            </div>
            <div v-show="hide_validate" class="txlinput">
                <mt-field type = "number" placeholder = '请输入11位手机号码'  v-model = 'invite' :maxlength = '11'  :clearText='false'>
                    <div slot="icon"> <i class="icontx"></i> </div>
                </mt-field>
            </div>

            <mt-button :text="'注 册'" :disable = "user == '' || pwd == ''" @click="go"></mt-button>

       </div>
       <div class="already"> 已有账号，<a class="goToLogin" @click="goToLogin">马上登录</a> </div>
       <div class="bottom-text"> 注册即表示您已同意 <a class="goToPro" @click="goToPro">《鸿特金服信贷服务协议》</a> </div>
 </div>
</template>

<script>
  import mtField      from '@components/field/field.vue'
  import Toast        from '@components/toast/index.js'
  import Loader       from '@components/loader/index.js'
  import getvalidate  from '@myComponents/getvalidate'
  import mtButton     from '@myComponents/button.vue'


  export default {
    name: 'Register',
    data () {
        return {
            user: '',
            pwd: '',
            validate: '',
            invite: '',
            user_errTopLabel:'',
            pwd_errTopLabel:'',
            validate_errTopLabel:'',
            hide_validate: false
        }
    },
    methods: {
        go () {
            if (this.user.trim() === '') {
                return this.user_errTopLabel = '请输入用户名/手机号'
            } else if (!/^1\d{10}$/.test(this.user.trim())) {
                return this.user_errTopLabel = '手机号码格式错误'
            } else {
                this.user_errTopLabel = ''
            }

            if (this.pwd.trim() === '') {
                return this.pwd_errTopLabel = '密码不能为空'
            } else if (!/[A-Za-z].*[0-9]|[0-9].*[A-Za-z]/.test(this.pwd) || this.pwd.length < 6 || this.pwd.length > 16) {
                return this.pwd_errTopLabel = '须含字母和数字6-16个字符，支持特殊符号'
            } else {
                this.pwd_errTopLabel = ''
            }

            if (/[^A-Za-z0-9]/.test(this.validate)) {
                return this.validate_errTopLabel = '6位数字或英文'
            } else {
                this.validate_errTopLabel = ''
            }

            // 邀请人手机号码验证
            // 1、交互，错误的提示
            // 2、是否要检查手机号码的用户是否存在，不存在的话返回错误信息
            Loader.show('注册中...')
            this.xdapi.register({
                     telNo: this.user,             // 账号
                     password: this.pwd,           // 密码
                     validateCode: this.validate,  // 验证码
                     extensionTelNo: this.invite,  // 推荐手机号
                     type: 'wechat_pulic'          // 注册方式是微信
            }, true).then(data=>{
                Loader.hideAll();
                if (data.returnCode == 0) {
                     // 设置token到store中
                     this.$store.dispatch('set_token', data.data.token).then(_ => {
                          // 设置token缓存
                          window.localStorage.setItem('token', data.data.token)
                          // 设置手机到store
                          this.$store.dispatch('set_phone', this.user).then(_=>{
                                Toast('恭喜你，注册成功！');
                              // 设置phone的缓存
                              window.localStorage.setItem('phone', this.user)
                              // 跳转到预先要去的地址
                              this.$router.push(this.$store.state.wantTo)
                          })
                    })
                } else {
                    Toast(data.msg);
                }
            })
        },
        getCode (cb) {
            if (this.user.trim() === '') {
                return Toast('请先输入用户名/手机号')
            } else if (!/^1\d{10}$/.test(this.user.trim())) {
                return Toast('手机号码格式错误，请重新确认')
            }
            
            Loader.show("正在获取验证码")
            this.xdapi.smsSend({
                    telNo: this.user,
                    type: '1'  
            }).then(data => {
                Loader.hideAll();
                if (data.returnCode == 0) {
                    Toast("验证码已发送，请注意查收。")
                    cb()
                } else {
                    Toast(data.msg || '验证码发送失败，请稍后重试');
                }
            })
        },
        goToLogin () {
            this.$router.push('Login')
        },
        goToPro () {
            this.$router.push('RegProtocol')
        },
        fade () {
            this.hide_validate = !this.hide_validate
        }
    },
    watch: {
      validate (old, newval) {
          console.log(newval);
          this.validate = this.validate.replace(/\D/g, "");
      }
    },
    components: {
        mtField,
        getvalidate,
        mtButton
    },
    beforeMount () {

    }
  }
</script>


<style scoped lang="scss">
@import "~@sass/_variables";
@import "~@sass/_func";


#Register {
    background-color:#fff;
}

.form {
    padding: pxToRem(100px) pxToRem(30px) pxToRem(30px);
    background: #fff;
    width: 100%
}

.bottom-text {
    left: 50%;
    transform: translateX(-50%); 
    position:absolute;
    bottom: pxToRem(80px);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: pxToRem(24px);
    letter-spacing: 1px;
    color: #999999;
    width: 100%;
    z-index: -1;
}

.already {
     width: 100%;
     font-size: pxToRem(28px);
     margin: auto;
     text-align: center;
     color: #999999;
}

.button {
    width: 100%;
    height: pxToRem(100px);
    background-color: #0e6ae7;
    border-radius: pxToRem(10px);
    font-size: pxToRem(36px);
    line-height: pxToRem(100px);
    margin-bottom: pxToRem(30px);
    color: #fff;
    letter-spacing: pxToRem(2px);
    border: 0;


    &.disable {
        background-color:#ccc;
    }
}

.goToLogin, .goToPro {
    color: #0e6ae7;
}

.getvalidate {
    color: #0e6ae7;
    font-size: pxToRem(28px);
    width: 100%;
    text-align: right;

    &.gray {
      color: #999;
    }
}

.icontx {
    @include bg(46px, 46px, "~@assets/txl.png");
}

.topLabelhide {
    @include flex(false, center);
    color: #0e6ae7;
    font-size: pxToRem(24px);
}

.hideicon {
   @include bg(20px, 12px, "~@assets/arrow.png")
   margin-left: pxToRem(15px);
   transition: .3s ease transform;
   transform: rotate(-90deg);

   &.iconopen {
        transform: rotate(0deg);
   }
}

.mtb60 {
    margin-bottom: pxToRem(60px);
}
</style>
