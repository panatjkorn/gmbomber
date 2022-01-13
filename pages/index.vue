<template>
    <div>
        <div class="flex justify-center items-center mb-5 ">
            <!-- md:w-1/3 -->
            <div>
                <div class="md:w-96 w-full rounded-lg md:mt-14 xl:mt-0">
                    <div class="px-1 py-1">
                        <div class="grid grid-cols-4 grid-flow-col gap-4 bg-black text-white rounded-full px-5">
                            <div>
                                <img src="@/assets/img/reward.png" alt="" class="w-12 h-12 ">
                            </div>
                            <div class="col-span-2 flex justify-center items-center">
                                <span class="ml-2 ">จำนวนสมบัติที่เหลือ</span>
                            </div>
                            <div>
                                <span class="text-5xl ml-2 font-bold green-48E223">4</span>
                            </div>
                        </div>
                    </div>
                    <div class="mx-8">
                        <div class="flex justify-center items-center bg-black text-white rounded-full">
                            <div class="flex justify-center items-center bg-black text-white rounded-lg">
                                <img src="@/assets/img/bomb1.png" alt="" class="w-10 h-10">
                                    <span class="ml-2">ระเบิดที่เหลือ</span>
                                    <span class="text-3xl ml-2 font-bold">2</span>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="md:w-96 w-full rounded-lg mt-8">
                    
                    <div class="p-3 shadow-md xs:mt-24 iphone8plus:mt-36 md:mt-36 lg:mt-64 xl:mt-24">
                        <div class="grid grid-cols-3  gap-1">
                            <div v-for="(bomb,index) in countPanel" :key="index">
                                <!-- {{bomb.openPanel}}
                                {{bomb.isActive}}
                                {{bomb.isBomb}} -->
                                <div 
                                    class="w-100 h-24 md:w-28 md:h-28 cursor-pointer rounded-lg border border-white opacity-100"
                                    :class="{
                                        'bgPanelGrid' : bomb.openPanel == false && bomb.isActive == false,
                                        'shakePanel bg-dig-panel' : bomb.openPanel == false && bomb.isActive == true,
                                        'bg-mine-end' : bomb.openPanel == true && bomb.isActive == true && bomb.isBomb == true,
                                        'bg-green-500' : bomb.openPanel == true && bomb.isActive == true && bomb.isBomb == false
                                    }"
                                    @click="checkResult(index)"
                                >
                                </div>
                                <!-- <div 
                                    class="w-100 h-24 md:w-28 md:h-28 cursor-pointer rounded-lg border border-white opacity-100"
                                    :class="{
                                        'bgPanelGrid' : bomb.openPanel == false && bomb.isActive == false,
                                        'bgPanelGrid shakePanel' : bomb.openPanel == false && bomb.isActive == true,
                                        'bg-mine-end' : bomb.openPanel == true && bomb.isActive == true && bomb.isBomb == true,
                                        'bg-green-500' : bomb.openPanel == true && bomb.isActive == true && bomb.isBomb == false
                                    }"
                                    @click="checkResult(index)"
                                >
                                </div> -->
                            </div>
                        </div>
                    </div>

                    <div class="grid grid-cols-4 gap-4 px-2 py-1 md:mt-3">
                        
                        <div class="flex justify-center items-center bg-black text-white rounded-full border border-white col-span-3">
                            <img src="@/assets/img/Coins.png" alt="" class="w-10 h-10">
                                <span class="ml-2 text-yellow-300">เงินเดิมพัน</span>
                                <span class="text-5xl ml-2 font-bold text-white">4</span>
                        </div>
                        <div class="col-span-1">
                            <button class="text-white rounded-full">
                                <img src="@/assets/img/auto.png" alt="" class="w-10 h-10">
                            </button>
                        </div>
                    </div>

                    <div class="flex justify-center items-center mt-2 cursor-pointer" @click="testModal()">
                        <img src="@/assets/img/play.png" alt="" class="w-64 md:w-72 h-auto">
                    </div>
                    
                    <div v-if="isBombGifStatus === true" class="w-full absolute absolute-center" >
                        <img src="@/assets/img/bombgif.gif" alt="" class="z-40 w-96 h-96">
                    </div>
                    <!-- <button @click="showModalWinner">คลิก</button> -->
                </div>
            </div>
        </div>
        <client-only>
            <WinnerModal 
                :panel-price="panelDefault.price"
                @closeModalWin="closeModalWin"
            />
<!-- 
            <LoseModal 
                @closeModalLose="closeModalLose"
            /> -->
        </client-only>
    </div>
</template>

<script>
import WinnerModal from '@/components/Modal/WinnerModal';
import LoseModal from '@/components/Modal/LoseModal';
import { mapGetters } from 'vuex'
    export default {
        layout : 'dashboard',
            components : {
            WinnerModal,
            LoseModal
        },
        data() {
            return {
                panelId : '',
                panelDefault : '',
                countPanel : [
                    { isActive : false, openPanel : false, isBomb : false },
                    { isActive : false, openPanel : false, isBomb : false },
                    { isActive : false, openPanel : false, isBomb : false },
                    { isActive : false, openPanel : false, isBomb : false },
                    { isActive : false, openPanel : false, isBomb : false },
                    { isActive : false, openPanel : false, isBomb : false },
                    { isActive : false, openPanel : false, isBomb : false },
                    { isActive : false, openPanel : false, isBomb : false },
                    { isActive : false, openPanel : false, isBomb : false },
                ],
                isActive : false,
                isWon : null,
                isBombGifStatus : false,
                panelPrice : '',
            }
        },
        computed: {
            ...mapGetters({
                uuId: "user/getUUId",
                wallet_token : "user/getWalletToken"
            })
        },
        mounted() {
            console.log('wallet_token',this.wallet_token);
            this.getPanelAuto(true)
        },
        methods : {
            async getPanelAuto(status_get_data_first) {
                // console.log(this.uuId);
                const url = `/bomb_panels/user/random_panel?uuId=${this.uuId}`

                try {
                    const getPanelAutoToUser = await this.$axios.get(url)
                    this.panelDefault = getPanelAutoToUser.data.data;
                    // console.log('panelDefault',this.panelDefault.id);
                    this.isWon = getPanelAutoToUser.data.data.is_won

                    if(status_get_data_first == true) {
                    let isBomb = null
                    for(let i = 0; i < this.panelDefault.default_panel.length; i++) {
                        // console.log('this.panelDefault.default_panel',this.panelDefault.default_panel);
                        for(let i2 = 0; i2 < this.countPanel.length; i2++) {
                            if(this.panelDefault.default_panel[i].open_panel == i2) {
                                this.countPanel[i2].isActive = true
                                setTimeout(()=> { 
                                    this.setOpenLabel(i2,this.panelDefault.default_panel[i].open_panel_default);
                                }, 2500);
                            }
                        }
                    }
                }

                } catch(err) {
                    console.log(err);
                }
            },
            setOpenLabel(index,isBomb) {
                this.countPanel[index].openPanel = true;
                this.countPanel[index].isBomb = isBomb == 0 ? true : false;

            },

            testModal() {
                this.$modal.show("WinnerModal"); 
            },
            closeModalWin() {
                this.$modal.hide("WinnerModal"); 
                // setTimeout(() => {
                //     this.$router.push(`/?token=${this.wallet_token}`)
                // }, 1000);
            },
        }
    }
</script>