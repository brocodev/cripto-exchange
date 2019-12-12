import Vue from "vue"; //<--Importa la libreria de Vue (ESLint 2015)
import App from "./App.vue"; //<--Importa el archivo de componentes App.Vue
import "@/assets/css/tailwind.css";
//"@" hace referencia a la carpeta "src" de nuestro proyecto

Vue.config.productionTip = false; //<--Esta configuracion sirve para indicar si queremos tener tips de produccion

//Este siguiente bloque de codigo lo que hace es declarar una instancia
//de Vue usando la funcion "render"
new Vue({
    render: h => h(App)
}).$mount("#app"); //<-- La función "mount" es el quivalente al atributo "el"