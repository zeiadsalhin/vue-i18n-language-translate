<script setup>
import { RouterLink, RouterView } from 'vue-router'
import { onMounted } from 'vue';
// import HelloWorld from './components/Helloworld.vue'

onMounted(() => {
  document.cookie = 'locale=EN'
})
</script>

<template>
  <header class="p-1 mb-0 text-lg">
    <!-- <img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="125" height="125" /> -->




    <nav class="flex justify-center text-center md:space-x-28 space-x-1">
      <div class="nav text-xl">
        <RouterLink class="m-5 hover:bg-transparent" active-class="text-green-600" to="/">{{ $t('home') }}</RouterLink>
        <RouterLink class="m-5 hover:bg-transparent" active-class="text-green-600" to="/about">{{ $t('about') }}
        </RouterLink>
      </div>

      <div class="languages space-x-4 my-auto px-2">
        <select v-model="$i18n.locale" name="Language" id="" class="dark:bg-zinc-900 px-2 py-1 outline-none">
          <option v-for="(lang, i) in langs" :key="`Lang${i}`" :value="lang">{{ lang }}</option>
        </select>
      </div>
    </nav>
  </header>

  <RouterView />
</template>
<script>

export default {
  name: 'VueLanguageSwitcher',
  data() {
    return { langs: ['EN', 'AR'] }
  },
}

</script>
<style>
v-btn {
  cursor: pointer;
}
</style>



