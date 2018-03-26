let state = {
    RepayInfo: {
    }
}

const getters = {
    RepayInfo(state) {
        return state.RepayInfo
    }
}

const actions = {
    setRepayInfo({ commit, state }, data) {
        state.RepayInfo = Object.assign({}, state.RepayInfo, data);
    }
}

export default {
    state,
    getters,
    actions
}