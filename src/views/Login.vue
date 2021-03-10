<template>
  <v-app>
    
    <v-navigation-drawer height="100%" color="#363740"  permanent>
    <v-divider></v-divider>
    </v-navigation-drawer>

    <v-content>
      <v-card width="500" class="ma-auto">
        <v-card-title>Gestionnaire de l'application Neo Domo</v-card-title>
        <v-card-text>
          <v-text-field label="Email" prepend-icon="mdi-account-circle" v-model="email"/>
          <v-text-field label="Mot de passe" type='password' prepend-icon="mdi-lock"/>
        </v-card-text>

        <v-divider></v-divider>
        <v-card-actions>
          <v-btn color="info" @click="Login">Connexion</v-btn>
        </v-card-actions>
      </v-card>
    </v-content>
  </v-app>
</template>






<script lang="ts">

import Vue from 'vue'
import router from '../router'

export default Vue.extend({
    name: 'Login',
    props: {},
    components: {},
    data: () => ({
        email: "",
        right: null
    }),
    computed: {},
    methods: {
        Login() {
            console.log(this.email)
            router.push("/listPost")
        }
    }

})
</script>
