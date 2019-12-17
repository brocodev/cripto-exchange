<template>
  <table class="shadow-xl mx-2">
    <thead class="rounded-full">
      <tr class="bg-gray-100 border-b-2 border-gray-400">
        <th></th>
        <th :class="{ up: this.sortOrder === 1, down: this.sortOrder === -1 }">
          <span
            class="underline cursor-pointer text-blue-900"
            @click="changeSortOrder"
            >Ranking</span
          >
        </th>
        <th>Nombre</th>
        <th>Precio</th>
        <th>Cap. de Mercado</th>
        <th>Variación 24hs</th>
        <td class="hidden sm:block">
          <input
            type="text"
            placeholder="Buscar..."
            class="bg-gray-100 focus:outline-none border-b-2 border-gray-400 py-2 px-4 block w-full appearance-none leading-normal"
            id="filter"
            v-model="filter"
          />
        </td>
      </tr>
    </thead>
    <tbody class="bg-white">
      <tr
        v-for="a in filteredAssets"
        :key="a.id"
        class="border-b border-gray-200 hover:bg-gray-100 hover:bg-blue-100"
      >
        <!--Imagen-->
        <td class="pl-2">
          <img
            class="w-6 h-6"
            :src="
              `https://static.coincap.io/assets/icons/${a.symbol.toLowerCase()}@2x.png`
            "
            :alt="a.name"
          />
        </td>
        <!--Ranking-->
        <td class="cell-data">#{{ a.rank }}</td>
        <!--Nombre-->
        <td>
          <router-link
            :to="{
              name: 'coin-detail',
              params: { id: a.id }
            }"
            class="text-blue-500 hover:text-blue-600 font-bold hover:underline"
          >
            {{ a.name }}
          </router-link>
          <small class="text-gray-500"> ({{ a.symbol }}) </small>
        </td>
        <!--Precio-->
        <td>{{ a.priceUsd | dollar }}</td>
        <!--Cap. de mercado-->
        <td>
          {{ a.marketCapUsd | dollar }}
        </td>
        <!--Variacion-->
        <td
          :class="
            a.changePercent24Hr.includes('-')
              ? 'text-red-500'
              : 'text-green-500'
          "
        >
          {{ a.changePercent24Hr | percent }}
        </td>
        <td class="hidden sm:block">
          <px-button v-on:custom-click="goToCoin(a.id)">
            <span>Ver detalle</span>
          </px-button>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import PxButton from "@/components/PxButton";
export default {
  name: "PxAssetsTable",
  components: {
    PxButton
  },
  data() {
    return {
      filter: "",
      sortOrder: 1
    };
  },
  computed: {
    filteredAssets() {
      return this.assets
        .filter(
          asset =>
            asset.symbol.toLowerCase().includes(this.filter.toLowerCase()) ||
            asset.name.toLowerCase().includes(this.filter.toLowerCase())
        )
        .sort((asset, b) => {
          const altOrder = this.sortOrder == 1 ? -1 : 1;
          if (parseInt(asset.rank) > parseInt(b.rank)) {
            return this.sortOrder;
          }
          return altOrder;
        });
    }
  },
  props: {
    assets: {
      type: Array,
      default: () => []
    }
  },
  methods: {
    goToCoin(id) {
      //$route : Guarda la instancia de la ruta de la aplicacion, parametros y atributos de la ruta
      //$router: Guarda la instancia del objeto router que utilizamos para navegar a traves de codigo
      this.$router.push({ name: "coin-detail", params: { id: id } });
    },
    changeSortOrder() {
      this.sortOrder = this.sortOrder === 1 ? -1 : 1;
    }
  }
};
</script>

<style scoped>
.cell-data {
  font-weight: bold;
  color: #444;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
}
.up::before {
  content: "🔼 ";
}

.down::before {
  content: "🔽 ";
}

td {
  padding: 20px 0px;
  font-size: 0.6rem;
  text-align: center;
}

th {
  padding: 5px;
  font-size: 0.6rem;
}

@media (min-width: 640px) {
  td,
  th {
    padding: 20px;
    font-size: 1rem;
  }

  th {
    padding: 12px;
  }
}
</style>
