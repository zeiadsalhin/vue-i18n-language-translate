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
    } else {
        document.querySelector('.alert').classList.add("hidden")
        freecurrencyapi.latest({
            base_currency: `${selected.value}`,
            currencies: `${selected2.value}`
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
    <div class="main flex justify-around space-x-10 mx-auto md:p-2 md:w-2/3">
        <div class="1 flex-col md:w-2/3 w-full">
            <input v-model="value1" placeholder="amount - المبلغ" type="number"
                class="text-slate-200 bg-slate-900 p-2 mb-5 w-full" required>
            <button @click="m" class="block p-2 bg-gray-950 w-full">{{ $t('currencyc') }}</button>
            <select v-model="selected" class="menu block w- p-3 space-y-3 bg-slate-950 w-full">
                <option disabled value="please">{{ $t('selectm') }}</option>
                <option @click="m" class="block hover:bg-transparent">USD</option>
                <option @click="m" class="block hover:bg-transparent">CAD</option>
                <option @click="m" class="block hover:bg-transparent">EUR</option>
            </select>
        </div>
        <div class="to md:w-1/4 w-1 text-center text-xl font-semibold px-2">{{ $t('to') }}</div>
        <div class="2 flex-col md:w-2/3 w-full">
            <button @click="m" class=" p-2 bg-gray-950 w-full">{{ $t('currencyc') }}</button>
            <select v-model="selected2" class="menu block w- p-3 space-y-10 bg-slate-950 w-full">
                <option disabled value="please">{{ $t('selects') }}</option>
                <option @click="m" class="block hover:bg-transparent">USD</option>
                <option @click="m" class="block hover:bg-transparent">CAD</option>
                <option @click="m" class="block hover:bg-transparent">EUR</option>
            </select>
        </div>
    </div>
    <div class="confirm mx-auto text-center p-5 text-red-600">{{ $t('convertconfirm') }} {{ value1 }} {{ selected }} to {{
        selected2
    }}
    </div>
    <p class="alert hidden text-center">{{ $t('missing') }}</p>
    <v-btn @click="request" class="mx-auto text-center flex justify-center p-3 bg-slate-800 md:w-1/4 w-1/2 mb-10">{{
        $t('convertb') }}</v-btn>
    <div class="3 flex-col">
        <button @click="m" class="dropbtn mb-5 p-2 w-full bg-gray-950 font-semibold text-lg">{{ $t('equal') }}</button>
        <div class="mx-auto w-1/2 p-3 bg-slate-950">
            <p id="result" class="mx-auto flex justify-center text-center w-full text-xl font-semibold"></p>
        </div>
    </div>

    <p id="result2" class="mx-auto mt-20 flex justify-center text-center w-full text-xl font-semibold">Account ID:</p>
</template>
<style></style>