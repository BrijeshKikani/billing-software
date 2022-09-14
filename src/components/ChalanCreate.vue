<template>
  <v-form @submit.prevent="submit">
        <v-row>
          <v-col
            cols="12"
            md="6"
          >
            <v-text-field
              v-model="clientName"
              label="Client Name"
            ></v-text-field>
          </v-col>
          <v-col
            cols="12"
            md="6"
          >
            <v-text-field
              v-model="invoiceTotal"
              label="invoiceTotal"
            ></v-text-field>
          </v-col>
          <v-menu
        v-model="datePicker"
        :close-on-content-click="false"
        :nudge-right="40"
        transition="scale-transition"
        offset-y
        min-width="auto"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-text-field
            v-model="invoiceDate"
            label="Picker without buttons"
            prepend-icon="mdi-calendar"
            readonly
            v-bind="attrs"
            v-on="on"
          ></v-text-field>
        </template>
        <v-date-picker
          v-model="invoiceDate"
          @input="datePicker = false"
        ></v-date-picker>
      </v-menu>
        </v-row>
      <v-btn
        primary
        type="submit"
      >
        submit
      </v-btn>
    </v-form>
</template>

<script lang="ts">
import { getFirestore, collection, doc, setDoc } from "firebase/firestore"; 
import {getAuth} from "firebase/auth";
import { v4 as uuidv4 } from "uuid"
 export default {
  name: "ChalanCreate",

  data() {
    return {
      datePicker:false,
      docId: null,
      billerStreetAddress: null,
      billerCity: null,
      billerZipCode: null,
      billerCountry: null,
      clientName: null,
      clientEmail: null,
      clientStreetAddress: null,
      clientCity: null,
      clientZipCode: null,
      clientCountry: null,
      invoiceDateUnix: null,
      invoiceDate: null,
      paymentTerms: 0,
      paymentDueDateUnix: null,
      paymentDueDate: null,
      productDescription: null,
      invoicePending: null,
      invoiceDraft: null,
      invoiceItemList: [],
      invoiceTotal: 0,
      createdBy: null,
    }
  },
  computed:{
      userId(){
        return this.$store.getters.getUserId;
      }
    },
  methods: {
    async submit() {
      // if (this.invoiceItemList.length <= 0) {
      //   alert("Please fill out work Items");
      //   return;
      // }
      this.loading = true;
      const firestore= getFirestore();
      const databseRef = collection(firestore,"chalans");
      const document=doc(databseRef);
      await setDoc(document,{
        invoiceId: uuidv4(),
        billerStreetAddress: this.billerStreetAddress,
        billerCity: this.billerCity,
        billerZipCode: this.billerZipCode,
        billerCountry: this.billerCountry,
        clientName: this.clientName,
        clientEmail: this.clientEmail,
        clientStreetAddress: this.clientStreetAddress,
        clientCity: this.clientCity,
        clientZipCode: this.clientZipCode,
        clientCountry: this.clientCountry,
        invoiceDate: this.invoiceDate,
        invoiceDateUnix: this.invoiceDateUnix,
        paymentTerms: this.paymentTerms,
        paymentDueDate: this.paymentDueDate,
        paymentDueDateUnix: this.paymentDueDateUnix,
        productDescription: this.productDescription,
        invoiceItemList: this.invoiceItemList,
        invoiceTotal: this.invoiceTotal,
        invoicePending: this.invoicePending,
        invoiceDraft: this.invoiceDraft,
        createdBy: this.userId,
        updateAt: Date.now(),
        invoicePaid: null,
      }).then(()=>{
        this.$router.push({ name: "Chalans" });

       
      })
      this.loading = false;
      // this.$store.dispatch("getInvoices", getAuth().currentUser.uid);
    }
  }
};
</script>
