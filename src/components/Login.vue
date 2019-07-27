<template>
  <div class="modal">
    <div class="modal-background"></div>
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title">Log in</p>
        <button class="delete" v-on:click="closeModal"></button>
      </header>
      <section class="modal-card-body">
        <p v-if="user$">Logged in as: {{ user$.email }}</p>
        <form class="form">
          <label class="label" for="email">E-mail</label>
          <input
            class="input"
            type="text"
            name="email"
            id="email"
            v-model="email"
          />
          <label class="label" for="password">Password</label>
          <input
            class="input"
            type="password"
            name="password"
            id="password"
            v-model="password"
          />
        </form>
      </section>
      <footer class="modal-card-foot">
        <input
          class="button is-success"
          type="button"
          value="Log in"
          v-on:click="logIn"
        />
        <input
          class="button"
          type="button"
          value="Log out"
          v-on:click="logOut"
        />
      </footer>
    </div>
    <button class="modal-close is-large" v-on:click="closeModal">Close</button>
  </div>
</template>

<script>
import { auth } from "../firestore";
import { authState } from "rxfire/auth";
export default {
  name: "Login",
  data() {
    return {
      modal: false,
      email: "",
      password: ""
    };
  },
  methods: {
    logIn() {
      console.table(this.$data);
      auth
        .signInWithEmailAndPassword(this.$data.email, this.$data.password)
        .catch(error => console.log(error));
      this.$data.email = "";
      this.$data.password = "";
    },
    logOut() {
      auth.signOut();
      this.$data.email = "";
      this.$data.password = "";
    },
    closeModal() {
      this.$emit("closeModal");
    }
  },
  subscriptions() {
    return {
      user$: authState(auth)
    };
  }
};
</script>

<style></style>
