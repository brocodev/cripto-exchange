import Vue from "vue"; //<--Importa la libreria de Vue (ESLint 2015)
import App from "./App.vue"; //<--Importa el archivo de componentes App.Vue
import "@/assets/css/tailwind.css";
import router from "@/router";
import { dollarFilter, percentFilter } from "@/filters";
import Chartkick from "vue-chartkick";
import Chart from "chart.js";
import PacmanLoader from "vue-spinner/src/PacmanLoader.vue";

// import PulseLoader from "vue-spinner/src/PulseLoader.vue";

//"@" hace referencia a la carpeta "src" de nuestro proyecto
Vue.use(PacmanLoader);
Vue.use(Chartkick.use(Chart));
Vue.filter("dollar", dollarFilter);
Vue.filter("percent", percentFilter);
Vue.config.productionTip = false; //<--Esta configuracion sirve para indicar si queremos tener tips de produccion

//Este siguiente bloque de codigo lo que hace es declarar una instancia
//de Vue usando la funcion "render"
new Vue({
  router,
  render: h => h(App)
}).$mount("#app"); //<-- La función "mount" es el quivalente al atributo "el"
