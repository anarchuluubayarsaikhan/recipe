<template>
    <div id="FoodsContainer">
       <RecipeCard/>
    </div>
</template>

<script>
import RecipeCard from './RecipeCard.vue';

export default {
    components:{
        RecipeCard,
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
