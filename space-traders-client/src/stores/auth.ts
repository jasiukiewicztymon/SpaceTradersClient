import { defineStore } from 'pinia' 
import { useCookies } from "vue3-cookies";
const { cookies } = useCookies();

export const useAuth = defineStore('auth', () => {
  async function login(tokenString: string) {
    const url = 'https://api.spacetraders.io/v2/my/agent';
    const options = {
      method: 'GET',
      headers: {Accept: 'application/json', Authorization: `Bearer ${tokenString}`}
    };

    const response = await fetch(url, options);
    const data = await response.json();
    if (data.error) {
      console.error("Wrong token");
    }
    else {
      cookies.set("token", tokenString);
      window.location.reload()
    }
  }
  function logout() {
    cookies.remove("token");
    window.location.reload()
  }
  function signup(userName: string) {
    window.location.reload()
  }
  function authStatus() {
    return cookies.isKey("token");
  }
  function getToken() {
    if (cookies.isKey("token")) return cookies.get("token");
    throw "The user is not logged in";
  }

  return { login, logout, signup, authStatus, getToken }
})
