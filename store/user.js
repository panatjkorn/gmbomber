const state = () => ({
    uuId : null,
    wallet_token : null
})

const mutations = {
    addUUIDToState(state,payload) {
        state.uuId = payload.split("[SALT]")[1]
        state.wallet_token = payload
    }
}

const actions = {
    setUUId(vuexContext, context) {
        vuexContext.commit('addUUIDToState', context);
    },
}

const getters = {
    getUUId : state => state.uuId,
    getWalletToken : state => state.wallet_token,
}


export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
  };
