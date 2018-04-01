<template>
 <div>
    <div id="RepayList">
        <div class="RepayList-Item">
            <!-- 顶层账单 -->
            <div class="RepayList" v-for="(item, index) in d">
                <div class="RepayList-hander" :class="{show: item.show}" @click="go(index)">{{ item.Title }}</div>
                <div v-show="item.show">
                    <!-- 二级菜单 -->
                    <div v-for="(item2, index2) in item.Records">
                        <div class="zhangdan-head" @click="go2(index, index2)"> <div class="zhangdan-head-warp"  :class="{show: item2.show}">账单 {{ index2 + 1 }}</div> </div>
                        <div v-show="item2.show">
                            <div class="RepayList-head">
                                <div class="RepayList-head-left">已还{{ item2.length }}期</div>
                                <div class="RepayList-head-right">金额（元）</div>
                            </div>
                            <!-- 三级菜单 -->
                            <div v-for="(item3, index3) in item2">
                                <div class="RepayList-body">
                                    <div class="RepayList-body-item">
                                         <div class="RepayList-body-left">{{ date2date(item3.Date) }}</div>
                                         <div class="RepayList-body-right">{{ item3.TotalAmount }}</div>
                                    </div>
                                 </div>
                             </div>
                            <div class="RepayList-tail">已还共计：{{ all(item2) }}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
 </div>
</template>

<script>
  import mtField from '@components/field/field.vue'
  import Toast   from '@components/toast/index.js'
  import Loader  from '@components/loader/index.js'
  export default {
        name: 'Login',
        data () {
            return {
                d: this.$store.state.RepayHistoryInfo.RepayHistoryInfo
            }
        },
        watch: {

        },
        methods: {
            go (index) {
                this.$set(this.d[index], 'show', !this.d[index].show)
                this.$set(this.d[index].Records[0], 'show', true)
            },
            go2 (index1, index2) {
                this.$set(this.d[index1].Records[index2], 'show', !this.d[index1].Records[index2].show)
            },
            all (item) {
               var money = 0;
               for (var i = item.length - 1; i >= 0; i--) {
                 money += item[i].TotalAmount
               }
               return money.toFixed(2);
            }
        },
        components: {},
        beforeMount () {
            if (!this.d[0]) {
              this.$router.push('/Repay')
              Toast('未找到历史数据，请稍后重试')
            }
        }
  }
</script>


<style scoped lang="scss">
@import "~@sass/_variables";
@import "~@sass/_func";

.zhangdan-head {
  background-color: #f9f9f9;
  height: pxToRem(88px);
  line-height: pxToRem(88px);
  color: #222222;

  .zhangdan-head-warp {
      margin: 0 pxToRem(30px);
      position: relative;

      &::after {
          @include fullbg(30px, 15px, '../../assets/arrow-down-light.png');
          @include ycenter;
          content: '';
          right: 0;
      }

      &.show::after {
        transform: translateY(-50%) rotate(180deg);
      }
  }
}

#RepayList {
  margin: pxToRem(30px);
}

.title {
  font-size: pxToRem(28px);
  color: #999999;
  margin-bottom: pxToRem(20px);
}

.RepayList-Item {
  margin-bottom: pxToRem(50px);
}

.RepayList {
  background: #fff;
  font-size: pxToRem(28px);
  color: #999999;
  position: relative;
  box-shadow: 0 pxToRem(5px) pxToRem(10px) rgba(0,0,0, .1);


  .RepayList-head {
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: pxToRem(68px);
      background: #f2f2f2;
      padding: 0 pxToRem(50px) 0 pxToRem(60px);
  }

  .RepayList-body-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: pxToRem(88px);
      position: relative;
      padding: 0 pxToRem(60px);


      &::before {
          @include border('top', #e5e5e5)
      }

      & .RepayList-body-left {
        color: #022222;
      }

      & .RepayList-body-right {
        color: #0e6ae7;
      }
  }

  .RepayList-tail {
    height: pxToRem(68px);
    text-align: right;
    background: #f2f2f2;
    padding: 0 pxToRem(60px);
    line-height: pxToRem(68px);
  }

  & + &::after {
      @include border('top', #e5e5e5)
      left: pxToRem(15px);
  }

}

.RepayList-hander {
    height: pxToRem(88px);
    line-height: pxToRem(88px);
    background: #fff;
    margin: 0 pxToRem(30px);
    position: relative;
    color: #222222;

    &::after {
        @include fullbg(30px, 15px, '../../assets/arrow-down-light.png');
        @include ycenter;
        content: '';
        right: 0;
    }

    &.show::after {
      transform: translateY(-50%) rotate(180deg);
    }
}
</style>
