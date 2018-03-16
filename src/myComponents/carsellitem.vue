<template>
    <div class="CarSellHistoryItem" @click="goInfo(id)">
        <div class="CarSellHistoryItem__left">
                <img class="CarSellHistoryItem__image" :src="'http://xiaodaioa.oss-cn-beijing.aliyuncs.com/' + image">
        </div>
        <div class="CarSellHistoryItem__right">
            <div class="carinfo">
                <div class="carinfo__top">
                    <div class="carinfo__name"> {{ name }} </div>
                </div>
                <div class="carinfo__center">
                    <div class="carinfo__price">
                        起拍价：
                        <span class="carinfo__moneysymbol">¥</span>
                        <span class="carinfo__money">{{ money }}</span>
                    </div>
                    <div class="carinfo__time">{{ time }} 截止</div>
                </div>
                <div class="carinfo__bottom">
                    <div class="carinfo__city">{{ city }}</div>
                    <div class="carinfo__id">拍卖编号：{{ id }}</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  name: 'callsellitem',
  data () {
    return {

    }
  },
  props: {
    maindata:   { type: Object, default: {} },
    image:  { type: String, default: '' },
    name:   { type: String, default: '' },
    money:  { type: String | Number, default: '' },
    time:   { type: String | Number, default: '' },
    city:   { type: String, default: '' },
    id:     { type: String, default: '' },
  },
  methods: {
    goInfo () {
        this.$store.dispatch('setCarInfoData', { data: this.maindata }).then(_ => {
            // 前期为了迅速，我把他们分开来了。后期再融合在一起吧
            if (this.$route.name.trim() === 'CarSellHistory') {
                this.$router.push(`/CarSellHistoryInfo/${this.id}`)
            } else {
                this.$router.push(`/CarSellInfo/${this.id}`)
            }
        })
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~@sass/_variables";
@import "~@sass/_func";


.CarSellHistoryItem {
    @include flex(start);
    background: #fff;
    height: pxToRem(306px); 
    padding: pxToRem(7px) 0;   
    box-sizing: content-box;
}

.CarSellHistoryItem__left {

}

.CarSellHistoryItem__right {

}

.CarSellHistoryItem__image {
    width: pxToRem(292px);
    height: 100%;
}

.carinfo {
    @include f24;
    @include flex(around, start, column);
    height: 100%;
    margin: 0 pxToRem(25px);
    padding: pxToRem(5px) 0;
    position: relative;

    &:after {
        @include border('bottom', #f3f3f3);
    }
}

.carinfo__name {
    @include f32;
}

.carinfo__price {
    color: #222222;
}

.carinfo__moneysymbol {
    @include f20;
    color: #f57f25;
}

.carinfo__money {
    @include f38;
    color: #f57f25;
}

.carinfo__time {
    @include f28;
    color: #222222;
    line-height: pxToRem(50px);
}

.carinfo__city {
    @include f24;
    color: #999999;
    line-height: pxToRem(35px);
}

.carinfo__id {
    @include f24;
    color: #999999;
}

</style>