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
              @input="validatePhone()"
            />
            <div v-if="validatePhoneNumber" class="text-red-500 text-sm">กรุณาระบุเบอร์โทรศัพท์ให้ถูกต้อง</div>
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
              <!-- <svg
                class="h-6 text-gray-700"
                fill="none"
                :class="{
                  hidden: showPassword,
                  block: !showPassword,
                }"
                xmlns="http://www.w3.org/2000/svg"
                viewbox="0 0 576 512"
                @click="showPassword = !showPassword"
              >
                <path
                  fill="currentColor"
                  d="M572.52 241.4C518.29 135.59 410.93 64 288 64S57.68 135.64 3.48 241.41a32.35 32.35 0 0 0 0 29.19C57.71 376.41 165.07 448 288 448s230.32-71.64 284.52-177.41a32.35 32.35 0 0 0 0-29.19zM288 400a144 144 0 1 1 144-144 143.93 143.93 0 0 1-144 144zm0-240a95.31 95.31 0 0 0-25.31 3.79 47.85 47.85 0 0 1-66.9 66.9A95.78 95.78 0 1 0 288 160z"
                ></path>
              </svg>

              <svg
                class="h-6 text-gray-700"
                fill="none"
                :class="{
                  block: showPassword,
                  hidden: !showPassword,
                }"
                xmlns="http://www.w3.org/2000/svg"
                viewbox="0 0 640 512"
                @click="showPassword = !showPassword"
              >
                <path
                  fill="currentColor"
                  d="M320 400c-75.85 0-137.25-58.71-142.9-133.11L72.2 185.82c-13.79 17.3-26.48 35.59-36.72 55.59a32.35 32.35 0 0 0 0 29.19C89.71 376.41 197.07 448 320 448c26.91 0 52.87-4 77.89-10.46L346 397.39a144.13 144.13 0 0 1-26 2.61zm313.82 58.1l-110.55-85.44a331.25 331.25 0 0 0 81.25-102.07 32.35 32.35 0 0 0 0-29.19C550.29 135.59 442.93 64 320 64a308.15 308.15 0 0 0-147.32 37.7L45.46 3.37A16 16 0 0 0 23 6.18L3.37 31.45A16 16 0 0 0 6.18 53.9l588.36 454.73a16 16 0 0 0 22.46-2.81l19.64-25.27a16 16 0 0 0-2.82-22.45zm-183.72-142l-39.3-30.38A94.75 94.75 0 0 0 416 256a94.76 94.76 0 0 0-121.31-92.21A47.65 47.65 0 0 1 304 192a46.64 46.64 0 0 1-1.54 10l-73.61-56.89A142.31 142.31 0 0 1 320 112a143.92 143.92 0 0 1 144 144c0 21.63-5.29 41.79-13.9 60.11z"
                ></path>
              </svg> -->
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
              @click="goToRegister()"
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
      validatePhoneNumber : false
    };
  },
  methods: {
    async login() {
      if(this.phone_number.length > 0 && this.validatePhoneNumber == false) {
        this.$nuxt.$loading.start();
        this.isLoginLoading = true;
        const params = {
          phone_number: this.phone_number,
          password: this.password,
        };
        
        await this.$auth.loginWith('local', { data: params }).then(async (response) => {
          if(response.status == 200) {
            this.$toast.success("เข้าสู่ระบบสำเร็จ");
            this.$router.push('/');
          }
        }).catch((err) => {
          console.log(err);
          if(err.response.status == 400 || err.response.status == 404) {
            this.$toast.error(err.response.data.errors);
          } else {
            this.$toast.error("ไม่สำเร็จ");
          }
        })
      } else {
        this.validatePhoneNumber = true
      }
    },
    goToRegister() {
      this.$router.push('/register')
    },
    validatePhone() {
      if(this.phone_number.length != 10) {
        this.validatePhoneNumber = true
      } else {
        this.validatePhoneNumber = false
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
