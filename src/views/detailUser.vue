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
      <v-container>
        <v-card class="ma-auto" width="100%">
          <v-container>
            <v-row>
              <v-col>
                <v-toolbar-title style="padding-left: 12px"
                  >Détails utilisateur</v-toolbar-title
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
                  @click="updateUser()"
                  >Mettre à jour</v-btn
                >
              </v-col>
              <v-col>
                <v-btn
                  v-if="isBlocked == false"
                  rounded
                  class="boutton"
                  dark
                  color="#363740"
                  @click="blockUser()"
                  >Bloquer</v-btn
                >
                <v-btn
                  v-if="isBlocked == true"
                  rounded
                  class="boutton"
                  dark
                  color="#363740"
                  @click="blockUser()"
                  >Débloquer</v-btn
                >
              </v-col>
              <v-col></v-col><v-col></v-col><v-col></v-col><v-col></v-col
              ><v-col></v-col><v-col></v-col>
            </v-row>
            <v-row>
              <v-divider></v-divider>
            </v-row>
            <v-row>
              <v-col>
                <v-card-text class="text-center">ID Utilisateur</v-card-text>
                <v-text-field
                  class="centered-input"
                  solo
                  dense
                  disabled
                  label=""
                  rounded
                  v-model="idUser"
                ></v-text-field>
                <v-card-text class="text-center">Email</v-card-text>
                <v-text-field
                  class="centered-input"
                  solo
                  dense
                  disabled
                  label=""
                  rounded
                  v-model="emailUser"
                ></v-text-field>
                <v-card-text class="text-center">Nom</v-card-text>
                <v-text-field
                  class="centered-input"
                  solo
                  dense
                  label=""
                  rounded
                  v-model="lastname"
                ></v-text-field>
                <v-card-text class="text-center">Prénom</v-card-text>
                <v-text-field
                  class="centered-input"
                  solo
                  dense
                  label=""
                  rounded
                  v-model="firstname"
                ></v-text-field>
                <v-card-text class="text-center">Type</v-card-text>
                <v-select
                  :items="itemsSelectAccountType"
                  label="Type compte"
                  dense
                  outlined
                  v-model="accountType"
                  align="center"
                  justify="center"
                  class="text-center"
                  style="justify-content: center"
                >
                </v-select>
                <v-card-text class="text-center">Status</v-card-text>
                <v-text-field
                  solo
                  class="centered-input"
                  dense
                  label=""
                  rounded
                  v-model="status"
                ></v-text-field>
                <v-card-text class="text-center">Balance Domo</v-card-text>
                <v-text-field
                  class="centered-input"
                  solo
                  dense
                  label=""
                  rounded
                  v-model="domoBalance"
                ></v-text-field>
              </v-col>
              <v-divider vertical></v-divider>
              <v-col class="text-center">
                <v-card-text class="text-center">Dernière activité</v-card-text>
                <v-text-field
                  class="centered-input"
                  solo
                  dense
                  disabled
                  label=""
                  rounded
                  v-model="lastActivity"
                ></v-text-field>
                <v-card-text class="text-center">Inscrit le</v-card-text>
                <v-text-field
                  class="centered-input"
                  solo
                  dense
                  disabled
                  label=""
                  rounded
                  v-model="createdAt"
                ></v-text-field>

                <v-card-text>Nombre de posts</v-card-text>
                <v-btn
                  rounded
                  class="boutton"
                  dark
                  color="#363740"
                  @click="$router.push('/listPost/' + emailUser)"
                  >Voir ({{ nbPost }})</v-btn
                >

                <v-card-text>Nombre de messages</v-card-text>
                <v-btn
                  rounded
                  class="boutton"
                  dark
                  color="#363740"
                  @click="$router.push('/listMessage/' + emailUser)"
                  >Voir ({{ nbMessage }})</v-btn
                >

                <v-card-text>Nombre de signalements recu</v-card-text>
                <v-row>
                  <v-col></v-col>
                  <v-col>
                    <v-btn
                      rounded
                      class="boutton"
                      dark
                      color="#363740"
                      @click="$router.push('/listPost/' + emailUser + '/Oui')"
                      >Posts ({{ nbReportPost }})</v-btn
                    >
                  </v-col>
                  <v-col>
                    <v-btn
                      rounded
                      class="boutton"
                      dark
                      color="#363740"
                      @click="
                        $router.push('/listComment/ /' + emailUser + '/Oui')
                      "
                      >Commentaires ({{ nbReportComment }})</v-btn
                    >

                  <basicAlert />
                    
                  </v-col>
                  <v-col></v-col>
                </v-row>
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
import Vue from "vue";
import navigationDrawer from "../components/navigationDrawer.vue";
import basicAlert from "../components/basicAlert.vue";
import { eventBus } from "../main"
import axios from "axios";


const API_URL = process.env.VUE_APP_API_URL as string;

