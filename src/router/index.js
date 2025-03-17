import Vue from "vue";
import VueRouter from "vue-router";
import Home from "@/views/Home.vue";
import CreateRecipe from "@/views/CreateRecipe.vue";
import MyRecipes from "@/views/MyRecipes.vue";
import RecipeDetails from "@/views/RecipeDetails.vue";
import SavedRecipes from "@/views/SavedRecipes.vue";
import LoginPage from "@/views/LoginPage.vue";
import store from '../store';
import { onAuthStateChanged } from "firebase/auth"; 
import { auth } from "@/firebase"; 
import MyRecipeDetails from "@/views/MyRecipeDetails.vue";

Vue.use(VueRouter);

const routes = [
  { path: "/", component: Home },
  { path: "/login", component: LoginPage },
  { path: "/newrecipe", component: CreateRecipe, meta: { requiresAuth: true } },
  { path: "/userrecipe", component: MyRecipes, meta: { requiresAuth: true } },
  { path: "/saved", component: SavedRecipes, meta: { requiresAuth: true } },
  {
    path: "/details/:id",
    name: "details",
    component: RecipeDetails,
    props: true,
  },
  {
    path: "/mydetails/:id",
    name: "mydetails",
    component: MyRecipeDetails,
    props: true,
  },
];

const router = new VueRouter({
  routes,
  mode: "history",
});

router.beforeEach((to, from, next) => {
  onAuthStateChanged(auth, (user) => {
    if (to.matched.some(record => record.meta.requiresAuth)) {
      if (user) {
        store.commit("setUser", user);
        next();
      } else {
        next({ path: "/login" });
      }
    } else {
      next(); 
    }
  });
});

export default router;
