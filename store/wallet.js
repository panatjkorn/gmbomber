const state = () => ({
    money_wallet : null,
})

const mutations = {
    addWalletToState(state,payload) {
        // console.log('payload',payload);
      state.money_wallet = payload
    }
  }
  
  const actions = {
    setWallet(vuexContext, context) {
        // console.log('context',context.wallet);
      vuexContext.commit('addWalletToState', context.wallet);
    },
  }
  
  const getters = {
    moneyWallet: state => state.money_wallet,
  }
  
  export default {
    namespaced: true,
    state,
    mutations,
    getters,
    actions
  };