let state = {
    AppData: {
        UserId: 'c9872aac-13b5-43f5-b889-796da5da963b',
        isLogin: false,
        phone: ''
    }
}

const getters = {
    AppData(state) {
        return state.AppData
    }
}

const actions = {
    setAppData({ commit, state }, data) {
        state.AppData = Object.assign({}, state.AppData, data);
    }
}

export default {
    state,
    getters,
    actions
}