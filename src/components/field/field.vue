<template>
  <x-cell
    class="mint-field"
    :title="label"
    v-clickoutside="doCloseActive"
    :class="[{
      'is-textarea': type === 'textarea',
      'is-nolabel': !label
    }]">

    <div class="input_div">

        <!-- 顶部Label / 顶部错误提示Label -->
        <div class='input_div_label'       
            :class='{show: showTopLabel, errTopLabel: errTopLabel !== ""}'  
            v-if='topLabel' 
            @click='topLabelClick'>
            <span>{{ errTopLabel === '' ? topLabel : errTopLabel }}</span>
        </div>

        <!-- 当存在顶部Label的时候才配合存在的placeholder -->
        <div class='input_div_placeholder' :class='{show: currentValue === "" && showTopLabel}' v-if='topLabel'>{{ placeholder}}</div>

        <input
            class="mint-field-core"
            ref="input"
            :maxlength = "maxlength"
            :class="_myClass"
            :placeholder="topLabel ? '' : placeholder"
            :type="type && type != 'number' ? type : 'text'" 
            :disabled="disabled"
            :readonly="readonly"
            :value="currentValue"
            @focus="myFocus"
            @blur='myBlur'
            @keyup="myKeyup"
            @change="myChange"
            @click="myClick"
            @input="handleInput"
            @keyup.enter="enterHandle"
        />

    </div>
    
    <div>
        <!-- 密码框的眼睛 -->
        <i class="eye" :class="{open: eyeopen}" v-if="type === 'password'" @click="pwdclick"></i>

        <!-- 取消按钮 -->
        <i class="clearText" v-if="currentValue && clearText && (type == 'text' || type == 'number') " @click="clearTextClick"></i>

        <!-- 自定义右侧图标 -->
        <slot name="icon"></slot>
    </div>
  </x-cell>
</template>

<script>
    import XCell from '../cell.vue';
    import Clickoutside from './clickoutside';
    import Toast from '@components/toast/index.js'

    export default {
        name: 'mt-field',
        data() {
            return {
                active: false,
                currentValue: this.value,
                eyeopen: false,
                showTopLabel: true
            };
        },
        directives: {
            Clickoutside
        },
        props: {
            value: {},
            rows: String,
            label: String,
            placeholder: String,
            readonly: Boolean,
            disabled: Boolean,
            disableClear: Boolean,
            attr: Object,
            type: {type: String},
            state: {type: String,default: 'default'},
            maxlength: Number | String,
            _myClass: String,
            topLabel: String,
            _placeholder: String,
            enterHandle: Function,
            errTopLabel: String,
            clearText: {type: Boolean, default: true },
            type: {
                type: String,
                default: 'text'
            }
        },
        components: {
            XCell
        },
        methods: {           
            doCloseActive() {
                this.active = false;
            },
            handleInput (evt) {
                this.currentValue = evt.target.value;
                
                // 当同时设置了type=number和maxlength的时候，maxlength是无效的，所以我们需要手动设置
                if (this.maxlength && this.type && this.type.toLowerCase() === 'number' && this.currentValue.length > this.maxlength) {
                    this.currentValue = this.currentValue.slice(0,6);
                }
            },
            handleClear() {
                if (this.disabled || this.readonly) return;
                this.currentValue = '';
            },
            pwdclick () {
                if (this.$refs.input.getAttribute('type') === 'password') {
                    this.eyeopen = true;
                    this.$refs.input.setAttribute('type', 'text');    
                } else {
                    this.eyeopen = false;
                    this.$refs.input.setAttribute('type', 'password');    
                }
                this.$refs.input.focus()
            },
            topLabelClick () {
               this.showTopLabel = true
               this.$refs.input.focus()
            },
            myKeyup () {
                if (this.type == 'number') {
                    this.currentValue = this.currentValue.replace(/\D/g, '');
                }


                this.$emit('keyup', this.currentValue)
            },
            myChange () {
                this.$emit('change',this.currentValue);
            },
            myBlur () {
                // 如果有topLabel存在，并且当前没值的时候，并且没有错误信息的时候，才重置
                if (this.topLabel && !this.currentValue && !this.errTopLabel) {
                    // errTopLabel 修改速度比blur的慢，所以这个做法暂时做不了。先取消吧
                    // this.showTopLabel = false
                }
            },
            myFocus (e) {
                this.active = true

            // 　  function getElementTop(element){
            //         try {
            // 　  　　　var actualTop = element.offsetTop;
            // 　  　　　var current = element.offsetParent;
            // 　  　　　while (current !== null){
            // 　  　　　　　actualTop += current.offsetTop;
            // 　  　　　　　current = current.offsetParent;
            // 　  　　　}
            // 　  　　　return actualTop;
            //         } catch (e) {}
            // 　  　}
  
            //     setTimeout(() => {
            //         window.scrollTo(0, getElementTop(e.target));
            //     }, 150)
            },
            myClick (e) {
                this.$emit('textClick', e)

                // 如果是密码框，那么闭眼吧
                if (this.type === 'password') {
                    // this.currentValue = ''
                    // 聚焦input
                    this.$refs.input.focus()
                }
            },
            clearTextClick () {
                // 显示顶部label
                this.showTopLabel = true
                // 清空文本，注意，这会触发watch value
                this.currentValue = ''
                // 聚焦input
                this.$refs.input.focus()
            }
        },
        watch: {
            value(val) {
                this.currentValue = val

                // 如果v-model有值或者当前文本框被聚焦的时候。那么label应该浮动上去
                // this.showTopLabel = this.currentValue || document.activeElement == this.$refs.input ? true : false
            },
            currentValue(val) {
                this.$emit('input', val);
            },
            attr: {
                immediate: true,
                handler(attrs) {
                    this.$nextTick(() => {
                        const target = [this.$refs.input, this.$refs.textarea];
                        target.forEach(el => {
                            if (!el || !attrs) return;
                            Object.keys(attrs).map(name => el.setAttribute(name, attrs[name]));
                        });
                    });
                }
            }
        }
    };
