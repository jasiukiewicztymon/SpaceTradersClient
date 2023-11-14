<script setup lang="ts">
import { ref, onMounted  } from "vue";
import { useAuth } from '../stores/auth'
import router from '../router/index'

var auth = useAuth();

const username = ref("");
const token = ref("");
const h1Element = ref();

if (auth.authStatus()) router.push('/');

function sleep(ms = 1000) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

const factions = ["COSMIC", "VOID", "GALACTIC", "QUANTIUM", "DOMINION", "ASTRO", "CORSAIRS", "OBSIDIAN", "AEGIS", "UNITED", "SOLITARY", "COBALT", "OMEGA", "ECHO", "LORDS", "CULT", "ANCIENTS", "SHADOW", "ETHERNAL"]

onMounted(async () => {
  let h1Children = Array.prototype.slice.call(h1Element.value.children).slice(0, -1);

  for (let i = 0; i < h1Children.length; i++) {
    h1Children[i].style.color = '#06ff06'
    if (h1Children[i].innerText.length == 2) await sleep(1000) 
    else await sleep(100)
  }

  h1Element.value.children[h1Element.value.children.length - 1].style.animationPlayState = 'running'
})
</script>

<template>
  <main>
    <h1 ref="h1Element">
      <span>S</span>
      <span>p</span>
      <span>a</span>
      <span>c</span>
      <span>e</span>
      <span>T</span>
      <span>r</span>
      <span>a</span>
      <span>d</span>
      <span>e</span>
      <span>r</span>
      <span>s </span>
      <span>C</span>
      <span>l</span>
      <span>i</span>
      <span>e</span>
      <span>n</span>
      <span>t </span>

      <span>v0.0.1 (alpha)</span>
    </h1>
    <div>
      <label>Sign up</label>
      <div>
        <div>
          <input type="text" placeholder="username" v-model="username">
          <div id="picklist">
            <div>
              <div v-for="faction in factions">
                {{ faction }}
              </div>
            </div>
          </div>
        </div>
        <button @click="auth.signup(username)">Sign up</button>
      </div>
    </div>
    <div>
      <label>Log in</label>
      <div>
        <div>
          <input type="text" placeholder="token" v-model="token">
        </div>
        <button @click="auth.login(token)">Log in</button>
      </div>
    </div>
  </main>
</template> 

<style scoped>
@keyframes blink {
  0% {
    color: #06ff063d;
  }
  50% {
    color: #06ff06;
  }
  100% {
    color: #06ff063d;
  }
}

label {
  font-size: 32px;
}
input, button {
  font-size: 24px;
}
main {
  position: relative;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  max-width: calc(100% - 40px);
  min-height: max-content;
  width: 500px;
  padding: 20px;
}
h1 {
  display: flex;
  font-size: 56px;
}
h1 > span {
  display: contents;
}
h1 > span:not(:last-child) {
  color: #000800;
}
main {
  display: flex;
  flex-direction: column;
}
main > div {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 20px;
}
main > div > div {
  width: 100%;
  display: flex;
  justify-content: space-between;
  gap: 40px;
}
#picklist {
  position: relative;
}
#picklist > div {
  position: absolute;
}
input {
  width: calc(100% - 180px);
  color: #06ff06;
  background: #000800;
  border: none;
  accent-color: #06ff06 !important;
}
input::placeholder {
  color: #06ff06;
  opacity: 0.5;
}
button {
  border: none;
  background: #06ff06;
  color: #000800;
  width: 140px;
}
h1 > span:last-child {
  color: #000800;
  animation: blink 3.5s cubic-bezier(0.075, 0.82, 0.165, 1) 0s infinite;
  animation-play-state: paused;
}
</style>