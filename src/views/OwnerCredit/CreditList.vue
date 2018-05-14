<template>
  <div class="auth-module">
    <div class="auth-topic">完善以下资料，轻松借款</div>
    <div class="auth-list">
      <div class="auth-item" v-for="item in creditList" :key="item.type" @click="openAuthItem(item)">
        <div class="auth-item-lf">
          <div class="auth-icon">{{item.icon}}</div>
          <div class="auth-title">
            <div class="at-type">{{item.type}}</div>
            <div class="at-desc">{{item.desc}}</div>
          </div>
        </div>
        <div class="auth-item-rt">
          <div class="ar-state-btn">{{item.state}}</div>
          <div class="ar-more">&gt;</div>
        </div>
      </div>
    </div>
    <div class="auth-checkbox">
      <checkbox v-bind:checked="checked" v-on:onChange="signChange">
        <div class="ac-contract" slot="label">
          我同意签约<router-link class="credit-contract" to="/RegProtocol">《授信合同》</router-link>
        </div>
      </checkbox>
    </div>
    <button class="auth-submit-btn" :class="globleAuthState == null ? 'asb-disabled':''" :disabled="globleAuthState == null">提交申请</button>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import checkbox from '@/myComponents/checkbox'
import Toast    from '@components/toast/index.js'

export default {
  data () {
    return {
      creditList:[
        {
          icon:'icon1',
          type:'实名认证',
          path:'/RealnameAuth',
          state:'未提交',
          desc:'大约耗时2分钟'
        },
        {
          icon:'icon2',
          type:'肖像认证',
          path:'/PortraitAuth',
          state:'未提交',
          desc:'大约耗时2分钟'
        },
        {
          icon:'icon3',
          type:'基本资料',
          path:'/BaseIno',
          state:'未提交',
          desc:'大约耗时2分钟'
        },
        {
          icon:'icon4',
          type:'手机认证',
          path:'/MobileAuth',
          state:'未提交',
          desc:'大约耗时2分钟'
        },
        {
          icon:'icon5',
          type:'淘宝授权',
          path:'/TaobaoAuth',
          state:'未提交',
          desc:'大约耗时2分钟'
        },
        {
          icon:'icon6',
          type:'绑定银行卡',
          path:'/BindBankCard',
          state:'未提交',
          desc:'大约耗时2分钟'
        }
      ],
      checked:false,
    }
  },
  components:{
    checkbox:checkbox,
  },
  computed:{
    ...mapGetters({
      globleAuthState: 'globleAuthState'
    }),
  },
  methods:{
    openAuthItem (item) {
      if(item.type !== '实名认证'){
       if(this.globleAuthState == null) {
         Toast('请先实名验证')
       }else{
         this.$router.push(item.path)
       }
      }else{
        this.$router.push(item.path)
      }
    },
    signChange (val) {
      //console.log(val)
      this.checked = val
    }
  },
  created () {
    console.log(this.$store)
    //进入页面之后发请求，获取授信列表及授信项对应的状态
    // this.xdapi.loginCheck({
    //     userName: this.user,  // 账号
    //     pwd: this.pwd,        // 密码
    //   }, true).then( _ => {
    //     console.log(_)
    // }) 

  }
}
</script>

<style lang="scss" scoped>
@import "~@sass/_variables";
@import "~@sass/_func";
.auth-module{
  background-color: #fff;
  height: 100%;
  color:#333;
  line-height: 1.6;
  .auth-topic{
    background: #fff;
    padding:0 pxToRem(30px);
    border-bottom: 1px solid #999;
    @include f32;
    line-height: 2;
    color:#666;
  }
  .auth-list{
    .auth-item{
      padding:pxToRem(30px);
      border-bottom:1px solid #ccc;
      background: #fff;
      @include flex('b','center');
      @include f28;
      .auth-item-lf{
        @include flex(false,'center');
        .auth-icon{
          @include size(80px,80px);
          background-color:yellowgreen;
          color:#fff;
          margin-right: pxToRem(15px);
        }
        .at-desc{
          color:#666;
        }
      }
      .auth-item-rt{
        @include flex(false,'center');
        .ar-state-btn{
          @include size(100px,40px);
          border-radius: pxToRem(20px);
          background: #ccc;
          text-align: center;
          line-height: pxToRem(40px);
          margin-right: pxToRem(10px);
          @include f24;
        }
      }
    }
  }
  .auth-checkbox{
    @include f32;
    padding:pxToRem(30px);
    .ac-checkbox{
      position: relative;
      .checkbox-checked{
        @include f28;
        font-style:normal;
        display:block;
        @include size(48px,48px);
        text-align:center;
        line-height:pxToRem(48px);
        color:#fff;
        vertical-align:middle;
        border:#2489c5 pxToRem(1px) solid;
      }
      .checkbox{
        @include size(48px,48px);
        position: absolute;
        top: 0;
        left: 0;
        opacity: 0;
      }
      .checkbox:checked + .checkbox-checked{
        background:#2489c5;
      }
      .checkbox:disabled + .checkbox-checked{
        border-color:#ccc;
      }
    }
    .credit-contract{
      color:#0058ff;
    }
  }
  .auth-submit-btn{
    margin: pxToRem(20px) auto;
    width: 90%;
    height: pxToRem(80px);;
    line-height: pxToRem(80px);
    background: #57a9ef;
    text-align: center;
    @include f32;
    color: #fff;
    border-radius: pxToRem(6px);
    display: block;
    border: none;
  }
  .asb-disabled{
    background: #ccc;
  }
}

</style>
