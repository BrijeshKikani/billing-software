import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import Invoices from "../views/Invoices.vue";
import Chalans from "../views/Chalans.vue";
import ChalanCreate from "../components/ChalanCreate.vue";
import Login from "../views/Login.vue";
import Register from "../views/Register.vue";
import store from "../store";


Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/Invoices",
    name: "Invoices",
    component: Invoices,
    meta: { requiresAuth: true },
  },
  {
    path: "/Chalans",
    name: "Chalans",
    component: Chalans,
    meta: { requiresAuth: true }
  },
  {
    path: "/Chalans/Create",
    name: "ChalansCreate",
    component: ChalanCreate,
    meta: { requiresAuth: true }
  },
  {
    path: "/Login",
    name: "Login",
    component: Login
  },
  {
    path: "/Register",
    name: "Register",
    component: Register
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

// router.beforeEach((to, from, next) => {
//   if(to.matched.some(record => record.meta.requiresAuth)) {
//     if (!store.getters.isAuthenticated && to.name !== 'Login') {
//       next({ name: 'Login' })
//     }
//     else{
//       next()
//     }
//   }
//   else{
//     next()
//   }
// })

export default router;
