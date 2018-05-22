<template>
    <div class="autograph">
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
export default {
  name: 'autograph',
  data () {
    return {
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
                    // https://github.com/WangShayne/vue-signature
                    var png = this.$refs.signature.save();
                    this.compressedPicture(png, _ => {
                        console.log(_);
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
    mtButton
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