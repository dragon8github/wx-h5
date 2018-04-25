<template>
  <div class="pwd-wrap">
    <div class="pwd-value">
      <div class="pwd-image">
        <img src="../../assets/ok_img2.png" alt="">
      </div>
      <p class="pwd-desc">请设置数字支付密码</p>
      <div class="pwd-number" @click="popPwdLayout">
        <input type="password" disabled class="pn-item" :value="pwdList[0]">
        <input type="password" disabled class="pn-item" :value="pwdList[1]">
        <input type="password" disabled class="pn-item" :value="pwdList[2]">
        <input type="password" disabled class="pn-item" :value="pwdList[3]">
        <input type="password" disabled class="pn-item" :value="pwdList[4]">
        <input type="password" disabled class="pn-item" :value="pwdList[5]">
      </div>
    </div>
    <div class="pwd-import" v-show="show">
      <div class="pi-item" v-for="(item,index) in pwdImportList" :key="index" @click="importPwd(item)">
        {{(item == 10 || item == 11) ? '': item}}
        <span v-if="item == 10" class="no-click"></span>
        <span v-if="item == 11" class="no-click pi-delete">del</span>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  @import "~@sass/_variables";
  @import "~@sass/_func";
  .pwd-wrap{
    .pwd-value{
      padding:pxToRem(10px);
      .pwd-image{
        width:pxToRem(160px);
        height:pxToRem(160px);
        margin:0 auto;
        img{
          max-width: 100%;
          height: auto;
        }
      }
      .pwd-desc{
        text-align: center;
        font-size: pxToRem(32px);
        color:#333;
      }
      .pwd-number{
        width: pxToRem(610px);
        @include flex(c,c);
        margin:0 auto;
        border:1px solid #c3c3c3;
        .pn-item{
          @include size(100px, 100px);
          outline: none;
          line-height: pxToRem(100px);
          text-align: center;
          font-size:pxToRem(40px);
          color:#000;
          border:none;
          border-right:pxToRem(2px) solid #ccc;
          background: #fff;
          border-radius: 0;
          -webkit-appearance: none;
        }
        .pn-item:last-child{
          border-right:none;
        }
      }
    }
    .pwd-import{
      @include flex(b, c);      
      flex-wrap: wrap;
      background: #fff;
      position: absolute;
      bottom:0;
      left:0;
      right:0;
      z-index: 1000;
      .pi-item{
        width: 33.333%;
        text-align: center;
        border-right: pxToRem(1px) solid #ccc;
        border-bottom: pxToRem(1px) solid #ccc;
        height: pxToRem(120px);
        line-height: pxToRem(120px);
        font-size:pxToRem(50px);
        color:#333;
        .no-click{
          background: #ccc;
          display: block;
          height: 100%;
        }
      }
      .pi-item:nth-child(3n){
        border-right:0;
      }
    }
  }

</style>

<script>
  export default {
    name:'pwd',
    props:{
      callback:{
        type:Function,
      }
    },
    data () {
      return {
        pwdList:[],
        pwdImportList:[1,2,3,4,5,6,7,8,9,10,0,11],
        show:false
      }
    },
    methods:{
      popPwdLayout () {
        this.show = !this.show
      },
      importPwd (item) {
        //alert(item)
        //当item为11，则为删除
        if(item == 11){
          if(this.pwdList.length <= 0){
            return
          }else{
            this.pwdList.splice((this.pwdList.length - 1),1)
          }
        }

        //当item为no-click时
        if(item == 10){
            return
        }

        //item为数字键盘时
        if(item != 10 && item != 11){
          this.pwdList.push(item)
          var len = this.pwdList.length;
          if(len >= 6){
            let cbData = this.pwdList.slice(0,6)
            this.show = false
            //密码输入完毕执行的回调
            //this.callback(cbData)
            return
          }
        }
      }
    }
  }
</script>