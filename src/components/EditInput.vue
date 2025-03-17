<template>
    <form @submit.prevent="submitRecipe" class="recipe-form" v-if="editing">
        <div class="form-group">
            <label for="recipeName">Recipe Name</label>
            <input type="text" id="recipeName" v-model="recipe.name" placeholder="Enter recipe name" required />
        </div>

        <div class="form-group">
            <label for="recipeImage">Recipe Image (URL)</label>
            <input type="url" id="recipeImage" v-model="recipe.image" placeholder="Enter recipe image URL" required />
        </div>

        <div class="form-group">
            <label for="ingredients">Ingredients</label>
            <textarea id="ingredients" v-model="recipe.ingredients" placeholder="List ingredients, separated by commas"
                required></textarea>
        </div>

        <div class="form-group">
            <label for="instructions">Preparation Instructions</label>
            <textarea id="instructions" v-model="recipe.instructions" placeholder="Write preparation instructions"
                required></textarea>
        </div>

        <div id="buttonContainer">
            <button type="button" class="submit-btn" @click="close">Close</button>
            <button type="submit" class="submit-btn">Edit</button>
        </div>
    </form>
</template>

<script>
import { collection, db, updateDoc, doc, addDoc } from "../firebase";

export default {
    props: {
        editing: {
            type: Boolean,
            required: true,
        },
        editingData: {
            type: Object,
            required: false,
        },
    },
    data() {
        return {
            recipe: {
                name: "",
                image: "",
                ingredients: "",
                instructions: "",
            },
        };
    },
    methods: {
        async submitRecipe() {
            if (this.editing) {
                await this.editRecipe();
            } else {
                this.createRecipe();
            }
        },

        async editRecipe() {
            try {
                await updateDoc(doc(db, "newrecipe", this.editingData.id), {
                    name: this.recipe.name,
                    image: this.recipe.image,
                    ingredients: this.recipe.ingredients,
                    instructions: this.recipe.instructions,
                });
                this.$toast.success("Successfully updated your recipe!");
            } catch (error) {
                this.$toast.error("There was an error editing your recipe!");
            }
        },

        close() {
            this.$emit("close");
        },
        async createRecipe() {
            try {
                const newRecipeRef = collection(db, "newrecipe");
                await addDoc(newRecipeRef, {
                    name: this.recipe.name,
                    image: this.recipe.image,
                    ingredients: this.recipe.ingredients,
                    instructions: this.recipe.instructions,
                });
                this.$toast.success("Recipe added successfully!");
            } catch (error) {
                this.$toast.error("There was an error creating your recipe!");
            }
        },
    },
    watch: {
        editingData: {
            handler(newData) {
                if (newData) {
                    this.recipe = { ...newData };
                }
            },
            immediate: true,
        },
    },
};
</script>

<style scoped>
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
    width: 90%;
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 8px;
    font-size: 1rem;
}

textarea {
    resize: vertical;
    min-height: 100px;
}

#buttonContainer{
    display: flex;
    align-self: self-end;
    gap:25px;
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

button[type="button"].submit-btn {
    background-color: #ddd;
    margin-top: 10px;
}
</style>