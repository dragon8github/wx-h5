<template>
 <div class="HouseBusinessInfo">
    <div class="_top">
        <div class="h1_div">
            <div class="h1_left"></div>
            <h1 class="h1">准入条件</h1>
            <div class="h1_right"></div>
        </div> 
        <div class="block">
            <div class="block_left">
              <img src="~@assets/BusinessInfo_2.png" class="img1">
            </div>
            <div class="block_right">
                <p class="title">公民条件</p>
                <article>中国公民或者企业法人，年龄18岁(含)至60岁(含)</article>
            </div>
        </div>

        <div class="block">
            <div class="block_left">
                <p class="title">资产条件</p>
                <article>借款人在有房产并且房产有一定的剩余价值。</article>
            </div>
            <div class="block_right">
              <img src="~@assets/BusinessInfo_3.png" class="img2">
            </div>
        </div>

        <div class="block">
            <div class="block_left">
              <img src="~@assets/BusinessInfo_4.png" class="img3">
            </div>
            <div class="block_right">
                <p class="title">个人信誉</p>
                <article>借款人的信用记录正常。</article>
            </div>
        </div>
    </div>

    <div class="_bottom">
      <div class="h1_div">
          <div class="h1_left"></div>
          <h1 class="h1">服务特色</h1>
          <div class="h1_right"></div>
      </div>
      <ul class="_ul">
        <li data-content="1">申请手续简单，有房就可以。</li>
        <li data-content="2">放款快，提交资料后最快<span class="bold">1个工作日</span>内放款。</li>
        <li data-content="3">额度高，可达房产评估价的<span class="bold">80%</span>。</li>
        <li data-content="4">还款方式灵活，可选择<span class="bold">先息后本，等额本息</span>等。</li>
        <li data-content="5">借款期限灵活，<span class="bold">1个月至3年</span>，授信期限内循环使用。</li>
        <li data-content="6">每月利息低至<span class="bold">6厘</span>。</li>
      </ul>
    </div>
    <a class="_submit" @click="LinkToQuickenLoans">马上申请</a>
 </div>
</template>


<script>
  export default {
    name: 'HouseBusinessInfo',
    methods: {
      LinkToQuickenLoans () {
        this.$store.state.wantTo = "/fast/house";
        this.$router.push('register');
      }
    }
  }
</script>

<style scoped lang="scss">
@import "~@sass/_variables";
@import "~@sass/_func";

.HouseBusinessInfo {
  background: #f2f2f2;
  height: 100%;

  .block {
    display: flex;
    justify-content: space-around;
    align-items: center;
    padding-bottom: pxToRem(100px);
    margin: auto pxToRem(40px);

    img {
      
    }

    .block_left { 
        
    } 

    .block_right{
      
    }
  }

  .h1_div {
      display: flex;
      align-items: center;
      justify-content:center;

      .h1_left {
          width: pxToRem(165px);
          height: 1px;
          background: #85ABE5;
          position: relative;
  
          &:after {
             content: "";
             height: pxToRem(10px);
             width: pxToRem(10px);
             border-radius: 50%;
             background: #85ABE5;
             position: absolute;
             right: pxToRem(-30px);
             transform: translateY(-50%);  
          }
      }
      .h1_right {
          width: pxToRem(165px);
          height: 1px;
          background: #85ABE5;
          position: relative;

          &:after {
            content: "";
            height: pxToRem(10px);
            width: pxToRem(10px);
            border-radius: 50%;
            background: #85ABE5;
            position: absolute;
            left: pxToRem(-30px);
            transform: translateY(-50%);  
          }
      }
  }

  .h1 {
    font-weight: normal;
    text-align: center;
    color: #0B58CC;
    font-size: pxToRem(40px);
    position: relative;
    padding-top: pxToRem(56px);
    padding-bottom: pxToRem(56px);
    margin: auto pxToRem(60px);
  }

  .title {
    color: #666666;
    font-size:pxToRem(36px);
    line-height: pxToRem(72px);
    text-align: left;
    margin:0;
  }

  article {
    color: #666666;
    font-size:pxToRem(24px);
    line-height: pxToRem(36px);
    width: pxToRem(263px);
    letter-spacing: 5px;
  }

  ._top {
    margin-top: pxToRem(14px);
    background: #fff;
  }
  
  ._bottom {
    margin-top: pxToRem(34px);
    background: #fff;
     margin-bottom: pxToRem(120px);
    padding-bottom: pxToRem(50px);
  }

  .img1{width: pxToRem(279px); height: pxToRem(241px)}
  .img2{width: pxToRem(299px); height: pxToRem(240px)}
  .img3{width: pxToRem(295px); height: pxToRem(204px)}

  ._ul {
    padding-bottom: pxToRem(71px);

    & > li {
      display: flex;
      align-items: center;
      width: 100%;
      height: pxToRem(66px);
      position: relative;
      font-size:pxToRem(28px);
      line-height: pxToRem(66px);

      &:before {
        content: attr(data-content);
        width: pxToRem(35px);
        height: pxToRem(35px);
        line-height: pxToRem(34px);
        border-radius: 50%;
        background-color: #FFBA00;
        text-align: center;
        color: #fffae6;
        font-size: pxToRem(24px);
        margin-right: pxToRem(23px);
        margin-left: pxToRem(40px);
      }
    }
  }    
  ._submit {
    height: pxToRem(100px);
    width: 100%;
    position: fixed;
    bottom: 0;
    color: #fff;
    background: #0b58cc;
    text-align: center;
    font-size: pxToRem(36px);
    line-height: pxToRem(100px);
  }

  .bold {
    color: #FFBA00;
    font-weight: bold;
  }
}

</style>