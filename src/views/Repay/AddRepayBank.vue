<template>
    <div id="AddRepayBank">
        <div class="AddRepayBank">
            <div class="AddRepayBank__header"> 请绑定持卡人本人的储蓄卡 </div>
            <div class="AddRepayBank__form">
                
            </div>
            <article class="warm">
                绑卡必须为一类卡，最多可以绑定10张同一姓名的银行卡， <br>且同一银行最多能绑1张卡；
            </article>
        </div>
        <!-- 提交按钮 -->
        <div class="AddRepayBank__sublime">
            <mt-button :text="'确 认'" @click="go" ></mt-button>
        </div>
    </div>
</template>

<script>
import mtField from '@components/field/field2.vue'
import mtButton    from '@myComponents/button.vue'

export default {

  name: 'AddRepayBank',

  data () {
    return {
        // 手机号码
        phone: '18924195555',     
        // 银行               
        bank: '',       
        // 用户名 
        username: '李太白',         
        // 身份证号                              
        id: '',                                                 
    }
  },
  methods: {
    go () {
          
    }
  },
  components: {
    mtField,
    mtButton
  },
}
</script>

<style lang="scss" scoped>
@import "~@sass/_variables";
@import "~@sass/_func";

#AddRepayBank {
    background-color: #f2f2f2;
}

.AddRepayBank__header {
    height: pxToRem(88px);
    color: #022222;
    font-size: pxToRem(28px);

    .form__bank--arrow::after {
        border: pxToRem(2px) solid #c8c8cd;
        border-bottom-width: 0;
        border-left-width: 0;
        content: " ";
        position: absolute;
        top: 50%;
        right: pxToRem(20px * 2);
        height: pxToRem(5px * 2);
        width: pxToRem(5px * 2);
        transform: translateY(-50%) rotate(45deg);
    }
}

.AddRepayBank__form {
    background-color: #ffffff;
}

.warm {
    font-size: pxToRem(24px);
    color: #999999;
    margin: pxToRem(30px);
}

.AddRepayBank__sublime {
    position: fixed;
    bottom: pxToRem(30px);
    width: 90%;
    left: 50%;
    transform: translateX(-50%);
    z-index: 199307100337;
}
</style>