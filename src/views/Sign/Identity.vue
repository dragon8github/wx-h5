<template>
<div id="identity">
    <div class="banner">
          <el-steps :active="activeStep" align-center>
              <el-step title="身份确认">
                  <i class="myicon one"  :class="{active: activeStep >= 0}"  slot="icon"></i>
              </el-step>
              <el-step title="合同确认">
                  <i class="myicon two"   :class="{active: activeStep >= 1}" slot="icon"></i>
              </el-step>
              <el-step title="合同签名">
                  <i class="myicon three"  :class="{active: activeStep >= 2}" slot="icon"></i>
              </el-step>
              <el-step title="完成确认">
                  <i class="myicon four"   :class="{active: activeStep >= 3}" slot="icon"></i>
              </el-step>
          </el-steps>
    </div>

    <div class="identity">
        <!-- 客户类型 -->
        <label class="identity__label">客户类型</label>
        <div class="identity__type">
            <mt-radio v-model="value" :options="[{label: '个人', value: '1'}, {label: '企业', value: '2'}, {label: '其他组织', value: '3'}]"></mt-radio>
        </div>
        <!-- 表单 -->
        <label class="identity__label">客户资料</label>
        <div class="identity__form">
            <mt-field type = "text"    placeholder = '请输入企业名称'             v-model = 'enterpriseName'  :maxlength = '50' v-if="value == '2' || value == '3'"></mt-field>
            <mt-field type = "text"    placeholder = '请输入统一社会信用代码'      v-model = 'unifiedCode'     :maxlength = '50' v-if="value == '2' || value == '3'"></mt-field>
            <mt-field type = "text"   :placeholder = 'customerName_placeholder'  v-model = 'customerName'    :maxlength = '18'></mt-field>
            <mt-field type = "text"   :placeholder = 'id_placeholder'            v-model = 'id'              :maxlength = '18'></mt-field>
            <mt-field type = "number" :placeholder = 'phone_placeholder'         v-model = 'phone'           :maxlength = '11'></mt-field>
            <mt-field type = "number"  placeholder = '请输入6位验证码'            v-model = 'validate'        :maxlength = '6' :clearText='false'>
                <getvalidate slot="icon" @click="getCode"></getvalidate>
            </mt-field>
        </div>

        <!-- 勾选协议 -->
        <div class="agreement" v-if="(customerName && id && value == 1) || ((value == 2 || value == 3) && enterpriseName && unifiedCode)">
            <input type="checkbox" id="agreement" v-model="agreement">
            <label>我已授权并同意签署 <a @click.stop="goUserProtocol">《e签宝用户协议》</a>、<a @click.stop="goServiceAgreement">《数字证书服务协议》</a> 同意注册e签宝用户并使用电子签名等服务。</label>
        </div>

        <!-- 提交按钮 -->
        <div class="identity__sublime">
            <mt-button :text="'确认'" @click="go" :disable="!agreement"></mt-button>
        </div>
    </div>

</div>
</template>

