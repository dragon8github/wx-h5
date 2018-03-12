let state = {
    FastStatus: {
        'text': `<p class="status-text-p">已经通知信贷顾问为你办理线下结清手续，<br />将会将会在24小时内联系您！</p>`,
        'button': '返 回 主 页',
        'status': 'success',  // [success, fail, warn]
        'url': 'Fast'
    },
    CarSellApplyStatus: {
        'text': `<p class="status-text-p">已经通知信贷顾问为你办理线下结清手续，<br />将会将会在24小时内联系您！</p>`,
        'button': '返 回 主 页',
        'status': 'success',  // [success, fail, warn]
        'url': 'CarSell'
    },
    ErrorPageStatus: {
        'text': `<p class="status-text-p">已经通知信贷顾问为你办理线下结清手续，<br />将会将会在24小时内联系您！</p>`,
        'button': '返 回 主 页',
        'status': 'success',  // [success, fail, warn]
        'url': 'CarSell'
    }
}

const getters = {
    FastStatus(state) {
        return state.FastStatus;
    },
    CarSellApplyStatus(state) {
        return state.CarSellApplyStatus;
    },
    ErrorPageStatus(state) {
        return state.ErrorPageStatus;
    }
}

const actions = {
    setFastStatus({ commit, state }, data) {
        state.FastStatus = Object.assign(state.FastStatus, data)
    },
    CarSellApplyStatus({ commit, state }, data) {
        state.CarSellApplyStatus = Object.assign(state.CarSellApplyStatus, data)
    },
    ErrorPageStatus({ commit, state }, data) {
        state.ErrorPageStatus = Object.assign(state.ErrorPageStatus, data)
    }
}

export default {
    state,
    getters,
    actions
}
