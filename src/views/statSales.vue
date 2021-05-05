<template>
  <v-app class="black">
    <v-app-bar app flat color="#E5E5E5">
      <v-toolbar-title style="padding-left: 2em">Ventes</v-toolbar-title>
      <v-spacer></v-spacer>
      <div>{{ emailAdmin }}</div>
    </v-app-bar>
    <navigationDrawer />

    <!-- Page content -->
    <v-main style="background-color: #e5e5e5">
      <v-container fill-height>
        <v-card class="ma-auto" align="center" justify="center" width="100%">
          <v-container fill-height>
            <v-row>
              <v-col>
                <v-toolbar-title class="text-left" style="padding-left: 0"
                  >Statistiques ventes</v-toolbar-title
                >
              </v-col>
            </v-row>

            <v-row><v-divider></v-divider></v-row>
            <!--#region Selector  -->

            <v-row>
              <v-col>
                <v-select
                  :items="itemsSelect"
                  label="Produit"
                  dense
                  outlined
                  style="maxwidth: 232px; padding-left: 12px"
                  return-object
                  v-model="currentProduct"
                ></v-select> </v-col
              ><v-col></v-col><v-col></v-col><v-col></v-col><v-col></v-col>
            </v-row>

            <v-row>
              <v-col style="padding-top: 0">
                <!-- date picker 1-->
                <v-dialog
                  ref="dialog"
                  v-model="modal"
                  :return-value.sync="createdAtFromSearch"
                  persistent
                  width="290px"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      v-model="createdAtFromSearch"
                      label="Ventes du"
                      prepend-icon="mdi-calendar"
                      readonly
                      v-bind="attrs"
                      v-on="on"
                    ></v-text-field>
                  </template>
                  <v-date-picker
                    v-model="createdAtFromSearch"
                    scrollable
                    header-color="#363740"
                    color="#363740"
                    locale="fr-FR"
                  >
                    <v-spacer></v-spacer>
                    <v-btn text color="black" @click="modal = false">
                      Annuler
                    </v-btn>
                    <v-btn
                      text
                      color="black"
                      @click="$refs.dialog.save(createdAtFromSearch)"
                    >
                      OK
                    </v-btn>
                  </v-date-picker>
                </v-dialog>
              </v-col>
              <v-col style="padding-top: 0">
                <!-- date picker 2-->
                <v-dialog
                  ref="dialog2"
                  v-model="modal2"
                  :return-value.sync="createdAtAtSearch"
                  persistent
                  width="290px"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      v-model="createdAtAtSearch"
                      label="Ventes à"
                      prepend-icon="mdi-calendar"
                      readonly
                      v-bind="attrs"
                      v-on="on"
                    ></v-text-field>
                  </template>
                  <v-date-picker
                    v-model="createdAtAtSearch"
                    scrollable
                    header-color="#363740"
                    color="#363740"
                    locale="fr-FR"
                  >
                    <v-spacer></v-spacer>
                    <v-btn text color="black" @click="modal2 = false">
                      Annuler
                    </v-btn>
                    <v-btn
                      text
                      color="black"
                      @click="$refs.dialog2.save(createdAtAtSearch)"
                    >
                      OK
                    </v-btn>
                  </v-date-picker>
                </v-dialog> </v-col
              ><v-col></v-col><v-col></v-col><v-col></v-col>
            </v-row>
            <!--#endregion  -->

            <v-row>
              <v-divider></v-divider>
            </v-row>

            <!-- Titre et sous-titre du graphique  -->
            <v-row>
              <v-col>
                <v-toolbar-title class="text-left" style="padding-left: 0"
                  >Évolution des ventes</v-toolbar-title
                >
                <v-card-subtitle class="text-left" style="padding-left: 0"
                  >Du {{ createdAtFromSearch }} au {{ createdAtAtSearch }} ({{ currentProduct.text }})</v-card-subtitle
                >
              </v-col>
            </v-row>

            <!-- Graphique  -->
            <v-row>
              <v-col cols="12">
                <div style="width: 100%">
                  <line-chart
                    :chart-data="datacollection"
                    :options="options"
                  ></line-chart>
                </div>
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
import navigationDrawer from "../components/navigationDrawer.vue";
import LineChart from "../components/lineChart";
import axios from "axios";
import Vue from "vue";
import basicAlert from "../components/basicAlert.vue";
import { eventBus } from "../main"

