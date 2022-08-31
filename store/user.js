const state = () => ({
    wallet : null
})

const mutations = {
    setWalletToState(state,payload) {
        state.wallet = payload.wallet
    }
}

const actions = {
    setWallet(vuexContext, context) {
        vuexContext.commit('setWalletToState', context);
    },
}

const getters = {
    getWallet : state => state.wallet,
}


export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
  };
