<template>
    <header>
        <div id="LogoContainer">
            <a href="/">
                <h1 id="Logo">
                    RecipeWeb
                </h1>
            </a>
            <nav>
                <router-link to="/userrecipe">
                    MY RECIPES
                </router-link>
                <router-link to="/saved">
                    MY FAVORITES
                </router-link>
            </nav>
        </div>
        <div v-if="!user" class="loginButton">
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
    max-width: 1250px;
    margin: auto;
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
    display: flex;
    gap:10px;
    align-items: center;
}

@media (max-width: 768px) {
    #Logo {
        font-size: 44px;
    }
    #LogoContainer{
        align-self: self-start;
    }
    nav a{
        font-size: 14px;
    }
    header {
        display: flex;
        flex-direction: column;
        gap:5px;
        margin: auto;
    }
    #user {
    display: flex;
    flex-direction: column;
    gap:10px;
    align-items: center;
    align-self: self-end;
}
    .loginButton{
      align-self: self-end;
    }
  
}
</style>