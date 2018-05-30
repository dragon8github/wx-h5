<template>
    <div class='sign_main'>
        <div class="banner">
              <el-steps :active="activeStep" align-center>
                  <el-step title="身份确认">
                      <i class="myicon one"  :class="{active: activeStep >= 0}"  slot="icon"></i>
                  </el-step>
                  <el-step title="合同确认">
                      <i class="myicon two"   :class="{active: activeStep >= 1}" slot="icon"></i>
                  </el-step>
                  <el-step title="合同签名">
                      <i class="myicon three"  :class="{active: activeStep >= 2}" slot="icon"></i>
                  </el-step>
                  <el-step title="完成确认">
                      <i class="myicon four"   :class="{active: activeStep >= 3}" slot="icon"></i>
                  </el-step>
              </el-steps>
        </div>
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
    </div>
</template>

<script>
import mtButton from '@myComponents/button.vue'
import Toast    from '@components/toast/index.js'
import Loader from '@components/loader/index.js'
import elSteps  from '@components/steps/src/steps.vue'
import elStep   from '@components/steps/src/step.vue'
export default {

  name: 'Sign',

  data () {
    return {
        activeStep: 1,
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
        var data = JSON.stringify({
            businessId: this.businessId,
            customerId: this.customerId,
            id: this.$store.state.serviceagreement_id,
            customerName: this.$store.state.serviceagreement_name,
            companyname: this.$store.state.serviceagreement_companyname,
            unifiedcode: this.$store.state.serviceagreement_unifiedcode,
        })
        if (no == 1) { 
            this.xdapi.buriedPoint({buriedPointType: '提供担保协议书', data: data, certificateNo: this.$store.buriedPointCertificateNo}, true);
            this.$router.push('/GuaranteeProtocol')
        }

        if (no == 2) { 
            this.xdapi.buriedPoint({buriedPointType: '信息咨询服务协议', data: data,  certificateNo: this.$store.buriedPointCertificateNo}, true);
            this.$router.push('/InforeferProtocol')
        }

        if (no == 3) { 
            this.xdapi.buriedPoint({buriedPointType: '团贷网服务协议', data: data,  certificateNo: this.$store.buriedPointCertificateNo}, true);
            this.$router.push('/TdServiceProtocol')
        }

    },
    go () {
        // 跳转到签名页面
        this.$router.push('/autograph')
        
        // Loader.show('正在提交...', 'A')
        // // 合同确认
        // this.xdapi.contractConfirm({
        //     // contractNo: this.contractNoList.join(','), // 新版已经不需要传了
        //     customerId: this.customerId,
        //     businessId: this.businessId
        // }, true).then(data => {
        //     if (data.returnCode == 0) {
        //         // 再次确认是否还有合同未确认，如果有的话，待会返回
        //         this.xdapi.contractList({}, true).then(data => {
        //             Loader.hideAll()
        //             if (data.returnCode == 0) {
        //                 // 如果没有【未同意】的合同
        //                 if (data.data.isConfirm != 1) {
        //                     // 设置缓存
        //                     this.$store.dispatch('set_signStatus', true).then(_ => {
        //                         // 跳转到签名页面
        //                         this.$router.push('/autograph')
        //                     })
        //                 } else {
        //                     this.$router.push('/autograph')
        //                 }
        //             } else {
        //                 Loader.hideAll()
        //                 Toast(data.msg || '网络连接异常，请稍后重试!!');
        //             }
        //         })
        //     } else {
        //         Loader.hideAll()
        //         Toast(data.msg || '网络连接异常，请稍后重试!');
        //     }
        // })
    },
    getData () {
        this.xdapi.contractList().then(data=>{
            if (data.returnCode == 0) {
                // 【未同意】
                if (data.data.isConfirm == 1) {
                    this.contractNoList = [];
                    this.myData = [];
                    // 处理数据
                    this.customerId = this.$store.state.customerId = data.data.customerId
                    this.businessId = this.$store.state.businessId = data.data.businessId
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
    mtButton,
    elSteps,
    elStep,
  },
  activated () {
      console.log(this.$store)
       this.getData()
  }
}
</script>

<style lang="scss" scoped>
@import "~@sass/_variables";
@import "~@sass/_func";

.sign_main {
    background-color: #ffffff;
}


.sign {
    padding: pxToRem(30px);
}




.sign__img {
    text-align: center;
    margin: pxToRem(50px) 0 pxToRem(50px);
    .sign__img--image {
        @include bg(304px, 206px, '~@assets/hetongicon.png');
    }
}

.sign__text {
    font-size: pxToRem(30px);
    letter-spacing: pxToRem(2px);
    color: #222222;
    line-height: pxToRem(55px);
    margin-bottom: pxToRem(30px);
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