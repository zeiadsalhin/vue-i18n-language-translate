<script setup>
import { ref } from 'vue'
import { onMounted } from 'vue';
import Freecurrencyapi from '@everapi/freecurrencyapi-js';

const freecurrencyapi = new Freecurrencyapi('fca_live_5SKmnR2YrHls2NxwGiX57Ycsv254GMRRRyyw0Yk6');
const selected = ref('')
const selected2 = ref('')
const value1 = ref('')

function pr() {
    console.log(selected.value)
    console.log(selected2.value)
}

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

function request() {
    if (selected.value == '' || value1.value == '' || selected2.value == '') {
        console.log("Empty")
        document.querySelector('.alert').classList.remove("hidden")

        if (value1.value == '') {
            document.querySelector("#amount").focus()
        } else if (selected.value == '') {
            document.querySelector("#s1").focus()
        } else if (selected.value == '') {
            document.querySelector("#s2").focus()
        }
    } else {
        document.querySelector('.alert').classList.add("hidden")
        const selectedv = JSON.parse(JSON.stringify(selected.value))
        const selected2v = JSON.parse(JSON.stringify(selected2.value))
        freecurrencyapi.latest({
            base_currency: `${selectedv}`,
            currencies: `${selected2v}`
        }).then(response => {
            console.log(response.data);
            var fet = response.data
            var pp = Object.entries(fet)[0][1]
            var last = Object.entries(fet)[0][0]
            console.log(pp)
            var cl = (pp * value1.value).toFixed(3)
            document.querySelector("#result").innerHTML = cl + ' ' + last
            window.scrollBy({
                top: 100,
                behavior: "smooth"
            })
        });
    }
}

onMounted(() => {
    freecurrencyapi.status({

    }).then(response2 => {
        var arr = Object.entries(response2)
        console.log(response2)
        document.querySelector("#result2").innerHTML = 'Account ID:' + " " + arr[0][1]
    })
})

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
    <div class="main flex-col justify-center mx-auto md:p-2 md:w-1/3">

        <div class="1 flex-col">
            <div class="amount relative dark:bg-zinc-800 bg-slate-100 px-5 mb-5 outline-slate-400 rounded-lg">
                <label
                    class="label hover:cursor-text transform transition ease-in-out text-left absolute top-5 bg-inherit rounded-lg px-2 text-md font-semibold"
                    for="amount">amount -
                    المبلغ</label>
                <input id="amount" name="amount" v-model="value1" placeholder="" type="number" @focus="move" @blur="back"
                    class=" outline-none bg-transparent text-lg mt-5 mb-5 w-full" required>
            </div>
            <button @click="m" class="block p-1 dark:bg-inherit bg-slate-300 w-full">{{ $t('currencyc') }}</button>
            <select id="s1" v-model="selected"
                class="menu block outline-none p-2 space-y-3 dark:bg-zinc-800 bg-slate-100 w-full">
                <option disabled value="please">{{ $t('selectm') }}</option>
                <option v-for="(currency, i) in currencies" :key="`cur${i}`" :value="currency"
                    class="block hover:bg-transparent">
                    {{ currency }}</option>
            </select>
        </div>
        <div class="to mx-auto w-1 text-center text-xl font-semibold p-2">{{ $t('to') }}</div>

        <div class="2 flex-col">
            <button @click="m" class=" p-1 dark:bg-zinc-800 bg-slate-300 w-full">{{ $t('currencyc') }}</button>
            <select id="s2" v-model="selected2"
                class="menu block outline-none p-2 space-y-10 dark:bg-zinc-800 bg-slate-100 w-full">
                <option disabled value="please">{{ $t('selects') }}</option>
                <option v-for="(currency, i) in currencies" :key="`cur${i}`" :value="currency"
                    class="block hover:bg-transparent">
                    {{ currency }}</option>
            </select>
        </div>
    </div>
    <div class="confirm mx-auto text-center p-5 text-red-600">{{ $t('convertconfirm') }} {{ value1 }} {{ selected }} to {{
        selected2
    }}
    </div>
    <p class="alert hidden text-center">{{ $t('missing') }}</p>
    <v-btn @click="request"
        class="mx-auto text-center flex justify-center p-3 dark:bg-zinc-950 transform transition ease-in-out hover:bg-zinc-700 bg-zinc-300 md:w-1/4 w-1/2 mb-10">{{
            $t('convertb') }}</v-btn>
    <div class="3 flex-col">
        <button @click="m" class="dropbtn mb-5 p-2 w-full dark:bg-zinc-700 font-semibold text-lg">{{ $t('equal') }}</button>
        <div class="mx-auto w-1/2 p-5 dark:bg-zinc-800">
            <p id="result" class="mx-auto flex justify-center text-center w-full text-xl font-semibold"></p>
        </div>
    </div>

    <p id="result2" class="mx-auto mt-20 flex justify-center text-center w-full text-xl font-semibold">Account ID:</p>
</template>
<script>
const currencies = {
    '1': 'EUR',
    '2': 'USD',
    '2': 'JPY',
    '3': 'BGN',
    '4': 'CZK',
    '5': 'DKK',
    '6': 'GBP',
    '7': 'HUF',
    '8': 'PLN',
    '9': 'RON',
    '10': 'SEK',
    '11': 'CHF',
    '12': 'ISK',
    '13': 'NOK',
    '14': 'HRK',
    '15': 'RUB',
    '16': 'TRY',
    '17': 'AUD',
    '18': 'BRL',
    '19': 'CAD',
    '20': 'CNY',
    '21': 'HKD',
    '22': 'IDR',
    '23': 'INR',
    '24': 'KRW',
    '24': 'MXN',
    '26': 'MYR',
    '27': 'NZD',
    '28': 'PHP',
    '29': 'SGD',
    '30': 'THB',
    '31': 'ZAR'
}

</script>
<style></style>