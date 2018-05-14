<template>
  <div class="realname-wrap">
    <p class="realname-topic">资料仅用于审核，为保证通过率，请填写真实信息</p>
    <div class="card-front-wrap" @click="changeCardType(0)">
      <div class="card-front" v-if="frontCard.frontState == 0" @click="openActionsheet()">
        <img src="../../assets/BusinessInfo_4.png" />
        <p>上传身份证正面</p>
      </div>
      <div class="card-front" v-if="frontCard.frontState == 1" @click="openlayer()">
        <img :src="frontCard.frontImg" />
        <p>身份证正面</p>
      </div>
      <div class="card-front" v-if="frontCard.frontState == 2" @click="openActionsheet()">
        <img src="../../assets/BusinessInfo_4.png" />
        <p>重新上传</p>
      </div>
    </div>
    <div class="card-back-wrap" @click="changeCardType(1)">
      <div class="card-front" v-if="backCard.backState == 0" @click="openActionsheet()">
        <img src="../../assets/BusinessInfo_4.png" />
        <p>上传身份证反面</p>
      </div>
      <div class="card-front" v-if="backCard.backState == 1"  @click="openlayer()">
        <img src="../../assets/BusinessInfo_4.png" />
        <p>身份证反面</p>
      </div>
      <div class="card-front" v-if="backCard.backState == 2"  @click="openActionsheet()">
        <img src="../../assets/BusinessInfo_4.png" />
        <p>重新上传</p>
      </div>
    </div>
    <div class="realname-tip"><span class="rt-icon"></span>拍摄时确保光线充足，身份证全部放置于扫描框内</div>
    <div class="realname-tip"><span class="rt-icon"></span><router-link class="rt-mode" to="/RealnameMode">扫描不了？试试普通模式</router-link></div>
    <div class="card-back-info">
      <!-- <div class="bf-item">
        <pdf src="https://cdn.mozilla.net/pdfjs/tracemonkey.pdf"></pdf>
      </div> -->
    </div>
    <div class="rn-btn" @click="test">下一步</div>
    <mt-actionsheet
      :actions="actions"
      v-model="sheetVisible">
    </mt-actionsheet>
    <input type="file" style="display:none;" accept="image/*" ref="upload"  capture="camera" class="uploadInpt" @change="upload($event)" />
  </div>
</template>

<script>
import mtActionsheet from '@/components/actionsheet/actionsheet'
import mtField   from '@components/field/field.vue'
import msg from '@components/messagebox/messagebox.js'
import Utils from '@/methods'

export default {
  components:{
    mtActionsheet:mtActionsheet,
    mtField:mtField
  },
  data () {
    return {
      sheetVisible:false,
      actions:[
        {
          name:'拍照',
          method:this.takePhoto
        }
      ],
      frontCard:{
        frontState:1,
        frontImg:'https://m.360buyimg.com/mobilecms/s1280x853_jfs/t17086/254/1908902521/211004/6e68134b/5addc64bN9238e998.jpg!q70.jpg'
      },
      backCard:{
        backState:0,
        backImg:'https://m.360buyimg.com/mobilecms/s800x533_jfs/t19657/207/1809647164/104184/fda001b6/5ad89c9cN0cce3267.jpg!q70.jpg'
      },
      cardType:0,
      file:null,
    }
  },
  methods:{
    test () {
      window.open('https://cdn.mozilla.net/pdfjs/tracemonkey.pdf')
    },
    openlayer () {
      var that = this;
      if(this.cardType == 0){
        msg.confirm(`<img style="max-width:100%;height:auto;" src="${this.frontCard.frontImg}" />`, {
          showConfirmButton: true,
          showCancelButton: true,
          confirmButtonText: '重新拍摄',
          cancelButtonText: '确定',
        }).then(_ => {
            that.$refs.upload.click()
            //console.log(that.$refs.upload.dispatchEvent)
            //that.takePhoto()。
            //this.$refs.upload.dispatchEvent(new MouseEvent('click'))
            
            console.log('77888')
        }).catch( err => {
            //console.log(123, that.$refs.upload.click.toString(),err);
            return false;
        });
      }
    },
    changeCardType (type) {
      this.cardType = type
    },
    fcUploadCb (data) {
      console.log(data)
    },
    bkUploadCb (data) {
      console.log(data)
    },
    upload (e) {
      var that = this
      var options = {
        callback:function(formData){
          console.log(formData)
          //调文件上传接口及第三方验证接口
          //ajax
          //接口返回之后显示对应回调
          //cb
          // if(that.cardType == 0){
          //   that.fcUploadCb()
          // }else{
          //   that.bkUploadCb()
          // }
        }
      }
      Utils.upload(e,options)
    },
    takePhoto (){
      //alert(this.cardType)
      //this.$refs.upload.click();
      this.$refs.upload.dispatchEvent(new MouseEvent('click')) 
       console.log(this.$refs.upload.click.toString());
      // wx.chooseImage({			
      //   count: 1, 
      //   sourceType: ['album', 'camera'], 
      //   success: function (res) {
      //     alert(res)
      //   }		
      // });

    },
    openActionsheet () {
      this.sheetVisible = true
    }

  }
}
</script>

<style lang="scss" scoped>
@import "~@sass/_variables";
@import "~@sass/_func";
  .realname-wrap{
    .realname-topic{
      @include f28;
      color:#333;
      padding:pxToRem(10px);
      text-align: center;
    }
    .card-front{
      width: 80%;
      margin:pxToRem(50px) auto;
      border:pxToRem(1px) solid #ccc;
      border-radius: pxToRem(10px);
      color:#333;
      @include f28;
      text-align: center;
      img{
        max-width: 100%;
        height: auto;
      }
    }
    .realname-tip{
      @include f28;
      color:#333;
      text-align: center;
      margin: pxToRem(50px) 0;
      line-height: 1;
      .rt-icon{
        display: inline-block;
        margin-right: pxToRem(8px);
        width:pxToRem(20px);
        height: pxToRem(20px);
        background: yellowgreen;
      }
      .rt-mode{
        color:yellowgreen;
      }
    }
    .rn-btn{
      margin:pxToRem(60px) auto;
      width: 80%;
      height: pxToRem(60px);
      line-height: pxToRem(60px);
      text-align: center;
      color:#333;
      border:pxToRem(1px) solid #ccc;
      border-radius: pxToRem(1px);
      @include f28;
    }
    // .card-back-info{

    // }
  }
</style>
