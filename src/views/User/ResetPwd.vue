<template>
 <div id="ResetPwd">
       <div class="form">
            <mt-field topLabel = '设置新密码' :errTopLabel='pwd_validate'  type = "password" placeholder = '请输入6位数字或字母' v-model = 'pwd'  :maxlength = '11'></mt-field>
            <mt-field topLabel = '确认新密码' :errTopLabel='pwd2_validate' type = "password" placeholder = '请输入确认密码'     v-model = 'pwd2' :maxlength = '16'></mt-field> 
            <button class="button" :class="{disable: pwd === '' || pwd2 === ''}" @click="go">提交更新</button>
       </div>
 </div>
</template>

<script>
import mtField from '@components/field/field.vue'
import Toast   from '@components/toast/index.js'
import Loader  from '@components/loader/index.js'
  export default {
        name: 'ResetPwd',
        data () {
            return {
              pwd: '',
              pwd2: '',
              pwd_validate: '',
              pwd2_validate: ''
            }
        },
        methods: {
            go () {
                if (this.pwd.trim() === '') {
                    return this.pwd_errTopLabel = '密码不能为空'
                } else if (!/[A-Za-z].*[0-9]|[0-9].*[A-Za-z]/.test(this.pwd) || this.pwd.length < 6 || this.pwd.length > 16) {
                    return this.pwd_errTopLabel = '须含字母和数字6-16个字符，支持特殊符号'
                } else {
                    this.pwd_errTopLabel = ''
                }

                if (this.pwd2.trim() === '') {
                    return this.pwd2_errTopLabel = '密码不能为空'
                } else if (!/[A-Za-z].*[0-9]|[0-9].*[A-Za-z]/.test(this.pwd) || this.pwd.length < 6 || this.pwd.length > 16) {
                    return this.pwd2_errTopLabel = '须含字母和数字6-16个字符，支持特殊符号'
                } else if (this.pwd !== this.pwd2) {
                    return this.pwd2_errTopLabel = '两次输入密码不一致'
                } else {
                    this.pwd2_errTopLabel = ''
                }
            }
        },
        components: {
            mtField
        }
  }
</script>


<style scoped lang="scss">
@import "~@sass/_variables";
@import "~@sass/_func";

#ResetPwd {
    background-color:#fff
}

.form {
    margin: pxToRem(100px) pxToRem(30px);
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
