<template>
<div id="identity">
    <div class="identity">
        <!-- 客户类型 -->
        <label class="identity__label">客户类型</label>
        <div class="identity__type">
            <mt-radio v-model="value" :options="[{label: '个人', value: '1'}, {label: '企业', value: '2'}, {label: '其他组织', value: '3'}]"></mt-radio>
        </div>

        <!-- 企业 / 其他组织 -->
        <div v-if="value === '2' || value === '3'">
            <label class="identity__label">是否三证合一</label>
            <div class="identity__type">
                <mt-radio v-model="value2" :options="[{label: '是', value: '0'}, {label:'否', value: '1'}]"></mt-radio>
            </div>
        </div>

        <!-- 表单 -->
        <label class="identity__label">客户资料</label>
        <div class="identity__form">
            <mt-field type = "text"   :placeholder = 'core_placeholder'  v-model = 'unifiedCode'       :maxlength = '50' v-if = "value2 == '0' && (value == '2' || value == '3')"></mt-field>
            <mt-field type = "text"   :placeholder = 'core_placeholder'  v-model = 'businessLicence' :maxlength = '50' v-if = "value2 == '1' && (value == '2' || value == '3')"></mt-field>
            <mt-field type = "text"   :placeholder = 'id_placeholder'    v-model = 'id'               :maxlength = '18'></mt-field>
            <mt-field type = "number" :placeholder = 'phone_placeholder' v-model = 'phone'            :maxlength = '11'></mt-field>
            <mt-field type = "number"  placeholder = '请输入6位验证码'   v-model = 'validate'         :maxlength = '6' :clearText='false'>
                <getvalidate slot="icon" @click="getCode"></getvalidate>
            </mt-field>
        </div>

        <!-- 提交按钮 -->
        <div class="identity__sublime">
            <mt-button :text="'确认'"  @click="go"></mt-button>
        </div>
    </div>
</div>
</template>

<script>
import mtRadio      from '@components/radio2'
import mtField      from '@components/field/field.vue'
import mtButton     from '@myComponents/button.vue'
import getvalidate  from '@myComponents/getvalidate'
import Toast        from '@components/toast/index.js'
import Loader       from '@components/loader/index.js'

