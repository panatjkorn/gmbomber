<template>
<!-- bg-gradient-to-b from-black via-black to-red-400 -->
<!-- bg-black-vdo -->
<div class="font-kanit h-screen bg-black-vdo">
  <div class="backgroundImage">
    <Navbar 
      :user-detail="user_detail"
      :wallet-money="walletMoney"
    />
    <!-- <Nuxt /> -->
    <video 
      autoplay 
      loop 
      playsinline 
      muted 
      preload="metadata" 
      width="599" 
      height="auto" 
      class="
        mx-auto 
        my-auto 
        min-height-screen
      "
    >
      <source src="@/assets/img/Bomb-BG-FINAL1.mp4" type="video/mp4">
    </video>
    <!-- position-child -->
    <!-- absolute 
        wrapper 
        px-2 
        position-child 
        se: top-1/2 left-1/2
        iphone8plus : mt-0
        xs:mt-1
        lg: top-1/3
        xl: top-96 -->
    <div 
      class="
        absolute
        wrapper 
        px-2 
        position-child 
        se: top-1/2 left-1/2
        iphone8plus : mt-0
        xs:mt-1
        lg: top-1/3
        xl: top-96
      "
      >
      <div class="wrapper-box">
        <div class="content md:p-8 md:pt-0">
          <Nuxt class="min-h-screen" /> 
        </div>
      </div>
    </div>
  </div>
</div>
  <!-- <div class="font-kanit">
    <div class="font-kanit relative backgroundImage h-100">
      <Navbar 
        :user-detail="user_detail"
        :wallet-money="walletMoney"
      />
      <video autoplay loop playsinline muted preload="metadata" width="auto" height="auto" class="mx-auto max-h-screen">
          <source src="@/assets/img/Bomb-BG-FINAL1.mp4" type="video/mp4">
        </video>
      <div class="position-child bg-red-500">
        <p>Absolute child</p>
      </div>
      <div class="position-child wrapper px-8">
        <div class="wrapper-box">
          <div class="content md:p-8">
            <nuxt />
          </div>
        </div>
      </div>
    </div>
  </div> -->
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
