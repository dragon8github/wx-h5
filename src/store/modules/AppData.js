let state = {
    // 开发使用
    AppData_dev: {
        Ip : '10.110.1.131',
        SystemName : 'IOS',           
        Version : '99.99',
        city: '',
        nickname: '',
        image: '',
        phone: '',
        id: ''
    },

    // 正式使用
    AppData_pro: {
        Ip : '',
        SystemName : '',     
        Version : '',
        city: '',
        nickname: '',
        image: '',
        phone: '',
        id: ''
    }
}

const getters = {
    AppData(state) {
        if (process.env.NODE_ENV === 'production') {
            return state.AppData_pro
        } else {
            return state.AppData_dev;
        }
    }
}

const actions = {
    setAppData({ commit, state }, data) {
        if (process.env.NODE_ENV === 'production') {
            state.AppData_pro = Object.assign({}, state.AppData_pro, data);
        } else {
            state.AppData_dev = Object.assign({}, state.AppData_pro, data);
        }
    }
}

export default {
    state,
    getters,
    actions
}