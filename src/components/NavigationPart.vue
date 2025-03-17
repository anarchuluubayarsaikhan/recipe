<template>
    <header>
        <div id="LogoContainer">
            <a href="/">
                <h1 id="Logo">
                    RecipeWeb
                </h1>
            </a>
            <nav>
                <a href="/userrecipe">MY RECIPES</a>
                <a href="/saved">MY FAVORITES</a>
            </nav>
        </div>
        <div v-if="!user">
            <FacebookLogin/>
        </div>
       
        <div  id="user" v-if="user">
             {{ user.displayName }} 
             <button @click="logOut()">LogOut</button>
        </div>
    </header>
</template>
<script>
import FacebookLogin from './FacebookLogin.vue';

export default {
    computed: {
        user() {
            const user = this.$store.getters.user;
            return user;
        },
    },
    components:{
        FacebookLogin
    },
    methods:{
        logOut(){
            try{
                localStorage.removeItem(`firebase:authUser:${process.env.VUE_APP_API_KEY}:[DEFAULT]`);
                localStorage.removeItem("user")
                window.location.href="/"
            }
            catch(error){
                console.log(error)
            }
        }
    }
}
</script>
<style scoped>
a {
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

#user {
    color: white;
    margin-right: 60px;
}
</style>