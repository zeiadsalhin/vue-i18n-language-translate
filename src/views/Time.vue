<script setup>
import { ref } from 'vue'


const input1 = ref('')

const url1 = ("https://timeapi.io/api/Time/current/zone?timeZone=Africa/Cairo")
const v = input1.value
function ss() {
    // console.log(url1 + v)
    // console.log(input1.value)
    const options = {
        // mode: "no-cors"
    }
    fetch("https://timeapi.io/api/Time/current/zone?timeZone=Africa/Cairo", options)
        .then(res => res.json())
        .then(data => console.log(data))
        .then(console.log(sucess))
}
</script>
<template>
    <div class="main flex-col justify-center mx-auto p-2">
        <form @submit="prevent.default">
            <input id="inputt" v-model="input1" name="region" value="text" type="text" placeholder="Region/City"
                class="p-2 text-slate-100 bg-slate-800 outline-none" required>
        </form>
        <button @click="ss">See</button>
    </div>
</template>