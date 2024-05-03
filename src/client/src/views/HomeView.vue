<script setup lang="ts">
import { onMounted, ref } from 'vue';
import TheWelcome from '../components/TheWelcome.vue';
import { HttpClient } from '@/lib/HttpClient';
import router from '@/router';

let env = import.meta.env.MODE;
let username = ref('');
let password = ref('');
let errorMessage = ref('');

onMounted(async () => {
  let res = await HttpClient.getDate();
  console.log('date', res);
});

async function onLogin() {
  try {
    let res = await HttpClient.login({ username: username.value });
    console.log(res);
    router.push('/users');
  } catch (error: any) {
    console.error(error.message);
    errorMessage.value = error.message;
  }
}

async function onRegister() {
  try {
    let res = await HttpClient.register({ username: username.value });
    console.log(res);
    errorMessage.value = `Username ${res.username} is created`;
  } catch (error: any) {
    console.error(error.message);
    errorMessage.value = error.message;
  }
}
</script>

<template>

  <div class="min-h-screen flex flex-col items-center justify-center bg-gray-300">
    <div
      class="flex flex-col bg-white text-black shadow-md px-4 sm:px-6 md:px-8 lg:px-10 py-8 rounded-md w-full max-w-md">
      <div class="mx-auto">ENV: {{ env }}</div>
      <div class="mt-2">
        <form @submit.prevent="onLogin()">
          <div class="flex flex-col mb-6">
            <label for="username" class="mb-1 text-xs sm:text-sm tracking-wide text-gray-600">Username:</label>
            <div class="relative">
              <div class="inline-flex items-center justify-center absolute left-0 top-0 h-full w-10 text-gray-400">
                <svg class="h-6 w-6" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                </svg>
              </div>

              <input id="username" type="text" name="username" v-model="username"
                class="text-sm sm:text-base placeholder-gray-500 pl-10 pr-4 rounded-lg border border-gray-400 w-full py-2 focus:outline-none focus:border-blue-400"
                placeholder="Username" />
            </div>
          </div>
          <div class="flex flex-col mb-6">
            <label for="password" class="mb-1 text-xs sm:text-sm tracking-wide text-gray-600">Password:</label>
            <div class="relative">
              <div class="inline-flex items-center justify-center absolute left-0 top-0 h-full w-10 text-gray-400">
                <span>
                  <svg class="h-6 w-6" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    viewBox="0 0 24 24" stroke="currentColor">
                    <path
                      d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </span>
              </div>

              <input id="password" type="password" name="password" v-model="password"
                class="text-sm sm:text-base placeholder-gray-500 pl-10 pr-4 rounded-lg border border-gray-400 w-full py-2 focus:outline-none focus:border-blue-400"
                placeholder="Password" />
            </div>
          </div>

          <div class="flex w-full">
            <button type="submit"
              class="flex items-center justify-center focus:outline-none text-white text-sm sm:text-base bg-blue-600 hover:bg-blue-700 rounded py-2 w-full transition duration-150 ease-in">
              <span class="mr-2 uppercase">Login</span>
              <span>
                <svg class="h-6 w-6" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  viewBox="0 0 24 24" stroke="currentColor">
                  <path d="M13 9l3 3m0 0l-3 3m3-3H8m13 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </span>
            </button>
          </div>
        </form>
      </div>
      <div class="flex justify-center items-center mt-6">
        <div class="flex w-full">
          <button type="button" @click="onRegister()"
            class="flex items-center justify-center focus:outline-none text-white text-sm sm:text-base bg-orange-600 hover:bg-orange-700 rounded py-2 w-full transition duration-150 ease-in">
            <span class="mr-2 uppercase">Register</span>
            <span>
              <svg class="h-6 w-6" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                viewBox="0 0 24 24" stroke="currentColor">
                <path d="M13 9l3 3m0 0l-3 3m3-3H8m13 0a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </span>
          </button>
        </div>
      </div>
      <div v-if="errorMessage"
        class="mt-4 py-4 px-4 shadow-md no-underline bg-red-500 text-white font-sans font-semibold text-sm border-red-500">
        {{ errorMessage }}</div>

    </div>
  </div>
</template>

<style scoped></style>