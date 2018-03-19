let state = {
    CarInfoData: {
       
    }
}

const getters = {
    CarInfoData(state) {
        return state.CarInfoData
    }
}

const actions = {
    setCarInfoData({ commit, state }, data) {
        state.CarInfoData = Object.assign({}, state.CarInfoData,  data);
    }
}

export default {
    state,
    getters,
    actions
}