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
      <v-container>
        <v-card class="ma-auto" width="100%">
          <v-container>
            <v-row>
              <v-col>
                <v-toolbar-title style="padding-left: 12px"
                  >Détails post</v-toolbar-title
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
                  @click="$router.push('/listPost')"
                  >Supprimer</v-btn
                >
              </v-col>
              <v-col>
                <v-btn
                  rounded
                  class="boutton"
                  dark
                  color="#363740"
                  @click="$router.push('/listPost')"
                  >Supprimer et bloquer</v-btn
                > </v-col
              ><v-col></v-col><v-col></v-col><v-col></v-col><v-col></v-col
              ><v-col></v-col><v-col></v-col>
            </v-row>
            <v-row>
              <v-divider></v-divider>
            </v-row>
            <v-row>
              <v-col>
                <v-card-text class="text-center">ID post</v-card-text>
                <v-text-field
                  class="centered-input"
                  solo
                  dense
                  disabled
                  label=""
                  rounded
                  v-model="idPost"
                ></v-text-field>
                <v-card-text class="text-center">Date</v-card-text>
                <v-text-field
                  class="centered-input"
                  solo
                  dense
                  disabled
                  label=""
                  rounded
                  v-model="createdAt"
                ></v-text-field>
                <v-card-text class="text-center">Auteur</v-card-text>
                <v-text-field
                  class="centered-input"
                  solo
                  dense
                  disabled
                  label=""
                  rounded
                  v-model="emailPublisher"
                ></v-text-field>
                <v-card-text class="text-center">Nombre aime</v-card-text>
                <v-text-field
                  class="centered-input"
                  solo
                  dense
                  disabled
                  label=""
                  rounded
                  v-model="nbLike"
                ></v-text-field>
                <v-card-text class="text-center"
                  >Nombre signalement</v-card-text
                >
                <v-text-field
                  class="centered-input"
                  solo
                  dense
                  disabled
                  label=""
                  rounded
                  v-model="nbReport"
                ></v-text-field>
              </v-col>
              <v-divider vertical></v-divider>
              <v-col class="text-center">
                <v-card-text class="text-center"
                  >Contenu du message</v-card-text
                >
                <v-textarea
                  outlined
                  solo
                  rounded
                  disabled
                  name="input-7-4"
                  label=""
                  :value="textContent"
                ></v-textarea>
                <v-card-text>Liste images</v-card-text>
                <v-divider></v-divider>
                <div class="text-center">
                  <v-btn color="blue" plain>Image 1</v-btn>
                </div>
                <div class="text-center">
                  <v-btn color="blue" plain>Image 2</v-btn>
                </div>
                <div class="text-center">
                  <v-btn color="blue" plain>Image 3</v-btn>
                </div>
                <div class="text-center">
                  <v-btn color="blue" plain>Image 4</v-btn>
                </div>
                <v-divider style="margin-bottom: 24px"></v-divider>

                <v-card-text>Commentaires du post</v-card-text>
                <v-btn
                  rounded
                  class="boutton"
                  dark
                  color="#363740"
                  @click="$router.push('/listComment')"
                  >Voir</v-btn
                >
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

.centered-input input {
  text-align: center;
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
  data() {
    return {
      emailAdmin: "",

      idPost: "",
      createdAt: "",
      emailPublisher: "",
      nbLike: 0,
      nbReport: 0,
      textContent: "",
      listImage: [],
    };
  },
  methods: {
    getPost(idPost: string) {
      axios
        .post(
          API_URL + "/admin/searchPost",
          { idPost: idPost },
          { headers: { Authorization: "Bearer " + token } }
        )
        .then((response) => {
          if (response.data.message == "succès (non-vide)") {
            this.idPost = response.data.posts[0]._id;
            this.createdAt = response.data.posts[0].createdAt;
            this.textContent = response.data.posts[0].textContent;
            this.emailPublisher = response.data.posts[0].emailPublisher;
            this.nbLike = response.data.posts[0].listLike.length;
            this.nbReport = response.data.posts[0].listReport.length;
            console.log("prout");
            console.log(response.data.posts[0]);
          }
        })
        .catch(function (error) {
          alert("erreur !");
          console.log(error);
        });
    },
  },
  created() {
    this.emailAdmin = localStorage.getItem("emailAdmin") || "";
    this.idPost = this.$route.params.id;
    this.getPost(this.idPost)
  },
});
</script>