<script setup>
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

    <div class="main flex-col w-full mx-auto max-md:min-h-screen ">

        <div class="input md:flex justify-center space-x-4 md:w-fit w-full mx-auto h-fit">
            <div class="text relative dark:bg-zinc-800 bg-slate-100 px-3 outline-slate-400 rounded-lg my-auto">
                <label
                    class="label hover:cursor-text transform transition ease-in-out text-left absolute top-4 bg-inherit rounded-md px-2 text-md font-semibold"
                    for="amount">{{ $t('vatl') }}</label>
                <input id="amount" name="tel" v-model="value1" placeholder="" type="text" @focus="move" @blur="back"
                    class=" outline-none bg-transparent text-lg mt-4 mb-3 md:w-96 w-full" required>

            </div>
            <div class="validatebutton p-2 mx-auto flex justify-center">
                <button @click="validateemail"
                    class="outline-none h-fit px-4 py-3 my-auto text-xl dark:ripple-bg-zinc-700 ripple-bg-zinc-200 rounded-md">{{ $t('validateb') }}</button>
            </div>
        </div>
        <h1 class="text-center p-4">{{ $t('entervat') }}</h1>
        <h1 v-if="empty" class="text-center text-red-700">{{ $t('vatempty') }}</h1>
        <h1 v-if="iserror" class="text-center text-red-700">{{ $t('vatcheck') }}</h1>
        <h1 v-if="isloading" class="text-center p-2 mt-20">{{ $t('loading') }}</h1>
        <div v-if="VATinfo.length != 0"
            class="results flex-col justify-center space-y-4 mx-auto md:w-2/3 w-full outline outline-1 outline-zinc-700 p-3 mt-10 mb-">
            <div class="email flex md:space-x-5 space-x-2">
                <p class="text-lg font-semibold my-auto">VAT Code: </p>
                <p class="my-auto text-md">{{ VATinfo.vat_number }}</p>
            </div>
            <div class="del flex  md:space-x-5 space-x-2">
                <p class="text-lg font-semibold my-auto">Valid : </p>
                <p class="my-auto text-md">{{ VATinfo.valid }}</p>
            </div>
            <div class="val flex  md:space-x-5 space-x-2">
                <p class="text-lg font-semibold my-auto">Company name: </p>
                <p class="my-auto text-md">{{ VATinfo.company.name }}</p>
            </div>
            <div class="vala flex  md:space-x-5 space-x-2 md:w-full">
                <p class="text-lg font-semibold">Address: </p>
                <p class="my-auto text-md">{{ VATinfo.company.address }}</p>
            </div>
            <div class="free flex  md:space-x-5 space-x-2">
                <p class="text-lg font-semibold my-auto">Country code : </p>
                <p class="my-auto text-md">{{ VATinfo.country.code }}</p>
            </div>
            <div class="d flex  md:space-x-5 space-x-2">
                <p class="text-lg font-semibold my-auto">Location : </p>
                <p class="my-auto text-md">{{ VATinfo.country.name }}</p>
            </div>
        </div>
    </div>
    <p class="fixed bottom-0 left-0 p-2 text-center font-thin mx-auto bg-inherit">This site does not collect information,
        powered by
        <a class="hover:bg-transparent font-normal hover:text-green-700" target="_blank"
            href="https://www.abstractapi.com/">Abstract
            API</a>
    </p>
</template>
<script>

export default {
    data() {
        return {
            empty: false,
            iserror: false,
            isloading: false,
            value1: '',
            VATinfo: [],
        }
    },
    methods: {
        async validateemail() {
            if (this.value1 !== '') {
                this.empty = false;
                this.iserror = false;
                try {
                    this.isloading = true;
                    const url = `https://vat.abstractapi.com/v1/validate/?api_key=7eec52f410364e4caf52421d70ccc081&vat_number=${this.value1.toUpperCase()}`;
                    const response = await fetch(url);
                    if (response.status === 400) {
                        throw new Error('Bad Request');
                    }
                    const data = await response.json();
                    window.scrollBy({
                        top: 2000,
                        behavior: 'smooth',
                    });
                    this.VATinfo = data;
                    this.isloading = false;
                } catch (error) {
                    console.error(error);
                    this.isloading = false;
                    this.iserror = true;
                }
            } else {
                this.empty = true;
            }
        },
    },
};
</script>