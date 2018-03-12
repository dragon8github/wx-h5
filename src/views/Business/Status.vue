<template>
<div>
     <div id="Status">
        <div class="status-card">
            <div class="statusImg" :class="status.status"> </div> 
            <div class="status-title">提交成功！</div>
            <article class="status-text" v-html = "status.text"></article>
            <button class="mybutton" @click="push" v-text = "status.button"></button>
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
            status: this.$store.state.status.FastStatus
        }
    },
    methods: {
        push () {
           this.$router.push(this.status.url);
        }
    },
    beforeMount () {}
  }
</script>

<style lang="scss" scoped>
@import "~@sass/_variables";
@import "~@sass/_func";
@import "~@sass/_status";

.status-text {
    font-size: pxToRem(28px);
    line-height: pxToRem(45px);
    color: #222222;
    margin: pxToRem(137px) pxToRem(40px);
    text-align: center;
}

.status-title {
    font-size: pxToRem(38px);
    text-align: center;
    width: 100%;
    text-indent: pxToRem(20px);
    margin: auto;
    margin-top: pxToRem(40px);
}
</style>
