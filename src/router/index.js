import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/produtos",
    name: "Produtos",
    component: function () {
      return import("../views/Produtos.vue");
    },
  },
  {
    path: "/empresas",
    name: "Empresas",
    component: function () {
      return import("../views/Empresas.vue");
    },
  },
  {
    path: "/relatorio",
    name: "Relatorio",
    component: function () {
      return import("../views/Relatorio.vue");
    },
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
