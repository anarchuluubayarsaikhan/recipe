<template>
     <header>
            <div id="LogoContainer">
                <a href="/home">
                    <h1 id="Logo">
                        RecipeWeb
                    </h1>
                </a>
                <nav>
                    <a href="/userrecipe">MY RECIPES</a>
                    <a href="/saved">MY FAVORITES</a>
                </nav>
            </div>
        </header>
</template>
<script>
export default {

}
</script>
<style scoped>
a{
    text-decoration: none;
}
header {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px;

}
nav {
    display: flex;
    gap: 20px;
}

nav a {
    color: white;
    font-size: 16px;
    font-weight: normal;
    text-decoration: none;
    transition: color 0.3s ease;
}

nav a:hover {
    color: #959380; 
}

#LogoContainer {
    display: flex;
    align-items: center;
}

#Logo {
    color: #959380;
    font-size: 46px;
    font-weight: bold;
    margin-right: 30px;
}
</style>