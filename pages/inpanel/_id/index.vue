<template>
    <div>
        <div class="flex justify-center items-center h-screen">
            <!-- md:w-1/3 -->
            <div class="bg-transparent md:w-96 w-full shadow-md rounded-lg relative">
                    
                    <div class="grid grid-cols-3 gap-1">
                        <div v-for="(bomb,index) in countPanel" :key="index">
                            <div 
                                class="w-100 h-24 cursor-pointer rounded-lg"
                                :class="{
                                    'bgPanelGrid' : bomb.openPanel == false && bomb.isActive == false,
                                    'bgPanelGrid shakePanel' : bomb.openPanel == false && bomb.isActive == true,
                                    'bg-red-500' : bomb.openPanel == true && bomb.isActive == true && bomb.isBomb == true,
                                    'bg-green-500' : bomb.openPanel == true && bomb.isActive == true && bomb.isBomb == false
                                }"
                                @click="checkResult(index)"
                            >
                            </div>
                        </div>
                    </div>
                    
                <div v-if="isBombGifStatus === true" class="w-full absolute absolute-center" >
                    <img src="@/assets/img/bombgif.gif" alt="" class="z-40 w-96 h-96">
                </div>
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
            userId : '',
            panelPrice : ''
        }
    },
    created() {
        this.userId = this.$store.state.auth.user.id
        this.panelId = parseInt(this.$route.params.id)
        this.panelPrice = parseInt(this.$route.query.price)
        this.getBombInPanel(true) 
    },
    watch : {
        panelDefault : 'playingGame',
        isWon : 'finishLabel'
    },
    methods : {
        async getBombInPanel(status_get_data_first) {
            const url = `/bomb_panels/${this.panelId}`
            try {
                const getDataPanel = await this.$axios.get(url);
                this.panelDefault = getDataPanel.data.data;
                this.isWon = this.panelDefault.is_won

                if(status_get_data_first == true) {
                    let isBomb = null
                    for(let i = 0; i < this.panelDefault.default_panel.length; i++) {

                        for(let i2 = 0; i2 < this.countPanel.length; i2++) {
                            // console.log('this.countPanel',this.countPanel[i2]);
                            if(this.panelDefault.default_panel[i].open_panel == i2) {
                                this.countPanel[i2].isActive = true
                                setTimeout(()=> { 
                                    this.setOpenLabel(i2,this.panelDefault.default_panel[i].open_panel_default);
                                }, 500);
                            }
                        }
                    }
                }

            } catch(err) {
                console.log(err);
            }
        },
        async checkResult(index) {
            if(this.countPanel[index].openPanel == false && this.panelDefault.is_won == null) {
                //เช็คว่ายังไม่ได้เปิด
                this.countPanel[index].isActive = true;

                const _data = {
                    user_id : this.userId,
                    click_at : index
                }

                const url = `/bomb_panels/${this.panelId}/check_result`
                
                try {
                    const checkResult = await this.$axios.post(url,_data)
                    //เลือกถูกแล้วไม่โดนระเบิด
                    if(checkResult.data.data == true) {
                        //ไม่ถูกระเบิด
                        let isBomb = 1
                        setTimeout(()=> { 
                            this.setOpenLabel(index,isBomb)
                        }, 500);
                    } else {
                        //ถูกระเบิด
                        let isBomb = 0
                        setTimeout(()=> { 
                            this.setOpenLabel(index,isBomb)
                        }, 500);
                    }
               
                this.getBombInPanel(false);
                } catch(err) {
                    console.log(err);
                this.getBombInPanel(false);
                }
                
                
            } else {
                this.$toast.error("เลือกซ้ำ");
            }
            
        },
        setOpenLabel(index,isBomb) {
            this.countPanel[index].openPanel = true;
            this.countPanel[index].isBomb = isBomb == 0 ? true : false;
        },
        //set ว่า label ถูกเลือกไปแล้ว
        async playingGame() {
            if(this.panelDefault.user_id === null) {
                const url = `/bomb_panels/${this.panelId}/is_playing`
                const _data = {
                    user_id : this.userId,
                    panel_price : this.panelPrice
                }

                try {
                    const updateStatusPlaying = await this.$axios.put(url,_data)
                    // console.log('updateStatusPlaying',updateStatusPlaying);
                    if(updateStatusPlaying.status == 200) {
                        this.createPanel()
                        // this.getMe()
                    }
                } catch(err) {
                    console.log(err);
                }
             }
        },
        finishLabel(data) {
            if(data == false) {
                // alert("game over !!")
                this.isBombGif();
            } else {
                this.$toast.success("You Are The Winner!!");
                // this.getMe();
            }
        },
        isBombGif() {
            this.isBombGifStatus = true;
            setTimeout(() => { 
                this.isBombGifStatus = false;
            }, 1500);
        },
        async createPanel() {
            const url = `/bomb_panels/`
            try {
                const createPanel = await this.$axios.post(url,{
                    panel_name : "testcreate",
                    total_bomb : 5
                })
            } catch(err) {
                console.log(err);
            }
        },
        // async getMe() {
        //     const url = `/users/me`
        //     try {
        //         const getUserDetail = await this.$axios.get(url);
        //         this.user_detail = await getUserDetail.data.data;
        //         await this.$store.dispatch('wallet/setWallet',this.user_detail)
        //         this.walletMoney = this.$store.state.wallet.money_wallet;
        //     } catch(err) {
        //         console.log(err);
        //     }
        // }
    }
}
</script>
