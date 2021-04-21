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
                ></v-select> </v-col
              ><v-col></v-col><v-col></v-col><v-col></v-col><v-col></v-col>
            </v-row>

            <v-row>
              <!-- date picker -->
              <v-col style="padding-top: 0">
                <v-menu
                  ref="menu"
                  dense
                  rounded
                  v-model="menu"
                  :close-on-content-click="false"
                  :return-value.sync="date"
                  transition="scale-transition"
                  offset-y
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      v-model="date"
                      label="Ventes du"
                      prepend-icon="mdi-calendar"
                      readonly
                      dense
                      v-bind="attrs"
                      v-on="on"
                    ></v-text-field>
                  </template>
                  <v-date-picker v-model="date" no-title scrollable>
                    <v-spacer></v-spacer>
                    <v-btn text color="primary" @click="menu = false">
                      Cancel
                    </v-btn>
                    <v-btn text color="primary" @click="$refs.menu.save(date)">
                      OK
                    </v-btn>
                  </v-date-picker>
                </v-menu>
              </v-col>
              <v-col style="padding-top: 0">
                <v-menu
                  ref="menu"
                  v-model="menu"
                  :close-on-content-click="false"
                  :return-value.sync="date"
                  transition="scale-transition"
                  offset-y
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      v-model="date"
                      label="Ventes au"
                      prepend-icon="mdi-calendar"
                      readonly
                      dense
                      v-bind="attrs"
                      v-on="on"
                    ></v-text-field>
                  </template>
                  <v-date-picker v-model="date" no-title scrollable>
                    <v-spacer></v-spacer>
                    <v-btn text color="primary" @click="menu = false">
                      Cancel
                    </v-btn>
                    <v-btn text color="primary" @click="$refs.menu.save(date)">
                      OK
                    </v-btn>
                  </v-date-picker>
                </v-menu> </v-col
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
                  >Du 03/02/2020 au 03/02/2021 (Tous)</v-card-subtitle
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

const API_URL = process.env.VUE_APP_API_URL as string;
const token = localStorage.getItem("token");


export default Vue.extend({
  name: "App",
  components: {
    navigationDrawer,
    LineChart,
  },
  data(): any {
    return {
      emailAdmin: "",

      labels: [],
      data: [],

      date: new Date(),
      menu: false,

      itemsSelect: ["Foo", "Bar", "Fizz", "Buzz"],
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
    this.emailAdmin = localStorage.getItem("emailAdmin");
    this.updateStats("", "", "");
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
    getRandomInt() {
      return Math.floor(Math.random() * (50 - 5 + 1)) + 5;
    },
    updateStats(productID: string, createdAtFrom: string, createdAtAt: string) {
      const parameters = {} as any;
      if (productID != "") parameters.productID = productID;
      if (createdAtFrom != "") parameters.createdAtFrom = createdAtFrom;
      if (createdAtAt != "") parameters.createdAtAt = createdAtAt;

      axios
        .post(API_URL + "/admin/searchBill", parameters, {
          headers: { Authorization: "Bearer " + token },
        })
        .then((response) => {
          if (response.status == 200) {
            const dates = [] as any;
            const labels = [] as any;
            const data = [] as any;
            
            //let dateBuffer = undefined


            let currentSales = 1
            for (let i = 0; i < response.data.bills.length; i++) {
              
              const cDate = new Date(
                response.data.bills[i].createdAt.split("T")[0]
              ).getTime();

              let uniqueDate = true
              for (let j = 0; j < dates.length; j++) {
                console.log(cDate.toString() + " " + dates[j].toString())
                if(cDate == dates[j])
                {
                  uniqueDate = false
                }
              }
              
              if (uniqueDate) {
                dates.push(cDate)
                data.push(currentSales)
                currentSales = 1
              }
              else
                currentSales++
                
            }
            console.log(dates)
            console.log(data)

/*
            this.labels = labels;
            this.data = data;

            this.fillData();
*/
            //console.log(Array.from(this.labels))
            //console.log(Array.from(this.data))
          }
        })
        .catch((error) => {
          alert("Erreur serveur !");
          console.log(error.reponse);
        });
    },
  },
});
</script>