import * as type from './mutation-types.js'

const mutations = {
	// 添加或者减少fetch请求数量
	[type.SET_FETCH_COUNT] (state, b) {
		if (b === '-') { 
			state.fetchCount--
		} else if (b === '+') {
			state.fetchCount++
		}
	}
}

export default mutations;