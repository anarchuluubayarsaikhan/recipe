<template>
    <div class="FoodContainer">
        <router-link :to="{ name: 'details', params: { id: recipe.id } }">
            <div class="ImageContainer">
                <img :src="recipe.image" :alt="recipe.name">
            </div>
        </router-link>
        <p class="NameOfCuisine">
            {{ recipe.name }}
        </p>
        <button @click="saveRecipe(recipe)">
            Save recipe
        </button>
    </div>

</template>
<script>
import { addDoc, collection, db, query, where, getDocs } from '../firebase'
export default {
    props: {
        recipe: {
            type: Object
        }
    },
    methods: {
        async saveRecipe(recipe) {
            try {
                const recipesCollection = collection(db, "savedrecipes");
                const q = query(recipesCollection, where("id", "==", recipe.id));

                const querySnapshot = await getDocs(q);

                if (!querySnapshot.empty) {
                    this.$toast.error('Already saved!');
                } else {

                    await addDoc(recipesCollection, recipe);
                    this.$toast.success('Recipe saved successfully!');
                }
            } catch (error) {
                console.error("Error saving recipe: ", error);
                this.$toast.error('Could not save the recipe!');
            }
        }
    }
}
</script>
<style>
.FoodContainer {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 10px;
    border: 1px solid #d3d3d3;
    border-radius: 24px;
    transition: transform 0.3s ease, box-shadow 0.3s ease, transform 0.2s ease;
    overflow: hidden;
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

button {
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

button:hover {
    color: white;
    transform: translateY(-2px);
}

button:focus {
    outline: 2px solid #f8b400;
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