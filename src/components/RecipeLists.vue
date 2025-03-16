<template>
    <div id="FoodsContainer">
       <RecipeCard v-for="recipe in recipes" :key="recipe.id" :recipe="recipe"/>
    </div>
</template>

<script>
import RecipeCard from './RecipeCard.vue';
import { db, collection, onSnapshot } from '../firebase'
export default {
    components:{
        RecipeCard,
    },
    data(){
            return{
                recipes:[]
            }
        },
        created(){
            this.getRecipes()
        },
        methods:{
            async getRecipes(){
                const recipesCollection = collection(db,"allrecipes");
                onSnapshot(recipesCollection,(snapshot)=>{
                    this.recipes=snapshot.docs.map(doc=>({
                        id:doc.id,
                        ...doc.data(),
                    }))
                })
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


@media (max-width: 768px) {
    #FoodsContainer {
        grid-template-columns: repeat(2, 1fr);
    }
}
</style>
