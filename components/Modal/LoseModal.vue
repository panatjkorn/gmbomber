<template>
    <modal
        name="LoseModal"
        classes=""
        :min-width="200"
        :min-height="200"
        :scrollable="true"
        :reset="true"
        width="365"
        height="auto"
    >
        <img v-if="countReward == 0" src="@/assets/img/lose1.png" alt="" class="w-auto">
        <img v-if="countReward == 1" src="@/assets/img/lose2.png" alt="" class="w-auto">
        <img v-if="countReward == 2" src="@/assets/img/lose3.png" alt="" class="w-auto">
        <img v-if="countReward == 3" src="@/assets/img/lose4.png" alt="" class="w-auto">
        <div class="flex justify-center items-center" @click="closeModalLose()">
            <img src="@/assets/img/resume.png" alt="" class="w-64 md:w-72 h-auto">
        </div>
    </modal>
</template>
<script>
export default {
    props : ['panelPrice','countReward'],
    data() {
        return {
            form : {
                showMoneyReturn : '',
            }
        }
    },
    methods : {
        closeModalLose() {
            this.$emit("closeModalLose")
        }
    }
}
</script>