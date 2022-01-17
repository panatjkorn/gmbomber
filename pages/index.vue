<template>
    <div>
        <div class="flex justify-center items-center mb-5 ">
            <!-- md:w-1/3 -->
            <div v-if="isBombGifStatus" class="w-full absolute absolute-center md:left-14 lg:left-32 xl:left-1/3" >
                <img src="@/assets/img/bombgif.webp" alt="" 
                    class="
                        z-40 
                        w-108 
                        md:w-10/12
                        lg:w-9/12
                        xl:w-4/12
                        h-auto
                    "
                >
            </div>
            <div>
                <div class="md:w-96 w-full rounded-lg md:mt-14 xl:mt-0">
                    
                    <div class="px-1 py-1">
                        <div class="grid xs:grid-cols-4 grid-flow-col gap-4 bg-black text-white rounded-full px-5">
                            <div class="flex justify-center items-center">
                                <img 
                                src="@/assets/img/reward.png" 
                                alt="" 
                                class="
                                    se:w-8 se:h-8 
                                    xs:w-10 xs:h-10 
                                    md:w-12 md:h-12 
                                    lg:w-14 lg:h-14
                                "
                            >
                            </div>
                            <div class="col-span-2 flex justify-center items-center">
                                <span class="md:text-lg lg:text-xl">จำนวนสมบัติที่เหลือ</span>
                            </div>
                            <div>
                                <span 
                                    class="
                                        se:text-3xl 
                                        xs:text-4xl 
                                        md:text-5xl 
                                        lg:text-6xl 
                                        ml-2 
                                        font-bold
                                        green-48E223
                                    "
                                    >{{ countReward }}
                                </span>
                            </div>
                        </div>
                    </div>
                    <div class="mx-8">
                        <div class="flex justify-center items-center bg-black text-white rounded-full">
                            <div class="flex justify-center items-center bg-black text-white rounded-lg">
                                <img src="@/assets/img/bomb1.png" alt="" class="se:w-7 se:h-7 md:w-10 md:h-10">
                                    <span class="se:text-md lg:text-xl ml-2">ระเบิดที่เหลือ</span>
                                    <span 
                                        class="
                                            se:text-2xl 
                                            md:text-3xl 
                                            ml-2 
                                            font-bold
                                        ">
                                            {{ countBomb }}
                                    </span>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="w-full se:w-300 xs:w-330 md:w-96 rounded-lg mt-8">
                    
                    <div class="p-3 shadow-md xs:mt-24 iphone8plus:mt-36 md:mt-36 lg:mt-64 xl:mt-24">
                        <div class="grid grid-cols-3  gap-1">
                            <div v-for="(bomb,index) in countPanel" :key="index">
                                <div 
                                    class="w-100 h-24 md:w-28 md:h-28 cursor-pointer rounded-lg border border-white opacity-100"
                                    :class="{
                                        'bgPanelGrid' : bomb.openPanel == false && bomb.isActive == false,
                                        'shakePanel bg-dig-panel' : bomb.openPanel == false && bomb.isActive == true,
                                        'bg-mine-end' : bomb.openPanel == true && bomb.isActive == true && bomb.isBomb == true,
                                        'bg-reward-grid' : bomb.openPanel == true && bomb.isActive == true && bomb.isBomb == false
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
                        
                        <div 
                            class="
                                flex 
                                justify-center 
                                items-center 
                                bg-black 
                                text-white 
                                rounded-full 
                                border 
                                border-white 
                                col-span-3
                                cursor-pointer
                                "
                            @click="modalChoosePrice()"
                            >
                            <img src="@/assets/img/Coins.png" alt="" class="w-10 h-10">
                                <span class="ml-2 text-yellow-300">เงินรางวัล</span>
                                <span class="text-4xl ml-2 font-bold text-white">{{ priceUserReceive }}</span>
                        </div>
                        <div class="col-span-1">
                            <button class="text-white rounded-full">
                                <img src="@/assets/img/auto.png" alt="" class="w-10 h-10">
                            </button>
                        </div>
                    </div>

                    <div class="flex justify-center items-center mt-2 cursor-pointer" @click="startGame()">
                        <img src="@/assets/img/play.png" alt="" class="w-64 md:w-72 h-auto">
                    </div>

                    <!-- <button @click="showModalWinner()" class="text-white">testttttttt</button> -->

                    <!-- test -->
                    <!-- <div class="p-3 shadow-md xs:mt-24 iphone8plus:mt-36 md:mt-36 lg:mt-64 xl:mt-24">
                        <img src="@/assets/img/win1.png" alt="" class="w-full">
                        <div class="flex justify-center items-center">
                            <img src="@/assets/img/resume.png" alt="" class="w-64 md:w-72 h-auto">
                        </div>
                    </div> -->
                </div>
            </div>
        </div>
        <client-only>
            <WinnerModal 
                :panel-price="panelDefault.price"
                @closeModalWin="closeModalWin"
            />

            <ModalChoosePrice 
                :panel-price="panelPriceData"
                :status-clear-form="statusClearForm"
                @submitChoosePrice="submitChoosePrice"
            />

            <LoseModal 
                :count-reward="countUserClickReward"
                @closeModalLose="closeModalLose"
            />
        </client-only>
    </div>
