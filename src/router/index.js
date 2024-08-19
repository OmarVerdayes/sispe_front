import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    redirect: "/landing",
  },
  {
    path: "/unauthorized",
    name: "unauthorized",
    component: () => import("../views/auth/AccessDenied.vue"),
  },
  {
    path: "play/:id",
    name: "moviePlay",
    component: () => import("../views/User/MoviePlay.vue"),
    meta: { requiresAuth: true, roles: ['cliente'] },
  },
  {
    path: "/admin",
    component: () => import("../views/NavbarNavegation/NavbarAdmin.vue"),
    meta: { requiresAuth: true, roles: ['admin'] },
    children: [
      {
        path: "",
        name: "homeAdmin",
        component: () => import("../views/admin/HomeAdmin.vue"),
        meta: { requiresAuth: true, roles: ['admin'] },
      },
      {
        path: "rateing",
        name: "rateing",
        component: () => import("../views/admin/RateingAdmin.vue"),
        meta: { requiresAuth: true, roles: ['admin'] },
      },
      {
        path: "profile-admin",
        name: "profile-admin",
        component: () => import("../views/admin/ProfileAdmin.vue"),
        meta: { requiresAuth: true, roles: ['admin'] },
      },
    ],
  },
  {
    path: "/client",
    component: () => import("../views/NavbarNavegation/NavbarUser.vue"),
    meta: { requiresAuth: true, roles: ['cliente'] },
    children: [
      {
        path: "",
        name: "home",
        component: () => import("../views/User/HomeView.vue"),
        meta: { requiresAuth: true, roles: ['cliente'] },
      },
      {
        path: "movie/:id",
        name: "movie-view",
        component: () => import("../views/User/MovieView.vue"),
        meta: { requiresAuth: true, roles: ['cliente'] },
      },
      {
        path: "profile",
        name: "profile",
        component: () => import("../views/User/ProfileView.vue"),
        meta: { requiresAuth: true, roles: ['cliente'] },
      },
      {
        path: "search",
        name: "search",
        component: () => import("../views/User/SearchMovie.vue"),
        meta: { requiresAuth: true, roles: ['cliente'] },
      },
      {
        path: "favorite",
        name: "favorite",
        component: () => import("../views/User/Favorite.vue"),
        meta: { requiresAuth: true, roles: ['cliente'] },
      },
    ],
  },
  {
    path: "/",
    component: () => import("../views/NavbarNavegation/Navbar.vue"),
    children: [
      {
        path: "/landing",
        name: "landing",
        component: () => import("../views/LandingView.vue"),
      },
      {
        path: "/login",
        name: "login",
        component: () => import("../views/auth/LoginView.vue"),
      },
      {
        path: "/register",
        name: "register",
        component: () => import("../views/auth/Create_accountView.vue"),
      },
    ],
  },
  {
    path: "*",
    component: () => import("../views/auth/Error404.vue"),
  },
];

const router = new VueRouter({
  routes,
  mode: 'history'
});

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
  const storedUser = localStorage.getItem("authUser");
  let user = null;

  try {
    user = storedUser ? JSON.parse(storedUser) : null;
  } catch (error) {
    console.error("Error al analizar los datos del usuario almacenado:", error);
  }

  if (requiresAuth && !user) {
    next({ name: "unauthorized" });
    return;
  }

  if (requiresAuth && user) {
    const userRole = user.user.rol.nrol;
    const requiredRoles = to.meta.roles || [];
    console.log(`Rol del Usuario: ${userRole}`);
    if (requiredRoles.length > 0 && !requiredRoles.includes(userRole)) {
      next({ name: "unauthorized" });
      return;
    }
  }

  next();
});

export default router;
