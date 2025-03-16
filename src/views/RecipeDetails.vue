<template>
  <div>
    <NavigationPart/>
    <div id="RecipeDetailsPage">
      <div v-if="selectedRecipe" class="recipe-container">
        <div class="recipe-header">
          <h2>{{ selectedRecipe.name }}</h2>
          <img :src="selectedRecipe.image" alt="Recipe Image" class="recipe-image" />
        </div>
  
        <div class="ingredients-section">
          <h3>Ingredients</h3>
          <ul>
            <li v-for="(ingredient, index) in ingredientsList" :key="index">
              {{ ingredient.trim() }} 
            </li>
          </ul>
        </div>
  
        <div class="instructions-section">
          <h3>Preparation Instructions</h3>
          <p>{{ selectedRecipe.instructions }}</p>
        </div>
      </div>
  
      <div v-else class="no-recipe-selected">
        <p>No recipe selected. Please select a recipe from the list.</p>
      </div>
    </div>
  </div>
</template>

<script>
import NavigationPart from '@/components/NavigationPart.vue';
import { db, doc, getDoc } from '../firebase'; 

export default {
  components: {
    NavigationPart,
  },
  data() {
    return {
      selectedRecipe: null,
    };
  },
  computed: {
    ingredientsList() {
      if (this.selectedRecipe && this.selectedRecipe.ingredients) {
        return this.selectedRecipe.ingredients.split(',');
      }
      return [];
    },
  },
  async created() {
    const id = this.$route.params.id;
    try {
      const recipeDoc = await getDoc(doc(db, 'allrecipes', id));
      if (recipeDoc.exists()) {
        this.selectedRecipe = recipeDoc.data();
      } else {
        console.log("No such recipe!");
        this.selectedRecipe = null;
      }
    } catch (error) {
      console.error("Error fetching recipe:", error);
      this.selectedRecipe = null;
    }
  },
};
</script>

<style scoped>
#RecipeDetailsPage {
  padding: 20px;
}

.recipe-container {
  max-width: 800px;
  margin: 0 auto;
  background-color: #ffffff;
  border-radius: 16px;
  padding: 30px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  transition: box-shadow 0.3s ease;
}

.recipe-container:hover {
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.15);
}

.recipe-header {
  text-align: center;
  margin-bottom: 30px;
}

.recipe-header h2 {
  font-size: 2.5rem;
  color: #333;
  font-weight: bold;
  margin-bottom: 15px;
}

.recipe-image {
  width: 100%;
  max-width: 400px;
  height: auto;
  border-radius: 12px;
  object-fit: cover;
  margin-top: 15px;
}

.ingredients-section,
.instructions-section {
  margin-top: 40px;
}

h3 {
  font-size: 1.8rem;
  color: #333;
  margin-bottom: 15px;
  font-weight: 600;
}

ul {
  list-style-type: disc;
  padding-left: 30px;
}

ul li {
  font-size: 1.2rem;
  color: #555;
  margin-bottom: 12px;
}

p {
  font-size: 1.2rem;
  color: #555;
  line-height: 1.8;
  margin-top: 10px;
}

.no-recipe-selected {
  text-align: center;
  font-size: 1.5rem;
  color: #888;
  margin-top: 50px;
}

@media (max-width: 768px) {
  .recipe-container {
    padding: 20px;
  }

  .recipe-header h2 {
    font-size: 2rem;
  }

  .recipe-image {
    max-width: 100%;
  }

  h3 {
    font-size: 1.6rem;
  }

  p, ul li {
    font-size: 1rem;
  }
}
</style>
