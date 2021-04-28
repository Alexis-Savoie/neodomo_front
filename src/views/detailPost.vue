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
                  @click="deletePost()"
                  >Supprimer</v-btn
                >
              </v-col>
              <v-col>
                <v-btn
                  rounded
                  class="boutton"
                  dark
                  color="#363740"
                  @click="deletePostAndBlock()"
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
                <div
                  class="text-center"
                  v-if="
                    this.listImage.length > 0 && this.listImage[0].URL != ''
                  "
                >
                  <div
                    class="text-center"
                    v-if="
                      this.listImage.length > 0 && this.listImage[0].URL != ''
                    "
                  >
                  <viewer>
                    <img style="max-width: 100px" :src="this.listImage[0].URL">
                  </viewer>
                    <div
                      class="text-center"
                      v-if="
                        this.listImage.length > 1 && this.listImage[1].URL != ''
                      "
                    >
                    <viewer>
                    <img style="max-width: 100px" :src="this.listImage[1].URL">
                    </viewer>
                    </div>
                    <div
                      class="text-center"
                      v-if="
                        this.listImage.length > 2 && this.listImage[2].URL != ''
                      "
                    >
                      <viewer>
                    <img style="max-width: 100px" :src="this.listImage[2].URL">
                  </viewer>
                    </div>
                    <div
                      class="text-center"
                      v-if="
                        this.listImage.length > 3 && this.listImage[3].URL != ''
                      "
                    >
                      <viewer>
                    <img style="max-width: 100px" :src="this.listImage[3].URL">
                  </viewer>
                    </div>
                  </div>
                </div>
                <div class="text-center" v-else>Aucune image pour ce post</div>
                <v-divider style="margin-bottom: 24px"></v-divider>

                <v-card-text>Commentaires du post</v-card-text>
                <v-btn
                  rounded
                  class="boutton"
                  dark
                  color="#363740"
                  @click="$router.push('/listComment/' + idPost)"
                  >Voir ({{ nbComment }})</v-btn
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

      idPost: "",
      createdAt: "",
      emailPublisher: "",
      nbComment: 0,
      nbLike: 0,
      nbReport: 0,
      textContent: "",
      listImage: [{ URL: "" }],
    };
  },
  methods: {
    getPost(idPost: string) {
      axios
        .post(
          API_URL + "/admin/searchPost",
          { idPost: idPost },
          { headers: { Authorization: "Bearer " + this.token } }
        )
        .then((response) => {
          if (response.data.message == "succès (non-vide)") {
            this.idPost = response.data.posts[0]._id;
            this.createdAt = response.data.posts[0].createdAt;
            this.textContent = response.data.posts[0].textContent;
            this.emailPublisher = response.data.posts[0].emailPublisher;
            this.nbComment = response.data.posts[0].listComment.length;
            this.nbLike = response.data.posts[0].listLike.length;
            this.nbReport = response.data.posts[0].listReport.length;
            this.listImage = response.data.posts[0].listImage;
            console.log("OK");
            console.log(this.listImage[0].URL);
          }
        })
        .catch(function (error) {
          alert("erreur !");
          console.log(error);
        });
    },
    deletePost(idPost: string) {
      axios
        .delete(API_URL + "/admin/deletePost", {
          headers: {
            Authorization: "Bearer " + this.token,
          },
          data: {
            idPost: this.idPost,
          },
        })
        .then((response) => {
          alert("L'opération s'est effectué avec succès !")
          this.$router.push("/listPost")

        })
        .catch(function (error) {
          alert("erreur suppression post !");
          console.log(error);
        });
    },
    deletePostAndBlock(idPost: string) {
      axios
        .delete(API_URL + "/admin/deletePost", {
          headers: {
            Authorization: "Bearer " + this.token,
          },
          data: {
            idPost: this.idPost,
          },
        })
        .then((response) => {
          console.log(response.data)
          if (response.status == 200) {
            console.log("DELETEPOSTOK")
            console.log(this.emailPublisher)
            axios
              .put(API_URL + "/admin/blockUser",           
              { email: this.emailPublisher },
              { headers: { Authorization: "Bearer " + this.token } })
              .then((response) => {
                if (response.status == 200) {
                  alert("L'opération s'est effectué avec succès !")
                  this.$router.push("/listPost")
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
    this.idPost = this.$route.params.idPost;
    this.getPost(this.idPost);
  },
});
</script>