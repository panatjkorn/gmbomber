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
            isBombGifStatus : false
        }
    },
    created() {
        this.panelId = parseInt(this.$route.params.id)
        this.playingGame();
        this.getBombInPanel(true)
        // this.isBombGif()
    },
    watch : {
        isWon : 'finishLabel'
    },
    methods : {
        async getBombInPanel(status_get_data_first) {
            const url = `http://localhost:8080/api/v1/bomb_panels/${this.panelId}`
            try {
                const getDataPanel = await this.$axios.get(url);
                this.panelDefault = getDataPanel.data.data;
                this.isWon = this.panelDefault.is_won
                // console.log('this.panelDefault',this.panelDefault);

                if(status_get_data_first == true) {
                    let isBomb = null
                    for(let i = 0; i < this.panelDefault.default_panel.length; i++) {
                        // console.log('this.panelDefault.default_panel',this.panelDefault.default_panel[i]);

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

                // if(this.isWon == false && this.isWon != null) {
                //     this.isBombGif();
                // }

            } catch(err) {
                console.log(err);
            }
        },
        async checkResult(index) {
            if(this.countPanel[index].openPanel == false && this.panelDefault.is_won == null) {
                //เช็คว่ายังไม่ได้เปิด
                this.countPanel[index].isActive = true;

                const url = `http://localhost:8080/api/v1/bomb_panels/${this.panelId}/check_result?click_at=${index}`
                
                try {
                    const checkResult = await this.$axios.get(url)
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
                console.log('เลือกไปแล้ว');
            }
            
        },
        setOpenLabel(index,isBomb) {
            this.countPanel[index].openPanel = true;
            this.countPanel[index].isBomb = isBomb == 0 ? true : false;
        },
        //set ว่า label ถูกเลือกไปแล้ว
        async playingGame() {
            const url = `http://localhost:8080/api/v1/bomb_panels/${this.panelId}`

            try {
                const updateStatusPlaying = await this.$axios.put(url,{is_playing : true})
                // console.log('updateStatusPlaying',updateStatusPlaying);
            } catch(err) {
                console.log(err);
            }
        },
        finishLabel(data) {
            if(data == false) {
                // alert("game over !!")
                this.isBombGif();
            } else {
                alert("you are the winner")
            }
        },
        isBombGif() {
            this.isBombGifStatus = true;
            setTimeout(() => { 
                this.isBombGifStatus = false;
            }, 1500);
        }
    }
}
</script>
