
let state = {
    stationInfo:{},
}

const getters = {
    stationInfo: state => state.stationInfo
}

const actions = {
    setStationInfo({ commit, state }, item) {
       state.stationInfo = item
    }
} 

export default {
    state,
    getters,
    actions
}