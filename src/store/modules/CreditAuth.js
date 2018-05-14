const creditAuth = {
    state: {
        globleAuthState:null,
    },
    getters: {
        globleAuthState:state => state.globleAuthState
    },
    mutations: {
        setGlobleState: (state,gaState) => {
            state.globleAuthState = gaState
        }
    }
}

export default creditAuth
