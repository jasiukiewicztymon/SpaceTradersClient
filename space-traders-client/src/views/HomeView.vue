<script setup lang="ts">
import { ref } from "vue";
import { useAuth } from '../stores/auth'

var auth = useAuth();

const username = ref("");
const token = ref("");
</script>

<script lang="ts">

</script>

<template>
  <main v-if="auth.authStatus()">
    <button @click="console.log(auth.getToken())">show</button>
    <button @click="auth.logout()">logout</button>
  </main>
  <main v-else>
    <label>Sign up</label>
    <input type="text" placeholder="username" v-model="username"> {{ username }}
    <button @click="auth.signup(username)">Sign up</button>
    <br>
    <label>Log in</label>
    <input type="text" placeholder="token" v-model="token"> {{ token }}
    <button @click="console.log(auth.getToken())">show</button>
    <button @click="auth.login(token)">Log in</button>
  </main>
</template> 
