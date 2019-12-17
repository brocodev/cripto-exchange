<template>
  <!--TAILWIND asigna estilos css a traves del uso de clases para cada configuracion que queramos hacer
    Por cada propiedad que queramos en nuestra tag hmtl hay una clase que se encaarga de proporcionarla-->
  <header class="shadow w-screen">
    <nav>
      <nav class="flex items-center justify-between flex-wrap bg-blue-400 p-6">
        <div class="flex items-center flex-shrink-0 text-white mr-6">
          <px-icon class="mr-2" />
          <router-link
            :to="{ name: 'home' }"
            class="font-semibold text-xl tracking-tight"
            >Cripto Exchange</router-link
          >
        </div>
        <div
          class="hidden sm:block w-full block flex-grow lg:flex lg:items-center lg:w-auto"
        >
          <div class="flex text-lg lg:flex-grow text-gray-300">
            <router-link
              v-for="l in links"
              :key="l.title"
              :to="l.to"
              class="block mt-4 inline-block lg:mt-0 text-teal-200 hover:text-white mr-4"
            >
              {{ l.title }}
            </router-link>
          </div>
        </div>
      </nav>
    </nav>
  </header>
</template>

<script>
import PxIcon from "@/components/PxIcon";
export default {
  name: "PxHeader",
  props: {
    links: {
      type: Array,
      default: () => []
    }
  },
  components: {
    PxIcon
  },
  methods: {
    goToCoin(id) {
      this.$router.push({ name: "coin-detail", params: { id: id } });
    }
  }
};
</script>
<style lang="less" scoped></style>
