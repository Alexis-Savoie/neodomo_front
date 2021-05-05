<template>
  <v-app class="black">
    <v-app-bar app flat color="#E5E5E5">
      <v-toolbar-title style="padding-left: 2em">Factures</v-toolbar-title>
      <v-spacer></v-spacer>
      <div>{{ emailAdmin }}</div>
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
                  @click="deleteBill(idBill)"
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
                  v-model="numberBill"
                ></v-text-field>
                <v-card-text class="text-center">Date de commande</v-card-text>
                <v-text-field
                  solo
                  dense
                  disabled
                  label=""
                  rounded
                  v-model="createdAt"
                ></v-text-field>
                <v-card-text class="text-center">Description</v-card-text>
                <v-text-field
                  solo
                  dense
                  disabled
                  label=""
                  rounded
                  v-model="description"
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
                  v-model="price"
                ></v-text-field>

                <v-card-text class="text-center">Mode de paiement</v-card-text>
                <v-text-field
                  solo
                  dense
                  disabled
                  label=""
                  rounded
                  v-model="paymentMethod"
                ></v-text-field>

                <v-card-text class="text-center">Destinataire</v-card-text>
                <v-text-field
                  solo
                  dense
                  disabled
                  label=""
                  rounded
                  v-model="emailBuyer"
                ></v-text-field>
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
      emailAdmin: localStorage.getItem("emailAdmin") || "",
      token: localStorage.getItem("token") || "",

      idBill: "",
      numberBill: "",
      emailBuyer: "",
      description: "",
      price: "",
      paymentMethod: "",
      createdAt: "",
      idProduct: "",

    };
  },
  methods: {
    getBill(idPost: string) {
      axios
        .post(
          API_URL + "/admin/searchBill",
          { idPost: idPost },
          { headers: { Authorization: "Bearer " + this.token } }
        )
        .then((response) => {
          if (response.data.message == "succès (non-vide)") {
            this.idBill = response.data.bills[0]._id;
            this.numberBill = response.data.bills[0].numberBill;
            this.emailBuyer = response.data.bills[0].emailBuyer;
            this.description = response.data.bills[0].description;
            this.price = response.data.bills[0].price
            this.paymentMethod = response.data.bills[0].paymentMethod;
            this.createdAt = response.data.bills[0].createdAt;
            this.idProduct = response.data.bills[0].idProduct;
          }
        })
        .catch(function (error) {
          eventBus.$emit('openAlert', 'Erreur', 'Erreur serveur !', '');
          console.log(error);
        });
    },
    deleteBill(idBill: string) {
      axios
        .delete(API_URL + "/admin/deleteBill", {
          headers: {
            Authorization: "Bearer " + this.token,
          },
          data: {
            idBill: this.idBill,
          },
        })
        .then((response) => {
          eventBus.$emit('openAlert', 'Information', "L'opération s'est effectué avec succès !", '/listBill');
        })
        .catch(function (error) {
          eventBus.$emit('openAlert', 'Erreur', 'Erreur suppression facture !', '');
          console.log(error);
        });
    },
  },
  mounted() {
    this.idBill = this.$route.params.idBill;
    this.getBill(this.idBill);
  },
});
</script>