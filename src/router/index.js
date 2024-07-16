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
    path: "*",
    component: () => import("../views/auth/Error404.vue"),
  },
  {
    path: "/admin",
    component: () => import("../views/NavbarNavegation/NavbarAdmin.vue"),
    meta: { requiresAuth: true, roles: ['ADMIN'] },
    children: [
      {
        path: "categories",
        name: "categories",
        component: () => import("../views/admin/Categories.vue"),
      },
      {
        path: "profile-admin",
        name: "profile-admin",
        component: () => import("../views/admin/ProfileAdmin.vue"),
      },
      {
        path: "movies",
        name: "movies",
        component: () => import("../views/admin/Movies.vue"),
      },
    ],
  },  
  {
    path: "/client",
    component: () => import("../views/NavbarNavegation/NavbarUser.vue"),
    meta: { requiresAuth: true, roles: ['CLIENT'] },
    children: [
      {
        path: "",
        name: "home",
        component: () => import("../views/User/HomeView.vue"),
      },
      {
        path: "movie/:id",
        name: "movie-view",
        component: () => import("../views/User/MovieView.vue"),
      },
      {
        path: "profile",
        name: "profile",
        component: () => import("../views/User/ProfileView.vue"),
      },
      {
        path: "search",
        name: "search",
        component: () => import("../views/User/SearchMovie.vue"),
      },
      {
        path: "favorite",
        name: "favorite",
        component: () => import("../views/User/Favorite.vue"),
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
    console.log(`Roles Requeridos para la ruta: ${requiredRoles.length > 0 ? requiredRoles.join(", ") : "Ninguno"}`);

    if (requiredRoles.length > 0 && !requiredRoles.includes(userRole)) {
      next({ name: "unauthorized" });
      return;
    }
  }

  next();
});


export default router;
