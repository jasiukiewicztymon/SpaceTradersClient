<script setup lang="ts">
import { ref, onMounted  } from "vue";
import { useAuth } from '../stores/auth'
import router from '../router/index'

var auth = useAuth();

const username = ref("");
const token = ref("");
const h1Element = ref();
const picklist = ref();

auth.authStatus().then(r => {
  if (r) router.push('/')
})

function sleep(ms = 1000) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

const factions: any[] = [];

(async () => {
  let index = 1;

  while (true) {
    const response = await fetch(`https://api.spacetraders.io/v2/factions?limit=20&page=${index}`, 
    {
      method: 'GET',
      headers: {
        Accept: 'application/json',
      }
    });

    const data = await response.json();
    
    for (let d in data.data) {
      factions.push({ symbol: data.data[d].symbol, name: data.data[d].name, description: data.data[d].description })
    }

    if (data.data.length < 20) break;
  }
})()

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
      <br>
      <span>v0.0.1 (alpha)</span>
    </h1>
    <div>
      <label>Sign up</label>
      <div>
        <div>
          <input tabindex="1" type="text" placeholder="username" v-model="username">
          <div @input="e => console.log(e)" tabindex="2" ref="picklist" id="picklist">
            <div>
              <div><b>Use up & down arrows</b></div>
              <div v-for="faction in factions">
                {{ faction }}
              </div>
            </div>
          </div>
        </div>
        <button tabindex="3" @click="auth.signup(username)">Sign up</button>
      </div>
      <p>Your role: <i>Description, is something blah blah blah dfksnkfldsan fndsal k, df fdsk fdsj kfdsj kkfdsj kjfdsk jdsfkj .</i></p>
    </div>
    <div>
      <label>Log in</label>
      <div>
        <div>
          <input tabindex="4" type="text" placeholder="token" v-model="token">
          <div tabindex="5" id="fileinput">From file</div>
        </div>
        <button tabindex="6" @click="auth.login(token)">Log in</button>
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
* {
  accent-color: #06ff06;
}
*:focus {
  outline: #06ff06 1px solid !important;
}
input, #picklist, #fileinput {
  padding: 5px;
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
  gap: 20px;
  margin-bottom: 40px;
}
main > div > div {
  width: 100%;
  display: flex;
  justify-content: space-between;
  gap: 40px;
}
main > div > div > div {
  width: calc(100% - 180px);
  display: flex;
  justify-content: space-between;
  gap: 20px;
}
main > div:nth-child(2) > div > div {
  display: flex;
  justify-content: space-between;
  gap: 20px;
}
main > div:nth-child(2) > div > div *, main > div:nth-child(3) > div > div * {
  width: calc(50% - 20px);
}
#picklist {
  position: relative;
  overflow: hidden;
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