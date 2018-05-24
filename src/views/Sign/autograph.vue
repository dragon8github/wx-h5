<template>
    <div class="autograph">
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
        <p class="autograph__title">请在下列区域内，进行合同手写签名：</p>
        <sign class="autograph__drawingBoard" ref="signature" :sigOption="option">
            <i class="undo" @click="clear"></i>
        </sign>
        <div class="autograph__sublime">
            <mt-button :text="'确认'" @click="save"></mt-button>
        </div>
    </div>
</template>

<script>
import sign from "@myComponents/sign.vue"
import mtButton   from '@myComponents/button.vue'
import Toast    from '@components/toast/index.js'
import msg from '@components/messagebox/messagebox.js'
import elSteps  from '@components/steps/src/steps.vue'
import elStep   from '@components/steps/src/step.vue'
import Loader from '@components/loader/index.js'

export default {
  name: 'autograph',
  data () {
    return {
        activeStep: 2,
        option:{
            penColor:"rgb(0, 0, 0)",
            backgroundColor:"rgb(244, 244, 244)"
        }
    }
  },
  methods:{
        save () {
            if (this.$refs.signature.isEmpty() === false) {
                msg.confirm(`此签名真实有效，代表您已认可所填写的信息真实有效及相关合同条款确认无误，签名成功并提交后，此签名将作为合同的签名，并具法律效力。`, "温馨提示").then(()=>{
                    Loader.show('正在提交...', 'A')
                    // https://github.com/WangShayne/vue-signature
                    // 获取canvas的图片
                    var png = this.$refs.signature.save();
                    // 压缩图片
                    this.compressedPicture(png, signature => {
                        // 提交签名api
                        this.xdapi.contractSignature({
                            "businessId": this.$store.state.businessId,
                            "customerId": this.$store.state.customerId,
                            "signature":  signature
                        }, true).then(data => {
                          if (data.returnCode == 0) {
                                // 再次确认是否还有合同未确认，如果有的话，待会返回
                                this.xdapi.contractList({}, true).then(data => {
                                       Loader.hideAll()
                                       if (data.returnCode == 0) {
                                          // 如果没有【未同意】的合同
                                          if (data.data.isConfirm != 1) {
                                              // 设置缓存
                                              this.$store.dispatch('set_signStatus', true).then(_ => {
                                                  // 跳转到签名页面
                                                  this.$router.push('/signStatus')
                                              })
                                          } else {
                                              this.$router.push('/signStatus')
                                          }
                                       } else {
                                           // 发生异常，照样跳转到状态页
                                           this.$router.push('/signStatus')
                                       }
                                })
                          } else {
                              Loader.hideAll()
                              Toast(data.msg || '网络连接异常，请稍后重试!!');
                          }
                        })
                    })
                }).catch(() => {
                    return false;
                });
            } else {
                Toast('画板空空如也~');
            }
        },
        compressedPicture (url, callback) {
            var canvas = document.createElement('canvas'); 
            var ctx = canvas.getContext('2d'); 
            var img = new Image; 
            img.onload = function(){
                console.log(img.width);
                var width = img.width;
                var height = img.height;
                // 按比例压缩4倍
                var rate = (width < height ? width / height : height / width) / 4;
                canvas.width = width * rate; 
                canvas.height = height * rate; 
                ctx.drawImage(img, 0, 0, width, height, 0, 0, width * rate, height * rate); 
                var dataURL = canvas.toDataURL('image/jpeg'); 
                callback.call(this, dataURL); 
                canvas = null; 
                return dataURL
            };
            img.src = url
        },
        clear () {
            this.$refs.signature.clear();
        },
        undo () {
            this.$refs.signature.undo();
        }
  },
  components: {
    sign,
    mtButton,
    elSteps,
    elStep
  },
  beforeMount () {
    console.log( this.$store.state.customerId, this.$store.state.businessId);
  }
}
</script>

<style lang="scss" scoped>
@import "~@sass/_variables";
@import "~@sass/_func";
.autograph {
    background-color: #ffffff;

    .autograph__title {
        color: #000000;
        margin: pxToRem(40px) pxToRem(32px);
        font-size: pxToRem(28px);
    }

    .autograph__drawingBoard {
        width: pxToRem(690px);
        height: pxToRem(890px);
        margin: 0 pxToRem(30px);
        position: relative;
    }

    i.undo {
        position: absolute;
        right: 0;
        bottom: 0;

        width: pxToRem(120px);
        height: pxToRem(120px);
        background: url('~@assets/undo.png') center / pxToRem(42px) pxToRem(36px) no-repeat;
    }

    .autograph__sublime {
        margin: pxToRem(64px) pxToRem(30px);
    }

}
</style>