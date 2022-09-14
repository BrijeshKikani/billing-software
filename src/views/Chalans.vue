<template>

  <v-data-table
    :headers="headers"
    :items="chalans"
    :search="search"
  >
    <template v-slot:top>
      <v-toolbar
        flat
      >
        <v-text-field
        v-model="search"
        append-icon="mdi-magnify"
        label="Search"
        single-line
        hide-details
      ></v-text-field>
        <v-spacer></v-spacer>
            <v-btn
              color="primary"
              dark
              @click="createChalan()"
            >
              Add New Chalan
            </v-btn>
          
      </v-toolbar>
    </template>
  </v-data-table>

</template>

<script>
import { getFirestore, collection, getDocs, query, where } from "firebase/firestore"; 
import {getAuth} from "firebase/auth";
import { uid } from "uid"
 export default {
  name: "Home",
  data: () => ({
    search:'',
      headers: [
        {
          text: 'clientName',
          align: 'start',
          value: 'clientName',
        },
        { text: 'invoiceTotal', value: 'invoiceTotal' },
        { text: 'updateAt', value: 'updateAt'  },
        { text: 'invoice Date', value: 'invoiceDate' },
        { text: 'Protein (g)', value: 'protein' },
        { text: 'Actions', value: 'actions', sortable: false },
      ],
      chalans: [],
      createdBy:null
    }),

    watch: {
      dialog (val) {
        val || this.close()
      },
      dialogDelete (val) {
        val || this.closeDelete()
      },
    },

    mounted () {

      this.getChalans();
    },
    computed:{
      userId(){
        return this.$store.getters.getUserId;
      }
    },
    methods: {
      async getChalans(){

        const firestore= getFirestore();
      const result=await getDocs(query(collection(firestore, "chalans"), where("createdBy", "==", this.userId)));
      result.forEach((doc) => {
        this.chalans.push({"id":doc.id,...doc.data() });
});
      },

      createChalan () {
        this.$router.push({ name: "ChalansCreate" });
      }

    }
};
</script>
