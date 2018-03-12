let state = {
    siteMap: []
}

const getters = {
  // 获取【后退路径】（既上一页的路径）
  siteMap (state) {
    let lastSecondIndex = state.siteMap.length - 2
    if (lastSecondIndex >= 0) {
      return state.siteMap[lastSecondIndex].path
    }
    return '/Index'
  },
  lastSiteMap (state) {
     let lastSecondIndex = state.siteMap.length - 1
    if (lastSecondIndex >= 0) {
      return state.siteMap[lastSecondIndex].path
    }
    return '/Index'
  }
}

const actions = {
  setSiteMap ({ commit, state, getters }, obj) {
    // 如果路径为根目录
    if (obj.path === '/' || obj.path.toLowerCase() === '/Index') {

       // 重置地图链
       state.siteMap = [obj]

    // 否则执行地图链操作逻辑
    } else {
      // 获取数组长度
      let lastIndex = state.siteMap.length - 1;
      // 如果数组最后一个对象的name属性和当前传递进来的name属性一致的话。说明是在子路由或者本路由中切换
      if (state.siteMap[lastIndex] && state.siteMap[lastIndex].name === obj.name) {
        // 则替换它
        state.siteMap[lastIndex] = obj;
       // 如果倒数第二个的Name等于传递进来这个name，说明路由往回走了。这时候，要移除数组最后一个
      } else if (state.siteMap[lastIndex - 1] && state.siteMap[lastIndex - 1].name === obj.name) {
        state.siteMap.pop()
        // 如果又回到根目录的话
      } else {
        // 否则直接插入地图链中
        state.siteMap.push(obj);
      }
    }
  },
  popSiteMap ({ commit, state, getters }) {
      state.siteMap.pop();
  }
}


export default {
  state,
  getters,
  actions
}
