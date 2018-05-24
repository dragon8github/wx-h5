<template>
    <div class="SignStatus">
        <div class="SignStatus__img">
            <div class="SignStatus__img--image"></div>
        </div>

        <div class="SignStatus__title">尊敬的客户:</div>
        <div class="SignStatus__text">
            您好，您已完成合同确认，如需了解你所办理业务的具体资料，请联系您的业务经理，谢谢合作。
        </div>

        <div class="SignStatus__sublime">
            <mt-button :text="'确认'"  @click="go"></mt-button>
        </div>
    </div>
</template>

<script>
import mtButton from '@myComponents/button.vue'

export default {

  name: 'SignStatus',

  data () {
    return {

    }
  },
  methods: {
    go () {
        // 然后利用路由进行拦截，如果有多条订单的话，会回到【合同列表页】，如果没有的话，就会退出微信
        window.history.back()
    }    
  },
  components: {
    mtButton
  },
  beforeMount () {
  }
}
</script>


<style lang="scss" scoped>
@import "~@sass/_variables";
@import "~@sass/_func";

.SignStatus {
    padding: 0 pxToRem(60px);
    background-color: #fff;
}

.SignStatus__img {
    text-align: center;
    margin: pxToRem(120px) 0 pxToRem(100px);
    .SignStatus__img--image {
        @include bg(471px, 371px, '~@assets/hetongstatusicon.png');
        margin-left: pxToRem(50px);
    }
}

.SignStatus__title {
    margin-top: pxToRem(100px);
    margin-bottom: pxToRem(15px);
    color: #222222;
    font-size: pxToRem(32px);

}

.SignStatus__text {
    font-size: pxToRem(30px);
    color: #666666;
    line-height: pxToRem(55px);
    letter-spacing: pxToRem(2px);
}

.SignStatus__sublime {
    margin-top: pxToRem(100px);
}

</style>