<template>
    <div class="checkbox-wrap" :style="{display:display}">
        <div class="checkbox-item" v-for="(item,index) in checkboxList" :key="index">
            <input :id="item" class="checkbox" :value="item" type="checkbox" v-model="checkedNames">
            <i class="checkbox-checked">✓</i>
            <label :for="item">{{item}}</label>
        </div>
    </div>
</template>

<script>
    export default {
        name:'checkboxGroup',
        data () {
            return {
               checkedNames: []
            }
        },
        props:{
            checkboxList:{
                type:Array,
                default:() => [
                    '多选项1','多选项2','多选项3','多选项4'
                ]
            },
            display:{
                type:String,
                default:'inline-block'
            },
        },
        watch:{
            'checkedNames':function(val){
                console.log('checkedNames',val)
                this.$emit('onChange',val)
            }
        }
        
    }
</script>
<style lang="scss" scoped>
    @import "~@sass/_variables";
    @import "~@sass/_func";
    .checkbox-wrap{
        display: inline-block;
        font-size: 0;
        .checkbox-item{
            @include flex(false,center);
            position: relative;
            margin:pxToRem(15px);
            label{
                margin-left:pxToRem(15px);
                @include f28;
            }
        }
        .checkbox-checked{
        @include f28;
        font-style:normal;
        display:block;
        @include size(40px,40px);
        text-align:center;
        line-height:pxToRem(40px);
        color:#fff;
        vertical-align:middle;
        border:#2489c5 pxToRem(1px) solid;
      }
      .checkbox{
        @include size(48px,48px);
        position: absolute;
        top: 0;
        left: 0;
        opacity: 0;
      }
      .checkbox:checked + .checkbox-checked{
        background:#2489c5;
      }
      .checkbox:disabled + .checkbox-checked{
        border-color:#ccc;
      }
    }
</style>