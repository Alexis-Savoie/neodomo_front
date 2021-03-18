<template>
  <v-app class="black">
    <v-app-bar app flat color="#E5E5E5">
      <v-toolbar-title style="padding-left: 2em">Stocks</v-toolbar-title>
      <v-spacer></v-spacer>
      <div :class="`text-${model}`">emailAdmin@mail.com</div>
    </v-app-bar>
    <navigationDrawer />

    <!-- Page content -->
    <v-main style="background-color: #e5e5e5">
      <v-container fill-height>
        <v-card class="ma-auto" align="center" justify="center" width="100%">
          <v-data-table
            :headers="headers"
            :items="items"
            :items-per-page="8"
            class="elevation-1"
          >
            <!-- Top of the data table (Toolbar) -->

            <template v-slot:top>
              <v-container fill-height>
                <v-toolbar-title style="padding-right: 0.5em"
                  >Liste des stocks</v-toolbar-title
                >
                <v-icon @click="editItem()">mdi-refresh</v-icon>
                <v-row></v-row>
                <v-row>
                  <v-col>
                    <v-btn
                      rounded
                      class="boutton"
                      dark
                      color="#363740"
                      @click="$router.push('/addProduct')">
                      <v-icon left>
                      mdi-plus-circle
                    </v-icon>
                      Ajouter</v-btn
                    >
                  </v-col>
                  <v-col>
                    <!-- Search text box -->
                    <v-text-field
                      solo
                      dense
                      label="Nom"
                      rounded
                      class="shrink"
                      height="15"
                      style="font-size: 12px"
                    ></v-text-field>
                  </v-col>

                  <v-col>
                    <!-- Search text box -->
                    <v-text-field
                      solo
                      dense
                      label="Description"
                      rounded
                      class="shrink"
                      height="15"
                      style="font-size: 12px"
                    ></v-text-field>
                  </v-col>

                  <v-col>
                    <!-- Search text box -->
                    <v-text-field
                      solo
                      dense
                      label="Acheteur"
                      rounded
                      class="shrink"
                      height="15"
                      style="font-size: 12px"
                    ></v-text-field>
                  </v-col>
                  <v-col>
                    <v-text-field
                      solo
                      dense
                      label="prixMin"
                      rounded
                      class="shrink"
                      height="15"
                      style="font-size: 12px"
                    ></v-text-field>
                    <v-text-field
                      solo
                      dense
                      label="prixMax"
                      rounded
                      class="shrink"
                      height="15"
                      style="font-size: 12px"
                    ></v-text-field>
                  </v-col>

                  <v-col>
                    <v-text-field
                      solo
                      dense
                      label="stockMin"
                      rounded
                      class="shrink"
                      height="15"
                      style="font-size: 12px"
                    ></v-text-field>
                    <v-text-field
                      solo
                      dense
                      label="stockMax"
                      rounded
                      class="shrink"
                      height="15"
                      style="font-size: 12px"
                    ></v-text-field>
                  </v-col>

                  <v-col>
                    <v-text-field
                      solo
                      dense
                      label="venteMin"
                      rounded
                      class="shrink"
                      height="15"
                      style="font-size: 12px"
                    ></v-text-field>
                    <v-text-field
                      solo
                      dense
                      label="venteMax"
                      rounded
                      class="shrink"
                      height="15"
                      style="font-size: 12px"
                    ></v-text-field>
                  </v-col>
                </v-row>
              </v-container>
            </template>

            <template v-slot:[`item.actions`]>
              <v-icon small @click="$router.push('/detailProduct')"
                >mdi-dots-horizontal</v-icon
              >
            </template>
          </v-data-table>
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
      headers: [
        {
          text: "Nom produit",
          align: "start",
          value: "productName",
        },
        { text: "Prix (Domo)", value: "price" },
        { text: "Description", value: "description" },
        { text: "nbStock", value: "nbStock" },
        { text: "Actions", value: "actions", sortable: false },
      ],
      items: [
        {
          productName: "Porte- Clées IMIE",
          price: 200,
          description: "21/01/2021",
          nbStock: 20,
        },
        {
          productName: "Porte- Clées IMIE",
          price: 200,
          description: "21/01/2021",
          nbStock: 20,
        },
        {
          productName: "Porte- Clées IMIE",
          price: 200,
          description: "21/01/2021",
          nbStock: 20,
        },
        {
          productName: "Porte- Clées IMIE",
          price: 200,
          description: "21/01/2021",
          nbStock: 20,
        },
        {
          productName: "Porte- Clées IMIE",
          price: 200,
          description: "21/01/2021",
          nbStock: 20,
        },
        {
          productName: "Porte- Clées IMIE",
          price: 200,
          description: "21/01/2021",
          nbStock: 20,
        },
        {
          productName: "Porte- Clées IMIE",
          price: 200,
          description: "21/01/2021",
          nbStock: 20,
        },
        {
          productName: "Porte- Clées IMIE",
          price: 200,
          description: "21/01/2021",
          nbStock: 20,
        },
      ],
      itemsSelect: ["Foo", "Bar", "Fizz", "Buzz"],
    };
  },
};
</script>