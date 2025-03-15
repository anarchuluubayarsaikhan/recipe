<template>
    <div>
      <NavigationPart/>
      <div id="FoodsContainer">
      <div class="FoodContainer" v-for="(recipe, index) in recipes" :key="index">
        <div class="ImageContainer">
          <img :src="require(`@/public/${recipe.image}`)" :alt="recipe.name" />
        </div>
        <p class="NameOfCuisine">{{ recipe.name }}</p>
        <div class="button-group">
          <button class="edit-btn" @click="editRecipe(index)">
            Edit Recipe
          </button>
          <button class="delete-btn" @click="deleteRecipe(index)">
            Delete Recipe
          </button>
        </div>
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
        recipes: [
          {
            name: 'Spaghetti Carbonara',
            image: 'spagetti.jpg',
          },
          {
            name: 'Salmon Dish',
            image: 'salmondish.jpg',
          },
          {
            name: 'Pizza',
            image: 'pizza.jpg',
          },
        ],
      };
    },
    methods: {
      editRecipe(index) {
        alert(`Editing recipe: ${this.recipes[index].name}`);
      },
      deleteRecipe(index) {
        if (confirm(`Are you sure you want to delete ${this.recipes[index].name}?`)) {
          this.recipes.splice(index, 1);
        }
      },
    },
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
  
  @media (max-width: 768px) {
    #FoodsContainer {
      grid-template-columns: repeat(2, 1fr);
    }
  }
  
  @media (max-width: 480px) {
    #FoodsContainer {
      grid-template-columns: 1fr;
    }
  
    .NameOfCuisine {
      font-size: 1rem;
    }
  }
  </style>
  