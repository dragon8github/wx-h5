let state = {
    AppData: {
        Ip : '',
        SystemName : '', 
        Version : '',
        city: '',
        nickname: '',
        image: '',
        phone: '',
        id: '',
        isLogin: false,
        wantTo: ''
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