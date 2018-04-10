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
            <mt-field type = "text"   :placeholder = 'core_placeholder'  v-model = 'unifedCode'       :maxlength = '50' v-if = "value2 == '0' && (value == '2' || value == '3')"></mt-field>
            <mt-field type = "text"   :placeholder = 'core_placeholder'  v-model = 'businessLincence' :maxlength = '50' v-if = "value2 == '1' && (value == '2' || value == '3')"></mt-field>
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
        id: '372900197507262541',  // 440881198802013214  372900197507262541
        phone: '15999795594',// 15876366685 15999795594
        unifedCode: '',       // 社会信用代码
        businessLincence: '', // 营业执照编码
        validate: '',
        id_placeholder: '请输入身份证号',
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
       var patrn = /^[0-9A-Z]+$/;  
         //18位校验及大写校验  
         if ((Code.length != 18) || (patrn.test(Code) == false)) {  
           console.info("不是有效的统一社会信用编码！");  
           return false;  
         }  
         else {  
           var Ancode;//统一社会信用代码的每一个值  
           var Ancodevalue;//统一社会信用代码每一个值的权重   
           var total = 0;  
           var weightedfactors = [1, 3, 9, 27, 19, 26, 16, 17, 20, 29, 25, 13, 8, 24, 10, 30, 28];//加权因子   
           var str = '0123456789ABCDEFGHJKLMNPQRTUWXY';  
           //不用I、O、S、V、Z   
           for (var i = 0; i < Code.length - 1; i++) {  
             Ancode = Code.substring(i, i + 1);  
             Ancodevalue = str.indexOf(Ancode);  
             total = total + Ancodevalue * weightedfactors[i];  
             //权重与加权因子相乘之和   
           }  
           var logiccheckcode = 31 - total % 31;  
           if (logiccheckcode == 31) {  
             logiccheckcode = 0;  
           }  
           var Str = "0,1,2,3,4,5,6,7,8,9,A,B,C,D,E,F,G,H,J,K,L,M,N,P,Q,R,T,U,W,X,Y";  
           var Array_Str = Str.split(',');  
           logiccheckcode = Array_Str[logiccheckcode];  
         
           var checkcode = Code.substring(17, 18);  
           if (logiccheckcode != checkcode) {  
             console.info("不是有效的统一社会信用编码！");  
             return false;  
           }else{  
             console.info("yes");  
           }  
           return true;  
         }    
    },
    go () {
        // 个人需要验证：身份证，手机号码
         if (this.value === '2' || this.value === '3') {
             // 验证统一社会信用代码
             if (this.value2 == 0) {
                 if (!this.validateCode1(this.creditCode)) {
                     return Toast('不是有效的统一社会信用编码！')
                 }
             // 营业执照编号
             } else if (this.value2 == 1) {
                 if (!/\d{15}|\d{18}/.test(this.creditCode)) {
                     return Toast('营业执照必须是15或18位纯数字')
                 }
             }
         }

         // 验证身份证号
         if (this.id.trim() === '') {
             return Toast(this.id_placeholder)
         } else if (!/.{8,18}/) {
             return Toast('请输入正确的身份证号')
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
            'unifedCode':       this.unifedCode,
            'businessLincence': this.businessLincence,
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
        // 个人需要验证：身份证，手机号码
         if (this.value === '2' || this.value === '3') {
             // 验证统一社会信用代码
             if (this.value2 == 0) {
                 if (!this.validateCode1(this.creditCode)) {
                     return Toast('不是有效的统一社会信用编码！')
                 }
             // 营业执照编号
             } else if (this.value2 == 1) {
                 if (!/\d{15}|\d{18}/.test(this.creditCode)) {
                     return Toast('营业执照必须是15或18位纯数字')
                 }
             }
         }

         // 验证身份证号
         if (this.id.trim() === '') {
             return Toast(this.id_placeholder)
         } else if (!/.{8,18}/) {
             return Toast('请输入正确的身份证号')
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
            'unifedCode':       this.unifedCode,
            'businessLincence': this.businessLincence,
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
            this.id_placeholder = '请输入身份证号'
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