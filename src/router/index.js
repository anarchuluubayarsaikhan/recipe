import Vue from "vue";
import VueRouter from "vue-router";

import Home from "@/views/Home.vue";
import CreateRecipe from "@/views/CreateRecipe.vue";
import MyRecipes from "@/views/MyRecipes.vue";
import RecipeDetails from "@/views/RecipeDetails.vue";
import SavedRecipes from "@/views/SavedRecipes.vue";
import LoginPage from "@/views/LoginPage.vue";

Vue.use(VueRouter);

const routes = [
  { path: "/", component: LoginPage },
  { path: "/home", component: Home },
  { path: "/newrecipe", component: CreateRecipe },
  { path: "/userrecipe", component: MyRecipes },
  { path: "/saved", component: SavedRecipes },
  {
    path: "/details/:id",
    name: "details",
    component: RecipeDetails,
    props: true,
  },
];

const router = new VueRouter({
  routes,
  mode: "history",
});

export default router;