export default {
  name: 'Identity',
  data () {
    return {
        value: '1',
        value2: '0',
        id: '',  //320405197409243789  432502199010131489    372900197507262541 440881198802013214  372900197507262541
        phone: '',// 15999795945 13821262349  15999795594 15876366685 15999795594
        unifiedCode: '',     // 社会信用代码
        businessLicence: '', // 营业执照编码
        validate: '',
        id_placeholder: '请输入证件号码',
        phone_placeholder: '请输入银行卡预留手机号码',
        core_placeholder: '请输入统一社会信用代码'
    }
  },
  components: {
    mtRadio,
    mtField,
    getvalidate,
    mtButton
  },
  methods: {
    // 验证统一社会信用
    validateCode1 (Code) {
        //18位校验及大写校验  
        if (Code.length != 18) {  
          return false;  
        }
        return true;  
    },
    go () {
        this.id = this.id.trim()
        this.phone = this.phone.trim()
        this.unifiedCode = this.unifiedCode.trim()
        this.businessLicence = this.businessLicence.trim()
        this.validate = this.validate.trim()

        // 个人需要验证：身份证，手机号码
         if (this.value === '2' || this.value === '3') {
             // 验证统一社会信用代码
             if (this.value2 == 0) {
                if (this.unifiedCode.length == 0) {
                   return Toast('请输入社会信用编码')
                }
                if (!this.validateCode1(this.unifiedCode)) {
                   return Toast('不是有效的社会信用编码！')
                }
             // 营业执照编号
             } else if (this.value2 == 1) {
                 if (this.businessLicence.length == 0) {
                    return Toast('请输入营业执照编号')
                 }
                 if (this.businessLicence.length != 15) {
                    return Toast('不是有效的营业执照')
                 }
             }
         }

         // 验证身份证号
         if (this.id.trim() === '') {
             return Toast(this.id_placeholder)
         } else if (!/.{8,18}/.test(this.id.trim())) {
             if (this.value === '2' || this.value === '3') {
                return Toast('请输入正确的法人证件号码')
             }
             return Toast('请输入正确的证件号码')
         }

         // 验证手机号码
         if (this.phone.trim() === '') {
             return Toast(this.phone_placeholder)
         } else if (!/^1\d{10}$/.test(this.phone.trim())) {
             return Toast('请输入正确的手机号码')
         }


         // 验证码
         if (this.validate.trim().length === 0) {
             return Toast('请输入验证码');
         } else if (!/^[0-9]{6}$/.test(this.validate)) {
             return Toast('验证码格式不正确');
         }

        this.xdapi.identityConfirm({
            "cardNo":           this.id,
            "creditCode":       this.core,
            "isUnit":           this.value2,
            'unifiedCode':      this.unifiedCode,
            'businessLicence':  this.businessLicence,
            "phone":            this.phone,
            "userType":         this.value,
            "verifiCode":       this.validate
        }).then(data=>{
            if (data.returnCode == 0) {
                // 记录用户的身份验证状态，下一次就不需要登录了
                this.$store.dispatch('set_signToken', true).then(_=>{
                    window.localStorage.setItem('signToken', true);
                    this.$router.push('sign');
                })
            } else {
                Toast(data.msg || '身份验证失败，请稍后重试');
            }
        })

    },
    getCode (cb) {
        this.id = this.id.trim()
        this.phone = this.phone.trim()
        this.unifiedCode = this.unifiedCode.trim()
        this.businessLicence = this.businessLicence.trim()
        this.validate = this.validate.trim()

        // 个人需要验证：身份证，手机号码
         if (this.value === '2' || this.value === '3') {
             // 验证统一社会信用代码
             if (this.value2 == 0) {
                if (this.unifiedCode.length == 0) {
                   return Toast('请输入社会信用编码')
                }
                if (!this.validateCode1(this.unifiedCode)) {
                   return Toast('不是有效的社会信用编码！')
                }
             // 营业执照编号
             } else if (this.value2 == 1) {
                 if (this.businessLicence.length == 0) {
                    return Toast('请输入营业执照编号')
                 }
                 if (this.businessLicence.length != 15) {
                    return Toast('不是有效的营业执照')
                 }
             }
         }

         // 验证身份证号
         if (this.id.trim() === '') {
             return Toast(this.id_placeholder)
         } else if (!/.{8,18}/.test(this.id.trim())) {
             if (this.value === '2' || this.value === '3') {
                return Toast('请输入正确的法人证件号码')
             }
             return Toast('请输入正确的证件号码')
         }

         // 验证手机号码
         if (this.phone.trim() === '') {
             return Toast(this.phone_placeholder)
         } else if (!/^1\d{10}$/.test(this.phone.trim())) {
             return Toast('请输入正确的手机号码')
         }
        
        Loader.show("正在获取验证码")

        this.xdapi.sendSmsCode({
            "cardNo":           this.id,
            "creditCode":       this.core,
            "isUnit":           this.value2,
            'unifiedCode':       this.unifiedCode,
            'businessLicence': this.businessLicence,
            "phone":            this.phone,
            "userType":         this.value,
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
  },
  watch: {
    value (newValue, oldValue) {
        if (newValue === '0') {
            this.id_placeholder = '请输入证件号码'
            this.phone_placeholder = '请输入银行卡预留手机号码'
        } else if (newValue === '2' || newValue === '3') {
            this.id_placeholder = '请输入法人证件号码'
            this.phone_placeholder = '请输入手机号码'
        }
    },
    value2 (newValue, oldValue) {
        if (newValue == '0') {
            this.core_placeholder = '请输入社会信用代码'
        } else if (newValue == '1') {
            this.core_placeholder = '请输入营业执照编号'
        }
    }
  },
  beforeMount () {

  },
  activated () {
    // 为什么我要调这个接口？没为什么，仅仅是因为需求要判断这里如果未登录，要提示登录。其实你可以选任何一个非常快速的接口。
    this.xdapi.contractList({}, true)
  }
}
</script>

<style lang="scss">
@import "~@sass/_variables";
@import "~@sass/_func";

#identity {
    .identity__label {
        color: #222222;
        font-size: pxToRem(28px);
        height: pxToRem(88px);
        line-height: pxToRem(88px);
        padding-left: pxToRem(30px);
        display: block;
    }

    .mint-cell-wrapper {
        margin: 0;
    }

    .identity__type {
        background: #fff;
    }

    .identity__form {
        background: #fff;
        padding:0 pxToRem(30px);
    }

    .identity__sublime {
        margin: pxToRem(60px) pxToRem(30px);
    }
}

</style>