<template>
  <v-app class="black">
    <v-app-bar app flat color="#E5E5E5">
      <v-toolbar-title style="padding-left: 2em">Paramètres</v-toolbar-title>
      <v-spacer></v-spacer>
      <div :class="`text-${model}`">emailAdmin@mail.com</div>
    </v-app-bar>
    <navigationDrawer />

    <!-- Page content -->
    <v-main style="background-color: #e5e5e5">
      <v-container fill-height>
        <v-card class="ma-auto" align="center" justify="center" width="100%">
          <v-container fill-height>
            <v-row>
              <v-toolbar-title style="padding-left: 12px"
                >Détails des paramètres</v-toolbar-title
              >
              <hr />
            </v-row>

            <v-row>
              <v-col>
                <v-card-text>Modifier votre mot de passe</v-card-text>
                <v-text-field
                  solo
                  dense
                  label="Mot de passe actuel"
                  rounded
                ></v-text-field>
                <v-text-field
                  solo
                  dense
                  label="Nouveau mot de passe"
                  rounded
                ></v-text-field>
                <v-text-field
                  solo
                  dense
                  label="Confirmer mot de passe"
                  rounded
                ></v-text-field>
                <v-btn rounded class="boutton" dark color="#363740" @click="Login">Soumettre</v-btn>
              </v-col>
              <v-divider vertical></v-divider>
              <v-col>
                <v-card-text>Ajouter un administrateur</v-card-text>
                <v-text-field
                  solo
                  dense
                  label="Email"
                  rounded
                ></v-text-field>
                <v-text-field
                  solo
                  dense
                  label="Mot de passe"
                  rounded
                ></v-text-field>
                <v-btn rounded class="boutton" dark color="#363740" @click="Login">Créer administrateur</v-btn>
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
import navigationDrawer from "../components/navigationDrawer.vue";

export default {
  name: "App",
  components: {
    navigationDrawer,
  },
  data() {
    return {
      itemsSelect: ["Foo", "Bar", "Fizz", "Buzz"],
    };
  },
};
</script>