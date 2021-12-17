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
                        <div v-if="isLogin">
                            <span class="text-white">{{walletMoney}}</span>
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
            isLogin : null
        }
    },
    created() {
        this.isLogin = this.$store.state.auth.loggedIn
    },
    methods : {
        logout() {
            this.$auth.logout();
            this.$router.push('/login')
        }
    }
}
</script>