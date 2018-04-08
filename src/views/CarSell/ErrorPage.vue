<template>
<div>
     <div id="Status">
        <div class="status-card">
            <div class="statusImg fail"> </div>
            <div class="status-title">提交失败</div>
            <article class="status-text">
                业务道路拥堵，请重新提交！
            </article>
            <button class="mybutton" @click="push">重 新 提 交</button>
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
            status: this.$store.state.status.ErrorPageStatus
        }
    },
    methods: {
        push () {
           // this.$router.push(this.status.url);
           window.history.back()
        }
    },
    beforeMount () {}
  }
</script>

<style lang="scss" scoped>
@import "~@sass/_variables";
@import "~@sass/_func";
@import "~@sass/_status";

#Status {
    padding-top: pxToRem(200px);
    .status-text {
        text-align: center;
        font-size: pxToRem(28px);
        line-height: pxToRem(65px);
        color: #222222;
        margin: pxToRem(33px) auto;
    }
    
    .status-text-blue {
        color: #0e6ae7;
    }

    .status-title {
        font-size: pxToRem(38px);
        text-align: center;
        width: pxToRem(190px);
        margin: auto;
    }
}

</style>
