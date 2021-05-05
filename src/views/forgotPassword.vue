<template>
  <v-app class="black">
    <v-navigation-drawer color="#363740" app>
      <v-divider></v-divider>
    </v-navigation-drawer>

    <v-main style="background-color: #E5E5E5;">
      <v-container fill-height>
        <v-card class="ma-auto" align="center" justify="center" width="500">
          <v-card-title class="justify-center"
            >Mot de passe oublié</v-card-title
          >
          <v-card-text>
            <v-text-field
              solo
              rounded
              label="Email"
              v-model="email"
            />
          </v-card-text>
          <v-divider></v-divider>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn rounded class="boutton" dark color="#363740" @click="forgotPassword(email)">Soumettre</v-btn>
              <v-btn rounded class="boutton" dark color="#363740" @click="$router.push('/login')">Retour</v-btn>
            <v-spacer></v-spacer>
          </v-card-actions>
        </v-card>
      </v-container>
      <basicAlert />
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
import axios from "axios";
import basicAlert from "../components/basicAlert.vue";
import { eventBus } from "../main"

const API_URL = process.env.VUE_APP_API_URL as string;

export default Vue.extend({
  name: "App",
  components: { basicAlert },
  data() {
    return {
      email: ""
    };
  },

  methods: {
    forgotPassword(
      email: string,
    ) {

      axios
        .post(API_URL + "/admin/forgotPassword", { email: email })
        .then((response) => {
          if (response.status == 200) {
            eventBus.$emit('openAlert', 'Information', 'Un email contenant un mot de passe temporaire à été envoyé', '/login');
          }
        })
        .catch(function (error) {
          eventBus.$emit('openAlert', 'Erreur', 'Erreur ! Email invalide ou inexistant !', '');
          console.log(error);
        });
    },
  },
});
</script>