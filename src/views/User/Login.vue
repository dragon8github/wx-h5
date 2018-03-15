<template>
 <div id="Login">
       <div class="form">
            <mt-field topLabel = '手机号' :errTopLabel = 'user_errTopLabel' type = "number"   placeholder = '请输入用户名/手机号'   v-model = 'user' :maxlength = '11'></mt-field>
            <mt-field topLabel = '密码'   :errTopLabel = 'pwd_errTopLabel'  type = "password" placeholder = '请输入密码'  v-model = 'pwd'  :maxlength = '16'></mt-field> 
            <mt-button :text="'登 录'" :disable = "user == '' || pwd == ''" @click="go"></mt-button>
       </div>

       <div class="bottom-text">
            <a @click="goForgetPwd">忘记密码</a> <a class="split"> | </a> <a @click="goRegister">快速注册</a>
       </div>
 </div>
</template>

<script>
  import mtField   from '@components/field/field.vue'
  import Toast     from '@components/toast/index.js'
  import Loader    from '@components/loader/index.js'
  import mtButton  from '@myComponents/button.vue'
  import msg       from '@components/messagebox/messagebox.js'

  export default {
        name: 'Login',
        data () {
            return {
              user: '',
              pwd: '',
              user_errTopLabel: '',
              pwd_errTopLabel: ''
            }
        },
        watch: {
            
        },
        methods: {
            go () {
              this.user = this.user.trim();
              this.pwd = this.pwd.trim();

              if (this.user === '') {
                  return this.user_errTopLabel = '请输入用户名/手机号'
              } else if (!/^1\d{10}$/.test(this.user.trim())) {
                  return this.user_errTopLabel = '用户名或手机号不存在'
              } else {
                   this.user_errTopLabel = ''
              }

              var reg = /[A-Za-z].*[0-9]|[0-9].*[A-Za-z]/;
              if (this.pwd == null || this.pwd == "") {
                return this.pwd_errTopLabel = "密码不能为空。";
              } else if (this.pwd.length < 6) {
                return this.pwd_errTopLabel = "密码不能小于6个字符。";
              } else if (this.pwd.length > 16) {
                return this.pwd_errTopLabel = "密码不能超过16个字符。";
              } else if (!reg.test(this.pwd)) {
                return this.pwd_errTopLabel = "须含字母和数字6-16个字符，支持特殊符号";
              } else {
                  this.pwd_errTopLabel = ''
              }

              Loader.show('正在登录...')
              this.api.login({
                  userName: this.uer,  // 账号
                  pwd: this.pwd,       // 密码
              }, true).then(data=>{
                  Loader.hideAll();
                  if (data.ReturnCode == 0) {
                      this.$router.push(this.$store.state.wantTo)
                  } else {
                      Toast(data.msg);
                  }
              })
            },      
            goForgetPwd () {
                this.$router.push('ForgetPwd')
            },
            goRegister () {
                this.$router.push('Register')
            }
        },
        components: {
            mtField,
            mtButton
        },
        beforeMount () {
          console.log(this.user === '' || this.pwd === '')
        }
  }
</script>


<style scoped lang="scss">
@import "~@sass/_variables";
@import "~@sass/_func";

#Login {
    background-color:#fff
}

.form {
    margin: pxToRem(100px) pxToRem(30px);
}

.bottom-text {

    left: 50%;
    transform: translateX(-50%); 
    position:absolute;
    bottom: pxToRem(100px);
    display: flex;
    align-items: center;
    justify-content: space-around;
    font-size: pxToRem(28px);
    letter-spacing: 1px;
    color: #bababa;
}

.split {
    padding: 0 pxToRem(23px);
}

</style>
