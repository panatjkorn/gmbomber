<template>
<!-- bg-gradient-to-b from-black via-black to-red-400 -->
<!-- bg-black-vdo -->
<div class="font-kanit min-h-0 bg-black-vdo">
  <div class="backgroundImage min-h-screen">
    <!-- <Navbar 
      :user-detail="user_detail"
      :wallet-money="walletMoney"
    /> -->
    <!-- <Nuxt /> -->
    <div class="relative top-0 ">
      <!-- 594 -->
        <video 
            autoplay 
            loop 
            playsinline 
            muted 
            preload="metadata" 
            width="auto" 
            height="auto" 
            class="
                mx-auto 
                my-auto 
                z-10
                min-h-screen
                h-full
                sm:h-auto
                lg:h-full
                sm:w-2/3
                md:w-2/3
                lg:w-2/3
                xl:w-1/2
                2xl:w-1/2
            "
        >
        <source src="@/assets/img/Bomb-BG-FINAL1.mp4" type="video/mp4">
        </video>
        <div 
            class="
                absolute
                top-0
                left-0
                right-0
            "
            >
            <div class="wrapper-box">
                <div class="content">
                  <!-- class="min-h-screen" -->
                  <Nuxt  />
                </div>
            </div>
        </div>
    </div>
    <!-- <Footer /> -->
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
      token : `${this.$route.query.b}[SALT]${this.$route.query.tk}[SALT]${this.$route.query.user}`,
      uuId : this.$route.query.user,
    };
  },
  created() {
    this.setUUidToStore()
    this.getMoneyUser();
  },
  mounted() {
    // this.getMoneyUser();
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
        // this.walletMoney = getMoney.data;
        await this.$store.dispatch('wallet/setWallet',getMoney.data.points)
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

<style>
video {
  object-fit: cover;
  height: 100vh;
}


.viewport-header {
  position: relative;
  height: 100vh;
  top: 100;
  /* text-align: center;
  display: flex;
  align-items: center;
  justify-content: center; */
}
</style>
