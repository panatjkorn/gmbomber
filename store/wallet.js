const state = () => ({
    user_point : null,
})

const mutations = {
    addWalletToState(state,payload) {
        // console.log('payload',payload);
      state.user_point = payload
    }
  }
  
  const actions = {
    setWallet(vuexContext, context) {
        // console.log('context',context.wallet);
      vuexContext.commit('addWalletToState', context);
    },
  }
  
  const getters = {
    moneyWallet: state => state.user_point,
  }
  
  export default {
    namespaced: true,
    state,
    mutations,
    getters,
    actions
  };