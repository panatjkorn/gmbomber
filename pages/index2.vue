<template>
  <!-- <Tutorial/> -->
  <div class="h-full md:h-screen py-2 md-py-0">
    <div v-if="dataPanels && dataPanels.length > 0" class="grid md:grid-cols-2 lg:grid-cols-6 gap-2 text-color-black">
      <div 
        v-for="(panel,index) in dataPanels" :key="index" 
        class="bg-white p-2 rounded-lg cursor-pointer shadow-md h-14 flex items-center justify-center"
        @click="ModalUserBuyPanel(panel)"
      >
        <h1>{{index+1}}</h1>
      </div>
    </div>
    <client-only>
      <ModalBuyPanel 
        :status-reset-form="statusClearForm"
        @closeModalUserBuyPanel="closeModalUserBuyPanel"
        @userBuyPanel="userBuyPanel"
      />
    </client-only>
  </div>
</template>

<script>
import ModalBuyPanel from '@/components/Modal/ModalBuyPanel';
export default {
  components : {
    ModalBuyPanel
  },
  middleware : ['checkUUId'],
  layout : 'dashboard',
  data() {
    return {
      dataPanels : '',
      statusClearForm : false,
      formManage : null,
      panelId : '',
      uuIdTokenBlueswan : this.$route.query.token.split("[SALT]")[2],
      tokenBlueSwan : this.$route.query.token,
      userMoney : null
    }
  },
  created() {
    this.getDataPanelBomb();
    // console.log('uuIdTokenBlueswan',this.uuIdTokenBlueswan);
  },
  methods : {
    async getDataPanelBomb() {
      const url = `/bomb_panels/`

      try {
        const getDataPanel = await this.$axios.get(url);
        this.dataPanels = getDataPanel.data.data;
      } catch(err) {
        console.log(err);
      }
    },
    ModalUserBuyPanel(data) {
      this.panelId = data.id;
      this.statusClearForm = true
      this.$modal.show("ModalBuyPanel");
    },
    closeModalUserBuyPanel() {
      this.$modal.hide("ModalBuyPanel");
    },
    async userBuyPanel(data) {
      this.formManage = await data;
      await this.getMoneyUserToCheck()
      if(this.userMoney.points >= this.formManage.userMoneyToPay) {
        await this.$modal.hide("ModalBuyPanel");
        this.$router.push(`/inpanel/${this.panelId}?price=${this.formManage.userMoneyToPay}&token=${this.tokenBlueSwan}`)
        this.statusClearForm = false
      } else {
        await this.$modal.hide("ModalBuyPanel");
        this.$toast.error("จำนวน credit หรือ point ไม่เพียงพอ !!");
        this.statusClearForm = false
      }
      
      
    },
    async getMoneyUserToCheck() {
      const url = `/wallet_game/init_wallet?token=${this.tokenBlueSwan}`

      try {
        const getMoney = await this.$axios.$get(url)
        this.userMoney = getMoney.data;
      } catch(err) {
        console.log(err);
      }
    }
    // async userBuyPanel(data) {
    //   this.formManage = await data;
    //   await this.$modal.hide("ModalBuyPanel");
    //   this.$router.push(`/inpanel/${this.panelId}?price=${this.formManage.userMoney}`)
    //   this.statusClearForm = false
    // }
  }
}
</script>
