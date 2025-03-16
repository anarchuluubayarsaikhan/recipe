<template>
    <div>
        <NavigationPart/>
        <RecipeInput/>
        
    </div>
</template>

<script>
import NavigationPart from '@/components/NavigationPart.vue';
import {db, addDoc, collection} from '../firebase'
import RecipeInput from '@/components/RecipeInput.vue';
export default {
    components:{
      NavigationPart,
      RecipeInput
    },
    data(){
        return{
            newRecipe:{
                name:"",
                image:"",
                ingredients:"",
                instructions:""
            }
        }
    }, 
    methods:{
        async submitRecipe() {
      try {
          await addDoc(collection(db, "newrecipe"), {
          name: this.newRecipe.name,
          image: this.newRecipe.image,
          ingredients: this.newRecipe.ingredients,
          instructions: this.newRecipe.instructions
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
<style>
</style>