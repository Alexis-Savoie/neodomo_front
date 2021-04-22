<template>
  <v-app class="black">
    <v-app-bar app flat color="#E5E5E5">
      <v-toolbar-title style="padding-left: 2em">Paramètres</v-toolbar-title>
      <v-spacer></v-spacer>
      <div>{{ emailAdmin }}</div>
    </v-app-bar>
    <navigationDrawer />

    <!-- Page content -->
    <v-main style="background-color: #e5e5e5">
      <v-container fill-height>
        <v-card class="ma-auto" width="100%">
          <v-container fill-height>
            <v-row>
              <v-col>
              <v-toolbar-title style="padding-left: 12px"
                >Détails des paramètres</v-toolbar-title
              >
              <hr />
              </v-col>
            </v-row>

            <v-row>
              <v-col>
                <v-card-text>Modifier votre mot de passe</v-card-text>
                <v-text-field
                  solo
                  dense
                  label="Mot de passe actuel"
                  rounded
                  type="password"
                  v-model="oldPassword"
                ></v-text-field>
                <v-text-field
                  solo
                  dense
                  label="Nouveau mot de passe"
                  rounded
                  type="password"
                  v-model="newPassword"
                ></v-text-field>
                <v-text-field
                  solo
                  dense
                  label="Confirmer mot de passe"
                  rounded
                  type="password"
                  v-model="confirmPassword"
                ></v-text-field>
                <v-btn rounded class="boutton" dark color="#363740" @click="changePassword(oldPassword, newPassword, confirmPassword)">Soumettre</v-btn>
              </v-col>
              <v-divider vertical></v-divider>
              <v-col>
                <v-card-text>Ajouter un administrateur</v-card-text>
                <v-text-field
                  solo
                  dense
                  label="Email"
                  rounded
                  v-model="email"
                ></v-text-field>
                <v-text-field
                  solo
                  dense
                  label="Mot de passe"
                  rounded
                  type="password"
                  v-model="password"
                ></v-text-field>
                <v-btn rounded class="boutton" dark color="#363740" @click="createAdmin(email, password)">Créer administrateur</v-btn>
              </v-col>
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
      token: localStorage.getItem("token") || '',
      emailAdmin: "",

      email: "",
      password: "",

      oldPassword: "",
      newPassword: "",
      confirmPassword: "",

    };
  },
  methods: {
    changePassword(oldPassword: string, newPassword: string, confirmPassword: string) {
      if (newPassword != confirmPassword)
      {
        alert("erreur : les mots de passe ne sont pas identiques !");
        this.newPassword = ""
        this.confirmPassword = ""
      }
      else {
      axios
        .put(
          API_URL + "/admin/changePassword",
          { password: oldPassword, newPassword: newPassword },
          { headers: { Authorization: "Bearer " + this.token } }
        )
        .then((response) => {
          if (response.status == 201) {
            alert("Votre mot de passe à été modifié !");
            this.oldPassword = ""
            this.newPassword = ""
            this.confirmPassword = ""
          }
        })
        .catch((error) => {
          if (error.response.data.message == "Une ou plusieurs données sont erronées") {
              alert("erreur : longeur de mot de passe trop court/long !");
              this.oldPassword = ""
              this.newPassword = ""
              this.confirmPassword = ""
              console.log(error);
          }
          else if (error.response.data.message == "Ancien mot de passe incorrect") {
              this.oldPassword = ""
              alert("erreur : ancien mot de passe incorrect !");
              console.log(error);
            }
           else {
             alert("erreur serveur !");
            console.log(error.response);
           }
        });
    }
    },
    createAdmin(email: string, password: string) {
      axios
        .post(
          API_URL + "/admin/createAdmin",
          { email: email, password: password },
          { headers: { Authorization: "Bearer " + this.token } }
        )
        .then((response) => {
          if (response.status == 201) {
            alert("L'administrateur à été créer avec succès !");
            this.email = ""
            this.password = ""
          }
        })
        .catch((error) => {
          if (error.response.status == 403) {
              alert("erreur : Erreur de syntaxe email ou mot de passe trop court/long !");
              this.email = ""
              this.password = ""
              console.log(error);
          }
          else if (error.response.status == 409) {
              this.oldPassword = ""
              alert("erreur : adresse email déjà utilisé  !");
              this.email = ""
              this.password = ""
              console.log(error);
            }
           else {
             alert("erreur serveur !");
            console.log(error.response);
           }
        });
    },

  },
  mounted() {
    this.emailAdmin = localStorage.getItem("emailAdmin") || "";
  },
});
</script>