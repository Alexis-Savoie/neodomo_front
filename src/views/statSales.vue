<template>
  <v-app class="black">
    <v-app-bar app flat color="#E5E5E5">
      <v-toolbar-title style="padding-left: 2em">Ventes</v-toolbar-title>
      <v-spacer></v-spacer>
      <div :class="`text-${model}`">emailAdmin@mail.com</div>
    </v-app-bar>
    <navigationDrawer />

    <!-- Page content -->
    <v-main style="background-color: #e5e5e5">
      <v-container fill-height>
        <v-card class="ma-auto" align="center" justify="center" width="100%">
            <div class="small">
              <line-chart :chart-data="datacollection"></line-chart>
              <button @click="fillData()">Randomize</button>
            </div>
          
            <!-- Top of the data table (Toolbar) -->

            <template v-slot:top>
              <v-container fill-height>
     
                  <v-toolbar-title style="padding-right: 0.5em">Statistiques ventes</v-toolbar-title>
                  <v-row ></v-row>
                  <v-row >
                  
                  <v-select
                    :items="itemsSelect"
                    label="Produit"
                    dense
                    outlined
                    style="maxWidth: 232px; padding-left: 12px"
                  ></v-select>
                  </v-row >



                  <v-row >
                  <!-- date picker -->
                  <v-col style="padding-top: 0;">
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
                          style="padding-top: 0;"
                        ></v-text-field>
                      </template>
                      <v-date-picker v-model="date" no-title scrollable>
                        <v-spacer></v-spacer>
                        <v-btn text color="primary" @click="menu = false">
                          Cancel
                        </v-btn>
                        <v-btn
                          text
                          color="primary"
                          @click="$refs.menu.save(date)"
                        >
                          OK
                        </v-btn>
                      </v-date-picker>
                    </v-menu>
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
                          style="padding-top: 0;"
                        ></v-text-field>
                      </template>
                      <v-date-picker v-model="date" no-title scrollable>
                        <v-spacer></v-spacer>
                        <v-btn text color="primary" @click="menu = false">
                          Cancel
                        </v-btn>
                        <v-btn
                          text
                          color="primary"
                          @click="$refs.menu.save(date)"
                        >
                          OK
                        </v-btn>
                      </v-date-picker>
                    </v-menu>
                  </v-col>
                  <v-col></v-col><v-col></v-col><v-col></v-col><v-col></v-col>
                  
                </v-row>
              </v-container>
            </template>

            <template v-slot:[`item.actions`]="{ item }">
              <v-icon small @click="editItem(item)">mdi-dots-horizontal</v-icon>
            </template>

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
import LineChart from "../components/lineChart"
import Vue from 'vue'

export default Vue.extend({
  name: "App",
  components: {
    navigationDrawer,
    LineChart
  },
  data(): any {
    return {
      datacollection: null,
      headers: [
        {
          text: "Post",
          align: "start",
          sortable: false,
          value: "textContent",
        },
        { text: "Créateur", value: "emailPublisher" },
        { text: "Date", value: "createdAt" },
        { text: "nbAime", value: "nbLike" },
        { text: "nbSignalement", value: "nbReport" },
        { text: "Actions", value: "actions", sortable: false },
      ],
      items: [
        {
          textContent: "Espèce de sale...",
          emailPublisher: "pajantil@email.com",
          createdAt: "21/01/2021",
          nbLike: 2,
          nbReport: 2,
        },
        {
          textContent: "Espèce de sale...",
          emailPublisher: "pajantil@email.com",
          createdAt: "21/01/2021",
          nbLike: 2,
          nbReport: 2,
        },
        {
          textContent: "Espèce de sale...",
          emailPublisher: "pajantil@email.com",
          createdAt: "21/01/2021",
          nbLike: 2,
          nbReport: 2,
        },
        {
          textContent: "Espèce de sale...",
          emailPublisher: "pajantil@email.com",
          createdAt: "21/01/2021",
          nbLike: 2,
          nbReport: 2,
        },
        {
          textContent: "Espèce de sale...",
          emailPublisher: "pajantil@email.com",
          createdAt: "21/01/2021",
          nbLike: 2,
          nbReport: 2,
        },
        {
          textContent: "Espèce de sale...",
          emailPublisher: "pajantil@email.com",
          createdAt: "21/01/2021",
          nbLike: 2,
          nbReport: 2,
        },
        {
          textContent: "Espèce de sale...",
          emailPublisher: "pajantil@email.com",
          createdAt: "21/01/2021",
          nbLike: 2,
          nbReport: 2,
        },
        {
          textContent: "Espèce de sale...",
          emailPublisher: "pajantil@email.com",
          createdAt: "21/01/2021",
          nbLike: 2,
          nbReport: 2,
        },
        {
          textContent: "Espèce de sale...",
          emailPublisher: "pajantil@email.com",
          createdAt: "21/01/2021",
          nbLike: 2,
          nbReport: 2,
        },
      ],
      itemsSelect: ['Foo', 'Bar', 'Fizz', 'Buzz'],
      
    };
  },
    mounted () {
      this.fillData()
    },
    methods: {
      fillData () {
        this.datacollection = {
          labels: [this.getRandomInt(), this.getRandomInt()],
          datasets: [
            {
              label: 'Data One',
              backgroundColor: '#f87979',
              data: [this.getRandomInt(), this.getRandomInt()]
            }, {
              label: 'Data One',
              backgroundColor: '#f87979',
              data: [this.getRandomInt(), this.getRandomInt()]
            }
          ]
        }
      },
      getRandomInt () {
        return Math.floor(Math.random() * (50 - 5 + 1)) + 5
      }
    }
});
</script>