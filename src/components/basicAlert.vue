<template>
  <v-dialog persistent v-model="dialog" max-width="600">
    <v-card>
      <v-toolbar color="#363740" dark>{{ dialogTitle }}</v-toolbar>
      <v-card-text>
        <div class="text-h5 pa-12">{{ dialogContent }}</div>
      </v-card-text>
      <v-card-actions class="justify-end">
        <v-btn text @click="goTo(goToRoute)">Fermer</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>





<script lang="ts">
import Vue from "vue";
import { eventBus } from "../main"


export default Vue.extend({
  name: "App",
  components: {},
  data() {
    return {
      dialog: false,
      dialogTitle: "",
      dialogContent: "",
      goToRoute: "",
    };
  },
  methods: {

    openAlert(title: string, content: string, goToRoute: string) {
      this.dialogTitle = title;
      this.dialogContent = content;
      this.goToRoute = goToRoute;
      this.dialog = true;
    },
    goTo(route: string) {
      if (route != "") this.$router.push(route);
      this.dialog = false;
    }
  },
   created() {
    eventBus.$on('openAlert', (title: string, content: string, goToRoute: string) => {
        this.openAlert(title, content, goToRoute)
    })
   },
   
});
</script>