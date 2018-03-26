/**
 * getter 是一种专门供vue组件调用的函数,它的职责是获取vuex中的state
 * 必须是 return 才可以在正常获取
 * 事实上直接通过this.$store.state.xxxx 方式也可以获取到state。
 * getters的意义在于可以在获取时进一步操作。并且以函数的形式管理数据返回也符合函数式编程风格。
 */

// 返回异步请求的数量
export const fetchCount = (state) => state.fetchCount

// 返回HTML的fontsize
export const fontSize = () => {
   var h = document.getElementsByTagName("html");
   var fontSizePx = getComputedStyle(h[0])["font-size"];
   var fontSize = fontSizePx.substring(0, fontSizePx.length - 2)
   return fontSize;
}

// 返回HTML的data-dpr
export const dataDpr = () => {
   return document.getElementsByTagName("html")[0].getAttribute('data-dpr');
}