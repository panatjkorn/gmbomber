<template>
    <div>

    </div>
</template>
<script>
export default {
    auth : false,
    data() {
        return {

        }
    },
    created() {
        this.logout();
    },
    methods : {
        logout() {
            this.$auth.logout();
            this.$router.push('/login')
        }
    }
}
</script>