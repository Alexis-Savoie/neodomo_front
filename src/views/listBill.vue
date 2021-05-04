<template>
  <v-app class="black">
    <v-app-bar app flat color="#E5E5E5">
      <v-toolbar-title style="padding-left: 2em">Factures</v-toolbar-title>
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
                  >Liste des factures</v-toolbar-title
                >
                <v-icon
                  @click="
                    searchBill(
                      numberBillSearch,
                      emailBuyerSearch,
                      idProductSearch,
                      priceMinSearch,
                      priceMaxSearch,
                      createdAtFromSearch,
                      createdAtAtSearch
                    )
                  "
                  >mdi-refresh</v-icon
                >
                <v-row></v-row>
                <v-row>
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
                      v-model="numberBillSearch"
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
                      v-model="emailBuyerSearch"
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
                      v-model="idProductSearch"
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
                      v-model="priceMinSearch"
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
                      v-model="priceMaxSearch"
                    ></v-text-field>
                  </v-col>

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
                </v-row>
              </v-container>
            </template>

            <template v-slot:[`item.actions`]="t">
              <v-icon small @click="$router.push('/detailBill/' + t.item.idBill)"
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
      emailAdmin: localStorage.getItem("emailAdmin") || "",
      token: localStorage.getItem("token") || "",

      numberBillSearch: "",
      emailBuyerSearch: "",
      idProductSearch: "",
      priceMinSearch: "",
      priceMaxSearch: "",
      createdAtFromSearch: fromDate.toISOString().substr(0, 10),
      createdAtAtSearch: atDate.toISOString().substr(0, 10),

      modal: false,
      modal2: false,

      headers: [
        {
          text: "Numéro facture",
          align: "start",
          value: "numberBill",
        },
        { text: "Date de commande", value: "createdAt" },
        { text: "Description", value: "description" },
        { text: "Prix", value: "price" },
        { text: "Mode de paiement", value: "paymentMethod" },
        { text: "Destinataire", value: "emailBuyer" },
        { text: "Actions", value: "actions", sortable: false },
      ],
      items: [{}],
      itemsSelect: ["Oui", "Non", "Les 2"],
    };
  },

  methods: {
    searchBill(
      numberBill: string,
      emailBuyer: string,
      idProduct: string,
      priceMin: string,
      priceMax: string,
      createdAtFrom: string,
      createdAtAt: string
    ) {
      this.items = [{}];

      const parameters = {} as any;
      if (numberBill != "")
        parameters.numberBill = numberBill;
      if (emailBuyer != "")
        parameters.emailBuyer = emailBuyer;
      if (idProduct != "") parameters.idProduct = idProduct;
      if (priceMin != "") parameters.priceMin = priceMin;
      if (priceMax != "") parameters.priceMax = priceMax;
      if (createdAtFrom != "")
        parameters.createdAtFrom = createdAtFrom;
      if (createdAtAt != "")
        parameters.createdAtAt = createdAtAt;

      console.log(parameters);

      axios
        .post(API_URL + "/admin/searchBill", parameters, {
          headers: { Authorization: "Bearer " + this.token },
        })
        .then((response) => {

          if (response.data.message == "succès (non-vide)") {
            const items = [];
            for (let i = 0; i < response.data.bills.length; i++) {
              const item = {
                idBill: response.data.bills[i]._id,
                numberBill: response.data.bills[i].numberBill,
                createdAt: response.data.bills[i].createdAt,
                description: response.data.bills[i].description,
                price: response.data.bills[i].price,
                paymentMethod: response.data.bills[i].paymentMethod,
                emailBuyer: response.data.bills[i].emailBuyer,
              };
              items[i] = item;
            }

            this.items = items;
          }
        })
        .catch(function (error) {
          alert("erreur !");
          console.log("erreur");
          console.log(error);
        });
    },
  },
  mounted() {
    this.searchBill("", "", "", "", "", "", "");
  },
});
</script>