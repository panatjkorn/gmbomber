<template>
  <div class="">
    <div class="flex justify-center items-center h-screen">
      <div class="bg-white md:w-1/3 w-full p-8 shadow-md rounded">
        <div class="grid grid-cols-1">
          <div class="my-2">
            <input
              v-model="phone_number"
              type="text"
              placeholder="ผู้ใช้งาน"
              class="
                shadow-md
                focus:outline-none
                focus:ring
                focus:border-primary-2
                border-primary-10 border-2
                rounded
                text-base
                w-full
                p-2
                placeholder-gray-900
              "
              @input="validatePhoneNumber()"
            />
            <div v-if="validate_phone" class="text-red-500 text-sm">กรุณาระบุเบอร์โทรศัพท์ให้ถูกต้อง</div>
          </div>
          <div class="my-2 relative">
            <input
              :type="showPassword ? 'text' : 'password'"
              placeholder="รหัสผ่าน"
              class="
                shadow-md
                focus:outline-none
                focus:ring
                focus:border-primary-2
                border-primary-10 border-2
                rounded
                text-base
                w-full
                p-2
                placeholder-gray-900
              "
              @keyup.enter="login"
              v-model="password"
            />
            <div
              class="
                absolute
                inset-y-0
                right-0
                pr-3
                flex
                items-center
                text-sm
                leading-5
              "
            >
            </div>
          </div>
          <div class="my-2 text-center">
            <button
              class="
                w-full
                bg-blue-500
                py-4
                text-white
                font-semibold
                text-2xl
                focus:outline-none
                focus:ring
                rounded
              "
              @click="login"
            >
              <svg
                v-if="isLoginLoading"
                class="animate-spin -ml-1 mr-2 h-5 w-5 text-white inline-block"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  class="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  stroke-width="4"
                ></circle>
                <path
                  class="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              เข้าสู่ระบบ
            </button>
            <button
              class="
                w-full
                bg-yellow-500
                py-4
                text-white
                font-semibold
                text-2xl
                focus:outline-none
                focus:ring
                rounded
                mt-2
              "
              @click="redirectToRegister()"
            >
              สมัครสมาชิก
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  // auth: false,
  data() {
    return {
      showPassword: false,
      phone_number: '',
      password: null,
      isLoginLoading: false,
      validate_phone : false
    };
  },
  methods: {
    async login() {
      if(
        this.phone_number.length > 0 && 
        this.validate_phone == false
      ) {
        this.$nuxt.$loading.start();
        this.isLoginLoading = true;
        const _data = {
          phone_number: this.phone_number,
          password: this.password,
        };
        
        await this.$auth.loginWith('local', { data: _data }).then(async (response) => {
          if(response.status == 200) {
            this.$store.dispatch("user/setWallet", this.$auth.$state.user)
            this.$toast.success("เข้าสู่ระบบสำเร็จ");
            this.$router.push('/');
          }
        }).catch((err) => {
          console.log(err.response);
          if(err.response.status == 400 || err.response.status == 404) {
            this.$toast.error(err.response.data.errors);
          } else {
            this.$toast.error("ไม่สำเร็จ");
          }
        })
      } else {
        this.validate_phone = true
      }
    },
    redirectToRegister() {
      this.$router.push('/register')
    },
    validatePhoneNumber() {
      if(this.phone_number.length != 10) {
        this.validate_phone = true
      } else {
        this.validate_phone = false
      }
    }
  },
};
</script>

<style>
html body {
  padding-top: 0px;
}
</style>
