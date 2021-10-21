<template>
  <div class="h-content-area">
    <section class="w-full max-w-md pt-8 mx-auto">
      <div
        v-for="operation in operations"
        :key="operation.id"
        class="operation-block"
      >
        <label class="inline-flex items-center mt-3">
          <span class="mr-2">{{ operation.name }}</span>
          <input
            v-model="operation.value"
            type="checkbox"
            class="w-5 h-5 form-checkbox"
          />
        </label>
        <div class="flex">
          <VueSlider
            v-model="operation.range1"
            class="mr-10"
            :min="+1"
            :max="operation.maxValue"
            :min-range="+1"
            :width="100"
          ></VueSlider>
          <VueSlider
            v-model="operation.range2"
            :min="+1"
            :max="operation.maxValue"
            :min-range="+1"
            :width="100"
          ></VueSlider>
        </div>
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
import VueSlider from 'vue-slider-component'
import 'vue-slider-component/theme/default.css'
import { mapState } from 'vuex'
export default {
  components: {
    VueSlider
  },
  data() {
    return {
      operations: [
        {
          id: 'addition',
          name: 'Сложение',
          value: false,
          range1: [1, 50],
          range2: [1, 50],
          maxValue: 50
        },
        {
          id: 'subtraction',
          name: 'Вычитание',
          value: false,
          range1: [50, 100],
          range2: [1, 50],
          maxValue: 50
        },
        {
          id: 'multiplication',
          name: 'Умножение',
          value: false,
          range1: [1, 12],
          range2: [1, 12],
          maxValue: 12
        },
        {
          id: 'division',
          name: 'Деление',
          value: false,
          range1: [1, 12],
          range2: [1, 12],
          maxValue: 12
        }
      ]
    }
  },
  computed: {
    ...mapState(['useOperations'])
  },
  mounted() {
    for (const [name, value] of Object.entries(this.useOperations)) {
      this.operations.forEach(element => {
        if (element.id === name) {
          element.value = value
        }
      })
    }
  },
  methods: {
    saveSettings() {
      const settings = this.operations.reduce((acc, el) => {
        acc[el.id] = el.value
        return acc
      }, {})
      console.log(settings)
      this.$store.dispatch('saveSettings', settings)
    }
  }
}
</script>

<style scoped>
.operation-block {
  @apply text-2xl font-semibold tracking-wider text-green-800;
}
.form-checkbox {
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  -webkit-print-color-adjust: exact;
  color-adjust: exact;
  display: inline-block;
  vertical-align: middle;
  background-origin: border-box;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  flex-shrink: 0;
  height: 1em;
  width: 1em;
  color: #4299e1;
  background-color: #fff;
  border-color: #e2e8f0;
  border-width: 1px;
  border-radius: 0.25rem;
}
.form-checkbox:checked {
  background-image: url("data:image/svg+xml,%3csvg viewBox='0 0 16 16' fill='white' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M5.707 7.293a1 1 0 0 0-1.414 1.414l2 2a1 1 0 0 0 1.414 0l4-4a1 1 0 0 0-1.414-1.414L7 8.586 5.707 7.293z'/%3e%3c/svg%3e");
  border-color: transparent;
  background-color: currentColor;
  background-size: 100% 100%;
  background-position: center;
  background-repeat: no-repeat;
}
</style>
