<template>
    <div>
        <header>
            <div>
                <NavigationPart />
                <div id="SubNavigation">
                    <input type="text" placeholder="Search" v-model="searchdata" @keydown.enter="searchFunction" />
                    <router-link to="/newrecipe">
                        <button @click="addrecipe" id="addButton">
                            +Add recipe
                        </button>
                    </router-link>

                </div>


            </div>
        </header>
        <main>
            <RecipeLists :recipes="filteredRecipes" :searchfunction="searchFunction" :searchdata="searchdata" />
        </main>
        <footer>
        </footer>
    </div>
</template>

<script>
import NavigationPart from '@/components/NavigationPart.vue';
import RecipeLists from '../components/RecipeLists.vue'
import { db, collection, onSnapshot } from '../firebase'

export default {
    name: 'HomePage',
    components: {
        RecipeLists,
        NavigationPart,
    },
    data() {
        return {
            searchdata: "",
            recipes: [],
        }
    },
    created() {
        this.getRecipes();
    },
    computed: {
        filteredRecipes() {
            if (!this.searchdata) {
                return this.recipes;
            }
            return this.recipes.filter(recipe => {
                return (
                    recipe.name.toLowerCase().includes(this.searchdata.toLowerCase()) ||
                    recipe.ingredients.toLowerCase().includes(this.searchdata.toLowerCase()) ||
                    recipe.instructions.toLowerCase().includes(this.searchdata.toLowerCase())
                )

            });
        }
    },
    methods: {
        async getRecipes() {
            const recipesCollection = collection(db, "allrecipes");
            onSnapshot(recipesCollection, (snapshot) => {
                this.recipes = snapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data(),
                }));
            });
        },
        searchFunction() {

        },
        addrecipe() {
            window.location.href = '/newrecipe'
        }
    },

};
</script>

<style scoped>
main {
    margin: auto;
    max-width: 1200px;
    padding: 30px;
    border-style: solid;
    border-radius: 12px;
    border-color: white;
    margin-top: 40px;
    border-width: 4px;
    box-shadow: 10px 5px 2px #959380;
    background-color: white;
}

#SubNavigation {
    max-width: 1260px;
    margin: 20px auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

#addButton {
    background-color: white;
    padding: 12px 20px;
    border-radius: 8px;
    font-size: 16px;
    font-weight: bold;
}

#addButton:hover {
    padding: 12px 20px;
    border-radius: 8px;
    background-color: #959380;
    color: black;
    font-weight: bold;
    font-size: 16px;
    cursor: pointer;
    text-decoration: none;
}

input {
    padding-top: 8px;
    padding-bottom: 8px;
    padding-left: 10px;
    font-size: 16px;
    border: 2px solid #ccc;
    border-radius: 8px;
    width: 70%;
}

.button {
    background-color: #959380;
    padding: 10px 20px;
    color: black;
    font-weight: bold;
    font-size: 16px;
    border-radius: 12px;
    cursor: pointer;
    transition: background-color 0.3s ease;
    text-decoration: none;
}

.button:hover {
    color: white;
}

@media (max-width: 768px) {

    #SubNavigation {
        flex-direction: column;
        align-items: stretch;
    }

    input {
        width: 100%;
        margin-bottom: 10px;
    }
}
</style>