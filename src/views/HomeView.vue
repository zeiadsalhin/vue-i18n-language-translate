<script setup>
// import TheWelcome from '../components/TheWelcome.vue'
</script>

<template>
  <div class="buttons mx-auto align-middle justify-center text-center md:w-1/3 space-y-5">
    <RouterLink class="hover:bg-transparent" to="/currency">
      <button
        class="mx-auto w-4/5 transform transition ease-in-out duration-500 currency border-2 hover:border-4 border-green-950 md:p-10 p-5 text-center text-lg hover:text-green-600 hover:bg-slate-950">
        {{ $t('currency') }}
      </button>
    </RouterLink>
    <RouterLink class="hover:bg-transparent" to="/time">
      <button
        class="mx-auto w-4/5 transform transition ease-in-out duration-500 time border-2 hover:border-4 border-green-950 md:p-10 p-5 text-center text-lg hover:text-green-600 hover:bg-slate-950">{{
          $t('Date') }}</button>
    </RouterLink>
    <RouterLink class="hover:bg-transparent" to="/temperature">
      <button
        class="mx-auto w-4/5 transform transition ease-in-out duration-500 degree border-2 hover:border-4 border-green-950 md:p-10 p-5 text-center text-lg hover:text-green-600 hover:bg-slate-950">{{
          $t('Temp') }}</button>
    </RouterLink>
    <RouterLink class="hover:bg-transparent" to="/email">
      <button
        class="mx-auto w-4/5 transform transition ease-in-out duration-500 degree border-2 hover:border-4 border-green-950 md:p-10 p-5 text-center text-lg hover:text-green-600 hover:bg-slate-950">{{
          $t('ev') }}</button>
    </RouterLink>
    <RouterLink class="hover:bg-transparent" to="/phone">
      <button
        class="mx-auto w-4/5 transform transition ease-in-out duration-500 degree border-2 hover:border-4 border-green-950 md:p-10 p-5 text-center text-lg hover:text-green-600 hover:bg-slate-950">{{
          $t('pv') }}</button>
    </RouterLink>
    <RouterLink class="hover:bg-transparent" to="/vat">
      <button
        class="mx-auto w-4/5 transform transition ease-in-out duration-500 degree border-2 hover:border-4 border-green-950 md:p-10 p-5 text-center text-lg hover:text-green-600 hover:bg-slate-950">{{
          $t('vat') }}</button>
    </RouterLink>
  </div>
</template>
<style>
.currency,
.time,
.degree {
  /* justify-content: center; */
  /* align-items: center; */
  /* text-align: center; */
  max-width: 40vh;
  margin: 2rem auto;
  transition: 0.1s;
}
</style>
