<template>
  <v-app class="black">
    <v-app-bar app flat color="#E5E5E5">
      <v-toolbar-title style="padding-left: 2em">Factures</v-toolbar-title>
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
                  >Détails facture</v-toolbar-title
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
                  @click="$router.push('/listBill')"
                  >Supprimer</v-btn
                >
              </v-col>
              <v-col></v-col><v-col></v-col><v-col></v-col><v-col></v-col><v-col></v-col>
            </v-row>
            <v-row>
              <v-divider></v-divider>
            </v-row>
            <v-row>
              <v-col>
                <v-card-text class="text-center">Numéro de facture</v-card-text>
                <v-text-field
                  solo
                  dense
                  disabled
                  label=""
                  rounded
                ></v-text-field>
                <v-card-text class="text-center">Date de commande</v-card-text>
                <v-text-field
                  solo
                  dense
                  disabled
                  label=""
                  rounded
                ></v-text-field>
                <v-card-text class="text-center">Description</v-card-text>
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
                <v-card-text class="text-center">Prix</v-card-text>
                <v-text-field
                  solo
                  dense
                  disabled
                  label=""
                  rounded
                ></v-text-field>

                <v-card-text class="text-center">Mode de paiement</v-card-text>
                <v-text-field
                  solo
                  dense
                  disabled
                  label=""
                  rounded
                ></v-text-field>

                <v-card-text class="text-center">Destinataire</v-card-text>
                <v-text-field
                  solo
                  dense
                  disabled
                  label=""
                  rounded
                ></v-text-field>
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