export default Vue.extend({
  name: "App",
  components: {
    navigationDrawer,
    basicAlert
  },
  data() {
    return {
      emailAdmin: localStorage.getItem("emailAdmin"),
      token: localStorage.getItem("token"),

      idUser: "",
      emailUser: "",
      firstname: "",
      lastname: "",
      accountType: "",
      status: "",
      domoBalance: "",
      lastActivity: "",
      createdAt: "",
      isBlocked: false,

      nbPost: 0,
      nbMessage: 0,
      nbReportPost: 0,
      nbReportComment: 0,

      itemsSelectAccountType: ["Tous", "eleve", "association", "staff"],

    };
  },
  methods: {

    getUser(emailUser: string) {
      axios
        .post(
          API_URL + "/admin/searchUser",
          { emailUser: emailUser },
          { headers: { Authorization: "Bearer " + this.token } }
        )
        .then((response) => {
          if (response.data.message == "succès (non-vide)") {
            this.idUser = response.data.users[0]._id;
            this.firstname = response.data.users[0].firstname;
            this.lastname = response.data.users[0].lastname;
            this.accountType = response.data.users[0].accountType;
            this.status = response.data.users[0].status;
            this.domoBalance = response.data.users[0].domoBalance;
            this.lastActivity = response.data.users[0].lastActivity;
            this.createdAt = response.data.users[0].createdAt;
            this.isBlocked = response.data.users[0].isBlocked;
          }
        })
        .catch(error => {
          eventBus.$emit('openAlert', 'Erreur', 'Erreur serveur !', '');
          console.log(error);
        });
    },
    getUserStat(emailUser: string) {
      // Posts
      axios
        .post(
          API_URL + "/admin/searchPost",
          { emailUser: emailUser },
          { headers: { Authorization: "Bearer " + this.token } }
        )
        .then((response) => {
          if (response.data.message == "succès (non-vide)") {
            if (response.data.posts) this.nbPost = response.data.posts.length;
            else this.nbPost = 0;
          }
        })
        .catch(error => {
          eventBus.$emit('openAlert', 'Erreur', 'Erreur serveur !', '');
          console.log(error);
        });

      // Posts report
      axios
        .post(
          API_URL + "/admin/searchPost",
          { emailUser: emailUser, haveReport: 0 },
          { headers: { Authorization: "Bearer " + this.token } }
        )
        .then((response) => {
          if (response.data.message == "succès (non-vide)") {
            if (response.data.posts)
              this.nbReportPost = response.data.posts.length;
            else this.nbReportPost = 0;
          }
        })
        .catch(function (error) {
          eventBus.$emit('openAlert', 'Erreur', 'Erreur serveur !', '');
          console.log(error);
        });

      // Message
      axios
        .post(
          API_URL + "/admin/searchMessage",
          { emailSender: emailUser, haveReport: 0 },
          { headers: { Authorization: "Bearer " + this.token } }
        )
        .then((response) => {
          if (response.data.message == "succès (non-vide)") {
            if (response.data.messages)
              this.nbMessage = response.data.messages.length;
            else this.nbMessage = 0;
          }
        })
        .catch(function (error) {
          eventBus.$emit('openAlert', 'Erreur', 'Erreur serveur !', '');
          console.log(error);
        });

      // Comment report
      axios
        .post(
          API_URL + "/admin/searchComment",
          { emailSender: emailUser, haveReport: 0 },
          { headers: { Authorization: "Bearer " + this.token } }
        )
        .then((response) => {
          if (response.data.message == "succès (non-vide)") {
            if (response.data.comments)
              this.nbReportComment = response.data.comments.length;
            else this.nbReportComment = 0;
          }
        })
        .catch(function (error) {
          eventBus.$emit('openAlert', 'Erreur', 'Erreur serveur !', '');
          console.log(error);
        });
    },
    updateUser() {
      const parameters = {
        email: this.emailUser,
        firstname: this.firstname,
        lastname: this.lastname,
        accountType: this.accountType,
        status: this.status,
      };
      axios
        .put(API_URL + "/admin/editUser", parameters, {
          headers: { Authorization: "Bearer " + this.token },
        })
        .then((response) => {
          if (response.status == 200) {
            eventBus.$emit('openAlert', "Information", "Mise à jour de l'utilisateur réussit !", '/listUser');
          }
        })
        .catch(error => {
          eventBus.$emit('openAlert', 'Erreur', "Erreur mise à jour utilisateur !", '');
          console.log(error);
        });
    },

    blockUser() {
      axios
        .put(
          API_URL + "/admin/blockUser",
          { email: this.emailUser },
          { headers: { Authorization: "Bearer " + this.token } }
        )
        .then((response) => {
          if (response.status == 200) {
            console.log("")
            if (this.isBlocked == false)
              eventBus.$emit('openAlert', 'Information', "L'utilisateur à été bloqué avec succès", '/listUser');
            else 
              eventBus.$emit('openAlert', 'Information', "L'utilisateur à été débloqué avec succès", '/listUser');
          }
        })
        .catch(error => {
          eventBus.$emit('openAlert', 'Erreur', "Erreur blocage utilisateur !", '');
          console.log(error);
        });
    },
  },

  mounted() {
    this.emailUser = this.$route.params.emailUser;
    this.getUser(this.emailUser);
    this.getUserStat(this.emailUser);
    
  },
});
</script>