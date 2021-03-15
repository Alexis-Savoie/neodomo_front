<template>
  <v-app class="black">
    <v-navigation-drawer color="#363740" app>
      <v-divider></v-divider>
    </v-navigation-drawer>

    <v-main style="background-color: #E5E5E5;">
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
              prepend-icon="mdi-lock"
            />
          </v-card-text>
          <v-divider></v-divider>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn rounded class="boutton" dark color="#363740" @click="Login">Connexion</v-btn>
            <v-spacer></v-spacer>
          </v-card-actions>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn plain class="mx-auto" color="blue" @click="Login">Mot de passe oublié ?</v-btn>
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

export default Vue.extend({
  name: "Login",
  props: {},
  components: {},
  data: () => ({
    email: "",
    right: null,
  }),
  computed: {},
  methods: {
    Login() {
      console.log(this.email);
      router.push("/listPost");
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