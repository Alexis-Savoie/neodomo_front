<template>
  <v-app class="black">
    <v-app-bar app flat color="#E5E5E5">
      <v-toolbar-title style="padding-left: 2em">Factures</v-toolbar-title>
      <v-spacer></v-spacer>
      <div :class="`text-${model}`">emailAdmin@mail.com</div>
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
     
                  <v-toolbar-title style="padding-right: 0.5em">Liste des factures</v-toolbar-title>
                  <v-icon @click="editItem()">mdi-refresh</v-icon>
                  <v-row ></v-row>
                  <v-row >
                  <v-col>
                    <!-- Search text box -->
                    <v-text-field
                      solo
                      dense
                      label="Numéro"
                      rounded
                      class="shrink"
                      height="15"
                      style="font-size: 12px"
                    ></v-text-field>
                  </v-col>

                 <v-col>
                    <!-- Search text box -->
                    <v-text-field
                      solo
                      dense
                      label="Acheteur"
                      rounded
                      class="shrink"
                      height="15"
                      style="font-size: 12px"
                    ></v-text-field>
                  </v-col>

                  <!-- Search text box -->

                  <v-col>
                    <!-- Search text box -->
                    <v-text-field
                      solo
                      dense
                      label="ID Produit"
                      rounded
                      class="shrink"
                      height="15"
                      style="font-size: 12px"
                    ></v-text-field>
                  </v-col>

                  <v-col>
                    <!-- Search text box -->
                    <v-text-field
                      solo
                      dense
                      label="prixMin"
                      rounded
                      class="shrink"
                      height="15"
                      style="font-size: 12px"
                    ></v-text-field>
                    <!-- Search text box -->
                    <v-text-field
                      solo
                      dense
                      label="prixMax"
                      rounded
                      class="shrink"
                      height="15"
                      style="font-size: 12px"
                    ></v-text-field>
                  </v-col>

                  <!-- date picker -->
                  <v-col style="padding-top: 0;">

                    <v-menu
                      ref="menu"
                      dense
                      rounded
                      v-model="menu"
                      :close-on-content-click="false"
                      :return-value.sync="date"
                      transition="scale-transition"
                      offset-y
                      

                    >
                      <template v-slot:activator="{ on, attrs }">
                        <v-text-field
                          v-model="date"
                          label="Du"
                          prepend-icon="mdi-calendar"
                          readonly
                          v-bind="attrs"
                          v-on="on"
                          style=""
                        ></v-text-field>
                      </template>
                      <v-date-picker v-model="date" no-title scrollable>
                        <v-spacer></v-spacer>
                        <v-btn text color="primary" @click="menu = false">
                          Cancel
                        </v-btn>
                        <v-btn
                          text
                          color="primary"
                          @click="$refs.menu.save(date)"
                        >
                          OK
                        </v-btn>
                      </v-date-picker>
                    </v-menu>

                   <v-menu
                      ref="menu"
                      dense
                      rounded
                      v-model="menu"
                      :close-on-content-click="false"
                      :return-value.sync="date"
                      transition="scale-transition"
                      offset-y
                    >
                      <template v-slot:activator="{ on, attrs }">
                        <v-text-field
                          v-model="date"
                          label="à"
                          prepend-icon="mdi-calendar"
                          readonly
                          v-bind="attrs"
                          v-on="on"
                          style="padding-top: 0;"
                        ></v-text-field>
                      </template>
                      <v-date-picker v-model="date" no-title scrollable>
                        <v-spacer></v-spacer>
                        <v-btn text color="primary" @click="menu = false">
                          Cancel
                        </v-btn>
                        <v-btn
                          text
                          color="primary"
                          @click="$refs.menu.save(date)"
                        >
                          OK
                        </v-btn>
                      </v-date-picker>
                    </v-menu>
                  </v-col>
                </v-row>
              </v-container>
            </template>

            <template v-slot:[`item.actions`]>
              <v-icon small @click="$router.push('/detailBill')">mdi-dots-horizontal</v-icon>
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
import navigationDrawer from "../components/navigationDrawer.vue";

export default {
  name: "App",
  components: {
    navigationDrawer,
  },
  data() {
    return {
      headers: [
        {
          text: "Numéro facture",
          align: "start",
          value: "numberBill",
        },
        { text: "Date de commande", value: "dateBill" },
        { text: "Description", value: "description" },
        { text: "Prix", value: "price" },
        { text: "Mode de paiement", value: "paymentMethod" },
        { text: "Destinataire", value: "emailBuyer" },
        { text: "Actions", value: "actions", sortable: false },
      ],
      items: [
        {
          numberBill: "12121212",
          dateBill: "10/01/2021",
          description: "550 domos",
          price: 5.5,
          paymentMethod: "CB",
          emailBuyer: "mecsympa@email.com",
        },
        {
          numberBill: "12121212",
          dateBill: "10/01/2021",
          description: "550 domos",
          price: 5.5,
          paymentMethod: "CB",
          emailBuyer: "mecsympa@email.com",
        },
        {
          numberBill: "12121212",
          dateBill: "10/01/2021",
          description: "550 domos",
          price: 5.5,
          paymentMethod: "CB",
          emailBuyer: "mecsympa@email.com",
        },
        {
          numberBill: "12121212",
          dateBill: "10/01/2021",
          description: "550 domos",
          price: 5.5,
          paymentMethod: "CB",
          emailBuyer: "mecsympa@email.com",
        },
        {
          numberBill: "12121212",
          dateBill: "10/01/2021",
          description: "550 domos",
          price: 5.5,
          paymentMethod: "CB",
          emailBuyer: "mecsympa@email.com",
        },
        {
          numberBill: "12121212",
          dateBill: "10/01/2021",
          description: "550 domos",
          price: 5.5,
          paymentMethod: "CB",
          emailBuyer: "mecsympa@email.com",
        },
        {
          numberBill: "12121212",
          dateBill: "10/01/2021",
          description: "550 domos",
          price: 5.5,
          paymentMethod: "CB",
          emailBuyer: "mecsympa@email.com",
        },

      ],
      itemsSelect: ['Foo', 'Bar', 'Fizz', 'Buzz'],
    };
  },
};
</script>