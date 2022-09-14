<template>
  <v-form @submit.prevent="login">
    <v-text-field v-model="email" label="Email"></v-text-field>
    <v-text-field
      v-model="password"
      :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
      :type="showPassword ? 'text' : 'password'"
      label="Password"
      hint="At least 8 characters"
      counter
      @click:append="showPassword = !showPassword"
    ></v-text-field>
    <v-btn primary type="submit"> submit </v-btn>
  </v-form>
</template>

<script>
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
export default {
  name: "Login",
  data() {
    return {
      email: "",
      password: "",
      showPassword: false,
    };
  },
  methods: {
    async login() {
      try {
        const auth = getAuth();
        const user = await signInWithEmailAndPassword(
          auth,
          this.email,
          this.password
        );
        this.$store.commit("setUserId", user.user.uid);
        this.$store.commit("setIsAuthenticated", true);
        this.$router.push({ name: "Chalans" });
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>