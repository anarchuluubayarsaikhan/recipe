<template>
    <div>
        <header>
            <HeaderComponent/>
        </header>
        <main>
            <RecipeLists recipes="recipes"/>
        </main>
        <footer>
    
        </footer>
    </div>
    </template>
    <script>
    import RecipeLists from '../components/RecipeLists.vue'
    import HeaderComponent from '../components/HeaderComponent.vue'
    export default{
        name:'HomePage',
        components:{
            RecipeLists,
            HeaderComponent
        }, 
    }
    </script>
    <style scoped>
    main{
        margin: auto;
        max-width: 1200px;
        padding: 30px;
        border-style: solid;
        border-radius: 12px;
        border-color: white;
        height: 80vh;
        margin-top: 40px;
        border-width: 4px;
        box-shadow: 10px 5px 2px #4A111D;
        background-color: white;
    }
    </style>