<template>
 <div id="ForgetPwd">
       <div class="form">
            <mt-field topLabel = '请输入手机号' :errTopLabel='user_errTopLabel'     type = "number" placeholder = '请输入11位手机号码'  v-model = 'user'     :maxlength = '11'></mt-field>
            <mt-field topLabel = '验证码'      :errTopLabel='validate_errTopLabel' type = "number" placeholder = '请输入6位验证码'     v-model = 'validate' :maxlength = '6' :clearText='false'>
                <getvalidate slot="icon" @click="getCode"></getvalidate>
            </mt-field>

            <mt-button :text="'下一步'" :disable="user === '' || validate === ''" @click="go"></mt-button>
       </div>
 </div>
</template>

<script>
import mtField      from '@components/field/field.vue'
import Toast        from '@components/toast/index.js'
import Loader       from '@components/loader/index.js'
import getvalidate  from '@myComponents/getvalidate'
import mtButton     from '@myComponents/button.vue'


  export default {
        name: 'ForgetPwd',
        data () {
            return {
              user:'',
              validate: '',
              user_errTopLabel:'',
              validate_errTopLabel:'',
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

                if (/[^A-Za-z0-9]/.test(this.validate)) {
                    return this.validate_errTopLabel = '6位数字或英文，不包含特殊字符'
                } else {
                    this.validate_errTopLabel = ''
                }

                this.xdapi.checkFindPwdCode({
                    telNo: this.user,
                    code: this.validate,
                    type: '2'
                }).then(data=>{
                    if (data.returnCode == 0) {
                        this.$store.state.phone = this.user
                        this.$store.state.forgetPwdValidate = this.validate
                        this.$router.push('/resetpwd')
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
                    type: '2'  
                }, true).then(data=>{
                    Loader.hideAll()
                    if (data.returnCode == 0) {
                        Toast("验证码已发送，请注意查收。")
                        cb()
                    } else {
                        Toast(data.msg);
                    }
                })
            },
        },
        components: {
            mtField,
            getvalidate,
            mtButton
        }
  }
</script>


<style scoped lang="scss">
@import "~@sass/_variables";
@import "~@sass/_func";

#ForgetPwd {
    background-color:#fff
}

.form {
    margin: pxToRem(100px) pxToRem(30px) pxToRem(30px);
}


</style>
