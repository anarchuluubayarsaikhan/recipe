<template>

    <div id="RecipeInputPage">
        <h2>Add a New Recipe</h2>

        <form @submit.prevent="submitRecipe" class="recipe-form">
            <div class="form-group">
                <label for="recipeName">Recipe Name</label>
                <input type="text" id="recipeName" v-model="newRecipe.name" placeholder="Enter recipe name" required />
            </div>

            <div class="form-group">
                <label for="recipeImage">Recipe Image (URL)</label>
                <input type="url" id="recipeImage" v-model="newRecipe.image" placeholder="Enter recipe image URL"
                    required />
            </div>

            <div class="form-group">
                <label for="ingredients">Ingredients</label>
                <textarea id="ingredients" v-model="newRecipe.ingredients"
                    placeholder="List ingredients, separated by commas" required></textarea>
            </div>

            <div class="form-group">
                <label for="instructions">Preparation Instructions</label>
                <textarea id="instructions" v-model="newRecipe.instructions"
                    placeholder="Write preparation instructions" required></textarea>
            </div>

            <button type="submit" class="submit-btn">Save Recipe</button>
        </form>
    </div>
</template>

<script>
import { db, addDoc, collection } from '../firebase'
export default {
    computed: {
        user() {
            const user = this.$store.getters.user;
            return user;
        },
    },
    data() {
        return {
            newRecipe: {
                name: "",
                image: "",
                ingredients: "",
                instructions: ""
            }
        }
    },
    methods: {
        async submitRecipe() {
            try {
                if (!this.user || !this.user.uid) {
                    this.$toast.error('You must be logged in to submit a recipe!');
                    return;
                }
                await addDoc(collection(db, "newrecipe"), {
                    name: this.newRecipe.name,
                    image: this.newRecipe.image,
                    ingredients: this.newRecipe.ingredients,
                    instructions: this.newRecipe.instructions,
                    submittedBy: this.user.uid
                });
                this.newRecipe = {}
                this.$toast.success('Recipe added successfully!');
            } catch (error) {
                this.$toast.error('Error saving recipe!');
                console.error("Error saving recipe:", error);
            }
        }
    }
}
    ;
</script>

<style scoped>
#RecipeInputPage {
    padding: 20px;
    background-color: #f9f9f9;
}

h2 {
    text-align: center;
    color: black;
}

.recipe-form {
    display: flex;
    flex-direction: column;
    max-width: 600px;
    margin: 0 auto;
    background-color: #fff;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.form-group {
    margin-bottom: 20px;
}

label {
    font-weight: bold;
    display: block;
    margin-bottom: 5px;
}

input[type="text"],
input[type="url"],
textarea {
    width: 100%;
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 8px;
    font-size: 1rem;
}

textarea {
    resize: vertical;
    min-height: 100px;
}

button.submit-btn {
    padding: 12px 20px;
    background-color: #959380;
    color: black;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    transition: background-color 0.3s ease;
}

button.submit-btn:hover {
    color: white;
}

.recipe-display {
    margin-top: 30px;
    background-color: #fff;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.recipe-display h3 {
    text-align: center;
    color: #007bff;
}

.recipe-display h4 {
    text-align: center;
    font-size: 1.8rem;
    color: #333;
}

.recipe-image {
    width: 100%;
    max-width: 400px;
    height: auto;
    margin: 10px 0;
    border-radius: 8px;
}

.recipe-display h5 {
    font-size: 1.2rem;
    color: #333;
}

ul {
    list-style-type: none;
    padding-left: 0;
}

ul li {
    font-size: 1.1rem;
    color: #555;
    margin-bottom: 5px;
}
</style>