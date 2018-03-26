let state = {
    RepayHistoryInfo: {
    }
}

const getters = {
    RepayHistoryInfo(state) {
        return state.RepayHistoryInfo
    }
}

const actions = {
    setRepayHistoryInfo({ commit, state }, data) {
        state.RepayHistoryInfo = Object.assign({}, state.RepayHistoryInfo, data);
    }
}

export default {
    state,
    getters,
    actions
}