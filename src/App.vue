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
          <div class="select">
            <select name="category" id="category" v-model="chosenCategory">
              <option value="kolej">kolej</option>
              <option value="lotnictwo">lotnictwo</option>
            </select>
          </div>
        </div>
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
      <TrainModels v-if="chosenCategory === 'kolej'" />
      <PlaneModels v-if="chosenCategory === 'lotnictwo'" />
    </section>
    <Login :class="{ 'is-active': modal }" v-on:closeModal="handleCloseModal" />
  </div>
</template>

<script>
import PlaneModels from "./components/PlaneModels.vue";
import TrainModels from "./components/TrainModels.vue";
import Login from "./components/Login.vue";

export default {
  name: "app",
  components: {
    PlaneModels,
    TrainModels,
    Login
  },
  data() {
    return {
      modal: false,
      chosenCategory: ""
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
