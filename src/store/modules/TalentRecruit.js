
let state = {
    area:[],
    provinceList:[],
    cityList:[]
}

const getters = {
    area: state => state.area,
    provinceList: state => state.provinceList,
    cityList: state => state.cityList
}

const actions = {
    getAreaData({ commit, state }, data) {
        state.area = data
        let arr = []
        if (data && data.length > 0) {
            for (var i = 0; i < data.length; i++) {
                arr.push({name:data[i].provinceName, provinceId:data[i].provinceId})
            }
        }
        state.provinceList = arr
    },
    setCityData({commit, state}, provinceId) {
        // 从所有数据中，找到对应省份id的城市
        for (var i = 0; i < state.area.length; i++) {
            // 找到对应省份id的城市
            if (state.area[i].provinceId == provinceId) {
                // 拿到该省份所有的城市
                let test = state.area[i].citys
                // 转化一下key的名字，我们约定必须为.name
                for (var j = 0; j < test.length; j++) {
                    // 我们约定必须为.name
                    test[j].name = test[j].cityName
                }
                // 更新 state 数据
                return state.cityList = test
            }
        }
    }
} 

export default {
    state,
    getters,
    actions
}