<template>
  <v-app class="black">
    <v-app-bar app flat color="#E5E5E5">
      <v-toolbar-title style="padding-left: 2em">Commentaires</v-toolbar-title>
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
                  >Liste des commentaires</v-toolbar-title
                >
                <v-icon
                  @click="
                    searchComment(
                      idPostSearch,
                      emailSenderSearch,
                      textContentSearch,
                      replyToSearch,
                      haveReportSearch,
                      createdAtFromSearch.toString(),
                      createdAtAtSearch.toString()
                    )
                  "
                  >mdi-refresh</v-icon
                >
                <v-row></v-row>
                <v-row>
                  <v-col>
                    <!-- Search text box -->
                    <v-text-field
                      solo
                      dense
                      label="idPost"
                      rounded
                      class="shrink"
                      height="15"
                      style="font-size: 12px"
                      v-model="idPostSearch"
                    ></v-text-field>
                  </v-col>

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
                      v-model="emailSenderSearch"
                    ></v-text-field>
                  </v-col>

                  <v-col>
                    <!-- Search text box -->
                    <v-text-field
                      solo
                      dense
                      label="RépondA"
                      rounded
                      class="shrink"
                      height="15"
                      style="font-size: 12px"
                      v-model="replyToSearch"
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

                  <!-- date picker -->
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
                    </v-dialog>
                  </v-col>
                </v-row>
              </v-container>
            </template>

            <template v-slot:[`item.actions`]="t">
              <v-icon
                v-if="t.item.idComment != undefined"
                small
                @click="deleteComment(t.item.idComment)"
                >mdi-delete</v-icon
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

const fromDate = new Date()
fromDate.setDate(fromDate.getDate() - 30)
const atDate = new Date()
atDate.setDate(fromDate.getDate() + 1)

export default Vue.extend({
  name: "App",
  components: {
    navigationDrawer,
  },
  data() {
    return {
      emailAdmin: localStorage.getItem("emailAdmin") || "",
      token: localStorage.getItem("token") || "",

      idPostSearch: "",
      emailSenderSearch: "",
      textContentSearch: "",
      haveReportSearch: "",
      replyToSearch: "",
      createdAtFromSearch: fromDate.toISOString().substr(0, 10),
      createdAtAtSearch: atDate.toISOString().substr(0, 10),

      modal: false,
      modal2: false,

      headers: [
        {
          text: "Commentaire",
          align: "start",
          sortable: false,
          value: "textContent",
        },
        { text: "Créateur", value: "emailSender" },
        { text: "ID Post", value: "idPost" },
        { text: "Date", value: "createdAt" },
        { text: "Actions", value: "actions", sortable: false },
      ],
      items: [{}],
      itemsSelect: ["Oui", "Non", "Les 2"],
    };
  },

  methods: {
    searchComment(
      idPost: string,
      emailSender: string,
      textContent: string,
      replyTo: string,
      haveReport: string,
      createdAtFrom: string,
      createdAtAt: string
    ) {
      this.items = [{}];
      console.log(idPost);
      const parameters = {} as any;

      if (idPost != "") parameters.idPost = idPost;
      if (emailSender != "") parameters.emailSender = emailSender;
      if (textContent != "") parameters.textContent = textContent;
      if (createdAtFrom != "") parameters.createdAtFrom = createdAtFrom;
      if (createdAtAt != "") parameters.createdAtAt = createdAtAt;
      if (replyTo != "") parameters.replyTo = replyTo;
      if (haveReport != "") {
        if (haveReport == "Oui") parameters.createdAtAt = 0;
        if (haveReport == "Non") parameters.createdAtAt = 1;
      }
      console.log(parameters);
      axios
        .post(API_URL + "/admin/searchComment", parameters, {
          headers: { Authorization: "Bearer " + this.token },
        })
        .then((response) => {
          if (response.data.message == "succès (non-vide)") {
            const items = [];
            for (let i = 0; i < response.data.comments.length; i++) {
              const item = {
                idComment: response.data.comments[i]._id,
                idPost: response.data.comments[i].idPost,
                emailSender: response.data.comments[i].emailSender,
                textContent: response.data.comments[i].textContent.substring(0,40) + "...",
                createdAt: response.data.comments[i].createdAt,
                replyTo: response.data.comments[i].replyTo,
              };
              items[i] = item;
            }

            this.items = items;
            console.log(this.items);
          }
        })
        .catch(function (error) {
          alert("erreur !");
          console.log("erreur");
          console.log(error);
        });
    },
    deleteComment(idComment: string) {
      if ( confirm( "Êtes-vous sûr de vouloir supprimer ce commentaire ?" ) ) {
              axios
        .delete(API_URL + "/admin/deleteComment", {
          headers: {
            Authorization: "Bearer " + this.token,
          },
          data: {
            idComment: idComment,
          },
        })
        .then((response) => {
          location.reload();
        })
        .catch(function (error) {
          alert("erreur !");
          console.log("erreur");
          console.log(error.response);
        });
    
      } else {
          // Code à éxécuter si l'utilisateur clique sur "Annuler" 
      }

    },
  },
  mounted() {
    if(this.$route.params.idPost != "" && this.$route.params.idPost != " " && this.$route.params.idPost != undefined)
      this.idPostSearch = this.$route.params.idPost
    else
      this.idPostSearch = ""

    // See specific user post
    if(this.$route.params.emailUser != "" && this.$route.params.emailUser != undefined)
      this.emailSenderSearch = this.$route.params.emailUser
    else
      this.emailSenderSearch = ""

    // See specific user report
    if(this.$route.params.haveReport == "Oui")
      this.haveReportSearch = "Oui"
    else
      this.haveReportSearch = ""

    this.searchComment(this.idPostSearch, this.emailSenderSearch, "", "", this.haveReportSearch, "", "");
  },
});
</script>