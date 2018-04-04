<template>
<div id="identity">
    <div class="identity">
        <!-- 客户类型 -->
        <label class="identity__label">客户类型</label>
        <div class="identity__type">
            <mt-radio v-model="value" :options="['个人', '企业', '其他组织']"></mt-radio>
        </div>

        <!-- 企业 / 其他组织 -->
        <div v-if="value === '企业' || value === '其他组织'">
            <label class="identity__label">是否三证合一</label>
            <div class="identity__type">
                <mt-radio v-model="value2" :options="[{label: '是', value: '0'}, {label:'否', value: 1}]"></mt-radio>
            </div>
        </div>

        <!-- 表单 -->
        <label class="identity__label">客户资料</label>
        <div class="identity__form">
            <mt-field type = "number" :placeholder = 'core_placeholder'   v-model = 'core'     :maxlength = '18' v-if = "value === '企业' || value === '其他组织'"></mt-field>
            <mt-field type = "number" :placeholder = 'id_placeholder'     v-model = 'id'       :maxlength = '18'></mt-field>
            <mt-field type = "number" :placeholder = 'phone_placeholder'  v-model = 'phone'    :maxlength = '11'></mt-field>
            <mt-field type = "number"  placeholder = '请输入6位验证码'    v-model = 'validate' :maxlength = '6' :clearText='false'>
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
        value: '个人',
        value2: '0',
        id: '',
        creditCode: '',
        core: '',
        phone: this.$store.state.phone || '',
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
    validateCode2 (code) {
       var tip = "OK";
       var pass= true;

       if(code.length != 18){
           tip = "社会信用代码长度错误！";
           pass = false;
       }
       var reg = /^([159Y]{1})([1239]{1})([0-9]{6})([0-9ABCDEFGHJKLMNPQRTUWXY]{9})([0-9ABCDEFGHJKLMNPQRTUWXY]{1})$/;
       if(!reg.test(code)){
           tip = "社会信用代码校验错误！";
           pass = false;
       }
       //不用I、O、S、V、Z
       var str = '0123456789ABCDEFGHJKLMNPQRTUWXY';
       var ws =[1,3,9,27,19,26,16,17,20,29,25,13,8,24,10,30,28];

       var codes  = new Array();
       var sum = 0;
       codes[0] = code.substr(0,code.length-1);
       codes[1] = code.substr(code.length-1,code.length);

       for(var i=0;i<codes[0].length;i++){
           var Ancode = codes[0].charAt(i);
           var Ancodevalue = str.indexOf(Ancode);
           sum += Ancodevalue * ws[i];
       }
       var indexOfc18 = 31 - (sum % 31);
       var c18 = str.charAt(indexOfc18);
       if(c18 != codes[1]){
           tip = "社会信用代码有误！";
           pass = false;
       }

       return {'errCode':pass, 'errMsg':tip};
    },
    // 验证统一社会信用
    validateCode1 () {
        function CheckSocialCreditCode(Code) {  
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
        　}  
    },
    go () {
        // 个人需要验证：身份证，手机号码
        if (this.value === '企业' || this.value === '其他组织') {
            // 验证统一社会信用代码
            if (this.value2 == 0) {
                if (!this.validateCode1(this.creditCode)) {
                    return Toast('不是有效的统一社会信用编码！')
                }
            // 营业执照编号
            } else if (this.value2 == 1) {
                var v = this.validateCode2(this.creditCode);
                if (!(v.errCode)) {
                    return Toast(v.errMsg)
                }
            }
        }

        // 验证身份证号
        if (this.id.trim() === '') {
            return Toast(this.id_placeholder)
        } else if (!/(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test(this.id.trim())) {
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
          "cardNo":     this.id,
          "creditCode": this.core,
          "isUnit":     this.value2,
          "phone":      this.phone,
          "userType":   this.value,
          "verifiCode": this.validate
        }).then(data=>{
            if (data.returnCode == 0) {
                // TODO：记录用户的身份验证状态，下一次就不需要登录了
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
        if (this.phone.trim() === '') {
            return Toast('请先输入用户名/手机号')
        } else if (!/^1\d{10}$/.test(this.phone.trim())) {
            return Toast('手机号码格式错误，请重新确认')
        }
        
        Loader.show("正在获取验证码")
        this.xdapi.sendSmsCode({
            phone: this.phone,
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
        if (newValue === '个人') {
            this.id_placeholder = '请输入身份证号'
            this.phone_placeholder = '请输入银行卡预留手机号码'
        } else if (newValue === '企业' || newValue === '其他组织') {
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