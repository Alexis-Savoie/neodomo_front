<template>
  <v-app class="black">
    <v-app-bar app flat color="#E5E5E5">
      <v-toolbar-title style="padding-left: 2em">Utilisateurs</v-toolbar-title>
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
                  >Liste des utilisateurs</v-toolbar-title
                >
                <v-icon @click="
                    searchUser(
                      emailUserSearch,
                      firstnameSearch,
                      lastnameSearch,
                      accountTypeSearch,
                      createdAtFromSearch,
                      createdAtAtSearch,
                      lastActivityFromSearch,
                      lastActivityAtSearch,
                    )
                  ">mdi-refresh</v-icon>
                <v-row></v-row>
                <v-row>
                  <v-col>
                    <!-- Search text box -->
                    <v-text-field
                      solo
                      dense
                      label="Email"
                      rounded
                      class="shrink"
                      height="15"
                      style="font-size: 12px"
                      v-model="emailUserSearch"
                    ></v-text-field>
                  </v-col>

                  <v-col>
                    <!-- Search text box -->
                    <v-text-field
                      solo
                      dense
                      label="Prénom"
                      rounded
                      class="shrink"
                      height="15"
                      style="font-size: 12px"
                      v-model="firstnameSearch"
                    ></v-text-field>
                  </v-col>

                  <!-- Search text box -->

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
                      v-model="lastnameSearch"
                    ></v-text-field>
                  </v-col>
                  <v-col>
                    <v-select
                      :items="itemsSelectAccountType"
                      label="Type compte"
                      dense
                      outlined
                      style=""
                      v-model="accountTypeSearch"
                    ></v-select>
                  </v-col>
                   <!--
                  <v-col>
                   
                    <v-select
                      :items="itemsSelectHaveReport"
                      label="Signalement"
                      dense
                      outlined
                      style=""
                      v-model="haveReportSearch"
                    ></v-select>

                  </v-col>
                  -->

                  <!-- date picker -->
                  <v-col style="padding-top: 0">
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

                  <v-col style="padding-top: 0">
                    <!-- date picker 3-->
                    <v-dialog
                      ref="dialog3"
                      v-model="modal3"
                      :return-value.sync="lastActivityFromSearch"
                      persistent
                      width="290px"
                    >
                      <template v-slot:activator="{ on, attrs }">
                        <v-text-field
                          v-model="lastActivityFromSearch"
                          label="Actif de"
                          prepend-icon="mdi-calendar"
                          readonly
                          v-bind="attrs"
                          v-on="on"
                        ></v-text-field>
                      </template>
                      <v-date-picker v-model="lastActivityFromSearch" scrollable header-color="#363740" color="#363740" locale="fr-FR">
                        <v-spacer></v-spacer>
                        <v-btn text color="black" @click="modal3 = false">
                          Annuler
                        </v-btn>
                        <v-btn
                          text
                          color="black"
                          @click="$refs.dialog3.save(lastActivityFromSearch)"
                        >
                          OK
                        </v-btn>
                      </v-date-picker>
                    </v-dialog>

                                        <!-- date picker 2-->
                    <v-dialog
                      ref="dialog4"
                      v-model="modal4"
                      :return-value.sync="lastActivityAtSearch"
                      persistent
                      width="290px"
                    >
                      <template v-slot:activator="{ on, attrs }">
                        <v-text-field
                          v-model="lastActivityAtSearch"
                          label="Actif à"
                          prepend-icon="mdi-calendar"
                          readonly
                          v-bind="attrs"
                          v-on="on"
                        ></v-text-field>
                      </template>
                      <v-date-picker v-model="lastActivityAtSearch" scrollable header-color="#363740" color="#363740" locale="fr-FR">
                        <v-spacer></v-spacer>
                        <v-btn text color="black" @click="modal4 = false">
                          Annuler
                        </v-btn>
                        <v-btn
                          text
                          color="black"
                          @click="$refs.dialog4.save(lastActivityAtSearch)"
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
                small
                v-if="t.item.emailUser != undefined"
                @click="$router.push('/detailUser/' + t.item.emailUser)"
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
      emailAdmin: localStorage.getItem("emalToken") || "",
      token: localStorage.getItem("token") || "",

      emailUserSearch: "",
      firstnameSearch: "",
      lastnameSearch: "",
      accountTypeSearch: "",
      haveReportSearch: "",
      createdAtFromSearch: fromDate.toISOString().substr(0, 10),
      createdAtAtSearch: atDate.toISOString().substr(0, 10),
      lastActivityFromSearch: fromDate.toISOString().substr(0, 10),
      lastActivityAtSearch: atDate.toISOString().substr(0, 10),

      modal: false,
      modal2: false,
      modal3: false,
      modal4: false,

      headers: [
        {
          text: "email",
          align: "start",
          value: "emailUser",
        },
        { text: "Prénom", value: "firstname" },
        { text: "Nom", value: "lastname" },
        { text: "Inscrit le", value: "createdAt" },
        { text: "Type", value: "accountType" },
        { text: "Bloqué", value: "isBlocked" },
        { text: "Actions", value: "actions", sortable: false },
      ],
      items: [{}],
      
      itemsSelectAccountType: ["Tous", "eleve", "association", "staff"],
      itemsSelectHaveReport: ["Tous", "Oui", "Non"],
    };
  },

  methods: {
    searchUser(
      emailUser: string,
      firstname: string,
      lastname: string,
      accountType: string,
      createdAtFrom: string,
      createdAtAt: string,
      lastActivityFrom: string,
      lastActivityAt: string
    ) {
      this.items = [{}];

      const parameters = {} as any;
      if (emailUser != "") parameters.emailUser = emailUser;
      if (firstname != "") parameters.firstname = firstname;
      if (lastname != "") parameters.lastname = lastname;
      if (accountType != "" && accountType != "Tous") parameters.accountType = accountType;
      if (createdAtFrom != "") parameters.createdAtFrom = createdAtFrom;
      if (createdAtAt != "") parameters.createdAtAt = createdAtAt;
      if (lastActivityFrom != "")
        parameters.lastActivityFrom = lastActivityFrom;
      if (lastActivityAt != "") parameters.lastActivityAt = lastActivityAt;

      axios
        .post(API_URL + "/admin/searchUser", parameters, {
          headers: { Authorization: "Bearer " + this.token },
        })
        .then((response) => {
          if (response.data.message == "succès (non-vide)") {
            const items = [];
            for (let i = 0; i < response.data.users.length; i++) {
              const item = {
                emailUser: response.data.users[i].emailUser,
                firstname: response.data.users[i].firstname,
                lastname: response.data.users[i].lastname,
                createdAt: response.data.users[i].createdAt,
                accountType: response.data.users[i].accountType,
                isBlocked: response.data.users[i].isBlocked,
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
    this.searchUser("", "", "", "", "", "", "", "");
  },
});
</script>