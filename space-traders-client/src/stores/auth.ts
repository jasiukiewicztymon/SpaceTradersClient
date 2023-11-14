import { defineStore } from 'pinia' 
import { useCookies } from "vue3-cookies";
const { cookies } = useCookies();

export const useAuth = defineStore('auth', () => {
  async function login(tokenString: string) {
    const response = await fetch('https://api.spacetraders.io/v2/my/agent', 
    {
      method: 'GET',
      headers: {
        Accept: 'application/json', 
        Authorization: `Bearer ${tokenString}`
      }
    });
    const data = await response.json();
    if (data.error) {
      window.alert("Wrong token");
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
  async function signup(userName: string) {
    if (userName.length > 14 || userName.length < 3) window.alert("The name should have between 3-14 characters")
    else {
      const response = await fetch('https://api.spacetraders.io/v2/register', 
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          faction: "COSMIC",
          symbol: userName
        })
      });

      const data = await response.json();
      console.log(data)

      cookies.set("token", data.data.token);
      window.location.reload()
    }
  }
  async function authStatus() {
    if (!cookies.isKey("token")) return false;
    const response = await fetch('https://api.spacetraders.io/v2/my/agent', 
    {
      method: 'GET',
      headers: {
        Accept: 'application/json', 
        Authorization: `Bearer ${cookies.get("token")}`
      }
    });
    const data = await response.json();
    if (data.error) return false;
    return true;
  }
  function getToken() {
    if (cookies.isKey("token")) return cookies.get("token");
    throw "The user is not logged in";
  }

  return { login, logout, signup, authStatus, getToken }
})
