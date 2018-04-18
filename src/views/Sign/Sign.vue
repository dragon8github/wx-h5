<template>
    <div class="sign">
        <div class="sign__img">
            <div class="sign__img--image"></div>
        </div>
        <div class="sign__text">
            <span  v-if="contractNoList.length">我已阅读并同意下列合同： </span>
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
import Loader from '@components/loader/index.js'
export default {

  name: 'Sign',

  data () {
    return {
        myData: [],
        contractNoList: [],
        __LOCK__: false,
        businessId: '',
        customerId: '',
    }
  },
  methods: {
    refresh () {
       this.getData()
    },
    goinfo (no) {
        if (no == 1) this.$router.push('/GuaranteeProtocol')
        if (no == 2) this.$router.push('/InforeferProtocol')
        if (no == 3) this.$router.push('/TdServiceProtocol')
    },
    go () {
        // 合同确认
        this.xdapi.contractConfirm({
            contractNo: this.contractNoList.join(','),
            customerId: this.customerId,
            businessId: this.businessId
        }).then(data=>{
            if (data.returnCode == 0) {
                this.xdapi.contractList().then(data=>{
                    if (data.returnCode == 0) {
                        // 如果没有【未同意】的合同
                        if (data.data.isConfirm != 1) {
                            // 设置缓存
                            this.$store.dispatch('set_signStatus', true).then(_=>{
                                this.$router.push('/signStatus')
                            })
                        } else {
                            // 测试
                            // 是不是一定要调用合同列表接口，才可以重新确认？
                            // 这个身份证是不是专门弄了很多次的确认。
                            // 时机是不是在确认之后，立刻调用列表就可以确认了
                            this.$router.push('/signStatus')
                        }
                    } else {
                        Toast(data.msg || '网络连接异常，请稍后重试!!');
                    }
                })
            } else {
                Toast(data.msg || '网络连接异常，请稍后重试!');
            }
        })
    },
    getData () {
        this.xdapi.contractList().then(data=>{
            if (data.returnCode == 0) {
                // 【未同意】
                if (data.data.isConfirm == 1) {
                    this.contractNoList = [];
                    this.myData = [];
                    // 处理数据
                    this.customerId = data.data.customerId
                    this.businessId = data.data.businessId
                    for (var i = 0; i < data.data.contractList.length; i++) {
                       var no   = data.data.contractList[i].contractNo
                       var name = data.data.contractList[i].contractName
                       var des  = data.data.contractList[i].contractDes
                       this.contractNoList.push(no)
                       this.myData.push({no, name})
                       if (no == 1) this.$store.state.GuaranteeProtocol = des
                       if (no == 2) this.$store.state.InforeferProtocol = des
                       if (no == 3) this.$store.state.TdServiceProtocol = des
                    }
                // 【已同意】
                } else if (data.data.isConfirm == 2) {
                    this.$store.dispatch('set_signToken', true).then(_=>{
                        // 跳转到状态页面
                        this.$router.push('/signStatus')
                    })
                // 【没有合同】
                } else if (data.data.isConfirm == 0) {
                    this.contractNoList = [];
                    this.myData = [];
                    // 不管它死活，需求说不可能有这种情况
                    return Toast('没有合同需要确认');
                // 【用户不存在】
                } else if (data.data.isConfirm == 3) {
                    // 不管它死活，需求说不可能有这种情况
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
       this.getData()
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