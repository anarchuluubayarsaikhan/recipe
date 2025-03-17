<template>
  <div v-if="user">
    <NavigationPart />
    <div id="MyRecipes">
      <div id="FoodsContainer">
        <div class="FoodContainer" v-for="(recipe) in recipes" :key="recipe.id">
          <router-link :to="{ name: 'mydetails', params: { id: recipe.id } }">
            <div class="ImageContainer">
              <img :src="recipe.image" :alt="recipe.name" />
            </div>
          </router-link>
          <p class="NameOfCuisine">{{ recipe.name }}</p>
          <div class="button-group">
            <button class="edit-btn" @click="editRecipe(recipe)">
              Edit Recipe
            </button>
            <button class="delete-btn" @click="deleteRecipe(recipe.id)">
              Delete Recipe
            </button>
          </div>
        </div>
      </div>
      <EditInput :editing="editing" :editingData="editingData" @close="closeForm" />
    </div>
    <div v-if="loading" class="loading-overlay">
      <p>Loading...</p>
    </div>
  </div>
</template>

<script>
import NavigationPart from "@/components/NavigationPart.vue";
import { db, collection, deleteDoc, doc, onSnapshot, query, where } from "../firebase";
import EditInput from "@/components/EditInput.vue";

export default {
  computed: {
    user() {
      const user = this.$store.getters.user;
      return user;
    },
  },
  components: {
    NavigationPart,
    EditInput,
  },
  data() {
    return {
      recipes: [],
      loading: false,
      editing: false,
      editingData: {},
    };
  },
  created() {
    this.getRecipes();
  },
  methods: {
    async getRecipes() {
      this.loading = true;
      const recipesCollection = collection(db, "newrecipe");
      const recipesQuery = query(recipesCollection, where("submittedBy", "==", this.user.uid));

      onSnapshot(recipesQuery, (snapshot) => {
        this.recipes = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        this.loading = false;
      }, (error) => {
        console.error("Error fetching recipes: ", error);
        this.$toast.error("There was an error fetching recipes!");
      });
    },

    async editRecipe(recipe) {
      this.editing = true;
      this.editingData = recipe;
    },

    async deleteRecipe(id) {
      try {
        await deleteDoc(doc(db, "newrecipe", id));
        this.$toast.success("Successfully deleted recipe!");
      } catch (error) {
        this.$toast.error("Could not delete the recipe!");
      }
    },

    closeForm() {
      this.editing = false;
    },
  },
};
</script>

<style scoped>
#MyRecipes {
  display: flex;
  align-content: space-between;
}

#FoodsContainer {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 30px;
  padding: 20px;
}

.FoodContainer {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 10px;
  border: 1px solid #d3d3d3;
  border-radius: 24px;
  transition: transform 0.3s ease, box-shadow 0.3s ease, transform 0.2s ease;
  overflow: hidden;
  background-color: white;
}

.FoodContainer:hover {
  transform: translateY(-5px) scale(1.05);
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  cursor: pointer;
}

.NameOfCuisine {
  font-family: 'Arial', sans-serif;
  color: #333;
  font-weight: bold;
  font-size: 1.3rem;
  margin-top: 10px;
  text-align: center;
  flex-grow: 1;
}

.ImageContainer {
  width: 100%;
  height: 200px;
  overflow: hidden;
  border-radius: 24px;
}

img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 24px;
}

.button-group {
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
}

button {
  padding: 10px 15px;
  font-weight: bold;
  cursor: pointer;
  transition: transform 0.2s ease, background-color 0.3s ease;
}

.edit-btn {
  background-color: #959380;
  color: white;
  border-radius: 8px;
  border: none;
}

.delete-btn {
  background-color: white;
  color: black;
  border-style: solid;
  border-width: 1px;
  border-color: #433F09;
  border-radius: 8px;
}

button:hover {
  transform: translateY(-2px);
}

button:focus {
  outline: 2px solid #433F09;
}

.loading-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(255, 255, 255, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
}

@media (max-width: 768px) {
#FoodsContainer{
  grid-template-columns: 1fr;
  width: 100%;
}
}
</style>
