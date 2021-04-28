<template>
  <v-app class="black">
    <v-app-bar app flat color="#E5E5E5">
      <v-toolbar-title style="padding-left: 2em">Messages</v-toolbar-title>
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
     
                  <v-toolbar-title style="padding-right: 0.5em">Liste des messages</v-toolbar-title>
                  <v-icon @click="
                    searchMessage(
                      emailSenderSearch,
                      emailReceiverSearch,
                      textContentSearch,
                      createdAtFromSearch,
                      createdAtAtSearch
                    )
                  ">mdi-refresh</v-icon>
                  <v-row ></v-row>
                  <v-row >
                    <v-spacer></v-spacer>
                  <v-spacer></v-spacer>
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
                      label="Destinataire"
                      rounded
                      class="shrink"
                      height="15"
                      style="font-size: 12px"
                      v-model="emailReceiverSearch"
                    ></v-text-field>
                  </v-col>

                  <!-- Search text box -->

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
                  <!-- date picker -->
                  <v-col style="padding-top: 0;">

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

            <template v-slot:[`item.actions`]="t">
              <v-icon small v-if="t.item.idMessage != undefined" @click="$router.push('/detailMessage/' + t.item.idMessage)">mdi-dots-horizontal</v-icon>
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
      emailAdmin: localStorage.getItem("emailAdmin") || "",
      token: localStorage.getItem("token") || "",

      idMessage: "",
      emailSenderSearch: "",
      emailReceiverSearch: "",
      textContentSearch: "",
      createdAtFromSearch: new Date().toISOString().substr(0, 10),
      createdAtAtSearch: new Date().toISOString().substr(0, 10),

      modal: false,
      modal2: false,

      headers: [
        {
          text: "Message",
          align: "start",
          sortable: false,
          value: "textContent",
        },
        { text: "Expéditeur", value: "emailSender" },
        { text: "Destinataire", value: "emailReceiver" },
        { text: "Date", value: "createdAt" },
        { text: "Actions", value: "actions", sortable: false },
      ],
      items: [{}],
      itemsSelect: ["Oui", "Non", "Les 2"],
    };
  },

  methods: {
    searchMessage(
      emailSender: string,
      emailReceiver: string,
      textContent: string,
      createdAtFrom: string,
      createdAtAt: string
    ) {
      this.items = [{}];

      const parameters = {} as any;
      if (emailSender != "") parameters.emailSender = emailSender;
      if (emailReceiver != "") parameters.emailReceiver = emailReceiver;
      if (textContent != "") parameters.textContent = textContent;
      if (createdAtFrom != "") parameters.createdAtFrom = createdAtFrom;
      if (createdAtAt != "") parameters.createdAtAt = createdAtAt;

      axios
        .post(API_URL + "/admin/searchMessage", parameters, {
          headers: { Authorization: "Bearer " + this.token },
        })
        .then((response) => {
          if (response.data.message == "succès (non-vide)") {
            const items = [];
            for (let i = 0; i < response.data.messages.length; i++) {
              const item = {
                idMessage: response.data.messages[i]._id,
                textContent: response.data.messages[i].textContent.substring(0,40) + "...",
                emailSender: response.data.messages[i].emailSender,
                emailReceiver: response.data.messages[i].emailReceiver,
                createdAt: response.data.messages[i].createdAt,
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
    if(this.$route.params.emailUser != "" && this.$route.params.emailUser != undefined)
      this.emailSenderSearch = this.$route.params.emailUser
    else
      this.emailSenderSearch = ""
    this.searchMessage(this.emailSenderSearch, "", "", "", "");
  },
});
</script>