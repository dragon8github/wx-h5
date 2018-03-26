import InfiniteScroll from './directive';
import Vue from 'vue';

const install = function(Vue) {
  Vue.directive('InfiniteScroll', InfiniteScroll);
};


// 李钊鸿注释掉了if语句
// if (!Vue.prototype.$isServer && window.Vue) {
  window.infiniteScroll = InfiniteScroll;
  Vue.use(install); // eslint-disable-line
// }

InfiniteScroll.install = install;
export default InfiniteScroll;
