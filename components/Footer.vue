<template>
    <div >
        <footer class="-mt-2 pb-5">
            <div class=" bg-hblack-100 text-white md:w-1/3 lg:w-1/2 2xl:w-1/4 m-auto lg:px-5 bg-black-vdo">
                <div class="bg-red-600 text-white rounded-full p-2 border border-white mx-4 mt-2">
                    <client-only>
                        <marquee-text :duration="15" :repeat="10">
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ad laboriosam provident deleniti optio labore illum accusamus? Ullam ab similique, architecto consequuntur asperiores repellat laudantium minus! Velit iusto, non est magnam harum ducimus eum voluptas nam consequuntur minima doloribus illo illum? Itaque sit praesentium dolor recusandae molestias sequi rerum eaque eveniet.
                            <!-- {{ text_slidebar }} -->
                        </marquee-text>
                    </client-only>
                </div>
                <div class="grid grid-cols-3 mx-4 mt-2">
                    <div class="border border-white p-2 text-white flex">
                        <img src="@/assets/img/icon/pocket.png"  alt="pocket" class="w-6 h-6">
                        <span class="ml-5">sadasd</span>
                    </div>
                    <div class="border border-white p-2 flex">
                        <img src="@/assets/img/icon/Coins.png"  alt="Coins" class="w-6 h-6">
                        <span class="ml-5">sadasd</span>
                    </div>
                    <div class="border border-white p-2 flex">
                        <img src="@/assets/img/icon/badge1.png"  alt="badge1" class="w-6 h-6">
                        <span class="ml-5">sadasd</span>
                    </div>
                </div>
                <div class="grid grid-cols-6 mx-4 mt-4 justify-items-center items-center">
                    <svg class="w-12 h-12 cursor-pointer" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
                    </svg>
                    
                    <svg class="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                    
                    <!-- <div 
                        class="mt-2 cursor-pointer"
                        :class="{
                            'opacity-75' : panelPrice <= 0
                        }"
                        @click="startGame()"
                    >
                        <img src="@/assets/img/play.png" alt="" class="h-full">
                    </div> -->

                    <button
                        class="
                            col-span-2 
                            bg-red-600 
                            text-white 
                            border 
                            border-white 
                            rounded-full 
                            px-2 
                            py-2 
                            w-full 
                            h-full
                            text-4xl
                        "
                    >เริ่มเล่น
                    </button>
                    <svg class="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                    <button
                        class="text-white rounded-full"
                        :class="{
                            'opacity-75' : panelPrice <= 0
                        }"
                        @click="startAutoPlay()"
                    >
                        <img src="@/assets/img/auto.png" alt="" class="w-10 h-10">
                    </button>
                </div>
            </div>   
        </footer>
        
    </div>
</template>