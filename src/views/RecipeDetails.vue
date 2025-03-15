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
            <li v-for="(ingredient, index) in selectedRecipe.ingredients" :key="index">
              {{ ingredient }}
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

  export default {
    components:{
      NavigationPart
    },
    data() {
      return {
        selectedRecipe: {
          name: 'Spaghetti Carbonara',
          image: require('@/public/spagetti.jpg'), 
          ingredients: [
            'Spaghetti',
            'Eggs',
            'Parmesan cheese',
            'Bacon',
            'Salt',
            'Pepper',
          ],
          instructions: 'Boil the spaghetti. In a separate pan, fry the bacon. Beat the eggs and mix with cheese, then combine everything.',
        },
      };
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
    background-color: #f9f9f9;
    border-radius: 15px;
    padding: 40px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  }
  
  .recipe-header {
    text-align: center;
    margin-bottom: 20px;
  }
  
  .recipe-header h2 {
    font-size: 2.5rem;
    color: black; 
    margin-bottom: 10px;
  }
  
  .recipe-image {
    width: 100%;
    height: auto;
    max-width: 300px;
    margin-top: 10px;
    border-radius: 10px;
    object-fit: cover;
  }
  
  .ingredients-section,
  .instructions-section {
    margin-top: 30px;
  }
  
  h3 {
    font-size: 1.8rem;
    color: black; 
    margin-bottom: 15px;
  }
  
  ul {
    list-style-type:disc;
    padding: 15px;
  }
  
  ul li {
    font-size: 1.2rem;
    color: gray; 
    margin-bottom: 10px;
    position: relative;
  }
  
  ul li::before {
    color: gray; 
    position: absolute;
    left: 0;
    top: 0;
  }
  
  p {
    font-size: 1.2rem;
    color: gray;
    line-height: 1.8;
  }
  
  .no-recipe-selected {
    text-align: center;
    font-size: 1.5rem;
    color: #888;
    margin-top: 50px;
  }
  </style>
  