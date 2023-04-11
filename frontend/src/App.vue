<template>
  <div class="app">
    <div v-if="state.account.id">Hi, I'm {{state.account.name}}</div>
    <div v-else>
      <label for="loginId">
        <span>ID</span>
        <input type="text" id="loginId" v-model="state.loginId">
      </label>
      <label for="loginPw">
        <span>PASSWORD</span>
        <input type="password" id="loginPw" v-model="state.loginPw">
      </label>
      <hr />
      <button @click="submit()">login</button>
    </div>
  </div>
</template>

<script>
import {reactive} from "vue";
import axios from 'axios';
export default {
  setup() {
    const state = reactive({
      account: {
        id: null,
        name: '',
      },
      form: {
        loginId: '',
        loginPw: '',
      },
    });


    //로그인
    const submit = () => {
      const loginForm = {
        loginId: state.loginId,
        loginPw: state.loginPw,
      }
      axios.post("/api/account", loginForm).then((res) => {
        alert("logined !!");
        state.account = res.data;
        // console.log(res);
      }).catch(() => {
        alert("failed to login, check your login information.");
      });
    };

    //실행시 계정 요청
    axios.get('/api/account').then((res) => {
      state.account = res.data;
    });
    return {state, submit};
  },
}
</script>
