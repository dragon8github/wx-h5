<template>
<div>
     <div id="Status">
        <div class="status-card">
            <div class="statusImg success"></div> 
            <div class="status-title">提交成功！</div>
            <article class="status-text">
                <p class="status-text-p">尊敬的用户：</p>
                <p class="status-text-p">信贷顾问正在快马加鞭联系您，请保持手机<span class="blue">{{ myfastphone }}</span>畅通！</p>
            </article>
            <div class="line"></div>
            <div class="line-bottom">
                <p>请提前准备以下资料：</p>
                <ul v-if="type === 'house'">
                    <li>1.借款人（夫妻）身份证，婚姻证明，户口本</li>
                    <li>2.个人征信，夫妻银行流水（须原件）</li>
                    <li>3.房产证，土地证</li>
                </ul>
                <ul v-else>
                    <li>1.身份证及居住证（非本地户口）</li>
                    <li>2.行驶证、机动车登记证</li>
                    <li>3.车辆备用钥匙</li>
                </ul>
            </div>
            <button class="mybutton" @click="push">返 回 主 页</button>
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
            fastphone: this.$store.state.fastphone,
            type: this.$route.params.type || 'car'
        }
    },
    methods: {
        push () {
           this.$router.push('/fast');
        }
    },
    computed: {
        myfastphone () {
            if (this.fastphone) {
                return this.fastphone.substr(0, 3) + '****' + this.fastphone.substr(-4)
            }
            return ''
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
    min-height: pxToRem(1150px);
    padding: pxToRem(30px);
    margin: pxToRem(30px);

    .mybutton {
        bottom: pxToRem(50px);
    }
}

.status-text {
    font-size: pxToRem(28px);
    line-height: pxToRem(45px);
    color: #222222;
    margin: pxToRem(89px) 0 pxToRem(30px);
}

.status-title {
    font-size: pxToRem(38px);
    text-align: center;
    width: 100%;
    text-indent: pxToRem(20px);
    margin-top: pxToRem(40px);
}

.status-card {
    border: pxToRem(1px) solid rgba(229, 229, 229, 0.39);
    padding: pxToRem(30px);
    position: relative;
    height: 100%;
}

.line {
    @include line(30px, rgba(229, 229, 229, 0.39));
}

.line-bottom {
    p {
        font-size: pxToRem(28px);
    }

    li {
        color: #999999;
        font-size: pxToRem(28px);
        list-style: none;
        line-height: pxToRem(50px);
    }
}

.blue {
    color:#0e6ae7;
}

</style>
