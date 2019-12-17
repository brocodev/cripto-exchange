<template>
  <main>
    <px-header :links="links"></px-header>
    <router-view
      class="container px-1 sm:px-1 py-10 flex justify-center body-router"
    ></router-view>
  </main>
</template>

<script>
import PxHeader from "@/components/PxHeader";

export default {
  //<--Este export es parte de los modulos de EcmaScript
  name: "app", //<--La propiedad "name" es opcional y nos permite asiganarle un nombre al componente, lo cual es util al momente de hacer debug
  components: {
    PxHeader
  },
  data() {
    return {
      links: [
        {
          title: "BTC",
          to: { name: "coin-detail", params: { id: "bitcoin" } }
        },
        {
          title: "ETH",
          to: { name: "coin-detail", params: { id: "ethereum" } }
        },
        {
          title: "XRP",
          to: { name: "coin-detail", params: { id: "ripple" } }
        }
      ]
    };
  }
};
</script>

<style>
@import url("https://fonts.googleapis.com/css?family=Montserrat&display=swap");
* {
  font-family: "Montserrat", "Avenir", Helvetica, Arial, sans-serif;
}
body {
  background-image: url("https://i.ibb.co/k60ty4M/fondo.jpg");
  background-repeat: repeat;
  background-size: 4000px;
  background-color: rgba(255, 255, 255, 0.8);
  background-blend-mode: overlay;
}
.body-router {
  background: transparent;
}
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
