<template>
    <a class="getvalidate" :class="{gray: (!stop)}" @click='clickHandler'>
        {{ stop ? '获取验证码' : `（${mytimer}）秒后重新获取` }}
    </a>
</template>

<script>
export default {
    name: 'getvalidate',
    data () {
        return {
            stop : true,
            mytimer: this.timer,
            Interval: null,
        }
    },
    methods: {
       clickHandler (e) {
            if (this.stop) { 
                // 调用外部绑定的倒计时，并且给它开关
                this.$emit('click', this.startTimer);
            }
       },
       update () {
           if (this.mytimer <= 1) {
              // 重置计数
              this.mytimer = this.timer
              // 清除计时器
              clearInterval(this.Interval)
              // 允许启动倒计时
              this.stop = true
           } else {
              // 倒计时
              this.mytimer--;
           }
       },
       startTimer () {
            // 开始循环执行update函数
            this.Interval = setInterval(this.update, 1000)
            // 禁止启动倒计时
            this.stop = false;
       }
    },
    props: {
       timer: {
            default: 60, 
            type: Number
       }
    }
};

</script>

<style lang="scss" scoped>
@import "~@sass/_variables";
@import "~@sass/_func";


.getvalidate {
    color: #0e6ae7;
    font-size: pxToRem(28px);
    width: 100%;
    text-align: right;

    &.gray {
      color: #999;
    }
}
</style>
