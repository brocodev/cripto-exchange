<template>
  <!--TailWind explicado bien bonis xD
    flex-col = {flex-direction: column}-->
  <div>
    <ring-loader
      class="mt-20"
      :loading="isLoading"
      :color="'#0af'"
      :size="'100px'"
    ></ring-loader>
    <div
      v-show="!isLoading"
      class="flex-col px-10 py-6 bg-white rounded shadow-lg main-wrapper sm:px-20"
    >
      <template v-if="asset.id">
        <!--
        TAILWIND
        Class	| Properties
        .flex | diplay:flex;
        .flex-col | flex-direction: column
        .sm | @media screen and (max-width: 640px)
        .flex-row | flex-direction: row
        .justify-around | justify-content: space-around
        .items-center | align-items: center
        -->
        <h1 class="text-gray-900 text-2xl text-center mb-3 sm:mb-0">
          Ranking #{{ asset.rank }}
        </h1>

        <div class="flex flex-col sm:flex-row justify-around items-center">
          <div class="flex flex-col items-center font-bold">
            <!--
            TAILWIND
            Class	| Properties
            .w-1	| width: 0.25rem;
            .w-20 | width: 5rem;
            .h-1	| height: 0.25rem;
            .h-20 | height: 5rem;
            .mr-1 | margin-right: 0.25rem;
            .mr-20 | margin-right: 5rem;
            .text-5xl |	font-size: 3rem;
          -->

            <img
              class="w-20 h-20 mr-5"
              :src="
                `https://static.coincap.io/assets/icons/${asset.symbol.toLowerCase()}@2x.png`
              "
            />
            <h1 class="text-4xl text-gray-800">
              {{ asset.name }}
              <small class="sm:mr-2 text-gray-500">
                {{ asset.symbol }}
              </small>
            </h1>
          </div>

          <!--
          Class | Properties
          .my-10 | margin-top: 2.5rem; margin-bottom: 2.5rem;-->
          <div class="my-10 flex flex-col mx-10 text-sm sm:text-lg">
            <ul>
              <!--
             Class | Properties
             .justify-between | justify-content: space-between;
             .uppercase |	text-transform: uppercase;
           -->
              <li class="flex justify-between">
                <b class="text-gray-600 mr-10 ">Precio actual</b>
                <span class="font-bold text-gray-800">{{
                  asset.priceUsd | dollar
                }}</span>
              </li>
              <li class="flex justify-between text-red-400">
                <b class="text-gray-600 mr-10 ">Precio mas bajo</b>
                <span class="font-bold ">{{ min | dollar }} </span>
              </li>
              <li class="flex justify-between text-green-400">
                <b class="text-gray-600 mr-10 ">Precio mas alto</b>
                <span class="font-bold ">{{ max | dollar }}</span>
              </li>
              <li class="flex justify-between text-blue-400">
                <b class="text-gray-600 mr-10 ">Precio promedio</b>
                <span class="font-bold ">{{ avg | dollar }}</span>
              </li>
              <li class="flex justify-between">
                <b class="text-gray-600 mr-10 ">Variacion 24Hrs</b>
                <span class="font-bold text-gray-800">{{
                  asset.changePercent24Hr | percent
                }}</span>
              </li>
            </ul>
          </div>

          <div class="my-10 sm:mt-0 flex flex-col justify-center text-center">
            <button
              @click="toggleConverter"
              class="bg-blue-400 hover:bg-blue-600 text-white font-bold py-3 px-4 rounded shadow"
            >
              {{ fromUsd ? `USD a ${asset.symbol}` : `${asset.symbol} a USD` }}
            </button>

            <div class="flex flex-row my-5">
              <label for="convertValue" class="w-full">
                <input
                  v-model="convertValue"
                  type="number"
                  id="convertValue"
                  class="text-center bg-white focus:outline-none 
              focus:shadow-outline border border-gray-300 
              rounded-lg py-2 px-4 block w-full 
              appearance-none leading-normal"
                  :placeholder="`Valor en ${fromUsd ? 'USD' : asset.symbol}`"
                />
              </label>
            </div>
            <span class="text-xl font-bold"
              >{{ convertResult }}
              <small class="text-gray-600">
                ({{ fromUsd ? asset.symbol : "USD" }})</small
              >
            </span>
          </div>
        </div>
        <line-chart
          class="my-10 font-bold"
          :colors="['gold']"
          xtitle="Ultimas 24 Hrs"
          ytitle="Valores"
          :min="min"
          :round="3"
          :dataset="{ borderWidth: 1 }"
          :curve="false"
          :max="max"
          :data="history.map(h => [h.date, parseFloat(h.priceUsd).toFixed(2)])"
        >
        </line-chart>
        <h3 class="text-gray-700 my-5 font-bold text-3xl">
          Mejores ofertas de cambio
        </h3>
        <table class="w-full">
          <thead>
            <tr class="text-gray-700 font-bold border-b-2 text-sm">
              <td>ID</td>
              <td>Precio USD</td>
              <td>Symbol/Quote</td>
              <td>Enlace</td>
            </tr>
          </thead>
          <tbody class="bg-white">
            <tr
              v-for="m in markets"
              :key="`$${m.exchangeId}-${m.priceUsd}`"
              class="border-b border-gray-200 text-gray-700"
            >
              <td>
                <b>{{ m.exchangeId }}</b>
              </td>
              <td>{{ m.priceUsd | dollar }}</td>
              <td>{{ m.baseSymbol }} / {{ m.quoteSymbol }}</td>
              <td>
                <px-button
                  :isLoading="m.isLoading || false"
                  v-if="!m.url"
                  @custom-click="getWebSite(m)"
                  class="border border-blue-400 text-blue-400"
                >
                  <slot>{{
                    m.isLoading ? "           " : "Obtener Link"
                  }}</slot>
                </px-button>
                <a
                  v-else
                  :href="m.url"
                  class="hover:underline text-blue-600"
                  target="_blank"
                  >{{ m.url }}</a
                >
              </td>
            </tr>
          </tbody>
        </table>
      </template>
    </div>
  </div>
