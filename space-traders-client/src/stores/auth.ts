import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useAuth = defineStore('auth', () => {
  const token = ref("")
  const loggedIn = ref(false);

  function login(tokenStrig: string) {
    token.value = tokenStrig;
    loggedIn.value = true;
  }
  function logout() {
    token.value = "";
    loggedIn.value = false;
  }
  function authStatus() {
    return loggedIn.value;
  }
  function getToken() {
    if (loggedIn.value) return token.value;
    throw "The user is not logged in";
  }

  return { login, logout, authStatus, getToken }
})
