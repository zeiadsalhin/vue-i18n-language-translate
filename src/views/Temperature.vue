<script setup>
import { ref } from 'vue'
const value1 = ref('')


// move label 
function move() {
    document.querySelector(".label").classList.add("-translate-y-8")
    document.querySelector(".label").classList.add("-translate-x-2")
    document.querySelector(".amount").classList.add("outline")
}
function back() {
    if (value1.value == '') {
        document.querySelector(".label").classList.remove("-translate-y-8")
        document.querySelector(".label").classList.remove("-translate-x-2")
        document.querySelector(".amount").classList.remove("outline")
    } else {
        document.querySelector(".amount").classList.add("outline-2")
    }
}

function convert() {
    if (!value1.value == '' && document.querySelector("#temperature1").checked || document.querySelector("#temperature2").checked) {
        if (document.querySelector("#temperature1").checked) {
            // alert("Checked with 1")
            var result = value1.value
            document.querySelector("#result").innerHTML = result + ' C'


        } else if (document.querySelector("#temperature2").checked) {
            // alert("Checked with 2")
            var result = (value1.value * 1.8) + 32
            document.querySelector("#result").innerHTML = result + ' F'
        }
    } else {
        alert("Fill missing value")
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

    <div class="main flex-col justify-center mx-auto w-4/5 select-none">
        <div class="amount relative dark:bg-zinc-800 bg-slate-100 px-4 mb-10 outline-slate-400 rounded-lg">
            <label
                class="label hover:cursor-text transform transition ease-in-out text-left absolute top-5 bg-inherit rounded-md px-2 text-md font-semibold"
                for="amount">{{ $t('templ') }}</label>
            <input id="amount" name="amount" v-model="value1" placeholder="" type="number" @focus="move" @blur="back"
                class=" outline-none bg-transparent text-lg mt-5 mb-3 w-full" required>
        </div>

        <div class="options flex space-x-20 w-1/4 justify-center mx-auto">
            <div class="1 flex">
                <input id="temperature1" name="temperature" type="radio" class=" ">
                <label class="label hover:cursor-text text-left rounded-md px-2 text-md font-semibold my-auto"
                    for="amount">Celcius
                </label>
            </div>
            <div class="2 flex">
                <input id="temperature2" name="temperature" type="radio" class=" ">
                <label class="label hover:cursor-text text-left rounded-md px-2 text-md font-semibold my-auto"
                    for="amount">Fehrenhite
                </label>
            </div>
        </div>

        <div class="result p-10">
            <v-btn @click="convert"
                class="mx-auto text-center flex justify-center p-3 dark:ripple-bg-zinc-800 ripple-bg-zinc-200 md:w-1/4 w-1/2 mb-10">{{
                    $t('convertb') }}</v-btn>
            <div class="mx-auto w-3/4 p- dark:bg-zinc-800">
                <p id="result" class="mx-auto flex justify-center text-center w-full text-xl font-semibold"></p>
            </div>
        </div>
    </div>
</template>