import { createRouter, createWebHistory } from "vue-router";

import AuthLayout from "@/layouts/AuthLayout.vue";
import DashboardLayout from "@/layouts/DashboardLayout.vue";

import LoginView from "@/views/LoginView.vue";
import CertificationDashboard from "@/views/CertificationDashboard.vue";

const routes = [
  {
    path: "/",
    component: AuthLayout,
    children: [
      {
        path: "/",
        name: "Base",
        component: LoginView,
      },
      {
        path: "/login",
        name: "Login",
        component: LoginView,
      },
    ],
  },
  {
    path: "/",
    component: DashboardLayout,
    children: [
      {
        path: "/dashboard",
        name: "Dashboard",
        component: CertificationDashboard,
      },
    ],
  },
  {
    path: "/:pathMatch(.*)*",
    redirect: "/",
  },
];

export default createRouter({
  history: createWebHistory(),
  routes,
});
