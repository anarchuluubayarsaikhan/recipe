<template>
    <div id="FoodsContainer">
        <RecipeCard v-for="recipe in recipes" :key="recipe.id" :recipe="recipe" />
    </div>
</template>

<script>
import RecipeCard from './RecipeCard.vue';

export default {
    props: {
        recipes: {
            type: Array,
            required: true
        }
    },
    components: {
        RecipeCard,
    }
}
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
        grid-template-columns: 1fr;
    }
}

</style>
