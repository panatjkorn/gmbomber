<template>
    <modal
        name="ModalChoosePrice"
        classes="demo-modal-class"
        :min-width="200"
        :min-height="200"
        :scrollable="true"
        :reset="true"
        width="365"
        height="auto"
    >
      <div class="size-modal-content" style="background : white !important;">
            <div class="px-1 md:px-14 py-5 text-md md:text-lg text-center">
                <b>เลือกจำนวนเงินที่ต้องการเดิมพัน</b>
            </div>
            <div class="grid grid-cols-2 gap-2">
                <button
                    v-for="(price,index) in panelPrice" :key="index"
                    class="
                        bg-gray-300 
                        text-black,
                        rounded-full
                        py-1
                        px-1
                        hover:bg-yellow-400
                    "
                    :class="{
                        'bg-yellow-400' : userChoose == price.price
                    }"
                @click="choosePrice(price.price)" >
                    {{ price.price_name }}
                </button>
            </div>
            <div class="px-1 md:px-14 py-5 text-md md:text-lg text-center">
                <b>เงินรางวัลที่จะได้</b>
                <h2 class="text-3xl text-yellow-300">{{ userChoose * 3 }} ฿</h2>
                <button
                    class="
                        rounded-full
                        border border-black
                        w-full
                        py-1
                    "
                    @click="submitChoosePrice()"
                >ยืนยัน
                </button>
            </div>
          <!-- <div class="px-1 md:px-14 py-3 pb-8">
            <div class="grid md:grid-cols-2 lg:grid-cols-6 gap-2 text-color-black max-h-72 md:max-h-screen overflow-auto">
                <div 
                    class="bg-blue-100 hover:bg-blue-300 p-2 rounded-lg cursor-pointer shadow-md h-8 md:h-14 flex items-center justify-center"
                    v-for="(moneyChoose,index) in arrayMoneyChoose"
                    :key="index"
                    @click="setPrice(moneyChoose)"
                >
                    {{ moneyChoose }}
                </div>
            </div>
            <div class="grid md:grid-cols-2 lg:grid-cols-2 gap-2 text-color-black mt-2 md:mt-5">
                <div>
                    <label for="" class="text-sm md:text-lg">เงินเดิมพัน</label>
                    <MazInput
                        v-model="form.userMoneyToPay"
                        placeholder="เงินเดิมพัน"
                        size="sm"
                    />
                </div>
                <div>
                    <label for="" class="text-sm md:text-lg">เงินที่ได้รับ</label>
                    <input 
                        v-model="form.showMoneyReturn" 
                        type="text" 
                        class="p-2 rounded-lg w-full" 
                        placeholder="เงินที่ได้รับ" disabled
                    >
                </div>
            </div>
            <div class="mt-3 text-white">
                <button
                    class="bg-blue-200 text-black hover:bg-blue-500 hover:text-white font-bold py-2 px-4 rounded w-24
                    text-sm md:text-lg"
                    @click="userBuyPanel()"
                >
                    ตกลง
                </button>
                <button
                    class="bg-gray-400 text-black font-bold py-2 px-4 rounded w-24
                    text-sm md:text-lg"
                    @click="closeModalBuyPanel()"
                >
                    ยกเลิก
                </button>
            </div>
          </div> -->
      </div>
    </modal>
</template>
<script>
export default {
    props : ['panelPrice','statusClearForm'],
    data() {
        return {
            userChoose : null
        }
    },
    watch : {
        'statusClearForm' : 'clearForm'
    },
    methods : {
        choosePrice(price) {
            this.userChoose = price
        },
        submitChoosePrice() {
            this.$emit('submitChoosePrice',this.userChoose)
        },
        clearForm() {
            if(this.statusClearForm == true) {
                this.userChoose = null
            }
        }
    }
}
</script>