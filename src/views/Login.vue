<template>
  <v-app class="black">
    <v-navigation-drawer color="#363740" app>
      <v-divider></v-divider>
    </v-navigation-drawer>

    <v-main style="background-color: #e5e5e5">
      <v-container fill-height>
        <v-card class="ma-auto" align="center" justify="center" width="500">
          <v-card-title class="justify-center"
            >Gestionnaire de l'application Neo Domo</v-card-title
          >
          <v-card-text>
            <v-text-field
              solo
              label="Email"
              prepend-icon="mdi-account-circle"
              v-model="email"
            />
            <v-text-field
              solo
              label="Mot de passe"
              type="password"
              v-model="password"
              prepend-icon="mdi-lock"
            />
          </v-card-text>
          <v-divider></v-divider>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn rounded class="boutton" dark color="#363740" @click="Login"
              >Connexion</v-btn
            >
            <v-spacer></v-spacer>
          </v-card-actions>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              plain
              class="mx-auto"
              color="blue"
              @click="$router.push('/forgotPassword')"
              >Mot de passe oublié ?</v-btn
            >
            <v-spacer></v-spacer>
          </v-card-actions>
        </v-card>
      </v-container>
    </v-main>
  </v-app>
</template>





<script lang="ts">
import Vue from "vue";
import router from "../router";
import axios from "axios";

const API_URL: string = process.env.VUE_APP_API_URL!;

export default Vue.extend({
  name: "Login",
  props: {},
  components: {},
  data: () => ({
    email: "",
    password: "",
    right: null,
  }),
  computed: {},
  methods: {
    Login() {
      if (this.email == "" || this.password == "")
        alert("Veuillez rentrez des identifiants !");
      else {
        axios
          .post(API_URL + "/admin/login", {
            email: this.email,
            password: this.password,
          })
          .then(function (response) {
            if(response.status == 200)
            {
              localStorage.setItem('token', response.data.token.toString())
              localStorage.setItem('isAuthenticated', "true")
              
              router.push("/listPost");
            }
          })
          .catch(function (error) {
            if (error.response.status == 403) {
              alert("Syntaxe des identifiants invalide !");
            }
            if (error.response.status == 400) {
              if (error.response.data.message != "Identifiants incorrect") {
                alert("Trop de tentatives ! réessayer plus tard");
              }
              else {
                alert("Identifiants incorrect !");
              }
            }
          });
      }
    },
  },
});
</script>
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