<script>
import mtRadio     from '@components/radio2'
import mtField     from '@components/field/field.vue'
import mtButton    from '@myComponents/button.vue'
import getvalidate from '@myComponents/getvalidate'
import Toast       from '@components/toast/index.js'
import Loader      from '@components/loader/index.js'
import elSteps     from '@components/steps/src/steps.vue'
import elStep      from '@components/steps/src/step.vue'
export default {
  name: 'Identity',
  data () {
    return {
        activeStep: 0,
        customerName: this.env('万傲旋'),     //  杨石雄
        id: this.env('130184197103281946'),  //  441882199301206013
        phone: this.env('15999795945'),      //  13717381378
        enterpriseName: this.env('梁愿华'),
        agreement: true,
        value: '1',
        unifiedCode: '321315345553213123',
        validate: '',
        id_placeholder: '请输入证件号码',
        phone_placeholder: '请输入银行卡预留手机号码',
        core_placeholder: '请输入统一社会信用代码',
        customerName_placeholder: '请输入客户名称'
    }
  },
  components: {
    mtRadio,
    mtField,
    getvalidate,
    mtButton,
    elSteps, 
    elStep,
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
    isCompany () {
        return this.value === '2' || this.value === '3'
    },
    go () {
        this.id = this.id.trim()
        this.phone = this.phone.trim()
        this.unifiedCode = this.unifiedCode.trim()
        this.validate = this.validate.trim()
        this.customerName = this.customerName.trim()

        if (this.isCompany()) {
            // 验证统一社会信用代码
           if (this.unifiedCode.length == 0) {
              return Toast('请输入社会信用编码')
           }
           if (!this.validateCode1(this.unifiedCode)) {
              return Toast('不是有效的社会信用编码！')
           }
           // 验证企业名
           if (this.enterpriseName.length == 0) {
              return Toast('请输入企业名')
           } else if (this.customerName.length < 2 || this.customerName.length > 50) {
              return Toast('企业名名必须大于2位')
           }
        }

        // 验证客户名和法人名
        if (this.customerName.length == 0) {
            return Toast(this.customerName_placeholder)
        } else if (this.customerName.length < 2 || this.customerName.length > 18) {
           if (this.isCompany()) {
              return Toast('法人名必须大于2位')
           }
           return Toast('客户名称必须大于2位')
        }


         // 验证身份证号
         if (this.id.trim() === '') {
             return Toast(this.id_placeholder)
         } else if (!/.{8,18}/.test(this.id.trim())) {
             if (this.isCompany()) {
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
            'unifiedCode':      this.unifiedCode,
            "customerName":     this.customerName,
            "phone":            this.phone,
            "userType":         this.value,
            "verifiCode":       this.validate,
            "enterpriseName":   this.enterpriseName
        }).then(data=>{
            if (data.returnCode == 0) {
                // 记录用户的身份证或者企业统一社会信用号,主要用作埋点的时候需要
                if (this.isCompany()) {
                  this.$store.buriedPointCertificateNo = this.unifiedCode
                } else {
                  this.$store.buriedPointCertificateNo = this.id
                }
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
    goUserProtocol () {
        this.$router.push('/UserProtocol')
    },
    goServiceAgreement () {
        this.xdapi.buriedPoint({buriedPointType: '数字证书服务协议', data: JSON.stringify({
            "cardNo":           this.id,
            'unifiedCode':      this.unifiedCode,
            "customerName":     this.customerName,
            "phone":            this.phone,
            "userType":         this.value,
            "verifiCode":       this.validate
        })}, true);
        this.$router.push('/ServiceAgreement')
    },
    getCode (cb) {
        this.id = this.id.trim()
        this.phone = this.phone.trim()
        this.unifiedCode = this.unifiedCode.trim()
        this.validate = this.validate.trim()

        // 个人需要验证：身份证，手机号码
        if (this.isCompany()) {
            // 验证企业名
            if (this.enterpriseName.length == 0) {
               return Toast('请输入企业名称')
            } else if (this.enterpriseName.length < 2 || this.enterpriseName.length > 50) {
               return Toast('企业名称必须大于等于2位')
            }

            if (this.unifiedCode.length == 0) {
               return Toast('请输入社会信用编码')
            }

            if (!this.validateCode1(this.unifiedCode)) {
               return Toast('不是有效的社会信用编码！')
            }
        }

        // 验证客户名和法人名
        if (this.customerName.length == 0) {
            return Toast(this.customerName_placeholder)
        } else if (this.customerName.length < 2 || this.customerName.length > 18) {
           if (this.isCompany()) {
              return Toast('法人名必须大于2位')
           }
           return Toast('客户名称必须大于2位')
        }

        // 验证身份证号
        if (this.id.trim() === '') {
            return Toast(this.id_placeholder)
        } else if (!/.{8,18}/.test(this.id.trim())) {
            if (this.isCompany()) {
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
            'unifiedCode':      this.unifiedCode,
            "phone":            this.phone,
            "userType":         this.value,
            "customerName":     this.customerName,
            "enterpriseName":   this.enterpriseName
        }).then(data => {
            Loader.hideAll();
            if (data.returnCode == 0) {
                if (process.env.NODE_ENV === 'development') this.validate = data.code
                Toast("验证码已发送，请注意查收。")
                cb()
            } else {
                Toast(data.msg || '验证码发送失败，请稍后重试');
            }
        })
    },
  },
  watch: {
    // 主要用作《数字证书服务协议》要展示的参数身份证
    id (v) {
        this.$store.state.serviceagreement_id = v
    },
    // 主要用作《数字证书服务协议》要展示的甲方参数客户名
    customerName (v) {
        this.$store.state.serviceagreement_name = v
    },
    // 主要用作《数字证书服务协议》要展示的甲方参数企业名称
    enterpriseName (v) {
        this.$store.state.serviceagreement_companyname = v
    },
    // 主要用作《数字证书服务协议》要展示的甲方参数统一社会信用代码
    unifiedCode (v) {
        this.$store.state.serviceagreement_unifiedcode = v
    },
    value (newValue, oldValue) {
       this.$store.state.serviceagreement_type = newValue
       if (newValue === '1') {
           this.id_placeholder = '请输入证件号码'
           this.phone_placeholder = '请输入银行卡预留手机号码'
           this.customerName_placeholder = '请输入客户名称'
       } else if (newValue === '2' || newValue === '3') {
           this.customerName_placeholder = '请输入法人名称'
           this.id_placeholder = '请输入法人证件号码'
           this.phone_placeholder = '请输入手机号码'
       }
   }
  },
  beforeMount () {
      
  },
  activated () {
    // 为什么我要调这个接口？
    // 没为什么，仅仅是因为需求要判断这里如果未登录，要提示登录。其实你可以选任何一个非常快速的接口。
    // 这是测试逼我的才想出来的绝招！
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
        margin: pxToRem(30px);
    }

    .agreement {
        font-size: pxToRem(26px);
        line-height: pxToRem(45px);
        margin: pxToRem(30px);

        input {
            width: pxToRem(30px);
            height: pxToRem(30px);
            margin-right: pxToRem(10px);
        }

        a {
            color: #0e6ae7;
        }
    }
}

</style>