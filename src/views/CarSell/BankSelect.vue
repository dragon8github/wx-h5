<template>
 <div id="BankSelect">
    <div  class="BankSelect__warp" ref="myele">
        <p class="title">当前选择</p>
        <div class="cell">
            <div class="cell-left">{{ selected }}</div>
        </div>
        <p class="title">热门选择</p>
        <div class="list">
            <ul class="list-ul" @click="selectHot">
              <li>工商银行</li>
              <li>建设银行</li>
              <li>平安银行</li>
              <li>招商银行</li>
              <li>中国银行</li>
              <li>交通银行</li>
            </ul>
        </div>

        <p class="title">选择城市</p>
        <index-list :ele="myele">
             <list-section v-for="(item, index) in alphabet" :key="index" :index="item.initial">
                 <cell v-for="(cell, index2) in item.cells" :key="index2" :title="cell" :clickHandle="selectItem">
                    <!-- <img slot="icon" src="~@assets/ok_img2.png" width="24" height="24" v-if="cell === selected"> -->
                 </cell>
             </list-section>
        </index-list>
    </div>
 </div>
</template>

<script>
  import indexList from '@components/index-list'
  import listSection from '@components/index-section'
  import cell from '@components/cell'
  export default {
        name: 'BankSelect',
        data () {
            return {
                myele: null,
                selected: '安阳银行',
                alphabet: [{initial:'A',cells:['鞍山银行','安阳银行','安徽省农村信用社']},{initial:'B',cells:['渤海银行','北京银行','北京农村商业银行','包商银行']},{initial:'C',cells:['成都银行','常熟农村商业银行','常州农村信用联社','成都农商银行','承德银行','朝阳银行','城市商业银行资金清算中心']},{initial:'D',cells:['大连银行','东莞农村商业银行','德阳商业银行','东莞银行','东营市商业银行','丹东银行','德州银行']},{initial:'E',cells:['鄂尔多斯银行']},{initial:'F',cells:['福建海峡银行','富滇银行','阜新银行','抚顺银行']},{initial:'G',cells:['国家开发银行','广东发展银行','贵阳市商业银行','广东省农村信用社联合社','广州银行','桂林银行','贵州省农村信用社','赣州银行','广西北部湾银行','广州农商银行','甘肃省农村信用','广西省农村信用','广东南粤银行']},{initial:'H',cells:['华夏银行','恒丰银行','杭州银行','徽商银行','汉口银行','湖州市商业银行','河北银行','华融湘江银行','河北省农村信用社','湖北银行黄石分行','湖北银行宜昌分行','邯郸银行','河南省农村信用','衡水银行','湖北银行','湖北省农村信用社','湖南省农村信用社']},{initial:'J',cells:['交通银行','江苏银行','嘉兴银行','晋城银行JCBANK','江苏省农村信用联合社','晋中市商业银行','吉林银行','晋商银行','吉林农信','江苏太仓农村商业银行','江苏江阴农村商业银行','锦州银行','九江银行','江西省农村信用','济宁银行','金华银行']},{initial:'K',cells:['昆仑银行','库尔勒市商业银行','昆山农村商业银行','开封市商业银行']},{initial:'L',cells:['龙江银行','辽阳市商业银行','廊坊银行','莱商银行','乐山市商业银行','临商银行','兰州银行','洛阳银行']},{initial:'N',cells:['南京银行','宁波银行','南昌银行','南海农村信用联社','内蒙古银行','宁夏银行','宁夏黄河农村商业银行','南充市商业银行','农信银清算中心']},{initial:'P',cells:['平安银行','平顶山银行']},{initial:'Q',cells:['青岛银行','齐商银行','齐鲁银行','青海银行']},{initial:'S',cells:['上海浦东发展银行','上海农村商业银行','上海银行','绍兴银行','顺德农商银行','苏州银行','上饶银行','山东农信','盛京银行','深圳农村商业银行','四川省农村信用','陕西信合','石嘴山银行','三门峡银行']},{initial:'T',cells:['台州银行','天津农商银行','天津银行','泰安市商业银行']},{initial:'W',cells:['温州银行','吴江农商银行','乌鲁木齐市商业银行','无锡农村商业银行','潍坊银行','武汉农村商业银行','威海市商业银行']},{initial:'X',cells:['兴业银行','邢台银行','西安银行','新乡银行','信阳银行','许昌银行']},{initial:'Y',cells:['玉溪市商业银行','尧都农商行','云南省农村信用社','营口银行','阳泉银行','宜宾市商业银行','鄞州银行']},{initial:'Z',cells:['中国工商银行','中国农业银行','中国银行','中国建设银行','中国邮政储蓄银行','招商银行','中国民生银行','中信银行','中国光大银行','浙商银行','长沙银行','重庆银行','遵义市商业银行','浙江泰隆商业银行','浙江民泰商业银行','浙江稠州商业银行','张家港农村商业银行','重庆农村商业银行','自贡市商业银行','浙江省农村信用社联合社','驻马店银行','重庆三峡银行','中山小榄村镇银行','郑州银行','张家口市商业银行','周口银行']}]
            }
        },
        methods: {
            go () {
               
            },
            selectItem (e, data) {
              this.selected = data.title;
              this.$store.state.bank = data.title
              this.$router.back()
            },
            selectHot (e) {
              if (e.target.nodeName === 'LI') {
                  this.selected = e.target.innerText
                  this.$store.dispatch('set_bank', e.target.innerText).then(_=>{
                    this.$router.push('/carsellapply')
                  })
              }
            }
        },
        components: {
            indexList,
            listSection,
            cell
        },
        beforeMount () {
            this.$nextTick(() => {
                this.myele = this.$refs.myele
            })
        }
  }
</script>


<style lang="scss">
@import "~@sass/_variables";
@import "~@sass/_func";

#BankSelect {
    font-size: pxToRem(32px);
    overflow: hidden;
    position: relative;

    .BankSelect__warp {
        overflow: scroll;
    }

    .mint-cell-wrapper {
        margin-bottom: 0;
        padding: 0 pxToRem(20px);
    }

    .title {
      font-size: pxToRem(27px);
      color: #222222;
      line-height: pxToRem(69px);
      height: pxToRem(69px);
      padding: 0 pxToRem(31px);
      margin: pxToRem(10px) 0;
    }

    .cell {
        @include flex(false, center);
        justify-content: space-between;
        padding: 0 pxToRem(31px);
        height: pxToRem(88px);
        background-color: #ffffff;
        font-size: pxToRem(32px);


        .cell-left {
          
        }

        .cell-right {
            color: #0e6ae7;
        }
    }

    .list-ul {
      display: flex;
      justify-content: space-around;
      margin: 0 pxToRem(31px);
      flex-wrap: wrap;

      li{
        list-style: none;
        width: pxToRem(206px);
        height: pxToRem(88px);
        line-height: pxToRem(88px);
        text-align: center;
        background-color: #ffffff;
        margin-bottom: pxToRem(20px);
      }
    }
}

</style>
