<template>
 <div id="About">
     <!-- swiper -->
      <swiper :options="swiperOption" ref="mySwiper">
         <!-- one -->
         <swiper-slide>
             <div class="about_1_bg">
                  <div class="about_top">
                    <h1 class="main_h1">鸿特咨询有限公司</h1>
                    <article class="main_text">广东鸿特信息咨询有限公司是广东鸿特精密技术股份有限公司（300176.SZ）全资子公司。</article>
                  </div>
                  <div class="about_1_block">
                      <h1>公司简介</h1>
                      <article>通过科技驱动金融创新，依托互联网技术及大数据，为企业及个人提供高效、专业的金融信息咨询、信用风险管理、信用数据整合与一体的信息服务企业。目前在全国主要城市拥有200余个分子公司，员工近5000人。</article>
                  </div>
             </div>
          </swiper-slide>

      </swiper>
      <!-- <i v-show="isHideIcon" class="icon_next"></i> -->
 </div>
</template>

<script>
  // starting with version 2.6.0, you need to manually introduce swiper's css
  require('swiper/dist/css/swiper.css')

  // mount with component(can't work in Nuxt.js/SSR)
  import { swiper, swiperSlide } from 'vue-awesome-swiper'

  export default {
    name: 'About',
    data() {
      return {
        isHideIcon: true,
        swiperOption: {
          direction : 'vertical',
          height : window.innerHeight,
          onTransitionStart: function (swiper){
                console.log(swiper.activeIndex)
                this.isHideIcon = swiper.activeIndex < 1;
          }.bind(this)
        }
      }
    },
    components: {
      swiper,
      swiperSlide
    }
  }
</script>


<style scoped lang="scss">
@import "~@sass/_variables";
@import "~@sass/_func";

.swiper-container {    
  article {
    font-size: pxToRem(30px);
    color: #34343e;
    letter-spacing: pxToRem(3px);
    line-height: pxToRem(45px);

    &.article_title {
      padding-top: pxToRem(60px);
    }
  }
    
}

.swiper-slide:first-child {
    background:#34343e url('~@assets/aboutbg@2x.jpg') center center / 100% 100% no-repeat;

    .about_top {
      margin: pxToRem(128px) pxToRem(60px)  pxToRem(100px);
    }

    .main_h1 {
        color:#fdd48e;
        font-size: pxToRem(50px);
        letter-spacing: pxToRem(3px);
    }

    .main_text {
      color: #ffffff;
      font-size: pxToRem(30px);
      margin-top: pxToRem(40px);
    }

}


.about_1_block {
    background: #fff;
    border-radius: pxToRem(26px);
    padding:pxToRem(68px) pxToRem(52px) pxToRem(87px) pxToRem(52px);
    margin: 0 pxToRem(30px);

    h1 {
      font-size: pxToRem(38px);
      color: #262626;
      position: relative;
      margin-bottom: pxToRem(78px);
      letter-spacing: pxToRem(3px);

      &:after {
        content: "";
        height:pxToRem(4px);
        background: #bb862c;
        width: pxToRem(63px);
        position: absolute;
        left: 0;
        bottom: pxToRem(-29px);
      }
    }

    article {
      color: #34343e;
      font-size: pxToRem(30px);
    }
}


</style>