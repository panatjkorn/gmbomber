<template>
    <modal
        name="WinnerModal"
        classes=""
        :min-width="200"
        :min-height="200"
        :scrollable="true"
        :reset="true"
        width="365"
        height="auto"
    >
      <div class="bg-transparent">
          <div class="px-1 md:px-14 py-2 text-4xl md:text-4xl text-center 
          text-yellow-300 bg-black border-2 border-white">
            <div class="grid justify-center">
                <div>
                    <p>YOU WIN !!</p>
                    <p class="text-2xl">ได้เงินรางวัล {{ panelPrice * 2 }} บาท</p>
                </div>
                <div>
                    <button
                        class="bg-blue-100 text-black font-bold py-2 px-4 rounded w-24 mt-2
                        text-sm md:text-lg"
                        @click="closeModalWin()"
                    >
                    ปิด
                </button>
                </div>
            </div>
          </div>
      </div>
    </modal>
</template>
<script>
export default {
    props : ['panelPrice'],
    data() {
        return {
            form : {
                showMoneyReturn : '',
            }
        }
    },
    methods : {
        closeModalWin() {
            this.$emit("closeModalWin")
        }
    }
}
</script>