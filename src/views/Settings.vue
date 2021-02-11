<template>
  <div class="mt-8 h-content-area">
    <section class="w-full h-full max-w-md mx-auto">
      <div class="operation-block">
        <label for="useAddition"> Сложение </label>
        <input id="useAddition" v-model="useAddition" type="checkbox" />
      </div>
      <div class="operation-block">
        <label for="useSubtraction"> Вычитание </label>
        <input id="useSubtraction" v-model="useSubtraction" type="checkbox" />
      </div>
      <div class="operation-block">
        <label for="useMultiplication"> Умножение </label>
        <input
          id="useMultiplication"
          v-model="useMultiplication"
          type="checkbox"
        />
      </div>
      <button
        class="flex items-center h-10 px-2 mt-8 border-2 border-red-600 border-solid rounded-md shadow-md active:bg-green-400 focus:outline-none"
        @click="saveSettings"
      >
        <p class="mx-2 text-xl font-semibold text-green-800">Записать</p>
        <svg
          style="width:24px;height:24px"
          viewBox="0 0 24 24"
          class="mx-auto text-green-800"
        >
          <path
            fill="currentColor"
            d="M9,20.42L2.79,14.21L5.62,11.38L9,14.77L18.88,4.88L21.71,7.71L9,20.42Z"
          />
        </svg>
      </button>
    </section>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  data() {
    return {
      useAddition: false,
      useSubtraction: true,
      useMultiplication: true
    }
  },
  computed: {
    ...mapState(['useOperations'])
  },
  mounted() {
    this.useAddition = this.useOperations.addition
    this.useSubtraction = this.useOperations.subtraction
    this.useMultiplication = this.useOperations.multiplication
  },
  methods: {
    saveSettings() {
      const settings = {
        addition: this.useAddition,
        subtraction: this.useSubtraction,
        multiplication: this.useMultiplication
      }
      this.$store.dispatch('saveSettings', settings)
    }
  }
}
</script>

<style scoped>
.operation-block {
  @apply my-2 text-2xl font-semibold tracking-wider text-green-800;
}
</style>
