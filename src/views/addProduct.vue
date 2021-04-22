<template>
  <v-app class="black">
    <v-app-bar app flat color="#E5E5E5">
      <v-toolbar-title style="padding-left: 2em">Posts</v-toolbar-title>
      <v-spacer></v-spacer>
      <div>{{ emailAdmin }}</div>
    </v-app-bar>
    <navigationDrawer />

    <!-- Page content -->
    <v-main style="background-color: #e5e5e5">
      <v-container>
        <v-card class="ma-auto" width="100%">
          <v-container>
            <v-row>
              <v-col>
                <v-toolbar-title style="padding-left: 12px"
                  >Ajouter post</v-toolbar-title
                >
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                <v-btn
                  rounded
                  class="boutton"
                  dark
                  color="#363740"
                  @click="createProduct(nameProduct, description, parseInt(price), parseInt(availableStock), imageURL)"
                  >Ajouter</v-btn>
              </v-col>
              <v-col></v-col><v-col></v-col><v-col></v-col><v-col></v-col><v-col></v-col>
            </v-row>
            <v-row>
              <v-divider></v-divider>
            </v-row>
            <v-row>
              <v-col></v-col>
              <v-col>
                <v-card-text class="text-center">Nom produit</v-card-text>
                <v-text-field solo dense label="" rounded v-model="nameProduct"></v-text-field>
                <v-card-text class="text-center">Description</v-card-text>
                <v-textarea
                  outlined
                  solo
                  rounded
                  name="input-7-4"
                  v-model="description"
                ></v-textarea>
                <v-card-text class="text-center"
                  >Image d'illustration (URL)</v-card-text
                >
                <v-text-field solo dense label="" rounded v-model="imageURL"></v-text-field>
                <v-card-text class="text-center">Prix (Domo)</v-card-text>
                <v-text-field solo dense label="" rounded v-model="price"></v-text-field>
                <v-card-text class="text-center">Nombre de stocks</v-card-text>
                <v-text-field
                  solo
                  dense
                  label=""
                  rounded
                  v-model="availableStock"
                ></v-text-field>
              </v-col>
              <v-col></v-col>
            </v-row>
          </v-container>
        </v-card>
      </v-container>
    </v-main>
  </v-app>
</template>





<style>
@import url("https://fonts.googleapis.com/css2?family=Mulish:wght@500&display=swap");

html,
body {
  font-family: "Mulish", sans-serif;
}

#app {
  font-family: "Mulish", sans-serif;
}
</style>








<script lang="ts">
import Vue from "vue";
import navigationDrawer from "../components/navigationDrawer.vue";
import axios from "axios";

const API_URL = process.env.VUE_APP_API_URL as string;


export default Vue.extend({
  name: "App",
  components: {
    navigationDrawer,
  },
  data() {
    return {
      emailAdmin: "",
      token: localStorage.getItem("token") || "",

      nameProduct: "",
      description: "",
      price: "",
      availableStock: "",
      imageURL: "",
    };
  },

  methods: {
    createProduct(
      nameProduct: string,
      description: string,
      price: number,
      availableStock: number,
      imageURL: string,
    ) {


      const parameters = {
        nameProduct: nameProduct,
        description: description,
        price: price,
        availableStock: availableStock,
        imageURL: imageURL
      }
      console.log(parameters)
      axios
        .post(API_URL + "/admin/addProduct", parameters, {
          headers: { Authorization: "Bearer " + this.token },
        })
        .then((response) => {
          if (response.status == 201) {
             alert("Le produit à été créer avec succès")
             this.$router.push('/listProduct')

          }
        })
        .catch(function (error) {
          alert("erreur !");
          console.log("erreur lors de la création (Données invalides ?)");
          console.log(error);
        });
    },
  },
  mounted() {
    this.emailAdmin = localStorage.getItem("emailAdmin") || "";
  },
});
</script>