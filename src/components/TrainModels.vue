<template>
  <div class="container">
    <progress class="progress" :value="percentage" max="100" v-if="uploading"
      >{{ percentage }}%</progress
    >
    <div class="columns">
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
  </div>
</template>

<script>
import Model from "./Model.vue";
import { db, storage } from "../firestore";
import { collectionData } from "rxfire/firestore";
import { startWith, tap, finalize } from "rxjs/operators";
import { percentage } from "rxfire/storage";
export default {
  name: "Models",
  data() {
    return {
      newModel: {
        desc: "",
        id: "MDK000",
        price: [0, 0, 0]
      },
      scales: ["TT", "H0", "1:35"],
      category: "kolej"
    };
  },
  components: {
    Model
  },
  methods: {
    upload() {
      let storageRef = storage.ref(`${this.$data.category}`);
      let image = document.querySelector("#uploadImage").files[0];
      let res = image.name.match(/\.[0-9a-z]+$/i);
      let imageRef = storageRef.child(`${this.$data.newModel.id}${res[0]}`);
      let databaseRef = db.collection(`${this.$data.category}`);
      let uploadTask = imageRef.put(image);
      this.$data.uploading = true;
      percentage(uploadTask)
        .pipe(
          finalize(() => {
            console.log("Finished.");
            this.$data.uploading = false;
            this.$data.percentage = 0;
          })
        )
        .subscribe(action => {
          this.$data.percentage = action.progress;
        });
      databaseRef
        .add(this.$data.newModel)
        .then(data => console.log(data))
        .catch(err => console.log(err));
      this.$data.newModel = {
        desc: "",
        id: "MDK000",
        price: [0, 0, 0]
      };
      image = null;
    }
  },
  subscriptions() {
    const query = db.collection(this.$data.category).orderBy("id", "desc");
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
