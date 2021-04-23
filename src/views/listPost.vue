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
                <v-icon
                  @click="
                    searchPost(
                      '',
                      emailPublisherSearch,
                      textContentSearch,
                      createdAtFromSearch.toString(),
                      createdAtAtSearch.toString(),
                      haveReportSearch
                    )
                  "
                  >mdi-refresh</v-icon
                >
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
                      v-model="emailPublisherSearch"
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
                      v-model="textContentSearch"
                    ></v-text-field>
                  </v-col>

                  <v-col>
                    <v-select
                      :items="itemsSelect"
                      label="Signalement"
                      dense
                      outlined
                      style=""
                      v-model="haveReportSearch"
                    ></v-select>
                  </v-col>

                  
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
                          label="Créer de"
                          prepend-icon="mdi-calendar"
                          readonly
                          v-bind="attrs"
                          v-on="on"
                        ></v-text-field>
                      </template>
                      <v-date-picker v-model="createdAtFromSearch" scrollable header-color="#363740" color="#363740" locale="fr-FR">
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
                          label="Créer à"
                          prepend-icon="mdi-calendar"
                          readonly
                          v-bind="attrs"
                          v-on="on"
                        ></v-text-field>
                      </template>
                      <v-date-picker v-model="createdAtAtSearch" scrollable header-color="#363740" color="#363740" locale="fr-FR">
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
                    </v-dialog>


                  </v-col>
                </v-row>
              </v-container>
            </template>
            <!--
            <template v-slot:[`item.actions`]="{ item }">
              <v-icon small  @click="editItem(item)">mdi-dots-horizontal</v-icon>
            </template>
-->
            <template v-slot:[`item.actions`]="t">
              <v-icon
                small
                v-if="t.item.idPost != undefined"
                @click="$router.push('/detailPost/' + t.item.idPost)"
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


export default Vue.extend({
  name: "App",
  components: {
    navigationDrawer,
  },
  data() {
    return {
      emailAdmin: localStorage.getItem("emalToken") || "",
      token: localStorage.getItem("token") || "", 

      emailPublisherSearch: "",
      textContentSearch: "",
      haveReportSearch: "",
      createdAtFromSearch: new Date().toISOString().substr(0, 10),
      createdAtAtSearch: new Date().toISOString().substr(0, 10),


      modal: false,
      modal2: false,

      headers: [
        {
          text: "Post",
          align: "start",
          sortable: false,
          value: "textContent",
        },
        { text: "idPost", value: "idPost" },
        { text: "Créateur", value: "emailPublisher" },
        { text: "Date", value: "createdAt" },
        { text: "nbAime", value: "nbLike" },
        { text: "nbSignalement", value: "nbReport" },
        { text: "Actions", value: "actions", sortable: false },
      ],
      items: [{}],
      itemsSelect: ["Oui", "Non", "Les 2"],
    };
  },

  methods: {
    searchPost(
      idPost: string,
      emailPublisher: string,
      textContent: string,
      createdAtFrom: string,
      createdAtAt: string,
      haveReport: string
    ) {

      this.items = [{}];

      const parameters = {} as any;
      if (idPost != "") parameters.idPost = idPost;
      if (emailPublisher != "") parameters.emailPublisher = emailPublisher;
      if (textContent != "") parameters.textContent = textContent;
      if (createdAtFrom != "") parameters.createdAtFrom = createdAtFrom;
      if (createdAtAt != "") parameters.createdAtAt = createdAtAt;
      if (haveReport != "") {
        if (haveReport == "Oui") parameters.createdAtAt = 0;
        if (haveReport == "Non") parameters.createdAtAt = 1;
      }
      console.log(parameters)
      axios
        .post(API_URL + "/admin/searchPost", parameters, {
          headers: { Authorization: "Bearer " + this.token },
        })
        .then((response) => {
          if (response.data.message == "succès (non-vide)") {
            const items = [];
            for (let i = 0; i < response.data.posts.length; i++) {
              const item = {
                idPost: response.data.posts[i]._id,
                textContent: response.data.posts[i].textContent,
                emailPublisher: response.data.posts[i].emailPublisher,
                createdAt: response.data.posts[i].createdAt,
                nbLike: response.data.posts[i].listLike.length,
                nbReport: response.data.posts[i].listReport.length,
              };
              items[i] = item;
            }

            this.items = items;
          }
        })
        .catch(function (error) {
          alert("erreur !");
          console.log("erreur");
          console.log(error.response);
        });
    },
  },
  mounted() {
    // See specific user post
    if(this.$route.params.emailUser != "" && this.$route.params.emailUser != undefined)
      this.emailPublisherSearch = this.$route.params.emailUser
    else
      this.emailPublisherSearch = ""

    // See specific user report
    if(this.$route.params.haveReport == "Oui")
      this.haveReportSearch = "Oui"
    else
      this.haveReportSearch = ""

    
    this.searchPost("", this.emailPublisherSearch, "", "", "", this.haveReportSearch);
  },
});
</script>