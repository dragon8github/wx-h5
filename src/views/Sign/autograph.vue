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
        save(){
            // https://github.com/WangShayne/vue-signature
            var png = this.$refs.signature.save();
            console.log(png);
        },
        clear () {
            this.$refs.signature.clear();
        },
        undo(){
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