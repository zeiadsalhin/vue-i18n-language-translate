<script setup>
import { ref } from 'vue'
import { onMounted } from 'vue';

const url2 = ("https://api.ipgeolocation.io/ipgeo?apiKey=27645a9243104218984326581e3c939b");
onMounted(() => {
    const options = { method: 'GET' };

    fetch(url2, options)
        .then(response => response.json())
        .then(response => {
            var ip = response.ip
            var ct = response.time_zone.current_time;
            var isp = response.isp
            var flag = response.country_flag;
            document.querySelector("#current").innerHTML = ct;
            document.querySelector("#ip").innerHTML = ip;
            document.querySelector("#isp").innerHTML = isp;
            document.querySelector("#flag").src = flag;
        })
        .catch(err => console.error(err));
})

const input1 = ref('')

const url1 = ("https://timezone.abstractapi.com/v1/current_time/?api_key=f0f468bd85394f7abbc06c37fe4f7517&location=");
const urlw = ("https://api.weatherapi.com/v1/current.json?key=f7e22d2e90f84fcfae755513241402&q=")

function ss() {
    console.log(input1.value)
    const options = { method: 'GET' };

    fetch(url1 + input1.value, options)
        .then(response => response.json())
        .then(response => {
            var requested = response.timezone_location
            var datetime = Object.entries(response)[0][1]
            var timezonetype = Object.entries(response)[1][1]
            var timezone = Object.entries(response)[3][1]
            document.querySelector("#requested").innerHTML = 'Requested location:' + ' ' + requested;
            document.querySelector("#datetime").innerHTML = datetime + ' ' + timezone;
            document.querySelector("#timezone").innerHTML = timezonetype;
        })
        .catch(err => console.error(err));

    ///

    //weather
    const options2 = { method: 'GET' };

    fetch(urlw + input1.value, options2)
        .then(response => response.json())
        .then(response => {
            var temp = response.current.temp_c
            var state = response.current.condition.text
            var lu = response.current.last_updated
            document.querySelector("#weather").innerHTML = state + ' ,' + temp + ' ْc';
            document.querySelector("#lu").innerHTML = 'Last Updated: ' + lu;
        })
        .catch(err => console.error(err));

}
</script>
<template>
    <div class="main flex-col justify-center mx-auto p-2">
        <h1 class="text-center text-2xl font-semibold mb-10">Time and Date Converter</h1>
        <h2 class="mb-2">Current time:<p id="current"></p>
        </h2>
        <h2 class="mb-2">Current ip: <p id="ip"></p>
        </h2>
        <h2 class="mb-2">ISP: <p id="isp"></p><img src="" class="p-1" width="50" id="flag">
        </h2>

        <form class="mx-auto text-center flex-col block" onsubmit="return false">
            <p class="p-2">Enter Region or City or Country:</p>
            <input id="inputt" v-model="input1" type="text" placeholder="Region/City"
                class="inp p-2 text-slate-100 bg-slate-800 outline-none" required><br>
            <button @click="ss" type="button" onclick="form.reset()"
                class="px-10 py-2 m-5 text-xl rounded-md bg-slate-600">get</button>
        </form>
        <div class="r">
            <h1 id="requested" class="p-2 text-center text-2xl mt-5 font-bold"></h1>
        </div>
        <div class="results md:flex justify-center space-y-5 md:space-y-0 md:space-x-20 mx-auto text-center">
            <div class="1 p-2 block">
                <p class="p-2 font-semibold text-lg">Data and time:
                </p>
                <p id="datetime"></p>
            </div>

            <div class="2 p-2 block">
                <p class="p-2 font-semibold text-lg">Time Zone:
                </p>
                <p id="timezone"></p>
            </div>
            <div class="3 p-2 block">
                <p class="p-2 font-semibold text-lg">Weather:
                </p>
                <p id="weather"></p>
                <p class="p-1" id="lu"></p>
            </div>
        </div>
    </div>
</template>