<template>
  <!-- <Tutorial/> -->
  <div class="h-screen">
    <div v-if="dataPanels && dataPanels.length > 0" class="grid grid-cols-6 gap-2 text-color-black">
      <div 
        v-for="(panel,index) in dataPanels" :key="index" 
        class="bg-white p-2 rounded-lg cursor-pointer shadow-md h-14 flex items-center justify-center"
        @click="$router.push(`/inpanel/${panel.id}`)"
      >
        <h1>{{index+1}}</h1>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  layout : 'dashboard',
  auth : true,
  data() {
    return {
      dataPanels : '',
    }
  },
  created() {
    this.getDataPanelBomb();
    // //test
    // this.randomWinnerPercent();
  },
  methods : {
    async getDataPanelBomb() {
      const url = `http://localhost:8080/api/v1/bomb_panels/`
      try {
        const getDataPanel = await this.$axios.get(url);
        this.dataPanels = getDataPanel.data.data;
      } catch(err) {
        console.log(err);
      }
    },
    // randomWinnerPercent() {
    //   //test
    //   let percentTage  = 100
    //   let arrayPencent = []
    //   let manageWinnerPercent = 10
      
    //   for(let i = 1; i <= percentTage; i++) {
    //     arrayPencent.push(i)
    //   }
    //   arrayPencent.sort((a, b) => 0.5 - Math.random())
    //   let arrSplice = arrayPencent.splice(100-manageWinnerPercent,manageWinnerPercent)

    //   let randomNum = Math.floor(Math.random() * 100)
    //   if(arrSplice.includes(randomNum)) {
    //     console.log('winner');
    //   } else {
    //     console.log('lose');
    //   }
    //   console.log('randomNum',randomNum);
    //   console.log('arrSplice',arrSplice);
    // },
  }
}
</script>
