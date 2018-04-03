<template>
<div id="identity">
    <div class="identity">
        <!-- Common Header -->
        <label class="identity__label">客户类型</label>
        <div class="identity__type">
            <mt-radio v-model="value" :options="['个人', '企业', '其他组织']"></mt-radio>
        </div>

        <!-- 企业 / 其他组织 -->
        <div v-if="value === '企业' || value === '其他组织'">
            <label class="identity__label">是否三证合一</label>
            <div class="identity__type">
                <mt-radio v-model="value2" :options="['是', '否']"></mt-radio>
            </div>
        </div>

        <label class="identity__label">客户资料</label>
        <div class="identity__form">
            <mt-field type = "number" :placeholder = 'id_placeholder'     v-model = 'id'       :maxlength = '18'></mt-field>
            <mt-field type = "number" :placeholder = 'phone_placeholder'  v-model = 'phone'    :maxlength = '11'></mt-field>
            <mt-field type = "number"  placeholder = '请输入6位验证码'    v-model = 'validate' :maxlength = '6' :clearText='false'>
                <getvalidate slot="icon" @click="getCode"></getvalidate>
            </mt-field>
        </div>

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
        value2: '是',
        id: '',
        phone: this.$store.state.phone || '',
        validate: '',
        id_placeholder: '请输入身份证号',
        phone_placeholder: '请输入银行卡预留手机号码',
    }
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
    }
  },
  methods: {
    go () {

    },
    getCode (cb) {
        if (this.phone.trim() === '') {
            return Toast('请先输入用户名/手机号')
        } else if (!/^1\d{10}$/.test(this.phone.trim())) {
            return Toast('手机号码格式错误，请重新确认')
        }
        
        Loader.show("正在获取验证码")
        this.xdapi.smsSend({
                telNo: this.phone,
                type: '3'  
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
  components: {
    mtRadio,
    mtField,
    getvalidate,
    mtButton
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