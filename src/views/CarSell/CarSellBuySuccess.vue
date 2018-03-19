<template>
<div>
     <div id="Status">
        <div class="status-card">
            <div class="statusImg success"></div>
            <div class="status-title">提交成功</div>
            <article class="status-text">
                尊敬的用户：<br>竞拍结束后，如竞价靠前，服务人员将在第一时间联系您，请保持电话畅通！
            </article>
            <button class="mybutton" @click="push">确 定</button>
       </div>
    </div>
</div>
</template>

<script>
  import msg    from '@components/messagebox/messagebox.js'
  import Loader from '@components/loader/index.js'

  export default {
    name: 'Status',
    data () {
        return {
            
        }
    },
    methods: {
        push () {
           this.$router.push('/carsell');
        }
    },
    beforeMount () {}
  }
</script>

<style lang="scss" scoped>
@import "~@sass/_variables";
@import "~@sass/_func";
@import "~@sass/_status";

.status-card {
    height: 100%;
    position: relative;
}

.status-text {
    font-size: pxToRem(28px);
    line-height: pxToRem(65px);
    color: #222222;
    margin: pxToRem(60px) pxToRem(60px) 0;
}

.status-title {
    font-size: pxToRem(38px);
    text-align: center;
    width: pxToRem(190px);
    margin: auto;
}
</style>
