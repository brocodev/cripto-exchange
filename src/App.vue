<template>
  <!--En esta parte dentro del App.vue se genera el template que se rendiraza en "main.js"  -->
  <div id="app" class="bg-red-600">
    <img alt="Vue logo" src="./assets/logo.png" />
    <HelloWorld msg="Welcome to Your Vue.js App" />
    <!--El componente "HelloWorld" se importa desde el archivo "HelloWord.vue"-->
  </div>
</template>

<script>
import HelloWorld from "./components/HelloWorld.vue"; //<--Importando el componente "HelloWorld"

export default {
  //<--Este export es parte de los modulos de EcmaScript
  name: "app", //<--La propiedad "name" es opcional y nos permite asiganarle un nombre al componente, lo cual es util al momente de hacer debug
  components: {
    HelloWorld
  } //<--La propiedad components nos permite atachar cualquier componente para poder usarlo dentro de la parte de "<template>"
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
