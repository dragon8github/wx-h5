<template>
  <div class="radio-wrap" :style="{display:display}">
      <div class="radio-item" v-for="(item,index) in radioList" :key="index"> 
        <input class="radio" :id="item" type="radio" v-bind:name="name" v-bind:value="item" v-model="privateChecked">
        <i class="radio-checked">✓</i>
        <label :for="item">{{item}}</label>
      </div>
  </div>
</template>

<script>
    export default {
        name:'radioGroup',
        data () {
            return {
               privateChecked: ''
            }
        },
        props:{
            display:{
                type:String,
                default:'inline-block'
            },
            radioChecked:{
                type:String,
                default:''
            },
            radioList:{
                type:Array,
                default:() => [ '1级','2级','3级']
            },
            name:{
                type:String,
                default:'test'
            }
        },
        watch:{
            'privateChecked':function(val){
                this.$emit('onChange',val)
            }
        }
        
    }
</script>
<style lang="scss" scoped>
    @import "~@sass/_variables";
    @import "~@sass/_func";
    .radio-wrap{
        display: inline-block;
        font-size: 0;
        .radio-item{
            @include flex(false,center);
            position: relative;
            margin:pxToRem(15px);
            label{
                margin-left:pxToRem(15px);
                @include f28;
            }
        }
        .radio-checked{
        @include f28;
        font-style:normal;
        display:block;
        @include size(40px,40px);
        text-align:center;
        line-height:pxToRem(40px);
        color:#fff;
        vertical-align:middle;
        border:#2489c5 pxToRem(1px) solid;
        border-radius: 50%;
      }
      .radio{
        @include size(48px,48px);
        position: absolute;
        top: 0;
        left: 0;
        opacity: 0;
      }
      .radio:checked + .radio-checked{
        background:#2489c5;
      }
      .radio:disabled + .radio-checked{
        border-color:#ccc;
      }
    }
</style>