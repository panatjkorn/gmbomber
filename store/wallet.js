const state = () => ({
    user_credit : null,
})

const mutations = {
    addWalletToState(state,payload) {
        // console.log('payload',payload);
      state.user_credit = payload
    }
  }
  
  const actions = {
    setWallet(vuexContext, context) {
        // console.log('context',context.wallet);
      vuexContext.commit('addWalletToState', context);
    },
  }
  
  const getters = {
    moneyWallet: state => state.user_credit,
  }
  
  export default {
    namespaced: true,
    state,
    mutations,
    getters,
    actions
  };