<template>
  <div id="app" class="container">
    <nav
      class="navbar is-fixed-top"
      role="navigation"
      aria-label="main navigation"
    >
      <div class="navbar-brand">
        <a class="navbar-item" href="https://bulma.io">
          <img src="./assets/logo.svg" width="90" height="28" />
        </a>
      </div>
      <div class="navbar-end">
        <div class="navbar-item">
          <div class="buttons">
            <a class="button is-light" v-on:click="openModal">
              Log in
            </a>
          </div>
        </div>
      </div>
    </nav>
    <section class="section">
      <Models />
    </section>
    <Login :class="{ 'is-active': modal }" v-on:closeModal="handleCloseModal" />
  </div>
</template>

<script>
import Models from "./components/Models.vue";
import Login from "./components/Login.vue";

export default {
  name: "app",
  components: {
    Models,
    Login
  },
  data() {
    return {
      modal: false
    };
  },
  methods: {
    openModal() {
      this.$data.modal = true;
    },
    handleCloseModal() {
      this.$data.modal = false;
    }
  }
};
</script>

<style>
.section {
  margin-top: 52px;
}
</style>
