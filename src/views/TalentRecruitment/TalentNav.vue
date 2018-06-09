<template>
    <div class="nav">
        <div class="nav-icon" v-on:click.stop="showNavPanel"></div>
        <div class="nav-logo"></div>
        <transition name="fade">
            <div class="nav-panel" v-show="navPanelVisiable">
                <router-link class="nav-item" :class="activated == item.name ? 'active': ''" v-for="item in navList" :key="item.path" :to="item.path">{{item.name}}</router-link>
                <div class="nav-panel-modal" v-on:click.stop="hideModal"></div>
            </div>
        </transition>
    </div>
</template>

<style lang="scss" scoped>
    @import "../../sass/variables";
    @import "../../sass/func";
    .nav {
        position: relative;
        width: 100%;
        height: 1.253333rem;
        border-bottom:.026667rem solid #ebebeb;
        background: #fff;
        @include flex(b, center);
        .nav-icon {
            margin-left:0.4rem;
            flex-shrink:0;
            width: .6rem;
            height: .4rem;
            background: url('~@/assets/talent_nav_icon.png') no-repeat;
            background-size: 100% 100%;
        }
        .nav-logo {
            margin-right:0.4rem;
            flex-shrink:0;
            width:1.973333rem;
            height: .506667rem;
            background: url('~@/assets/logo.png') no-repeat;
            background-size: 100% 100%;
        }
        .nav-panel {
            width: 100%;
            padding:0 .4rem;
            background: #fff;
            position: absolute;
            top:1.253333rem;
            left:0;
            right:0;
            z-index: 50;
            .nav-panel-modal{
                width: 100%;
                height: 100%;
                background: transparent;
                position: fixed;
                top: 1.253333rem;
                left: 0;
                right: 0;
                z-index: -1;
            }
            .nav-item{
                display: block;
                width: 100%;
                line-height: 1.28rem;
                font-size: .4rem;
                color:#666;
                border-bottom: .013333rem solid #ebebeb;
            }
            .nav-item.active{
                color:#cfa972;
            }
        }
    }
    .fade-enter-active, .fade-leave-active {
        transition: opacity 0.25s ease-out;
    }

    .fade-enter, .fade-leave-to {
        opacity: 0;
    }

</style>

<script>
    export default {
        data() {
            return {
                navPanelVisiable:false,
                navList: [
                    {
                        path:'/JoinUs',
                        name:'加入我们'
                    },
                    {
                        path:'/CorporateWelfare',
                        name:'公司福利'
                    },
                    {
                        path:'/ContactUs',
                        name:'联系我们'
                    }
                ]
            }
        },
        props: {
           activated: {
               type:String,
               default:'加入我们'
           } 
        },
        methods: {
            showNavPanel() {
                this.navPanelVisiable = !this.navPanelVisiable
            },
            hideModal() {
                this.navPanelVisiable = false
            }
        }
        
    }
</script>

