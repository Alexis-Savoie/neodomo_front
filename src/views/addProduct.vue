<template>
  <v-app class="black">
    <v-app-bar app flat color="#E5E5E5">
      <v-toolbar-title style="padding-left: 2em">Posts</v-toolbar-title>
      <v-spacer></v-spacer>
      <div :class="`text-${model}`">emailAdmin@mail.com</div>
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
                  @click="$router.push('/listProduct')"
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
                <v-text-field solo dense label="" rounded></v-text-field>
                <v-card-text class="text-center">Description</v-card-text>
                <v-textarea
                  outlined
                  solo
                  rounded
                  name="input-7-4"
                  value=""
                ></v-textarea>
                <v-card-text class="text-center"
                  >Image d'illustration (URL)</v-card-text
                >
                <v-text-field solo dense label="" rounded></v-text-field>
                <v-card-text class="text-center">Prix (Domo)</v-card-text>
                <v-text-field solo dense label="" rounded></v-text-field>
                <v-card-text class="text-center">Nombre de stocks</v-card-text>
                <v-text-field
                  solo
                  dense
                  disabled
                  label=""
                  rounded
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