const API_URL = process.env.VUE_APP_API_URL as string;

const fromDate = new Date()
fromDate.setDate(fromDate.getDate() - 30)
const atDate = new Date()
atDate.setDate(fromDate.getDate() + 1)


export default Vue.extend({
  name: "App",
  components: {
    navigationDrawer,
    LineChart,
    basicAlert
  },
  data(): any {
    return {
      emailAdmin: localStorage.getItem("emalToken") || "",
      token: localStorage.getItem("token") || "", 
      labels: [],
      data: [],

      createdAtFromSearch: fromDate.toISOString().substr(0, 10),
      createdAtAtSearch: atDate.toISOString().substr(0, 10),
      modal: false,
      modal2: false,

      itemsSelect: [],
      currentProduct: {text: "Tous", value: ""},

      datacollection: null,
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          xAxes: [
            {
              type: "time",
              time: {
                unit: "day",
              },
            },
          ],
        },
        legend: {
          display: false,
        },
      },
    };
  },
  mounted() {
    if (this.$route.params.idProduct == "" || this.$route.params.idProduct == undefined)
      this.currentProduct = {text: "Tous", value: ""}
    else
      this.currentProduct = {text: "Tous", value: this.$route.params.idProduct}
    this.getProductList()
    this.updateStats(this.currentProduct.value, "", "");
  },
  methods: {
    fillData() {
      this.datacollection = {
        labels: Array.from(this.labels),
        datasets: [
          {
            label: "Data One",
            borderColor: "#3751FF",
            fill: false,

            data: Array.from(this.data),
          },
        ],
      };
    },
    updateStats(idProduct: string, createdAtFrom: string, createdAtAt: string) {
      const parameters = {} as any;
      if (idProduct != "") parameters.idProduct = idProduct;
      if (createdAtFrom != "") parameters.createdAtFrom = createdAtFrom;
      if (createdAtAt != "") parameters.createdAtAt = createdAtAt;

      axios
        .post(API_URL + "/admin/searchPurchase", parameters, {
          headers: { Authorization: "Bearer " + this.token },
        })
        .then((response) => {
          if (response.data.message == "succès (non-vide)") {
            const resultArr = [] as any;

            // REmove time from date
            for (let i = 0; i < response.data.purchases.length; i++) {
              resultArr.push(response.data.purchases[i].createdAt.split("T")[0]);
            }

            // Conut number of sells for each day
            const counts = {} as any;
            for (let i = 0; i < resultArr.length; i++) {
              const num = resultArr[i];
              counts[num] = counts[num] ? counts[num] + 1 : 1;
            }

            const labels = [];
            const data = [];
            // Adapt data into arrays for the graph
            for (const propertyName in counts) {
              labels.push(new Date(propertyName).setHours(0, 0, 0, 0));
              data.push(counts[propertyName]);
            }

            this.labels = labels;
            this.data = data;

            this.fillData();
          }
          else {
            this.labels = [];
            this.data = [];

            this.fillData();
          }
        })
        .catch((error) => {
          eventBus.$emit('openAlert', 'Erreur', 'Erreur serveur !', '');
          console.log(error);
        });
    },

    getProductList() {
      axios
        .post(API_URL + "/admin/searchProduct", {}, {
          headers: { Authorization: "Bearer " + this.token },
        })
        .then((response) => {
          if (response.status == 200) {
            const resultArr = [] as any;
            resultArr.push({text: "Tous", value: ""})

            for (let i = 0; i < response.data.products.length; i++) {
              resultArr.push({text: response.data.products[i].nameProduct, value: response.data.products[i]._id})

            }
            this.itemsSelect = resultArr
          }
        })
        .catch((error) => {
          eventBus.$emit('openAlert', 'Erreur', 'Erreur serveur !', '');
          console.log(error.response);
        });
    },

  },
  watch: {
    currentProduct: function (val: any) {
      this.updateStats(this.currentProduct.value, this.createdAtFromSearch, this.createdAtAtSearch)
    },
    createdAtFromSearch: function (val: any) {
      this.updateStats(this.currentProduct.value, this.createdAtFromSearch, this.createdAtAtSearch)
    },
    createdAtAtSearch: function (val: any) {
      this.updateStats(this.currentProduct.value, this.createdAtFromSearch, this.createdAtAtSearch)
    },
  },
});
</script>