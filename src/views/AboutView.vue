<template>
  <div class="about text-2xl ">
    <h1>{{ $t('aboutt') }}</h1>
  </div>
  <div class="github text-center">
    <h1 class="font-medium text-lg p-3">{{ $t('follow') }}</h1>
    <div class="credits flex-col space-y-3 justify-center p-2">
      <img class="bg-white rounded-full mx-auto p-1 m-2 hover:bg-orange-500" width="40" height=""
        src="https://upload.wikimedia.org/wikipedia/commons/9/91/Octicons-mark-github.svg">
      <a href="https://github.com/zeiadsalhin"
        class=" text-center mx-auto flex justify-center hover:bg-transparent ">Credits:
        Created By Ziad</a>
    </div>
  </div>
</template>

<style>
.about {
  min-height: 20vh;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  gap: 10px;
}
</style>
