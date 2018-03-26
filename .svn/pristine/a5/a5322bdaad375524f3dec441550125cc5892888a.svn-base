let state = {
    BorrowInfoData: {
        Schedule: '',
        BorrowMoney: '',
        BorrowLimit: '',
        RepaymentType: '',
        StoreName: ''
    }
}

const getters = {
    BorrowInfoData(state) {
        return state.BorrowInfoData
    }
}

const actions = {
    setBorrowInfoData({ commit, state }, data) {
        state.BorrowInfoData = Object.assign({}, state.BorrowInfoData, data);
    }
}

export default {
    state,
    getters,
    actions
}