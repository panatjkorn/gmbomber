<template>
    <div>
        <!-- This example requires Tailwind CSS v2.0+ -->
        <nav class="bg-gray-800">
            <div class="max-w-full mx-auto px-2 sm:px-6 lg:px-24">
                <div class="relative flex items-center justify-between h-16">
                <div class="flex-1 flex md:items-center md:justify-center sm:items-stretch sm:justify-start">
                    <h2 class="text-white">Gamemun Bomber</h2>
                </div>
                <div class="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">

                    <!-- Profile dropdown -->
                    <div class="ml-3 relative">
                        <div v-if="isLogin" class="flex">
                            <div class="flex border border-w rounded-md px-5 py-1 mr-1">
                                <span class="text-white">{{walletMoney}}</span>
                                <div class="cursor-pointer" @click="refreshMoney()">
                                    <svg data-v-8b206dd6="" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="h-5 w-5 text-white ml-1 mt-0.5">
                                        <path data-v-8b206dd6="" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
                                    </svg>
                                </div>
                            </div>
                            <button class="bg-gray-300 text-black font-bold py-1 px-4 rounded" @click="logout()">
                                logout
                            </button>
                            <!-- <button class="btn bg-red-500 text-black">logout</button> -->
                        </div>
                    </div>
                </div>
                </div>
            </div>
        </nav>
    </div>
</template>
<script>
export default {
    props : ['userDetail','walletMoney'],
    data() {
        return {
            isLogin : null,
        }
    },
    created() {
        this.isLogin = this.$store.state.auth.loggedIn
    },
    methods : {
        logout() {
            this.$auth.logout();
            this.$router.push('/login')
        },
        refreshMoney() {
            this.$emit('refreshMoneyUser')
        }
    }
}
</script>