</script>

<!-- 这里必须不使用Scoped -->
<style lang="scss">
@import "~@sass/_variables";
@import "~@sass/_func";

.mint-field {

    display: flex;

    .mint-cell-title {
        width: pxToRem(150px);
        flex:none !important;
    }

    .input_div {
        position: relative;
        font-size: inherit;
        color: rgba(0,0,0,.38);
        flex: 1;

        .input_div_label {
            width: 100%;
            height: 100%;
            position: absolute;
            left: 0;
            top: 0;
            transition: all .45s cubic-bezier(.23,1,.32,1);
            z-index: 1;
            line-height: pxToRem(56px);
 
            &.show {
               color: #0e6ae7;
               font-size: pxToRem(24px);
               transform: translateY(pxToRem(-60px));
               display: flex;
               justify-content: flex-start;
               align-items: center;
            }

            &.errTopLabel {
                color: #ff3841;
            }
        }

        .input_div_placeholder {
            width: 100%;
            // height: 100%;
            position: absolute;
            left: 0;
            top: 50%;
            transition: opacity .35s cubic-bezier(.23,1,.32,1);
            transform: translateY(-50%);
            opacity: 0;
            line-height: pxToRem(56px);
            z-index: 0;

            &.show {
                opacity: 1;
            }
        }
    }

    &.is-textarea {
        align-items: inherit;

        .mint-cell-title {
            padding: pxToRem(10px * 2) 0;
        }

        .mint-cell-value {
            padding: pxToRem(5px * 2) 0;
        }
    }

    .mint-cell-value {
        color: inherit;
        display: flex;
        flex: 1;
    }

    .mint-field-core {
        // flex: 1;
        background: none;
        border-radius: 0;
        border: 0;
        overflow-wrap: break-word;
        word-break: break-all;
        outline: 0;
        line-height: 1.6;
        font-size: inherit;
        width: 100%;
        color: #333;
        position: relative;

        &[readonly] {
            color: #999;
        }

        &[readonly].readonly_black {
          color: #333;
        }
    }

    .mint-field-clear {
        opacity: .2;
    }

    .mint-field-state {
        color: inherit;
        margin-left: pxToRem(20px * 2);

        .mintui {
            font-size: pxToRem(20px * 2);
        }

        &.is-error {
            color: #f44336;
        }

        &.is-warning {
            color: #ffc107;
        }

        &.is-success {
            color: #4caf50;
        }

        &.is-default {
            margin-left: 0;
        }
    }

    .mint-field-other {
        position: absolute;
        top: 50%;
        right: 0;
        transform: translateY(-50%);
    }

    &.is-nolabel {
        .mint-cell-title {
            display: none;
        }
    }

    .eye {
        @include bg(60px, 60px, "~@assets/icon_closeeye.png")
        float:right;

        &.open {
          background-image: url("~@assets/icon_eye.png");
        }
    }

    .clearText {
       @include bg(30px, 30px, "~@assets/close.png")
       margin-right: pxToRem(10px);
    }
}
</style>
