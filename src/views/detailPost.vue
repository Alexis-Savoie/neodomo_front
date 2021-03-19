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
                  >Détails post</v-toolbar-title
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
                  @click="$router.push('/listPost')"
                  >Supprimer</v-btn
                >
              </v-col>
              <v-col>
                <v-btn
                  rounded
                  class="boutton"
                  dark
                  color="#363740"
                  @click="$router.push('/listPost')"
                  >Supprimer et bloquer</v-btn
                > </v-col
              ><v-col></v-col><v-col></v-col><v-col></v-col><v-col></v-col
              ><v-col></v-col><v-col></v-col>
            </v-row>
            <v-row>
              <v-divider></v-divider>
            </v-row>
            <v-row>
              <v-col>
                <v-card-text class="text-center">ID post</v-card-text>
                <v-text-field
                  solo
                  dense
                  disabled
                  label=""
                  rounded
                ></v-text-field>
                <v-card-text class="text-center">Date</v-card-text>
                <v-text-field
                  solo
                  dense
                  disabled
                  label=""
                  rounded
                ></v-text-field>
                <v-card-text class="text-center">Auteur</v-card-text>
                <v-text-field
                  solo
                  dense
                  disabled
                  label=""
                  rounded
                ></v-text-field>
                <v-card-text class="text-center">Nombre aime</v-card-text>
                <v-text-field
                  solo
                  dense
                  disabled
                  label=""
                  rounded
                ></v-text-field>
                <v-card-text class="text-center"
                  >Nombre signalement</v-card-text
                >
                <v-text-field
                  solo
                  dense
                  disabled
                  label=""
                  rounded
                ></v-text-field>
              </v-col>
              <v-divider vertical></v-divider>
              <v-col class="text-center">
                <v-card-text class="text-center"
                  >Contenu du message</v-card-text
                >
                <v-textarea
                  outlined
                  solo
                  rounded
                  disabled
                  name="input-7-4"
                  label="Contenu textuelle"
                  value="The Woodman set to work at once, and so sharp was his axe that the tree was soon chopped nearly through."
                ></v-textarea>
                <v-card-text>Liste images</v-card-text>
                <v-divider></v-divider>
                <div class="text-center">
                  <v-btn color="blue" plain>Image 1</v-btn>
                </div>
                <div class="text-center">
                  <v-btn color="blue" plain>Image 2</v-btn>
                </div>
                <div class="text-center">
                  <v-btn color="blue" plain>Image 3</v-btn>
                </div>
                <div class="text-center">
                  <v-btn color="blue" plain>Image 4</v-btn>
                </div>
                <v-divider style="margin-bottom: 24px"></v-divider>

                <v-card-text>Commentaires du post</v-card-text>
                <v-btn
                  rounded
                  class="boutton"
                  dark
                  color="#363740"
                  @click="$router.push('/listComment')"
                  >Voir</v-btn
                >
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