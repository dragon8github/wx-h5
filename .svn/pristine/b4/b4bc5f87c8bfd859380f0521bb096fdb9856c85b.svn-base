<template>
 <div>
    <div id="RepayList">
        <div class="RepayList-Item">
            <div class="RepayList" v-for="(item, index) in mockData">
                 <div class="RepayList-hander" :class="{show: item.show}" @click="go(index)">账期{{ index + 1 }}</div>
                 <div v-show="item.show">
                     <div class="RepayList-head">
                         <div class="RepayList-head-left">已还{{ item.data.length }}期</div>
                         <div class="RepayList-head-right">金额（元）</div>
                     </div>
                     <div class="RepayList-body">
                         <div class="RepayList-body-item" v-for="(item2, index) in item.data">
                              <div class="RepayList-body-left">{{ item2.date }}</div>
                              <div class="RepayList-body-right">{{ item2.money }}</div>
                         </div>
                      </div>
                     <div class="RepayList-tail">未还共计：6254.60</div>
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
                mockData: [
                    {data: [{date: '2017-08-28', money: '1900.40'}, {date: '2017-08-28', money: '1900.40'}, {date: '2017-08-28', money: '1900.40'}, {date: '2017-08-28', money: '1900.40'}, {date: '2017-08-28', money: '1900.40'} ] },
                    {data: [{date: '2017-08-28', money: '1900.40'}, {date: '2017-08-28', money: '1900.40'}, {date: '2017-08-28', money: '1900.40'}, {date: '2017-08-28', money: '1900.40'}, {date: '2017-08-28', money: '1900.40'} ] },
                    {data: [{date: '2017-08-28', money: '1900.40'}, {date: '2017-08-28', money: '1900.40'}, {date: '2017-08-28', money: '1900.40'}, {date: '2017-08-28', money: '1900.40'}, {date: '2017-08-28', money: '1900.40'} ] },
                ]
            }
        },
        watch: {

        },
        methods: {
            go (index) {
                this.$set(this.mockData[index], 'show', !this.mockData[index].show)
            }
        },
        components: {

        }
  }
</script>


<style scoped lang="scss">
@import "~@sass/_variables";
@import "~@sass/_func";

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
      padding: 0 pxToRem(17px) 0 pxToRem(30px);
  }

  .RepayList-body-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: pxToRem(88px);
      position: relative;
      padding: 0 pxToRem(30px);


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
    padding: 0 pxToRem(30px);
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
