<template>
    <modal
        name="ModalBuyPanel"
        classes="demo-modal-class"
        :min-width="200"
        :min-height="200"
        :scrollable="true"
        :reset="true"
        width="70%"
        height="auto"
    >
      <div class="size-modal-content">
          <div class="px-1 md:px-14 py-2 text-sm md:text-lg">
              เลือกจำนวนเงินที่ต้องการเดิมพัน
          </div>
          <div class="px-1 md:px-14 py-3 pb-8">
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
          </div>
      </div>
    </modal>
</template>
<script>
export default {
    props : ['statusResetForm'],
    data() {
        return {
            arrayMoneyChoose : [1,3,5,10,15,20,25,30,50,100,200,500],
            form : {
                userMoneyToPay : '',
                showMoneyReturn : ''
            }
        }
    },
    watch : {
       'form.userMoneyToPay' : 'setMoneyReturnToUser',
       statusResetForm : 'resetForm'
    },
    methods : {
        setPrice(moneyChoose) {
            this.form.userMoneyToPay = moneyChoose
        },
        setMoneyReturnToUser(data) {
            this.form.showMoneyReturn = data * 2
        },
        closeModalBuyPanel() {
            this.$emit('closeModalUserBuyPanel')
            this.form.userMoneyToPay = '';
            this.form.showMoneyReturn = '';
        },
        resetForm() {
            if(this.statusResetForm == true) {
                this.form.userMoneyToPay = '';
                this.form.showMoneyReturn = '';
            }
        },
        userBuyPanel() {
            this.$emit('userBuyPanel',this.form)
        }
    }
}
</script>