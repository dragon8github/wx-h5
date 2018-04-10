<template>
    <div class="sign">
        <div class="sign__img">
            <div class="sign__img--image"></div>
        </div>
        <div class="sign__text">
            <span >我已阅读并同意下列合同： </span>
        </div>
        <ul class="sign__list">
            <li v-for="item in myData" @click="goinfo(item.no)">《{{item.name}}》</li>
        </ul>
        <div class="sign__sublime">
            <mt-button v-if="myData.length" :text="'确认'" @click="go"></mt-button>
            <mt-button v-else :text="'刷新'" @click="refresh"></mt-button>
        </div>
    </div>
</template>

<script>
import mtButton from '@myComponents/button.vue'
import Toast    from '@components/toast/index.js'

export default {

  name: 'Sign',

  data () {
    return {
        myData: [],
        contractNoList: [],
        __LOCK__: false,
    }
  },
  methods: {
    refresh () {
       if (this.myData.length === 0 || this.contractNoList.length === 0) {
            this.getData()
        }
    },
    goinfo (no) {
        if (no == 1) this.$router.push('/GuaranteeProtocol')
        if (no == 2) this.$router.push('/TdServiceProtocol')
        if (no == 3) this.$router.push('/InforeferProtocol')
    },
    go () {
        this.xdapi.contractConfirm({
            contractNo: this.contractNoList.join(',')
        }).then(data=>{
            if (data.returnCode == 0) {
                // 添加缓存
                this.$store.dispatch('set_signStatus', true).then(_=>{
                    // 设置store
                    window.localStorage.setItem('signStatus', true)
                    // 跳转到状态页面
                    this.$router.push('/SignStatus')
                })
            } else {
                Toast(data.msg || '网络连接异常，请稍后重试');
            }
        })
    },
    getData () {
        this.xdapi.contractList().then(data=>{
            if (data.returnCode == 0) {
                // 如果用户还没有同意过
                if (data.data.isConfirm == 1) {
                    // 处理数据
                    for (var i = 0; i < data.data.contractList.length; i++) {
                       var no   = data.data.contractList[i].contractNo
                       var name = data.data.contractList[i].contractName
                       var des  = data.data.contractList[i].contractDes
                       this.contractNoList.push(no)
                       this.myData.push({no, name})
                       if (no == 1) this.$store.state.GuaranteeProtocol = des
                       if (no == 2) this.$store.state.TdServiceProtocol = des
                       if (no == 3) this.$store.state.InforeferProtocol = des
                    }
                // 如果用户已经同意过了，那么应该跳转到状态页面
                } else {
                    //设置store
                    this.$store.dispatch('set_signStatus', true).then(_=>{
                        // 添加缓存
                        window.localStorage.setItem('signStatus', true)
                        // 跳转到状态页面
                        this.$router.push('/signStatus')
                    })
                }
            } else {
                Toast(data.msg || '获取协议列表失败，请稍后重试');
            }
        })
    }
  },
  components: {
    mtButton
  },
  activated () {
        // 如果没有数据的话，那么加载数据
        if (this.myData.length === 0 || this.contractNoList.length === 0) {
           this.getData()
        }
  }
}
</script>

<style lang="scss" scoped>
@import "~@sass/_variables";
@import "~@sass/_func";

.sign {
    background-color: #ffffff;
    padding: pxToRem(30px);
}

.sign__img {
    text-align: center;
    margin: pxToRem(70px) 0 pxToRem(100px);
    .sign__img--image {
        @include bg(404px, 276px, '~@assets/hetongicon.png');
    }
}

.sign__text {
    font-size: pxToRem(30px);
    letter-spacing: pxToRem(2px);
    color: #222222;
    line-height: pxToRem(55px);
    margin-bottom: pxToRem(40px);
    height: pxToRem(91px);
}

.sign__list {
    min-height: pxToRem(270px);

    li {
        height: pxToRem(90px);
        line-height: pxToRem(90px);
        color: #0e6ae7;
        font-size: pxToRem(30px);
        position: relative;
        list-style: none;
        margin-left: pxToRem(30px);

        &::before {
            @include size(12px, 12px);
            @include ycenter;
            content: '';
            border-radius: 50%;
            background-color: #0e6ae7;
            left: pxToRem(-30px);
        }

        &::after {
            @include border(bottom, #ccc)
        }
    }
}

.sign__sublime {
    margin-top: pxToRem(65px);
}

</style>