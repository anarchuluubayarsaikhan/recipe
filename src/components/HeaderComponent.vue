<template>
    <div>
        <NavigationPart/>
        <div id="SubNavigation">
            <input type="text" placeholder="Search">
            <a href="/newrecipe" class="button">+ Add recipe</a>
        </div>
    </div>
</template>

<script>
import NavigationPart from './NavigationPart.vue';

export default{
    components:{
        NavigationPart,
    }
}
</script>

<style scoped>

#SubNavigation {
    max-width: 1260px;
    margin: 20px auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

input {
    padding: 8px 20px;
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
    color:white; 
}

@media (max-width: 768px) {
    #Logo {
        font-size: 36px; 
    }

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
