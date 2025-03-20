<template>
  <div>
    <NavigationPart />
    <div id="FoodsContainer">
      <div class="FoodContainer" v-for="recipe in savedrecipes" :key="recipe.id">
        <router-link :to="{ name: 'details', params: { id: recipe.recipeid } }">
        <div class="ImageContainer">
          <img :src="recipe.image" :alt="recipe.name">
        </div>
        <p class="NameOfCuisine">
          {{ recipe.name }}
        </p>
      </router-link>
        <button class="unsave-btn" @click="unsaveRecipe(recipe.id)">
          Unsave recipe
        </button>
      </div>
  
    </div>
    <div v-if="loading" class="loading-overlay">
      <p>Loading...</p>
    </div>
  </div>
</template>

<script>
import NavigationPart from '@/components/NavigationPart.vue';
import { db, collection, onSnapshot, deleteDoc, doc, query, where } from '../firebase'
export default {
  components: {
    NavigationPart
  },
  computed: {
    user() {
      const user = this.$store.getters.user;
      return user;
    },
  },
  data() {
    return {
      savedrecipes: [],
      loading: false
    };
  },
  created() {
    this.getSavedRecipes();
  },
  methods: {
    async getSavedRecipes() {
      this.loading = true
      const recipesCollection = collection(db, "savedrecipes");
      const recipesQuery = query(recipesCollection, where("submittedBy", "==", this.user.uid));
      onSnapshot(recipesQuery, (snapshot) => {
        this.savedrecipes = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        this.loading = false
      }, (error) => {
        console.error("Error fetching recipes: ", error);
        this.$toast.error('There was an error fetching saved recipes!');
      });
    },
    async unsaveRecipe(id) {
      try {
        await deleteDoc(doc(db, "savedrecipes", id))
        this.$toast.success('Successfully deleted recipe!');
      }
      catch (error) {
        this.$toast.error('Could not delete the recipe!');
      }
    }
  }
};
</script>

<style scoped>
* {
  box-sizing: border-box;
}

body {
  background-color: #f9f9f9;
  margin: 0;
  padding: 0;
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

button.unsave-btn {
  padding: 10px 15px;
  background-color: #959380;
  border: none;
  border-radius: 8px;
  color: black;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.2s ease;
  align-self: flex-end;
}

button.unsave-btn:hover {
  color: white;
  transform: translateY(-2px);
}

button.unsave-btn:focus {
  outline: 2px solid #ff4747;
}


@media (max-width: 768px) {
  #FoodsContainer {
    grid-template-columns: 1fr;
    width: 100%;
  }

  .NameOfCuisine {
    font-size: 1rem;
  }

  .loading-overlay {
    position: fixed;
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

}
</style>
