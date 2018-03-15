let state = {
    AppData: {
        openId: '55afe48f-0079-4198-ad88-687d949410a3',
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