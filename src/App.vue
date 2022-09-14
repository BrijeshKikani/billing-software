<template>
  <v-app>
    <v-app-bar dark permanent fixed absolute app>
      <v-app-bar-nav-icon v-if="isLoggedIn" @click="drawer = true"></v-app-bar-nav-icon>

      <v-toolbar-title>Billing Software</v-toolbar-title>
      <v-spacer></v-spacer>

      <v-btn v-if="isLoggedIn" icon>
        <v-icon @click="logout">mdi-logout</v-icon>
      </v-btn>
    </v-app-bar>

    <v-navigation-drawer v-if="isLoggedIn" v-model="drawer" temporary absolute app>
      <v-list dense>
        <v-list-item
          v-for="item in navigationItem"
          :key="item.title"
          @click="changeRoute(item.title)"
          link
        >
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-main>
      <v-container>
        <router-view v-if="isLoaded" />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import { getAuth, signOut } from "firebase/auth";
export default {
  name: "App",

  data() {
    return {
      drawer: false,
      navigationItem: [
        { title: "Invoices", icon: "mdi-file-invoice-dollar" },
        { title: "Chalans", icon: "mdi-receipt" },
      ],
      mini: true,
      isLoaded: false,
    };
  },
  computed:{
    isLoggedIn(){ return this.$store.getters.isAuthenticated;}
  },
  async beforeMount() {
    const auth = getAuth();
    await auth.onAuthStateChanged((user) => {
      this.isLoaded = true;
      if (!user) {
        this.$router.replace({ name: "Login" });
      }
      this.$store.commit("setUserId", user.uid);
      if (this.$route.path == "/Login" || this.$route.path == "/Register") {
        this.$router.replace({ name: "Chalans" });
      }
    });
  },
  methods: {
    changeRoute(routeName) {
      this.drawer = false;
      if (this.$route.name !== routeName) {
        this.$router.push({ name: routeName });
      }
    },
    logout() {
      const auth = getAuth();
      signOut(auth)
        .then(() => {
          this.$store.commit("setIsAuthenticated", false);
          this.$store.commit("setUserId", null);
          this.$router.push("/Login");
        })
        .catch((error) => {
          // An error happened.
        });
    },
  },
};
</script>
