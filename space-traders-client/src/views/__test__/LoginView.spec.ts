import { describe, it, expect, test, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import router from '@/router'
import { createPinia } from 'pinia'
// @ts-ignore
import LoginView from '../LoginView.vue'

function mountTheHeader() {
    const wrapper = mount(LoginView, {
      global: {
        plugins: [router,createPinia()]
      }
    })
    return wrapper
}

function randomName(length: number) {
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  let counter = 0;
  while (counter < length) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
    counter += 1;
  }
  return result;
}

const SHARED_VARS = {
  TOKEN: "",
  USERNAME: ""
}

describe('The Router', () => {
  it('Sign Up (SUCCESS)', async () => {
    const wrapper = mountTheHeader();
    let usrName = randomName(12);
    SHARED_VARS.USERNAME = usrName;

    wrapper.vm.testEntrypoint.querySelector('input[tabindex=1]').value = usrName;
    wrapper.vm.testEntrypoint.querySelector('input[tabindex=1]').dispatchEvent(new Event("input"));
    expect(wrapper.vm.username).toBe(usrName)

    wrapper.vm.testEntrypoint.querySelector('button[tabindex=3]').click();
    expect(wrapper.vm.cookies.isKey('token')).toBe(true);
    expect(wrapper.vm.cookies.get('token')).not('');
    SHARED_VARS.TOKEN = wrapper.vm.cookies.get('token');
  })
  it('Sign Up (ERROR: wrong name)', () => {
    const wrapper = mountTheHeader();
    let usrName = randomName(2);

    // simulation window.alert
    window.alert = () => {};

    wrapper.vm.testEntrypoint.querySelector('input[tabindex=1]').value = usrName;
    wrapper.vm.testEntrypoint.querySelector('input[tabindex=1]').dispatchEvent(new Event("input"));
    expect(wrapper.vm.username).toBe(usrName)
    
    wrapper.vm.testEntrypoint.querySelector('button[tabindex=3]').click();
    expect(wrapper.vm.cookies.isKey('token')).toBe(false);
  })
  it('Sign Up (ERROR: same name)', () => {
    const wrapper = mountTheHeader();
    let usrName = SHARED_VARS.USERNAME;

    // simulation window.alert
    window.alert = () => {};

    wrapper.vm.testEntrypoint.querySelector('input[tabindex=1]').value = usrName;
    wrapper.vm.testEntrypoint.querySelector('input[tabindex=1]').dispatchEvent(new Event("input"));
    expect(wrapper.vm.username).toBe(usrName)

    wrapper.vm.testEntrypoint.querySelector('button[tabindex=3]').click();
    expect(wrapper.vm.cookies.isKey('token')).toBe(false);
  })
})