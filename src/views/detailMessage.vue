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
      <v-container>
        <v-card class="ma-auto" width="100%">
          <v-container>
            <v-row>
              <v-col>
                <v-toolbar-title style="padding-left: 12px"
                  >Détails message</v-toolbar-title
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
                  @click="deleteMessage()"
                  >Supprimer</v-btn
                >
              </v-col>
              <v-col>
                <v-btn
                  rounded
                  class="boutton"
                  dark
                  color="#363740"
                  @click="deleteMessageAndBlock()"
                  >Supprimer et bloquer</v-btn
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
                <v-card-text class="text-center">ID Message</v-card-text>
                <v-text-field
                  solo
                  dense
                  disabled
                  label=""
                  rounded
                  v-model="idMessage"
                ></v-text-field>
                <!--
                <v-card-text class="text-center">Email</v-card-text>
                <v-text-field
                  solo
                  dense
                  disabled
                  label=""
                  rounded
                ></v-text-field>
                -->
                <v-card-text class="text-center">Date</v-card-text>
                <v-text-field
                  solo
                  dense
                  disabled
                  label=""
                  rounded
                  v-model="createdAt"
                ></v-text-field>
                <v-card-text class="text-center">Expéditeur</v-card-text>
                <v-text-field
                  solo
                  dense
                  disabled
                  label=""
                  rounded
                  v-model="emailSender"
                ></v-text-field>
                <v-card-text class="text-center">Destinataire</v-card-text>
                <v-text-field
                  solo
                  dense
                  disabled
                  label=""
                  rounded
                  v-model="emailReceiver"
                ></v-text-field>
              </v-col>
              <v-divider vertical></v-divider>
              <v-col class="text-center">
                <v-card-text class="text-center"
                  >Contenu Textuelle</v-card-text
                >
                <v-textarea
                  outlined
                  rounded
                  solo
                  disabled
                  name="input-7-4"
                  label="Contenu textuelle"
                  v-model="textContent"
                ></v-textarea>
                <div class="text-center" v-if="this.imageURL != ''">
                  <v-card-text class="text-center">Image</v-card-text>
                  <viewer>
                    <img style="max-width: 100px" :src="this.imageURL">
                  </viewer>
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
import Vue from "vue";
import navigationDrawer from "../components/navigationDrawer.vue";
import axios from "axios";
import 'viewerjs/dist/viewer.css'
import Viewer from 'v-viewer'
Vue.use(Viewer)

const API_URL = process.env.VUE_APP_API_URL as string;


export default Vue.extend({
  name: "App",
  components: {
    navigationDrawer,
  },
  data() {
    return {
      emailAdmin: localStorage.getItem("emailAdmin"),
      token: localStorage.getItem("token"),

      idMessage: "",
      
      createdAt: "",
      emailSender: "",
      emailReceiver: "",
      textContent: "",
      imageURL: "",
      
    };
  },
  methods: {
    getMessage(idMessage: string) {
      axios
        .post(
          API_URL + "/admin/searchMessage",
          { idMessage: idMessage },
          { headers: { Authorization: "Bearer " + this.token } }
        )
        .then((response) => {
          if (response.data.message == "succès (non-vide)") {
            this.idMessage = response.data.messages[0]._id;
            this.createdAt = response.data.messages[0].createdAt;
            this.emailSender = response.data.messages[0].emailSender;
            this.emailReceiver = response.data.messages[0].emailReceiver;
            this.textContent = response.data.messages[0].textContent;
            this.imageURL = response.data.messages[0].imageURL;
          }
        })
        .catch(function (error) {
          alert("erreur !");
          console.log(error);
        });
    },

    show() {
      //this.$viewer.show()
    },
    deleteMessage(idMessage: string) {
      axios
        .delete(API_URL + "/admin/deletePost", {
          headers: {
            Authorization: "Bearer " + this.token,
          },
          data: {
            idMessage: this.idMessage,
          },
        })
        .then((response) => {
          alert("L'opération s'est effectué avec succès !")
          this.$router.push("/listMessage")

        })
        .catch(function (error) {
          alert("erreur suppression message !");
          console.log(error);
        });
    },
    deleteMessageAndBlock(idMessage: string) {
      axios
        .delete(API_URL + "/admin/deleteMessage", {
          headers: {
            Authorization: "Bearer " + this.token,
          },
          data: {
            idMessage: this.idMessage,
          },
        })
        .then((response) => {
          console.log(response.data)
          if (response.status == 200) {
            axios
              .put(API_URL + "/admin/blockUser",           
              { email: this.emailSender },
              { headers: { Authorization: "Bearer " + this.token } })
              .then((response) => {
                if (response.status == 200) {
                  alert("L'opération s'est effectué avec succès !")
                  this.$router.push("/listMessage")
                }
              })
              .catch(function (error) {
                alert("erreur blocage !");
                console.log(error);
              });
          }
        })
        .catch(function (error) {
          alert("erreur suppression post !");
          console.log(error);
        });
    },
  },
  mounted() {
    this.idMessage = this.$route.params.idMessage;
    this.getMessage(this.idMessage);
  },
});
</script>