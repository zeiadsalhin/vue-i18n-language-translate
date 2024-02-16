<script setup>
import { ref } from 'vue'

// const value1 = ref('')
// move label 
function move() {
    document.querySelector(".label").classList.add("-translate-y-8")
    document.querySelector(".label").classList.add("-translate-x-2")
    document.querySelector(".text").classList.add("outline")
}
function back() {
    if (document.querySelector("#amount").value == '') {
        document.querySelector(".label").classList.remove("-translate-y-8")
        document.querySelector(".label").classList.remove("-translate-x-2")
        document.querySelector(".text").classList.remove("outline")
    } else {
        document.querySelector(".text").classList.add("outline-2")
    }
}
</script>
<template>
    <div class="back flex space-x-4 my-8 mt-14 -translate-x-4 md:translate-x-0">
        <RouterLink class="hover:bg-transparent w-fit" to="/">
            <button
                class="transform transition ease-in-out p-1 rounded-md hover:backdrop-brightness-75 hover:dark:backdrop-brightness-200 ">
                <svg class="fill-current p-1" height="32" width="32" version="1.1" id="Capa_1"
                    xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
                    viewBox="0 0 185.343 185.343" xml:space="preserve" fill="#000000" transform="rotate(180)">
                    <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                    <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                    <g id="SVGRepo_iconCarrier">
                        <g>
                            <g>
                                <path style=";"
                                    d="M51.707,185.343c-2.741,0-5.493-1.044-7.593-3.149c-4.194-4.194-4.194-10.981,0-15.175 l74.352-74.347L44.114,18.32c-4.194-4.194-4.194-10.987,0-15.175c4.194-4.194,10.987-4.194,15.18,0l81.934,81.934 c4.194,4.194,4.194,10.987,0,15.175l-81.934,81.939C57.201,184.293,54.454,185.343,51.707,185.343z">
                                </path>
                            </g>
                        </g>
                    </g>
                </svg></button>
        </RouterLink>
        <p class="select-none text-xl w-fit py-1.5">Back</p>
    </div>

    <div class="main flex-col w-full mx-auto">

        <div class="input md:flex justify-center space-x-4 md:w-fit w-full mx-auto h-fit">
            <div class="text relative dark:bg-zinc-800 bg-slate-100 px-3 outline-slate-400 rounded-lg my-auto">
                <label
                    class="label hover:cursor-text transform transition ease-in-out text-left absolute top-4 bg-inherit rounded-md px-2 text-md font-semibold"
                    for="amount">Email</label>
                <input id="amount" name="amount" v-model="value1" placeholder="" type="email" @focus="move" @blur="back"
                    class=" outline-none bg-transparent text-lg mt-4 mb-3 md:w-96" required>

            </div>
            <div class="validatebutton p-2 mx-auto flex justify-center">
                <button @click="validateemail"
                    class="outline-none h-fit px-4 py-3 my-auto text-xl dark:ripple-bg-zinc-700 ripple-bg-zinc-200 rounded-md">Validate</button>
            </div>
        </div>
        <h1 v-if="empty" class="text-center text-red-700">Please Enter Email</h1>
        <h1 v-if="isloading" class="text-center p-2 mt-20">Loading...</h1>
        <div v-if="Emailinfo != ''"
            class="results flex-col justify-center space-y-5 mx-auto md:w-1/3 w-full outline outline-1 outline-zinc-700 p-3 mt-20">
            <div class="email flex md:space-x-5 space-x-2">
                <p class="text-lg font-semibold my-auto">Email: </p>
                <p class="my-auto text-md">{{ Emailinfo.email }}</p>
            </div>
            <div class="del flex  md:space-x-5 space-x-2">
                <p class="text-lg font-semibold my-auto">Deliverable : </p>
                <p class="my-auto text-md">{{ Emailinfo.deliverability }}</p>
            </div>
            <div class="val flex  md:space-x-5 space-x-2">
                <p class="text-lg font-semibold my-auto">Valid : </p>
                <p class="my-auto text-md">{{ Emailinfo.is_valid_format.text }}</p>
            </div>
            <div class="free flex  md:space-x-5 space-x-2">
                <p class="text-lg font-semibold my-auto">Free email? : </p>
                <p class="my-auto text-md">{{ Emailinfo.is_free_email.text }}</p>
            </div>
            <div class="d flex  md:space-x-5 space-x-2">
                <p class="text-lg font-semibold my-auto">Disposable : </p>
                <p class="my-auto text-md">{{ Emailinfo.is_disposable_email.text }}</p>
            </div>
            <div class="mx flex  md:space-x-5 space-x-2">
                <p class="text-lg font-semibold my-auto">MX found? : </p>
                <p class="my-auto text-md">{{ Emailinfo.is_mx_found.text }}</p>
            </div>
            <div class="smtp flex  md:space-x-5 space-x-2">
                <p class="text-lg font-semibold my-auto">SMTP Validity : </p>
                <p class="my-auto text-md">{{ Emailinfo.is_smtp_valid.text }}</p>
            </div>
        </div>
        <h1 v-else class="text-center p-4">Enter Email to proceed</h1>

    </div>
</template>
<script>

export default {
    data() {
        return {
            empty: false,
            isloading: false,
            value1: '',
            Emailinfo: [],
        }
    },
    methods: {
        async validateemail() {
            if (this.value1 != '') {
                this.empty = false
                try {
                    this.isloading = true;
                    const url = (`https://emailvalidation.abstractapi.com/v1/?api_key=ead4e7282901442497f9c385153c9d35&email=${this.value1}`)
                    const response = await fetch(url)
                    const data = await response.json()
                    this.Emailinfo = data
                    this.isloading = false
                } catch (error) {
                    console.error(error);
                }
            } else {
                this.empty = true
            }

        },
    }
};
</script>