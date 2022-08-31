<template>
    <div>
        <div class="pt-5">
            <!-- md:w-1/3 -->
            <div v-if="is_show_gif" class="w-full absolute absolute-center flex justify-center" >
                <img src="@/assets/img/bombgif.webp" alt="bomb" 
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

            <div class="flex justify-center items-center mx-4">
                <div class="grid grid-cols-3 gap-2">
                        <div class="col-span-2 bg-black rounded-full px-8">
                            <div class="grid grid-cols-4 gap-1 text-center py-1">
                                <img 
                                    v-for="(picReward,index) in this.countUserClickReward" :key="index"
                                    src="@/assets/img/reward.png" 
                                    alt="" 
                                    class="
                                        se:w-8 se:h-8 
                                        xs:w-10 xs:h-10 
                                        md:w-12 md:h-12 
                                        lg:w-14 lg:h-14
                                        object-cover
                                    "
                                >
                            </div>
                        </div>
                        <div class="bg-red-600 rounded-full grid grid-cols-2 text-center px-3 items-center justify-center">
                            <img 
                                src="@/assets/img/bomb1.png" 
                                alt="" 
                                class="
                                    se:w-8 se:h-8 
                                    xs:w-10 xs:h-10 
                                    md:w-12 md:h-12 
                                    lg:w-14 lg:h-14
                                    object-cover
                                "
                            >
                            <span 
                                class="
                                    se:text-4xl 
                                    md:text-4xl 
                                    ml-2 
                                    font-bold
                                    text-white
                                ">
                                    {{ countBomb }}
                            </span>
                        </div>
                    </div>
            </div>

            <div class="grid justify-center items-center lg:mt-14 2xl:mt-24">

                <div class="w-full se:w-300 xs:w-330 md:w-96 rounded-lg">
                    
                    <div class="p-3 shadow-md xs:mt-24 iphone8plus:mt-36 md:mt-48 lg:mt-48 xl:mt-24 2xl:mt-0 fullhd:mt-8">
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
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            <!-- menu -->
            <div class="bg-hblack-100 text-white sm:w-2/3 md:w-1/2 lg:w-1/2 xl:w-1/3 2xl:w-1/3 m-auto lg:px-5 overflow-y-hidden lg:py-5">
                <div class="bg-red-600 text-white rounded-full p-2 border border-white mx-4 mt-2">
                    <client-only>
                        <marquee-text :duration="15" :repeat="10">
                            {{ text_slidebar }}
                        </marquee-text>
                    </client-only>
                </div>
                <div class="grid grid-cols-3 mx-4 mt-2 gap-0.5">
                    <div class="border border-white p-2 text-white flex rounded-md overflow-y-hidden">
                        <img src="@/assets/img/icon/pocket.png"  alt="pocket" class="w-6 h-6">
                        <span 
                            class="ml-5"
                        >
                            {{ userCredit }}
                        </span>
                    </div>
                    <div 
                        class="border border-white p-2 flex rounded-md cursor-pointer" 
                        @click="modalChoosePrice()"
                        
                    >
                        <img src="@/assets/img/icon/Coins.png"  alt="Coins" class="w-6 h-6">
                        <span 
                            class="ml-5"
                        >{{ panelPrice }}</span>
                    </div>
                    <div class="border border-white p-2 flex rounded-md">
                        <img src="@/assets/img/icon/badge1.png"  alt="badge1" class="w-6 h-6">
                        <span 
                            class="ml-5"
                        >
                            {{ priceUserReceive }}
                        </span>
                    </div>
                </div>

                <div 
                    class="flex mx-4 justify-items-center items-center mt-5"
                >
                    
                    <!-- <svg class="w-12 h-12 md:w-12 md:h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg> -->

                    <button
                        class="
                            col-span-2 
                            text-white 
                            border 
                            border-white 
                            rounded-full 
                            px-2 
                            py-2 
                            w-full 
                            h-full
                            text-xl
                            xl:text-2xl
                            3xl:text-4xl
                        "
                        :class="{
                            'bg-red-600' : panelPrice > 0,
                            'bg-gray-300' : panelPrice <= 0
                        }"
                        :disabled="panelPrice <= 0"
                        @click="startGame()"
                    >เริ่มเล่น
                    </button>
                    <!-- <svg class="w-12 h-12 md:w-12 md:h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg> -->
                
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
import { mapGetters } from "vuex";
    export default {
        layout : 'dashboard',
            components : {
                WinnerModal,
                LoseModal,
                ModalChoosePrice,
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
                is_show_gif : false,
                panelPriceData : '',
                priceUserReceive : 0,
                panelPrice : 0,
                statusClearForm : false,
                isBuyPanel : false,
                countReward : 0,
                countBomb : 0,
                countUserClickReward : 4,
                isUserClicked : true,
                panelPriceCheckUserBuy : null,
                defaultArrPanel : [0,1,2,3,4,5,6,7,8], //ช่องตาราง
                timeOutPlayAuto : null,
                picReward : 1,
                text_slidebar : 'ขุดหาสมบัติที่ซ่อนอยู่ให้ครบ 4 ชิ้นเพื่อรับรางวัลให้สำเร็จ',
                duration : 15,
                userCredit : this.$store.state.user.wallet,
            }
        },
        computed: {
            ...mapGetters({
                user_credit : "user/getWallet"
            })
        },
        async mounted() {
            await this.getPanelPrice()
            await this.getPanelAuto()
            await this.getBombInPanel(true)
            
        },
        watch : {
            doneTodosCount () {
                return this.$store.state.wallet.moneyWallet
            },
            isWon : 'finishLabel',
            user_credit : 'setCreditUser',
        },
        methods : {
            //ดึงราคาแผ่นกระดาน
            async getPanelPrice() {
                const url = `/data/get_panel_price/`

                try {
                    const getPrice = await this.$axios.get(url)
                    this.panelPriceData = getPrice.data.data
                } catch(err) {
                    console.log(err);
                }
            },

            async getBombInPanel(first_call) {
                this.countReward = 0
                this.countBomb = 0
                const url = `/bomb_panels/${this.panelDefault.id}`

                try {
                    const getDataPanel = await this.$axios.get(url);
                    this.panelDefault = getDataPanel.data.data;
                    this.panelPriceCheckUserBuy = getDataPanel.data.data.price
                    let isReward = 0
                    let isBomb = 0
                    this.countUserClickReward = 0

                    // เช็คว่าที่เปิดไปมี reward และ bomb เท่าไร
                    for(let i = 0; i < this.panelDefault.default_panel.length; i++) {
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

                    if(first_call == true) {
                        for(let i = 0; i < this.panelDefault.default_panel.length; i++) {
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
                    await this.$axios.post(url,{
                        panel_name : "createPanel",
                        total_bomb : 5
                    })
                } catch(err) {
                    console.log(err);
                }
            },

            async getPanelAuto() {
                const url = `/bomb_panels/user/random_panel`

                try {
                    const getPanelAutoToUser = await this.$axios.get(url)
                    this.panelDefault = getPanelAutoToUser.data.data;
                    this.isWon = getPanelAutoToUser.data.data.is_won

                } catch(err) {
                    console.log(err);
                }
            },

            setOpenLabel(index,isBomb) {
                this.countPanel[index].openPanel = true;
                this.countPanel[index].isBomb = isBomb == 0 ? true : false;
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
                const _data = {
                    panel_price : parseInt(this.panelPrice),
                    panel_id : parseInt(this.panelDefault.id),
                }

                try {
                    const userBuyPanel = await this.$axios.post(url,_data)
                    const newCredit = {
                        wallet : userBuyPanel ? userBuyPanel.data.data : 0
                    }

                    if(userBuyPanel.status == 200) {
                        this.createPanel()
                        this.$store.commit('user/setWalletToState',newCredit)
                        this.isBuyPanel = true
                        this.getBombInPanel();
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

                if(this.isUserClicked == false) {
                    return;
                }

                if(this.countPanel[index].openPanel == false) {
                    //เช็คว่ายังไม่ได้เปิด

                    if(this.panelDefault.is_won != null) {
                        this.$toast.error("เกมจบลงแล้ว");
                        return;
                    }

                    this.countPanel[index].isActive = true;
                    this.isUserClicked = false;
                    setTimeout(async ()=> { 
                        try{
                            const url = `/bomb_panels/${this.panelDefault.id}/check_result`
                            const _data = {
                                click_at : index,
                            }

                            const checkResult = await this.$axios.post(url,_data)
                            if(checkResult.data.data.value == true) {
                                 //ไม่ถูกระเบิด
                                let isBomb = 1
                                this.setOpenLabel(index,isBomb)
                            } else {
                                let isBomb = 0
                                this.setOpenLabel(index,isBomb)
                            }

                            this.getBombInPanel(false);

                        } catch(err) {
                            console.log(err);
                            if(err.response.status == 400) {
                                this.$toast.error(err.response.data.errors);
                            } else {
                                this.$toast.error("Something Wrong!!");
                            }
                            
                        }
                        
                    }, 2500);
                    
                } else {
                    this.$toast.error("เลือกซ้ำ");
                }
            },

            setOpenLabel(index,isBomb) {
                this.countPanel[index].openPanel = true;
                this.countPanel[index].isBomb = isBomb == 0 ? true : false;
                this.isUserClicked = true
            },

            finishLabel(data) {
                if(data == false) {
                    this.isBombGif();
                    setTimeout(() => {
                        this.is_show_gif = false
                        this.showModalLose();
                    },1000)
                } else if(data == true) {
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
                this.is_show_gif = true;
            },
            
            setCreditUser(credit) {
                this.userCredit = credit
            },
        }
    }
</script>
<style>
    .transitionDown {
        transition-timing-function: ease-in;
        transition: 0.1s;
        transform: translateY(25em);
    }
    .transitionUp {
        transition: 0.25s;
        transition-timing-function: ease-out;
        transform: translateY(0);
        opacity: 1;
    }

    .textLineUp {
        animation: 2s anim-lineUp ease-out infinite;
    }

    @keyframes anim-lineUp {
        0% {
            opacity: 0;
            transform: translateY(-80%);
        }
        20% {
            opacity: 0;
        }
        50% {
            opacity: 1;
            transform: translateY(0%);
        }
        100% {
            opacity: 1;
            transform: translateY(0%);
        }
    }

    .box-choose-rate { 
        position : absolute;
        background‑color:silver;
        z-index : 20
    }
</style>
