<template>
   <div id="About">
         <div class="about_1_bg">
              <div class="about_top">
                <h1 class="main_h1">广东鸿特咨询有限公司</h1>
                <article class="main_text">广东鸿特信息咨询有限公司（简称鸿特信息），是国内上市公司鸿特精密（300176.SZ）旗下全资子公司，其运营品牌为鸿特金服。</article>
                <p class="address">
                  公司官网：<br> 
                  <a class="bottom-text" href="http://www.hongte.info" target="_blank">http://www.hongte.info</a>
                </p>
              </div>
              <div class="about_1_block">
                  <h1>公司简介</h1>
                  <article>公司致力于通过大数据、人工智能、互联网科技等技术力量为企业及个人提供高效、专业的，集金融信息咨询、信用风险管理、信用数据整合于一体的信息服务。截至目前，公司在全国主要城市拥有200余家分、子公司，员工近5000人。鸿特信息始终坚持科技创新、金融创新和服务创新三大维度的核心竞争力，以打造最具竞争力、价值感的创新型金融信息咨询服务平台。鸿特信息将以至诚的态度服务市场，精确把握金融科技发展带来的行业契机，打造综合金融信息咨询服务产品矩阵，为广大客户及合作机构提供更专业的金融信息咨询、企业管理咨询等服务。</article>
              </div>
         </div>
   </div>
</template>

<script>
  export default {
    name: 'About',
    data() {
      return {
       
      }
    },
    components: {
    }
  }
</script>


<style scoped lang="scss">
@import "~@sass/_variables";
@import "~@sass/_func";

.bottom-text {
  text-decoration: underline;
  line-height: pxToRem(50px);
}

.address {
  color: #fff;
  font-size: pxToRem(30px);
  letter-spacing: pxToRem(3px);
}

#About {    
  height: 100%;
  position: relative;

  article {
    font-size: pxToRem(30px);
    letter-spacing: pxToRem(3px);
    line-height: pxToRem(45px);
    word-break: break-all;

    &.article_title {
      padding-top: pxToRem(60px);
    }
  }
}

.about_1_bg {
    background:#34343e url('~@assets/aboutbg@2x.jpg') center center / 100% 100% no-repeat;
    padding-bottom: pxToRem(100px);

    .about_top {
      padding: pxToRem(68px) pxToRem(60px)  pxToRem(60px);
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