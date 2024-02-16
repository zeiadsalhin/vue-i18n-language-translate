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
// const searchTerm = ref('') = searchTerm2 = ref('')



// const url1 = ("https://timezone.abstractapi.com/v1/current_time/?api_key=f0f468bd85394f7abbc06c37fe4f7517&location=");
// const urlw = ("https://api.weatherapi.com/v1/current.json?key=f7e22d2e90f84fcfae755513241402&q=")

// function ss() {
//     const options = { method: 'GET' };

//     fetch(url1 + input1.value, options)
//         .then(response => response.json())
//         .then(response => {
//             var requested = response.requested_location
//             var datetime = Object.entries(response)[0][1]
//             var timezonetype = Object.entries(response)[1][1]
//             var timezone = Object.entries(response)[3][1]
//             document.querySelector("#requested").innerHTML = 'Requested location:' + ' ' + requested;
//             document.querySelector("#datetime").innerHTML = datetime + ' ' + timezone;
//             document.querySelector("#timezone").innerHTML = timezonetype;
//         })
//         .catch(err => console.error(err));
///

//weather
//     const options2 = { method: 'GET' };

//     fetch(urlw + input1.value, options2)
//         .then(response => response.json())
//         .then(response => {
//             var temp = response.current.temp_c
//             var state = response.current.condition.text
//             var lu = response.current.last_updated
//             document.querySelector("#weather").innerHTML = state + ' ,' + temp + ' ْc';
//             document.querySelector("#lu").innerHTML = 'Last Updated: ' + lu;
//         })
//         .catch(err => console.error(err));

// }
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
    <div class="main flex-col justify-center mx-auto p-2">
        <h1 class="text-center text-2xl font-semibold mb-10">{{ $t('TDC') }}</h1>
        <div class="info text-xs md:text-sm">
            <h2 class="mb-2">{{ $t('CT') }}<p id="current"></p>
            </h2>
            <h2 class="mb-2">{{ $t('CIP') }} <p id="ip"></p>
            </h2>
            <h2 class="mb-2">{{ $t('ISP') }} <p id="isp"></p><img src="" class="p-1" width="50" id="flag">
            </h2>
        </div>

        <form class="mx-auto text-center flex-col block" onsubmit="return false">
            <p class="p-2">{{ $t('Search') }}</p>
            <div>
                <input type="text" v-model="searchTerm"
                    class="inp p-2 dark:text-zinc-100 dark:bg-zinc-800 bg-slate-100 outline-none w-full md:w-1/3" required
                    placeholder="Enter a location" @input="handleInput">
                <ul v-if="searchTerm.length > 0 && searchResults.length > 0 && !isOptionSelected"
                    class="dropdown-menu bg-slate-50 dark:bg-zinc-950  md:w-1/3 mx-auto shadow-md">
                    <li class="dark:hover:bg-zinc-900" v-for="result in searchResults" :key="result.id"
                        @click="selectResult(result)">
                        {{ result.place_name }}
                    </li>
                </ul>
                <div v-if="isLoading">Loading...</div>
                <div v-if="selectedLocation">
                    <p class="p-2 mt-5 font-semibold text-xl">{{ selectedLocation.place_name }}<img class="p-1 inline"
                            width="50" :src="selectedLocation.flag"></p>
                    <p id="requested" class="p-2 inline-block text-center text-2xl mt-1 font-bold">

                        {{ $t('RL') }}
                    </p>
                    <div class="results md:flex justify-center space-y-5 md:space-y-0 md:space-x-20 mx-auto text-center">
                        <div class="1 p-2 block">
                            <p class="p-2 font-semibold text-lg">{{ $t('DT') }}
                            </p>
                            <p id="datetime">{{ selectedLocation.datetime }} {{ selectedLocation.timezone }}</p>
                        </div>

                        <div class="2 p-2 block">
                            <p class="p-2 font-semibold text-lg">{{ $t('TZ') }}
                            </p>
                            <p id="timezone">{{ selectedLocation.timezonetype }}</p>
                        </div>
                        <div class="3 p-2 block">
                            <p class="p-2 font-semibold text-lg">{{ $t('W') }}
                            </p>
                            <p id="weather">{{ selectedLocation.condition }}, {{ selectedLocation.weather }}</p>
                            <p class="p-1" id="lu">{{ $t('lu') }} {{ selectedLocation.lu }}</p>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    </div>
</template>
<script>
export default {
    data() {
        return {
            isLoading: false,
            searchTerm: '',
            searchResults: [],
            selectedLocation: null,
            isOptionSelected: false,
        };
    },
    methods: {
        async fetchSearchResults() {
            try {
                const response = await fetch(
                    `https://api.mapbox.com/geocoding/v5/mapbox.places/${this.searchTerm}.json?access_token=pk.eyJ1IjoiejIyMiIsImEiOiJjbHNsbDNjaTIwMzJ0MmtvZWk4eTByazJrIn0.R5HnC_PgeO9dT1pjoADDkQ`
                );
                const data = await response.json();
                this.searchResults = data.features;
            } catch (error) {
                console.error(error);
            }
        },
        async fetchWeather(location) {
            try {
                this.isLoading = true;
                const response = await fetch(
                    `https://timezone.abstractapi.com/v1/current_time/?api_key=f0f468bd85394f7abbc06c37fe4f7517&location=${location.place_name}`
                );
                const data = await response.json();
                const response2 = await fetch(
                    `https://api.weatherapi.com/v1/current.json?key=f7e22d2e90f84fcfae755513241402&q=${location.place_name}`
                );
                const data2 = await response2.json();
                location.flag = data2.current.condition.icon
                location.condition = data2.current.condition.text;
                location.weather = data2.current.temp_c + ' ْc';
                location.lu = data2.current.last_updated;
                location.datetime = data.datetime || 'Unavailable Data, Please choose other location'
                location.timezone = data.timezone_abbreviation
                location.timezonetype = data.timezone_location || 'Unavailable Data, Please choose other location'
                this.isLoading = false;
            } catch (error) {
                console.error(error);
                this.isLoading = false;
            }
        },
        handleInput() {
            if (this.searchTerm.length > 0) {
                this.fetchSearchResults();
                this.isOptionSelected = false;
            } else {
                this.searchResults = [];
            }
        },
        selectResult(result) {
            this.selectedLocation = result;
            this.fetchWeather(result);
            this.isOptionSelected = true;
            this.searchTerm = ''
        },
    },
};
</script>
<style>
.dropdown-menu {
    margin-top: 5px;
    padding: 5px;
    /* background-color: rgb(51, 51, 51); */
    list-style-type: none;
}

.dropdown-menu li {
    cursor: pointer;
    padding: 8px;
}

.dropdown-menu li:hover {
    /* background-color: #222; */
}
</style>