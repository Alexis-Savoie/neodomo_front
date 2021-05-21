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
                  id="oldPasswordInput"
                  solo
                  dense
                  label="Mot de passe actuel"
                  rounded
                  type="password"
                  v-model="oldPassword"
                ></v-text-field>
                <v-text-field
                  id="newPasswordInput"
                  solo
                  dense
                  label="Nouveau mot de passe"
                  rounded
                  type="password"
                  v-model="newPassword"
                ></v-text-field>
                <v-text-field
                  id="confirmPasswordInput"
                  solo
                  dense
                  label="Confirmer mot de passe"
                  rounded
                  type="password"
                  v-model="confirmPassword"
                ></v-text-field>
                <v-btn
                  id="changePasswordButton"
                  rounded
                  class="boutton"
                  dark
                  color="#363740"
                  @click="
                    changePassword(oldPassword, newPassword, confirmPassword)
                  "
                  >Soumettre</v-btn
                >
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
                <v-btn
                  rounded
                  class="boutton"
                  dark
                  color="#363740"
                  @click="createAdmin(email, password)"
                  >Créer administrateur</v-btn
                >
              </v-col>
            </v-row>
          </v-container>
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
import navigationDrawer from "../components/navigationDrawer.vue";
import axios from "axios";
import validator from "validator";
import basicAlert from "../components/basicAlert.vue";
import { eventBus } from "../main";

const API_URL = process.env.VUE_APP_API_URL as string;

export default Vue.extend({
  name: "App",
  components: {
    navigationDrawer,
    basicAlert,
  },
  data() {
    return {
      emailAdmin: localStorage.getItem("emalToken") || "",
      token: localStorage.getItem("token") || "",

      email: "",
      password: "",

      oldPassword: "",
      newPassword: "",
      confirmPassword: "",
    };
  },
  methods: {
    changePassword(
      oldPassword: string,
      newPassword: string,
      confirmPassword: string
    ) {
      if (
        validator.isLength(oldPassword, { min: 8, max: 50 }) &&
        validator.isLength(newPassword, { min: 8, max: 50 }) &&
        validator.isLength(confirmPassword, { min: 8, max: 50 })
      ) {
        if (newPassword != confirmPassword) {
          eventBus.$emit(
            "openAlert",
            "Erreur",
            "Erreur : les mots de passe ne sont pas identiques !",
            ""
          );
          this.newPassword = "";
          this.confirmPassword = "";
        } else {
          axios
            .put(
              API_URL + "/admin/changePassword",
              { password: oldPassword, newPassword: newPassword },
              { headers: { Authorization: "Bearer " + this.token } }
            )
            .then((response) => {
              if (response.status == 201) {
                eventBus.$emit(
                  "openAlert",
                  "Information",
                  "Votre mot de passe à été modifié !",
                  ""
                );
                this.oldPassword = "";
                this.newPassword = "";
                this.confirmPassword = "";
              }
            })
            .catch((error) => {
              if (
                error.response.data.message ==
                "Une ou plusieurs données sont erronées"
              ) {
                eventBus.$emit(
                  "openAlert",
                  "Erreur",
                  "Erreur : longeur de mot de passe trop court/long !",
                  ""
                );
                this.oldPassword = "";
                this.newPassword = "";
                this.confirmPassword = "";
                console.log(error);
              } else if (
                error.response.data.message == "Ancien mot de passe incorrect"
              ) {
                this.oldPassword = "";
                eventBus.$emit(
                  "openAlert",
                  "Erreur",
                  "Erreur : ancien mot de passe incorrect !",
                  ""
                );
                console.log(error);
              } else {
                eventBus.$emit("openAlert", "Erreur", "Erreur serveur !", "");
                console.log(error.response);
              }
            });
        }
      } else {
        eventBus.$emit(
          "openAlert",
          "Erreur",
          "Erreur : longeur de mot de passe trop court/long !",
          ""
        );
      }
    },
    createAdmin(email: string, password: string) {
      if (
        validator.isEmail(email) &&
        validator.isLength(password, { min: 8, max: 50 })
      ) {
        axios
          .post(
            API_URL + "/admin/createAdmin",
            { email: email, password: password },
            { headers: { Authorization: "Bearer " + this.token } }
          )
          .then((response) => {
            if (response.status == 201) {
              eventBus.$emit(
                "openAlert",
                "Information",
                "L'administrateur à été créer avec succès !",
                ""
              );
              this.email = "";
              this.password = "";
            }
          })
          .catch((error) => {
            if (error.response.status == 403) {
              eventBus.$emit(
                "openAlert",
                "Erreur",
                "Erreur : Erreur de syntaxe email ou mot de passe trop court/long !",
                ""
              );
              this.email = "";
              this.password = "";
              console.log(error);
            } else if (error.response.status == 409) {
              this.oldPassword = "";
              eventBus.$emit(
                "openAlert",
                "Erreur",
                "Erreur : adresse email déjà utilisé  !",
                ""
              );
              this.email = "";
              this.password = "";
              console.log(error);
            } else {
              eventBus.$emit("openAlert", "Erreur", "Erreur serveur !", "");
              console.log(error.response);
            }
          });
      } else {
        eventBus.$emit(
          "openAlert",
          "Erreur",
          "Erreur : Erreur de syntaxe email ou mot de passe trop court/long !",
          ""
        );
      }
    },
  },
});
</script>