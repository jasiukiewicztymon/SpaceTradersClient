<script setup lang="ts">
import { useAuth } from '../stores/auth'
import router from '../router/index'

var auth = useAuth();

auth.authStatus().then(r => {
  if (!r) router.push('/login')
})
</script>

<template>
  test
</template>

<style>
</style>
