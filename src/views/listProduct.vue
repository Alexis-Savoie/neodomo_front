<template>
  <v-app class="black">
    <v-app-bar app flat color="#E5E5E5">
      <v-toolbar-title style="padding-left: 2em">Stocks</v-toolbar-title>
      <v-spacer></v-spacer>
      <div >{{ emailAdmin }}</div>
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
                <v-icon @click="
                    searchProduct(
                          nameProductSearch,
                          descriptionSearch,
                          buyedBySearch,
                          priceMinSearch,
                          priceMaxSearch, 
                          availableStockMinSearch,
                          availableStockMaxSearch,
                          nbSellMinSearch,
                          nbSellMaxSearch,
                    )
                  ">mdi-refresh</v-icon>
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
                      v-model="nameProductSearch"
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
                      v-model="descriptionSearch"
                    ></v-text-field>
                  </v-col>
                  <!--
                  <v-col>
                   
                    <v-text-field
                      solo
                      dense
                      label="Acheteur"
                      rounded
                      class="shrink"
                      height="15"
                      style="font-size: 12px"
                      v-model="buyedBySearch"
                    ></v-text-field>
                  </v-col>
                  -->
                  <v-col>
                    <v-text-field
                      solo
                      dense
                      label="prixMin"
                      rounded
                      class="shrink"
                      height="15"
                      style="font-size: 12px"
                      v-model="priceMinSearch"
                    ></v-text-field>
                    <v-text-field
                      solo
                      dense
                      label="prixMax"
                      rounded
                      class="shrink"
                      height="15"
                      style="font-size: 12px"
                      v-model="priceMaxSearch"
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
                      v-model="availableStockMinSearch"
                    ></v-text-field>
                    <v-text-field
                      solo
                      dense
                      label="stockMax"
                      rounded
                      class="shrink"
                      height="15"
                      style="font-size: 12px"
                      v-model="availableStockMaxSearch"
                    ></v-text-field>
                  </v-col>

                  <!--
                  <v-col>
                    <v-text-field
                      solo
                      dense
                      label="venteMin"
                      rounded
                      class="shrink"
                      height="15"
                      style="font-size: 12px"
                      v-model="nbSellMinSearch"
                    ></v-text-field>
                    <v-text-field
                      solo
                      dense
                      label="venteMax"
                      rounded
                      class="shrink"
                      height="15"
                      style="font-size: 12px"
                      v-model="nbSellMaxSearch"
                    ></v-text-field>
                  </v-col>
                  -->
                </v-row>
              </v-container>
            </template>

            <template v-slot:[`item.actions`]="t">
              <v-icon small @click="$router.push('/detailProduct/'  + t.item.idProduct)"
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
import Vue from "vue";
import navigationDrawer from "../components/navigationDrawer.vue";
import axios from "axios";

const API_URL = process.env.VUE_APP_API_URL as string;
const token = localStorage.getItem("token");

export default Vue.extend({
  name: "App",
  components: {
    navigationDrawer,
  },
  data() {
    return {
      emailAdmin: "",

      nameProductSearch: "",
      descriptionSearch: "",
      buyedBySearch: "",
      priceMinSearch: "",
      priceMaxSearch: "", 
      availableStockMinSearch: "",
      availableStockMaxSearch: "",
      nbSellMinSearch: "",
      nbSellMaxSearch: "",


      headers: [
        {
          text: "Nom produit",
          align: "start",
          value: "nameProduct",
        },
        { text: "Prix (Domo)", value: "price" },
        { text: "Description", value: "description" },
        { text: "nbStock", value: "availableStock" },
        { text: "Actions", value: "actions", sortable: false },
      ],
      items: [{}],
      itemsSelect: ["Oui", "Non", "Les 2"],
    };
  },

  methods: {
    searchProduct(
      nameProduct: string,
      description: string,
      buyedBy: string,
      priceMin: string,
      priceMax: string,
      availableStockMin: string,
      availableStockMax: string,
      nbSellMin: string,
      nbSellMax: string,
    ) {

      this.items = [{}];

      const parameters = {} as any;
      if (nameProduct != "") parameters.nameProduct = nameProduct;
      if (description != "") parameters.description = description;
      if (buyedBy != "") parameters.buyedBy = buyedBy;
      if (priceMin != "") parameters.priceMin = priceMin;
      if (priceMax != "") parameters.priceMax = priceMax;
      if (availableStockMin != "") parameters.availableStockMin = availableStockMin;
      if (availableStockMax != "") parameters.availableStockMax = availableStockMax;
      if (nbSellMin != "") parameters.nbSellMin = nbSellMin;
      if (nbSellMax != "") parameters.nbSellMax = nbSellMax;

      console.log(parameters)
      
      axios
        .post(API_URL + "/admin/searchProduct", parameters, {
          headers: { Authorization: "Bearer " + token },
        })
        .then((response) => {
          if (response.data.message == "succès (non-vide)") {
            const items = [];
            for (let i = 0; i < response.data.products.length; i++) {
              const item = {
                idProduct: response.data.products[i]._id,
                nameProduct: response.data.products[i].nameProduct,
                price: response.data.products[i].price,
                description: response.data.products[i].description,
                availableStock: response.data.products[i].availableStock,
              };
              items[i] = item;
            }

            this.items = items;
          }
        })
        .catch(function (error) {
          alert("erreur !");
          console.log("erreur");
          console.log(error);
        });
    },
  },
  mounted() {
    this.searchProduct("", "", "", "", "", "", "", "", "");
    this.emailAdmin = localStorage.getItem("emailAdmin") || "";
  },
});
</script>