<template>
<!-- bg-gradient-to-b from-black via-black to-red-400 -->
  <div class="font-kanit max-h-screen">
    <div class="backgroundImage font-kanit">
      <Navbar 
        :user-detail="user_detail"
        :wallet-money="walletMoney"
      />
      <div class="wrapper px-8">
        <div class="wrapper-box">
          <div class="content md:p-8">
            <nuxt />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  components: {
  },
  middleware : ['checkUUId'],
  data() {
    return { 
      formattedMenu: '',
      user_detail : '',
      walletMoney : '',
      token : this.$route.query.token,
      uuId : this.$route.query.token.split("[SALT]")[2],
    };
  },
  created() {
    this.setUUidToStore()
  },
  mounted() {
    
    this.getMoneyUser();
    // if(this.$store.state.auth.loggedIn) {
    //   this.getMe()
    // }
  },
  methods: {
    async setUUidToStore() {
      let uuIdUser = await this.token
      await this.$store.dispatch('user/setUUId',uuIdUser)
    },
    async getMoneyUser() {
      const url = `/wallet_game/init_wallet?token=${this.token}`

      try {
        const getMoney = await this.$axios.$get(url)
        this.walletMoney = getMoney.data;
      } catch(err) {
        console.log(err);
      }
    }
    // async getMe() {
    //   const url = `/users/me`
    //   try {
    //     const getUserDetail = await this.$axios.get(url);
    //     this.user_detail = await getUserDetail.data.data;
    //     await this.$store.dispatch('wallet/setWallet',this.user_detail)
    //     this.walletMoney = this.$store.state.wallet.money_wallet;
    //   } catch(err) {
    //     console.log(err);
    //   }
    // }
  },
};
</script>

<style></style>
