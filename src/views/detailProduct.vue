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
      <v-container>
        <v-card class="ma-auto" width="100%">
          <v-container>
            <v-row>
              <v-col>
                <v-toolbar-title style="padding-left: 12px"
                  >Détails produit</v-toolbar-title
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
                  @click="updateProduct()"
                  >Mettre à jour</v-btn
                >
              </v-col>
              <v-col>
                <v-btn
                  rounded
                  class="boutton"
                  dark
                  color="#363740"
                  @click="deleteProduct()"
                  >Supprimer</v-btn
                > </v-col
              ><v-col></v-col><v-col></v-col><v-col></v-col><v-col></v-col
              ><v-col></v-col><v-col></v-col>
            </v-row>
            <v-row>
              <v-divider></v-divider>
            </v-row>
            <v-row>
              <v-col>
                <v-card-text class="text-center">ID produit</v-card-text>
                <v-text-field
                  solo
                  dense
                  disabled
                  label=""
                  rounded
                  v-model="idProduct"
                ></v-text-field>
                <v-card-text class="text-center">Nom produit</v-card-text>
                <v-text-field
                  solo
                  dense
                  label=""
                  rounded
                  v-model="nameProduct"
                ></v-text-field>
                <v-card-text class="text-center">Description</v-card-text>
                <v-textarea
                  outlined
                  solo
                  rounded
                  name="input-7-4"
                  value=""
                  v-model="description"
                ></v-textarea>
              </v-col>
              <v-divider vertical></v-divider>
              <v-col class="text-center">
                <v-card-text class="text-center">Prix (Domo)</v-card-text>
                <v-text-field
                  solo
                  dense
                  label=""
                  rounded
                  v-model="price"
                ></v-text-field>

                <v-card-text class="text-center">Nombre de stocks</v-card-text>
                <v-text-field
                  solo
                  dense
                  label=""
                  rounded
                  v-model="availableStock"
                ></v-text-field>

                <v-card-text class="text-center">Nombre de ventes</v-card-text>
                <v-btn
                  rounded
                  class="boutton"
                  dark
                  color="#363740"
                  @click="$router.push('/listBill/' + idProduct)"
                  >Voir ({{ nbBill }})</v-btn
                >

                <v-card-text class="text-center">Statistiques</v-card-text>
                <v-btn
                  rounded
                  class="boutton"
                  dark
                  color="#363740"
                  @click="$router.push('/statSales/' + idProduct)"
                  >Voir</v-btn
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
import basicAlert from "../components/basicAlert.vue";
import { eventBus } from "../main"

const API_URL = process.env.VUE_APP_API_URL as string;


export default Vue.extend({
  name: "App",
  components: {
    navigationDrawer,
    basicAlert
  },
  data() {
    return {
      emailAdmin:  localStorage.getItem("emailAdmin") || "",
      token: localStorage.getItem("token") || "",

      idProduct: "",
      nameProduct: "",
      description: "",
      price: "",
      availableStock: "",
      nbBill: ""

    };
  },
  methods: {
    getProduct(idProduct: string) {
      axios
        .post(
          API_URL + "/admin/searchProduct",
          { idProduct: idProduct },
          { headers: { Authorization: "Bearer " + this.token } }
        )
        .then((response) => {
          console.log(response.data)
          if (response.data.message == "succès (non-vide)") {
            this.nameProduct = response.data.products[0].nameProduct;
            this.description = response.data.products[0].description;
            this.price = response.data.products[0].price;
            this.availableStock = response.data.products[0].availableStock;
            this.nbBill = response.data.products[0].listBill.length;

          }
        })
        .catch(function (error) {
          eventBus.$emit('openAlert', 'Erreur', 'Erreur serveur !', '');
          console.log(error);
        });
    },
    deleteProduct(idProduct: string) {
      axios
        .delete(API_URL + "/admin/deleteProduct", {
          headers: {
            Authorization: "Bearer " + this.token,
          },
          data: {
            idProduct: this.idProduct,
          },
        })
        .then((response) => {
          eventBus.$emit('openAlert', 'Information', "L'opération s'est effectué avec succès !", '/listPost');
        })
        .catch(function (error) {
          eventBus.$emit('openAlert', 'Erreur', 'Erreur suppression post !', '');
          console.log(error);
        });
    },
    updateProduct(idProduct: string) {
      const parameters = {
        idProduct: this.idProduct,
        nameProduct: this.nameProduct,
        description: this.description,
        price: this.price,
        availableStock: this.availableStock,
      }
      axios
        .put(
          API_URL + "/admin/editProduct",
          parameters,
          { headers: { Authorization: "Bearer " + this.token } }
        )
        .then((response) => {
          if (response.status == 200) {
            eventBus.$emit('openAlert', 'Information', 'Mise à jour du produit réussite !', '');
          }
        })
        .catch(function (error) {
          eventBus.$emit('openAlert', 'Erreur', 'Erreur mise à jour produit !', '');
          console.log(error);
        });
    },
  },
  created() {
    this.idProduct = this.$route.params.idProduct;
    this.getProduct(this.idProduct);
  },
});
</script>