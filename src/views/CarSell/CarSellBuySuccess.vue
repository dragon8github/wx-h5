<template>
<div>
     <div id="Status">
        <div class="status-card">
            <div class="statusImg success"></div>
            <div class="status-title">提交成功</div>
            <article class="status-text">
                交易信息将在活动结束后五个工作日内在鸿特金服<br/>APP/微信公众号予以公示。
            </article>
            <article class="status-text">
                如资质符合要求，服务人员将在第一时间联系您，
                请保持电话畅通！
                详情咨询陈先生 13827288271
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
           // this.$router.push('/carsellhistory');
           window.history.back()
        }
    },
    beforeMount () {}
  }
</script>

<style lang="scss" scoped>
@import "~@sass/_variables";
@import "~@sass/_func";

.status-card {
    height: 100%;
    position: relative;
}

.status-text {
    font-size: pxToRem(28px);
    line-height: pxToRem(65px);
    color: $font-text;
    margin: pxToRem(60px) pxToRem(60px) 0;
}

.status-title {
    font-size: pxToRem(38px);
    text-align: center;
    width: pxToRem(190px);
    margin: auto;
}
</style>
