<template>
 <div id="ForgetPwd">
       <div class="form">
            <mt-field topLabel = '请输入手机号' :errTopLabel='user_errTopLabel'     type = "number" placeholder = '请输入11位手机号码'  v-model = 'user'     :maxlength = '11'></mt-field>
            <mt-field topLabel = '验证码'      :errTopLabel='validate_errTopLabel' type = "number" placeholder = '请输入6位验证码'     v-model = 'validate' :maxlength = '6' :clearText='false'>
                <getvalidate slot="icon" @click="getCode"></getvalidate>
            </mt-field>
            <button class="button" :class="{disable: user === '' || validate === ''}" @click="go">下一步</button>
       </div>
 </div>
</template>

<script>
import mtField from '@components/field/field.vue'
import Toast   from '@components/toast/index.js'
import Loader  from '@components/loader/index.js'
import getvalidate  from '@myComponents/getvalidate'

  export default {
        name: 'ForgetPwd',
        data () {
            return {
              user:'13713332652',
              validate: '123456',
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
            },
            getCode (cb) {
                Loader.show("正在获取验证码")
                window.setTimeout(_ => {
                    Loader.hideAll()
                    cb()
                }, 2000)
            },
        },
        components: {
            mtField,
            getvalidate
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


</style>
