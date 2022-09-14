<template>
  <v-form @submit="register">
      
       <v-text-field
            v-model="email"
            label="Email"
          ></v-text-field>
          <v-text-field
            v-model="password"
            :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
            :type="showPassword ? 'text' : 'password'"
            label="Password"
            hint="At least 8 characters"
            counter
            @click:append="showPassword = !showPassword"
          ></v-text-field>
        <v-btn
        primary
        type="submit"
      >
        submit
      </v-btn>
  </v-form>
</template>


<script>
import {getAuth, createUserWithEmailAndPassword} from "firebase/auth";
import {getStorage} from "firebase/storage";
  export default {
      name:'Register',
    data () {
      return {
        email: "",
      password: "",
      showPassword: false
      }
    },
    methods: {
    async register() {
      try {
        // const auth = getAuth();
        // const createUser=await createUserWithEmailAndPassword(auth, this.email, this.password);
        // const firestore= getFirestore();
        // const collection = collection("users").doc(createUser.user.uid);
        // await collection.set({
        //   email: this.email,
        //   username: this.username,
        // });
        // await this.$router.push({ name: "Home" });
      } catch (error) {
        console.log(error);
      }
    }
    }
  }
</script>