<template>
 <div id="Login">
       <div class="form">
            <mt-field topLabel = '手机号' :errTopLabel = 'user_errTopLabel' type = "number"   placeholder = '请输入用户名/手机号'   v-model = 'user' :maxlength = '11'></mt-field>
            <mt-field topLabel = '密码'   :errTopLabel = 'pwd_errTopLabel'  type = "password" placeholder = '请输入密码'  v-model = 'pwd'  :maxlength = '16'></mt-field> 
            <mt-button :text="'登 录'" :disable="user === '' || pwd === ''" @click="go"></mt-button>
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
              user:'',
              pwd: '',
              user_errTopLabel: '',
              pwd_errTopLabel: ''
            }
        },
        watch: {
            
        },
        methods: {
            go () {
              if (this.user.trim() === '') {
                  return this.user_errTopLabel = '请输入用户名/手机号'
              } else if (!/^1\d{10}$/.test(this.user.trim())) {
                  return this.user_errTopLabel = '用户名或手机号不存在'
              } else {
                   this.user_errTopLabel = ''
              }

              if (this.pwd.trim() === '') {
                  return this.pwd_errTopLabel = '密码不能为空'
              } else {
                  this.pwd_errTopLabel = ''
              }

              this.api.wechat_Login({
                  UserName: this.uer,  // 账号
                  Pwd: this.pwd,       // 密码
              }).then(data=>{
                  if (data.ReturnCode == 1) {
                      this.$router.push(this.$store.state.wantTo)
                  } else {
                      Toast(data.ReturnMessage);
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
