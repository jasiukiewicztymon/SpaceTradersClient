<script setup lang="ts">
import { useAuth } from '../stores/auth'

var auth = useAuth();
</script>

<template>
  <main v-if="auth.authStatus()">
    dsfdfs
    <button @click="auth.logout()">logout</button>
  </main>
  <main v-else>
    dvvvvv
    <button @click="auth.login('dgdsg')">login</button>
  </main>
</template> 
