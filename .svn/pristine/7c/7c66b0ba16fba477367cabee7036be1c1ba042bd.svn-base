import Vue from 'vue'
import Vuex from 'vuex'

// base
import mutations from './base/mutations.js'
import * as actions from './base/actions'
import * as getters from './base/getters'
import * as state from './base/state.js'

// modules
import AppData from './modules/AppData'
import siteMap from './modules/siteMap'
import requestTimer from './modules/requestTimer'
import transition from './modules/transition'
import status from './modules/status'
import BorrowInfo from './modules/BorrowInfo'
import CarInfoData from './modules/CarInfoData'
import RepayHistoryInfo from './modules/RepayHistoryInfo'
import RepayInfo from './modules/RepayInfo'


Vue.use(Vuex)

const store = new Vuex.Store({
    modules: {
        AppData,
        siteMap,
        requestTimer,
        BorrowInfo,
        CarInfoData,
        status,
        RepayHistoryInfo,
        RepayInfo,
        transition: {
            namespaced: true,
            ...transition
        }
    },
    state,
    getters,
    actions,
    mutations
})

export default store
