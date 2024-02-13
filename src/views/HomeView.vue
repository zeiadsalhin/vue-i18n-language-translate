<script setup>
// import TheWelcome from '../components/TheWelcome.vue'
</script>

<template>
  <div
    class="currency border-2 hover:border-4 border-green-950 p-10 text-center text-lg hover:text-green-600 hover:bg-slate-950">
    <button class="transform transition ease-in-out duration-500 ">
      <RouterLink class="hover:bg-transparent" to="/currency">{{ $t('currency') }}</RouterLink>
    </button>
  </div>
  <div
    class="time border-2 hover:border-4 border-green-950 p-10 text-center text-lg hover:text-green-600 hover:bg-slate-950">
    <button class="transform transition ease-in-out duration-500 ">{{ $t('Date') }}</button>
  </div>
  <div
    class="degree border-2 hover:border-4 border-green-950 p-10 text-center text-lg hover:text-green-600 hover:bg-slate-950">
    <button class="transform transition ease-in-out duration-500 ">{{ $t('Temp') }}</button>
  </div>
</template>
<style>
.currency,
.time,
.degree {
  justify-content: center;
  align-items: center;
  text-align: center;
  max-width: 40vh;
  margin: 2rem auto;
  transition: 0.1s;
}
</style>
