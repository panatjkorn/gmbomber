<template>
    <div>
        <div class="">
            <div class="flex justify-center items-center h-screen">
                <div class="bg-white md:w-1/3 w-full p-8 shadow-md rounded">
                    <div v-if="isLoaded" class="grid grid-cols-1">
                        <div class="my-2">
                            <input
                            v-model="form.phone_number"
                            type="text"
                            placeholder="เบอร์โทรศัพท์"
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
                            @keyup="checkPhoneNumber()"
                            />
                            <div v-if="submitCreateStatus == 'ERROR' 
                            && !$v.form.phone_number.required
                            " 
                            class="text-red-500 text-xs">
                                กรุณาระบุเบอร์โทรศัพท์
                            </div>
                            <div v-if="validatePhone" class="text-red-500 text-xs">
                                กรุณาระบุข้อมูลให้ถูกต้อง
                            </div>
                        </div>
                        <div class="my-2 relative">
                            <input
                                v-model="form.password"
                                placeholder="รหัสผ่าน"
                                type="password"
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
                                />
                                <div v-if="submitCreateStatus == 'ERROR'
                                && !$v.form.password.required" 
                                class="text-red-500 text-xs">
                                    กรุณาระบุรหัสผ่าน
                                </div>
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
                        <div class="my-2 relative">
                            <input
                                v-model="form.password2"
                                placeholder="ยืนยันรหัสผ่าน"
                                type="password"
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
                                />
                                <div v-if="submitCreateStatus == 'ERROR'
                                && !$v.form.password2.required" 
                                class="text-red-500 text-xs">
                                    กรุณาระบุรหัสผ่านให้ถูกต้อง
                                </div>
                                <div v-if="
                                !$v.form.password2.sameAsPassword"  
                                class="text-red-500 text-xs">
                                    รหัสผ่านไม่ตรงกัน
                                </div>
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
                                bg-yellow-500
                                py-4
                                text-white
                                font-semibold
                                text-2xl
                                focus:outline-none
                                focus:ring
                                rounded
                            "
                            @click="register()"
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
                            สมัครสมาชิก
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { required, sameAs } from 'vuelidate/lib/validators'
export default {
    layout : 'dashboard',
    // auth : false,
    data() {
        return {
            isLoginLoading : false,
            form : {
                phone_number : '',
                password : '',
                password2 : ''
            },
            submitCreateStatus : '',
            validatePassword : '',
            validatePhone : false,
            isLoaded : false
        }
    },
    validations: {
        form : {
            phone_number: {
                required
            },
            password: {
                required,
            },
            password2: {
                required,
                sameAsPassword: sameAs('password')
            }
        }
    },
    mounted() {
        this.isLoaded = true
    },
    methods : {
        register() {
            if(
                this.$v && this.$v.form &&
                this.$v.form.phone_number.$invalid == false &&
                this.$v.form.password.$invalid == false &&
                this.$v.form.password2.$invalid == false &&
                this.validatePhone == false
            ) {

                if(this.$v && this.$v.form && this.$v.form.password2.sameAsPassword) {
                    this.registerUser()
                }

            } else {
                this.submitCreateStatus = 'ERROR';
            }
        },
        checkPhoneNumber() {
            if(isNaN(this.form.phone_number) || this.form.phone_number.length != 10){
                this.validatePhone = true;
            } else {
                this.validatePhone = false;
            }
        },
        async registerUser() {
            this.isLoginLoading = true
            const url = `/users/register`
            try {
                const registerUser = await this.$axios.post(url,{
                    phone_number : this.form.phone_number,
                    password : this.form.password2
                })
                if(registerUser.status == 201) {
                    this.isLoginLoading = false
                    this.$toast.success("สมัครสมาชิกสำเร็จ");
                    this.clearForm();
                    this.$router.push('/login')
                }
            } catch(err) {
                this.$toast.error("ไม่สำเร็จ");
                this.isLoginLoading = false
                console.log(err);
            }
        },
        clearForm() {
            this.submitCreateStatus = '',
            this.validatePassword = '',
            this.validatePhone = false,
            this.form.phone_number = ''
            this.form.password = ''
            this.form.password2 = ''
        }
    }
}
</script>