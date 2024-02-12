<script setup>
import { RouterLink, RouterView } from 'vue-router'
import { onMounted } from 'vue';
// import HelloWorld from './components/Helloworld.vue'

onMounted(() => {
  document.cookie = 'locale=AR'
})
</script>

<template>
  <header class="p-1 mb-20 text-lg">
    <!-- <img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="125" height="125" /> -->




    <nav class="flex justify-center text-center md:space-x-28 space-x-1">
      <div class="nav text-xl">
        <RouterLink class="m-5" active-class="text-green-600" to="/">{{ $t('home') }}</RouterLink>
        <RouterLink class="m-5" active-class="text-green-600" to="/about">{{ $t('about') }}</RouterLink>
      </div>

      <div class="languages flex space-x-4 my-auto"><v-btn class="" @click="$i18n.locale = `EN`">EN</v-btn>
        <v-btn id="v-btn" @click="$i18n.locale = `AR`">عربي</v-btn>
      </div>
    </nav>
  </header>

  <RouterView />
</template>
<style>
v-btn {
  cursor: pointer;
}
</style>