</template>

<script>
import api from "@/api";
import RingLoader from "vue-spinner/src/RingLoader.vue";
import PxButton from "@/components/PxButton.vue";
export default {
  name: "CoinDetail",
  components: {
    RingLoader,
    PxButton
  },
  data() {
    return {
      asset: {},
      history: [],
      markets: [],
      isLoading: false,
      fromUsd: true,
      convertValue: null
    };
  },
  created() {
    this.getCoin();
  },
  watch: {
    $route() {
      this.getCoin();
    }
  },

  methods: {
    getWebSite(exchange) {
      //exchange.url = res.exchangeUrl; //<-- De esta la nueva propiedad no sera detectada por Vue
      //PROBLEMA DE REACTIVIDAD
      /*Vue no detecta cuando agregamos una nueva propiedad tanto a "objetos" y "arrays"
        para esto hacemos uso de una funcion de Vue llamada "$set" esta funcion
        recibe 3 parametros.
        -el objeto que queremos modificar
        -el nombre de la propiedad
        -el valor de esa propiedad*/

      this.$set(exchange, "isLoading", true);
      return api
        .getExchange(exchange.exchangeId)
        .then(res => {
          this.$set(exchange, "url", res.exchangeUrl);
        })
        .finally(() => {
          this.$set(exchange, "isLoading", false);
        });
    },
    getCoin() {
      const id = this.$route.params.id;
      this.isLoading = true;
      Promise.all([
        api.getAsset(id),
        api.getAssetHistory(id),
        api.getMarkets(id)
      ])
        .then(([asset, history, markets]) => {
          this.asset = asset;
          this.history = history;
          this.markets = markets;
        })
        .finally(() => (this.isLoading = false));
    },
    toggleConverter() {
      this.fromUsd = !this.fromUsd;
    }
  },
  computed: {
    min() {
      return Math.min(
        ...this.history.map(h => parseFloat(h.priceUsd).toFixed(2))
      );
    },
    max() {
      return Math.max(
        ...this.history.map(h => parseFloat(h.priceUsd).toFixed(2))
      );
    },
    avg() {
      let average = 0.0;
      for (let h of this.history) {
        average += parseFloat(h.priceUsd);
      }
      return average / this.history.length;
    },
    convertResult() {
      if (!this.convertValue) {
        return 0;
      }
      const result = this.fromUsd
        ? this.convertValue / this.asset.priceUsd
        : this.convertValue * this.asset.priceUsd;
      return result.toFixed(4);
    }
  }
};
</script>

<style scoped>
.main-wrapper {
  width: 95%;
}

td {
  text-align: center;
  height: 3.5rem;
}
li {
  margin-top: 10px;
}
</style>
