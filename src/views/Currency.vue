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

function request() {
    if (selected.value == '' || value1.value == '' || selected2.value == '') {
        console.log("Empty")
        document.querySelector('.alert').classList.remove("hidden")

        if (value1.value == '') {
            document.querySelector("#amount").focus()
        }
        if (selected.value == '') {
            document.querySelector("#s1").focus()
        }
        if (selected.value == '') {
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
    <div class="main flex-col justify-center text-center mx-auto md:p-2 md:w-1/3">
        <div class="1 flex-col">
            <input id="amount" v-model="value1" placeholder="amount - المبلغ" type="number"
                class="dark:text-slate-200 dark:bg-slate-900 bg-slate-100 p-2 mb-5 w-full" required>
            <button @click="m" class="block p-1 dark:bg-gray-950 bg-slate-300 w-full">{{ $t('currencyc') }}</button>
            <select id="s1" v-model="selected"
                class="menu block outline-none p-2 space-y-3 dark:bg-slate-950 bg-slate-100 w-full">
                <option disabled value="please">{{ $t('selectm') }}</option>
                <option v-for="(currency, i) in currencies" :key="`cur${i}`" :value="currency"
                    class="block hover:bg-transparent">
                    {{ currency }}</option>
            </select>
        </div>
        <div class="to mx-auto w-1 text-center text-xl font-semibold p-2">{{ $t('to') }}</div>
        <div class="2 flex-col">
            <button @click="m" class=" p-1 dark:bg-gray-950 bg-slate-300 w-full">{{ $t('currencyc') }}</button>
            <select id="s2" v-model="selected2"
                class="menu block outline-none p-2 space-y-10 dark:bg-slate-950 bg-slate-100 w-full">
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
        class="mx-auto text-center flex justify-center p-3 dark:bg-slate-800 bg-slate-300 md:w-1/4 w-1/2 mb-10">{{
            $t('convertb') }}</v-btn>
    <div class="3 flex-col">
        <button @click="m" class="dropbtn mb-5 p-2 w-full dark:bg-gray-950 font-semibold text-lg">{{ $t('equal') }}</button>
        <div class="mx-auto w-1/2 dark:bg-slate-950">
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