<template>
    <div id="loginPage">
      <div class="content-container">
        <div class="logo-container">
          <h1 class="title">Please Login</h1>
        </div>
        <div class="login-container">
          <FacebookLogin />
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import FacebookLogin from '@/components/FacebookLogin.vue';
  
  export default {
    components: {
      FacebookLogin, 
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
    font-family: 'Arial', sans-serif;
    display: flex;
    justify-content: center;
    align-items: flex-start;
    height: 100vh;
  }
  
  #loginPage {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
  }
  
  .content-container {
    margin-top: 100px;
    text-align: center;
  }
  
  .title {
    font-size: 2.5rem;
    font-weight: bold;
    color: white;
    margin-bottom: 20px;
  }
  
  .login-container {
    margin-top: 20px;
  }
  </style>
  