</template>

<script>
import WinnerModal from '@/components/Modal/WinnerModal';
import ModalChoosePrice from '@/components/Modal/ModalChoosePrice';
import LoseModal from '@/components/Modal/LoseModal';
import { mapGetters } from 'vuex'
    export default {
        layout : 'dashboard',
            components : {
            WinnerModal,
            LoseModal,
            ModalChoosePrice
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
                panelPriceData : '',
                priceUserReceive : 0,
                panelPrice : 0,
                statusClearForm : false,
                isBuyPanel : false,
                countReward : 0,
                countBomb : 0,
                countUserClickReward : 0
            }
        },
        computed: {
            ...mapGetters({
                uuId: "user/getUUId",
                wallet_token : "user/getWalletToken"
            })
        },
        async mounted() {
            await this.getPanelAuto()
            await this.getBombInPanel(true)
            this.getPanelPrice()
        },
        watch : {
            isWon : 'finishLabel'
        },
        methods : {
            async getBombInPanel(status_get_data_first) {
                this.countReward = 0
                this.countBomb = 0
                let splitToken = this.wallet_token.split('[SALT]')
                const url = `/bomb_panels/${this.panelDefault.id}?uuId=${splitToken[1]}`
                try {
                    const getDataPanel = await this.$axios.get(url);
                    this.panelDefault = getDataPanel.data.data;
                    
                    let isReward = 0
                    let isBomb = 0
                    this.countUserClickReward = 0
                    for(let i = 0; i < this.panelDefault.default_panel.length; i++) {
                        // console.log(this.panelDefault.default_panel[i].open_panel_default);
                        if(this.panelDefault.default_panel[i].open_panel_default == 1) {
                            isReward++
                            this.countUserClickReward++
                        } else {
                            isBomb ++
                        }
                    }

                    this.countReward = 4 - isReward;
                    this.countBomb = 5 - isBomb
                    this.isWon = this.panelDefault.is_won

                    if(status_get_data_first == true) {
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
            async createPanel() {
                const url = `/bomb_panels/`
                try {
                    const createPanel = await this.$axios.post(url,{
                        panel_name : "createPanel",
                        total_bomb : 5
                    })
                } catch(err) {
                    console.log(err);
                }
            },

            async getPanelAuto() {
                // console.log(this.uuId);
                const url = `/bomb_panels/user/random_panel?uuId=${this.uuId}`

                try {
                    const getPanelAutoToUser = await this.$axios.get(url)
                    this.panelDefault = getPanelAutoToUser.data.data;
                    // console.log('panelDefault',this.panelDefault.id);
                    this.isWon = getPanelAutoToUser.data.data.is_won

                } catch(err) {
                    console.log(err);
                }
            },

            setOpenLabel(index,isBomb) {
                this.countPanel[index].openPanel = true;
                this.countPanel[index].isBomb = isBomb == 0 ? true : false;

            },
            
            async getPanelPrice() {
                const url = `/data/get_panel_price/`

                try {
                    const getPrice = await this.$axios.get(url)
                    this.panelPriceData = getPrice.data.data
                } catch(err) {
                    console.log(err);
                }
            },

            modalChoosePrice() {
                this.statusClearForm = true
                this.$modal.show("ModalChoosePrice"); 
            },

            submitChoosePrice(price) {
                this.$modal.hide("ModalChoosePrice");
                this.panelPrice = price
                this.priceUserReceive = price * 3
                this.statusClearForm = false
            },
            
            async startGame() {
                if(this.panelPrice <= 0) {
                    this.$toast.error("กรุณาระบุจำนวนเงิน");
                    return;
                }

                const url = `/bomb_panels/user/buy_panel`
                let splitToken = this.wallet_token.split('[SALT]')
                const _data = {
                    uu_id : splitToken[2],
                    panel_price : parseInt(this.panelPrice),
                    panel_id : parseInt(this.panelDefault.id),
                    b : splitToken[0],
                    tk : splitToken[1],
                }

                try {
                    const userBuyPanel = await this.$axios.post(url,_data)
                    // console.log('userBuyPanel',userBuyPanel);
                    if(userBuyPanel.status == 200) {
                        this.createPanel()
                        let newTk = await userBuyPanel.data.data.data.wallet_token
                        let newUserCredit = await userBuyPanel.data.data.data.user_credit
                        let splitNewTk = newTk.split('[SALT]')
                        await this.$store.dispatch('user/setUUId',newTk)
                        await this.$store.dispatch('wallet/setWallet',newUserCredit)
                        this.$router.push(`/?b=${splitNewTk[0]}&tk=${splitNewTk[1]}&user=${splitNewTk[2]}`)
                        this.isBuyPanel = true
                        this.$toast.success("start!!");
                    }
                } catch(err) {
                    console.log(err.response);
                    if(err.response.status == 400) {
                        this.$toast.error(err.response.data.massage);
                    } else {
                        this.$toast.error("something wrong");
                    }
                }
            },
            async checkResult(index) {
                if(this.isBuyPanel == false) {
                    this.$toast.error("กรุณาระบุจำนวนเงิน");
                    return;
                }

                if(this.countPanel[index].openPanel == false) {
                    //เช็คว่ายังไม่ได้เปิด

                    if(this.panelDefault.is_won != null) {
                        this.$toast.error("เกมจบลงแล้ว");
                        return;
                    }

                    this.countPanel[index].isActive = true;
                    let splitToken = this.wallet_token.split('[SALT]')
                    setTimeout(async ()=> { 
                        try{
                            const url = `/bomb_panels/${this.panelDefault.id}/check_result`
                            const _data = {
                                uu_id : this.uuId,
                                click_at : index,
                                b : splitToken[0],
                                tk : splitToken[1],
                            }

                            const checkResult = await this.$axios.post(url,_data)
                            // console.log('checkResult',checkResult);
                            
                            if(checkResult.data.data.value == true) {
                                 //ไม่ถูกระเบิด
                                let isBomb = 1
                                this.setOpenLabel(index,isBomb)
                            } else {
                                let isBomb = 0
                                this.setOpenLabel(index,isBomb)
                            }
                            this.getBombInPanel(false);
                            if(checkResult.data.data.user != null) {
                                let userWallet = checkResult.data.data && checkResult.data.data.user ? checkResult.data.data.user : null
                                let splitNewTk = userWallet.wallet_token.split('[SALT]')
                                await this.$store.dispatch('wallet/setWallet',userWallet.user_credit)
                                await this.$store.dispatch('user/setUUId',userWallet.wallet_token)
                                this.$router.push(`/?b=${splitNewTk[0]}&tk=${splitNewTk[1]}&user=${splitNewTk[2]}`)
                            }

                        } catch(err) {
                            console.log(err);
                            if(err.response.status == 400) {
                                this.$toast.error(err.response.data.errors);
                            } else {
                                this.$toast.error("Something Wrong!!");
                            }
                            this.getBombInPanel(false);
                        }
                        
                    }, 2500);
                    
                } else {
                    this.$toast.error("เลือกซ้ำ");
                }
            },
            setOpenLabel(index,isBomb) {
                this.countPanel[index].openPanel = true;
                this.countPanel[index].isBomb = isBomb == 0 ? true : false;
            },
            finishLabel(data) {
                if(data == false) {
                    // this.$toast.error("You Lose!!");
                    this.isBombGif();
                    setTimeout(() => {
                        this.isBombGifStatus = false
                        this.showModalLose();
                    },1000)
                } else {
                    // this.$toast.success("You Are The Winner!!");
                    this.showModalWinner();
                }
            },

            showModalWinner() {
                this.$modal.show("WinnerModal"); 
            },
            closeModalWin() {
                this.$modal.hide("WinnerModal");
                this.$router.go()
            },

            showModalLose() {
                this.$modal.show("LoseModal");
            },

            closeModalLose() {
                this.$modal.hide("LoseModal");
                this.$router.go()
            },

            isBombGif() {
                this.isBombGifStatus = true;
                // setTimeout(() => { 
                //     this.isBombGifStatus = false;
                // }, 1500);
            },
        }
    }
</script>