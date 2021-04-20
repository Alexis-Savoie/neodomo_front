<template>
  <v-app class="black">
    <v-app-bar app flat color="#E5E5E5">
      <v-toolbar-title style="padding-left: 2em">Posts</v-toolbar-title>
      <v-spacer></v-spacer>
      <div>{{ emailAdmin }}</div>
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
                  >Liste des posts</v-toolbar-title
                >
                <v-icon @click="editItem()">mdi-refresh</v-icon>
                <v-row></v-row>
                <v-row>
                  <v-spacer></v-spacer>
                  <v-spacer></v-spacer>

                  <v-col></v-col>
                  <v-col>
                    <!-- Search text box -->
                    <v-text-field
                      solo
                      dense
                      label="Créateur"
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
                      label="Contenu"
                      rounded
                      class="shrink"
                      height="15"
                      style="font-size: 12px"
                    ></v-text-field>
                  </v-col>

                  <v-col>
                    <v-select
                      :items="itemsSelect"
                      label="Signalement"
                      dense
                      outlined
                      style=""
                    ></v-select>
                  </v-col>

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
                          label="Créer de"
                          prepend-icon="mdi-calendar"
                          readonly
                          dense
                          v-bind="attrs"
                          v-on="on"
                          style="padding-top: 0"
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
                          label="Créer à"
                          prepend-icon="mdi-calendar"
                          readonly
                          dense
                          v-bind="attrs"
                          v-on="on"
                          style="padding-top: 0"
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
                </v-row>
              </v-container>
            </template>
            <!--
            <template v-slot:[`item.actions`]="{ item }">
              <v-icon small  @click="editItem(item)">mdi-dots-horizontal</v-icon>
            </template>
-->
            <template v-slot:[`item.actions`]="t" >
              <v-icon small @click="$router.push('/detailPost/' + t.item.idPost)">mdi-dots-horizontal</v-icon>
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
  data(){
    return {
    emailAdmin: "",
    headers: [
      {
        text: "Post",
        align: "start",
        sortable: false,
        value: "textContent",
      },
      { text: "idPost", value: "idPost"},
      { text: "Créateur", value: "emailPublisher" },
      { text: "Date", value: "createdAt" },
      { text: "nbAime", value: "nbLike" },
      { text: "nbSignalement", value: "nbReport" },
      { text: "Actions", value: "actions", sortable: false },
    ],
    items: [{}],
    itemsSelect: ["Oui", "Non", "Les 2"],
  }
  },

  methods: {
    searchPost(idPost: string, emailPublisher: string, textContent: string, createdAtFrom: string, createdAtAt: string, haveReport: string) {
      const parameters = {} as any
      if (emailPublisher != "")
        parameters.emailPublisher = emailPublisher
      if (textContent != "")
        parameters.textContent = textContent
      if (createdAtFrom != "")
        parameters.createdAtFrom = createdAtFrom
      if (createdAtAt != "")
        parameters.createdAtAt = createdAtAt
      if (haveReport != "")
      {
        if (haveReport == "Oui")
          parameters.createdAtAt = "1"
        if (haveReport == "Non")
          parameters.createdAtAt = "0"
      }
        


      axios
      .post(
        API_URL + "/admin/searchPost",
        parameters,
        { headers: { Authorization: "Bearer " + token } }
      )
      .then( (response) => {
        if (response.data.message == "succès (non-vide)") {
          const items = [];
          for (let i = 0; i < response.data.posts.length; i++) {
            const item = {
              idPost: response.data.posts[i]._id,
              textContent: response.data.posts[i].textContent,
              emailPublisher: response.data.posts[i].emailPublisher,
              createdAt: response.data.posts[i].createdAt,
              nbLike: response.data.posts[i].listLike.length,
              nbReport: response.data.posts[i].listReport.length
            };
            items[i] = item;
            
          }

          this.items = items
          console.log(this.items);

        }
      })
      .catch(function (error) {
        alert("erreur !");
        console.log("erreur")
        console.log(error)
      });
    },
  },
  mounted() {
    this.searchPost("", "", "", "", "", "")
    this.emailAdmin = localStorage.getItem("emailAdmin") || ""
  },
})
</script>