<template>
    <div class="identity">
        <label class="identity__label">客户类型</label>
        <div class="identity__type">
            <mt-radio v-model="value" :options="['个人', '企业', '其他组织']"></mt-radio>
        </div>
        <label class="identity__label">客户资料</label>
        <div class="identity__form">
            <mt-field topLabel = '身份证号' type = "number" placeholder = '请输入身份证号' v-model = 'id' :maxlength = '18'></mt-field>
            <mt-field topLabel = '请输入银行卡预留手机号码' type = "number"   placeholder = '请输入手机号'   v-model = 'phone' :maxlength = '11'></mt-field>
            <mt-field topLabel = '验证码'  type = "number"  placeholder = '请输入6位验证码'  v-model = 'validate' :maxlength = '6' :clearText='false'>
                <getvalidate slot="icon" @click="getCode"></getvalidate>
            </mt-field>
        </div>
        <mt-button :text="'确认'" :disable = "user == '' || pwd == ''" @click="go"></mt-button>

    </div>
</template>

<script>
import mtRadio      from '@components/radio2'
import mtField      from '@components/field/field.vue'
import mtButton     from '@myComponents/button.vue'
import getvalidate  from '@myComponents/getvalidate'

export default {
  name: 'Identity',
  data () {
    return {
        value: '个人',
        id: '',
        phone: '',
        validate: ''
    }
  },
  methods: {
    getCode (cb) {
        // if (this.user.trim() === '') {
        //     return Toast('请先输入用户名/手机号')
        // } else if (!/^1\d{10}$/.test(this.user.trim())) {
        //     return Toast('手机号码格式错误，请重新确认')
        // }
        
        // Loader.show("正在获取验证码")
        // this.xdapi.smsSend({
        //         telNo: this.user,
        //         type: '1'  
        // }).then(data => {
        //     Loader.hideAll();
        //     if (data.returnCode == 0) {
        //         Toast("验证码已发送，请注意查收。")
        //         cb()
        //     } else {
        //         Toast(data.msg || '验证码发送失败，请稍后重试');
        //     }
        // })
    },
  },
  components: {
    mtRadio,
    mtField,
    getvalidate,
    mtButton
  }
}
</script>

<style lang="scss" scoped>
@import "~@sass/_variables";
@import "~@sass/_func";

</style>