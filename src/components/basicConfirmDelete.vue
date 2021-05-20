<template>
  <v-dialog id="basicConfirmDelete" persistent v-model="dialogConfirm" max-width="600">
    <v-card>
      <v-toolbar color="#363740" dark>{{ dialogTitleConfirm }}</v-toolbar>
      <v-card-text>
        <div class="text-h5 pa-12">{{ dialogContentConfirm }}</div>
      </v-card-text>
      <v-card-actions class="justify-end">
        <v-btn text @click="confirmNo()">Non</v-btn>
        <v-btn text @click="goToConfirm(goToRouteConfirm)">Oui</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>





<script lang="ts">
import Vue from "vue";
import { eventBus } from "../main";
import axios from "axios";


const API_URL = process.env.VUE_APP_API_URL as string;

export default Vue.extend({
  name: "App",
  components: {},
  data() {
    return {
      token: localStorage.getItem("token") || "",

      goToRoute: "",
      routeURLConfirm: "",
      idNameConfirm: "",
      idConfirm: "",

      dialogConfirm: false,
      dialogTitleConfirm: "",
      dialogContentConfirm: "",
      goToRouteConfirm: "",
    };
  },
  methods: {
    openConfirm(title: string, content: string, goToRoute: string) {
      this.dialogTitleConfirm = title;
      this.dialogContentConfirm = content;
      this.goToRouteConfirm = goToRoute;
      this.dialogConfirm = true;
    },
    goToConfirm(route: string) {
        const dataObject: any = {}
        dataObject[this.idNameConfirm] = this.idConfirm
        axios
        .delete(API_URL + this.routeURLConfirm, {
          headers: {
            Authorization: "Bearer " + this.token,
          },
          data: dataObject,
        })
        .then((response) => {
          // List COmment case
          if (this.goToRoute == "")
            location.reload();
          else
            this.$router.push(this.goToRoute);
          this.goToRoute = ""
          this.dialogConfirm = false;
        })
        .catch((error) => {
          this.dialogConfirm = false;
          eventBus.$emit('openAlert', 'Erreur', 'Erreur serveur !', '');
          console.log(error.response);
        });
    },
    confirmNo() {
      this.dialogConfirm = false;
    },
  },
  created() {
    eventBus.$on(
      "openConfirm",
      (title: string, content: string, goToRoute: string, routeURL: string, idName: string, id: string) => {
        console.log('emit works !')
        this.routeURLConfirm = routeURL
        this.goToRoute = goToRoute
        this.idNameConfirm = idName
        this.idConfirm = id
        this.openConfirm(title, content, goToRoute);
      }
    );
  },
});
</script>