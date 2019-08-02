<template>
  <div class="container columns">
    <div class="column">
      <form method="POST" enctype="multipart/form-data" class="form box">
        <label class="label" for="description">Description</label>
        <input
          class="input"
          type="text"
          id="description"
          name="description"
          v-model="newModel.desc"
        />
        <label class="label" for="id">ID</label>
        <input
          class="input"
          type="text"
          id="id"
          name="id"
          v-model="newModel.id"
        />
        <div>
          <input type="file" name="image" id="uploadImage" />
        </div>
        <div class="wrapper">
          <div
            class="entry"
            v-for="(price, index) in newModel.price"
            :key="index"
          >
            <label class="label" :for="index">{{ scales[index] }}</label>
            <input
              class="input"
              type="number"
              :name="scales[index]"
              :id="index"
              v-model.number="newModel.price[index]"
            />
          </div>
        </div>
        <input type="button" v-on:click="upload" value="Send" />
      </form>
    </div>
    <div class="column">
      <Model
        v-for="model in models$"
        :key="model['.key']"
        :model="model"
        :category="category"
      />
    </div>
  </div>
</template>

<script>
import Model from "./Model.vue";
import { db, storage } from "../firestore";
import { collectionData } from "rxfire/firestore";
import { startWith, tap } from "rxjs/operators";
import { percentage } from "rxfire/storage";
export default {
  name: "Models",
  data() {
    return {
      newModel: {
        desc: "",
        id: "MD000",
        price: [0, 0, 0, 0]
      },
      scales: ["1:144", "1:72", "1:48", "1:32"],
      category: "lotnictwo"
    };
  },
  components: {
    Model
  },
  methods: {
    upload() {
      let storageRef = storage.ref(`${this.$data.chosenCategory}`);
      let image = document.querySelector("#uploadImage").files[0];
      let res = image.name.match(/\.[0-9a-z]+$/i);
      let imageRef = storageRef.child(`${this.$data.newModel.id}${res[0]}`);
      let databaseRef = db.collection(`${this.$data.chosenCategory}`);
      let uploadTask = imageRef
        .put(image)
        .then(snapshot => {
          console.log(snapshot);
        })
        .catch(err => console.log(err));
      percentage(uploadTask).subscribe(action => {
        console.log(action.progress, action.snapshot);
      });
      databaseRef
        .add(this.$data.newModel)
        .then(data => console.log(data))
        .catch(err => console.log(err));
      this.$data.newModel = {
        desc: "",
        id: "MD000",
        price: [0, 0, 0, 0]
      };
      image = null;
    }
  },
  subscriptions() {
    const query = db.collection("lotnictwo").orderBy("id", "desc");
    return {
      models$: collectionData(query, ".key").pipe(
        startWith([]),
        tap(result => {
          console.log(result);
        })
      )
    };
  }
};
</script>

<style></style>
