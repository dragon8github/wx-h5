/**
 * action 是一种专门供vue组件调用的事件库,它的职责是 通过调用指定的mutations 函数来触发对 state 的更新。
 * 特性：actions支持异步操作；mutations只能进行同步操作。
 * 也许会有这个疑问：为什么不直接调用 actions 来更新 state， 而需要一个中间人 mutations 来更新state？
 * 引用官方的一句话来回答：
 * 【再次强调，我们通过提交 mutation 的方式，而非直接改变 store.state，是因为我们想要更明确地追踪到状态的变化。这个简单的约定能够让你的意图更加明显，这样你在阅读代码的时候能更容易地解读应用内部的状态改变。此外，这样也让我们有机会去实现一些能记录每次状态改变，保存状态快照的调试工具。有了它，我们甚至可以实现如时间穿梭般的调试体验。
由于 store 中的状态是响应式的，在组件中调用 store 中的状态简单到仅需要在计算属性中返回即可。触发变化也仅仅是在组件的 methods 中提交 mutations。】
 * 
 * 话虽如此，但在state进行异步后跳过mutation直接更新state也是可行的。
 * 所以，我们约定，只有产生异步的操作，才需要使用mutation。（严格模式下，该方式是不行的。）
 * 使用严格模式：
 * const store = new Vuex.Store({
    // ...options
    strict: process.env.NODE_ENV !== 'production', // 在非生产环境下，使用严格模式
})
 */

import * as type from './mutation-types.js'

// 添加或者减少fetch请求数量
export const set_fetch_count = ({commit, state}, b) => {
	 commit(type.SET_FETCH_COUNT,b)
}

// 直接清空fetch的请求数量
export const set_fetch_zero = ({commit, state}) => {
   state.fetchCount = 0
}

// 设置translateX的值
export const set_translateX = ({commit, state}, v) => {
  state.translateX = v
}

// 设置translateY的值
export const set_translateY = ({commit, state}, v) => {
  state.translateY = v
}

// 转化rem
export const pxToRem = ({getters}, v) => {
  return v / getters.fontSize
}

// 转化绝对Px
export const pxToPx = ({getters}, v) => {
  return v * getters.dataDpr / 2
}

// 存储token
export const set_token = ({commit, state}, v) => {
  state.token = v
}

// 设置用户需要前往的地址
export const set_wantTo = ({commit, state}, v) => {
  state.wantTo = v
}

// 存储用户的手机号码
export const set_phone = ({commit, state}, v) => {
  state.phone = v
}
