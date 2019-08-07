<template>
  <div class="box">
    <div v-if="editing">
      <form class="form">
        <div class="buttons">
          <input
            class="button"
            type="button"
            value="Close"
            v-on:click="handleClose"
          />
          <input
            class="button is-primary"
            type="button"
            value="Submit"
            v-on:click="submit"
          />
        </div>
        <label for="id">ID:</label>
        <input
          type="text"
          name="id"
          id="id"
          class="input"
          v-model="editModel.id"
        />
        <label for="desc">Description:</label>
        <input
          type="text"
          name="desc"
          id="desc"
          class="input"
          v-model="editModel.desc"
        />
        <div class="price" v-for="(price, index) in model.price" :key="index">
          <label :for="'price' + index">{{ scales[index] }}</label>
          <input
            type="number"
            :name="scales[index]"
            :id="scales[index]"
            class="input"
            v-model.number="editModel.price[index]"
          />
        </div>
      </form>
    </div>
    <div class="info" v-else>
      <div class="buttons">
        <input
          class="button"
          type="button"
          value="Edit"
          v-on:click="handleEdit"
        />
      </div>
      <h1 class="title">{{ model.id }} - {{ model.desc }}</h1>
      <p v-for="(price, index) in model.price" :key="index">
        <span v-if="category === 'kolej'">{{ scales.train[index] }}</span>
        <span v-if="category === 'lotnictwo'">{{ scales.plane[index] }}</span> -
        {{ price }}
      </p>
    </div>
  </div>
</template>

<script>
import { db } from "../firestore";
export default {
  name: "Model",
  props: ["model", "category"],
  data() {
    return {
      scales: {
        plane: ["1:144", "1:72", "1:48", "1:32"],
        train: ["TT", "H0", "1:35"]
      },
      editModel: {},
      editing: false
    };
  },
  methods: {
    handleEdit() {
      this.$data.editModel = this.$props.model;
      this.$data.editing = true;
    },
    handleClose() {
      this.$data.editModel = {};
      this.$data.editing = false;
    },
    submit() {
      db.collection(`${this.$props.category}`)
        .doc(`${this.$props.model[".key"]}`)
        .set(this.$data.editModel)
        .catch(err => console.log(err));
    }
  }
};
</script>
