<template>
    <div class="FoodContainer">
            <div class="ImageContainer">
                <img :src="require('@/public/spagetti.jpg')" alt="Spaghetti Carbonara">
            </div>
            <p class="NameOfCuisine">
                CARBONARA
            </p>
            <button>
                Save recipe
            </button>
        </div>
</template>
<script>
export default{
    
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
    color:white;
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