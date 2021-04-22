<template>
  <v-navigation-drawer dark color="#363740" app>
    <v-list-item>
      <v-list-item-content>
        <v-list-item-title
          style="
            color: #a4a6b3;
            text-align: center;
            padding-top: 1em;
            padding-bottom: 1em;
          "
          class="title"
          >Neo Domo</v-list-item-title
        >
      </v-list-item-content>
    </v-list-item>
    <v-divider></v-divider>

    <v-list dense nav>
      <v-list-item link @click="$router.push('/listPost')">
        <v-list-item-icon>
          <v-icon color="#A4A6B3">mdi-send</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title style="color: #a4a6b3; padding-left: 1em"
            >Posts</v-list-item-title
          >
        </v-list-item-content>
      </v-list-item>

      <v-list-item link @click="$router.push('/listComment')">
        <v-list-item-icon>
          <v-icon color="#A4A6B3">mdi-comment-processing</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title style="color: #a4a6b3; padding-left: 1em"
            >Commentaires</v-list-item-title
          >
        </v-list-item-content>
      </v-list-item>

      <v-list-item link @click="$router.push('/listMessage')">
        <v-list-item-icon>
          <v-icon color="#A4A6B3">mdi-forum</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title style="color: #a4a6b3; padding-left: 1em"
            >Messages</v-list-item-title
          >
        </v-list-item-content>
      </v-list-item>

      <v-list-item link @click="$router.push('/listUser')">
        <v-list-item-icon>
          <v-icon color="#A4A6B3">mdi-account-multiple</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title style="color: #a4a6b3; padding-left: 1em"
            >Utilisateurs</v-list-item-title
          >
        </v-list-item-content>
      </v-list-item>

      <v-list-item link @click="$router.push('/listProduct')">
        <v-list-item-icon>
          <v-icon color="#A4A6B3">mdi-cart</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title style="color: #a4a6b3; padding-left: 1em"
            >Stocks</v-list-item-title
          >
        </v-list-item-content>
      </v-list-item>

      <v-list-item link @click="$router.push('/listBill')">
        <v-list-item-icon>
          <v-icon color="#A4A6B3">mdi-receipt</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title style="color: #a4a6b3; padding-left: 1em"
            >Factures</v-list-item-title
          >
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>

      <v-list-item link @click="$router.push('/statSales')">
        <v-list-item-icon>
          <v-icon color="#A4A6B3">mdi-poll</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title style="color: #a4a6b3; padding-left: 1em"
            >Ventes</v-list-item-title
          >
        </v-list-item-content>
      </v-list-item>

      <v-list-item link @click="$router.push('/statGamification')">
        <v-list-item-icon>
          <v-icon color="#A4A6B3">mdi-gamepad</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title style="color: #a4a6b3; padding-left: 1em"
            >Gamification</v-list-item-title
          >
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>

      <v-list-item link @click="$router.push('/settings')">
        <v-list-item-icon>
          <v-icon color="#A4A6B3">mdi-settings</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title style="color: #a4a6b3; padding-left: 1em"
            >Paramètres</v-list-item-title
          >
        </v-list-item-content>
      </v-list-item>

      <v-list-item link @click="Logout">
        <v-list-item-icon>
          <v-icon color="#A4A6B3">mdi-logout</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title style="color: #a4a6b3; padding-left: 1em"
            >Déconnexion</v-list-item-title
          >
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
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
import router from "../router";
import axios from "axios";

const API_URL: string = process.env.VUE_APP_API_URL!;


export default Vue.extend({
  props: {},
  components: {},
  data: () => ({
    token: localStorage.getItem("token") || "",
    right: null,
  }),
  computed: {},
  methods: {
    Logout() {
      axios
        .delete(API_URL + "/admin/logout", {
          headers: { Authorization: "Bearer " + this.token },
        })
        .then(function (response) {
          localStorage.removeItem("isAuthenticated");
          localStorage.removeItem("token");
          localStorage.removeItem("emailAdmin");
          router.push("/login");
        })
        .catch(function (error) {
          localStorage.removeItem("isAuthenticated");
          localStorage.removeItem("token");
          localStorage.removeItem("emailAdmin");
          router.push("/login");
        });

    },
  },
});
</script>
<style>
