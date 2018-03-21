<template>
    <div class="CarSellHistoryItem" @click="goInfo(id)">
        <div class="CarSellHistoryItem__left">
                <img class="CarSellHistoryItem__image" :src="getImg()">
        </div>
        <div class="CarSellHistoryItem__right">
            <div class="carinfo">
                <div class="carinfo__top">
                    <div class="carinfo__name"> {{ name + ' ' + model }} </div>
                </div>
                <div class="carinfo__center">
                    <div class="carinfo__price">
                        <span v-html="moneyText"></span>
                        <span class="carinfo__moneysymbol">¥</span>
                        <span class="carinfo__money">{{ money }}</span>
                    </div>
                    <div class="carinfo__time" v-if="endtime">{{ endtime }} 截止</div>
                    <div class="carinfo__time" v-if="starttime">{{ starttime }} 开拍</div>
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
        moneyText: (this.endtime || this.starttime) ? '起拍价：' : '成交价：<p></p>'
    }
  },
  props: {
    // 整个数据集
    maindata: { type: Object | Array, default: {} },
    // 拍卖编号
    id:       { type: String, default: '' },
    // 图片一张
    image:    { type: String, default: '' },
    // 汽车品牌
    name:     { type: String, default: '' },
    // 汽车型号
    model:     { type: String, default: '' },
    // 起拍价 / 成交价
    money:    { type: String | Number, default: '' },
    // 开拍时间，可以为空，如果是成交单的话
    starttime:{ type: String | Number, default: '' },
    // 截止时间，拍卖历史需要，可以为空
    endtime:  { type: String | Number, default: '' },
    // 汽车属地
    city:     { type: String, default: '' },
    // 订单是否完成（默认未完成）后端不肯给我加字段，所以只能自己加isFinish
    isFinish: { type: Boolean, default: false }
  },  
  methods: {
    goInfo () {
        // 后端不肯给我加字段，所以只能自己加isFinish
        console.log(this.isFinish)
        this.$store.dispatch('setCarInfoData', Object.assign(this.maindata, { isFinish: this.isFinish })).then(_ => {
            // 前期为了迅速，我把他们分开来了。后期再融合在一起吧
            if (this.$route.name.trim() === 'CarSellHistory') {
                this.$router.push(`/CarSellHistoryInfo/${this.maindata.priceID}`)
            } else {
                this.$router.push(`/CarSellInfo/${this.maindata.priceID}`)
            }
        })
    },
    getImg (src) {
        if (this.image) {
            return 'http://xiaodaioa.oss-cn-beijing.aliyuncs.com/' + this.image;
        } else {
            // TODO 默认汽车的图片
            return ''
        }
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
    height: 100%;
}

.CarSellHistoryItem__right {
    height: 100%;
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