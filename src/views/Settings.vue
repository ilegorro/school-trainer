<template>
  <div class="h-content-area px-1">
    <section class="w-full max-w-md py-8 mx-auto">
      <div
        v-for="(operation, idx) in operations"
        :key="operation.id"
        class="operation-block px-4 pt-2 pb-6 text-center border-b-2 "
        :class="[
          theme === 'dark'
            ? 'text-dark border-yellow-900 border-opacity-50'
            : 'text-light border-yellow-700 border-opacity-20',
          idx === 0 ? 'border-t-2' : ''
        ]"
      >
        <label class="inline-flex items-center">
          <span class="mr-2 text-2xl">{{ operation.name }}</span>
          <input
            v-model="operation.value"
            type="checkbox"
            class="w-5 h-5 form-checkbox"
            @change="isChanged = true"
          />
        </label>
        <section :class="{ 'range-not-active': !operation.value }">
          <span
            >{{ operation.range1Name }} от {{ operation.range1[0] }} до
            {{ operation.range1[1] }}</span
          >
          <VueSlider
            v-model="operation.range1"
            class="mx-auto"
            :min="operation.minValue1"
            :max="operation.maxValue1"
            :min-range="+1"
            :width="200"
            @change="isChanged = true"
          ></VueSlider>
          <span
            >{{ operation.range2Name }} от {{ operation.range2[0] }} до
            {{ operation.range2[1] }}</span
          >
          <VueSlider
            v-model="operation.range2"
            class="mx-auto"
            :min="operation.minValue2"
            :max="operation.maxValue2"
            :min-range="+1"
            :width="200"
            @change="isChanged = true"
          ></VueSlider>
        </section>
      </div>
      <div
        v-if="isChanged"
        class="flex justify-center sticky bottom-0 py-2"
        :class="theme === 'dark' ? 'bg-gray-800' : 'bg-white'"
      >
        <button
          class="flex items-center h-10 px-2 border-2  border-solid rounded-md shadow-md focus:outline-none"
          :class="
            theme === 'dark'
              ? 'text-dark border-red-700'
              : 'text-light border-red-900'
          "
          @click="saveSettings"
        >
          <p class="mx-2 text-xl font-semibold ">Записать</p>
          <svg
            style="width:24px;height:24px"
            viewBox="0 0 24 24"
            class="mx-auto"
          >
            <path
              fill="currentColor"
              d="M9,20.42L2.79,14.21L5.62,11.38L9,14.77L18.88,4.88L21.71,7.71L9,20.42Z"
            />
          </svg>
        </button>
      </div>
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
      isChanged: false,
      operations: [
        {
          id: 'addition',
          name: 'Сложение',
          value: false,
          range1: [],
          range1Name: 'Первое слагаемое',
          range2: [],
          range2Name: 'Второе слагаемое',
          minValue1: 1,
          maxValue1: 50,
          minValue2: 1,
          maxValue2: 50
        },
        {
          id: 'subtraction',
          name: 'Вычитание',
          value: false,
          range1: [],
          range1Name: 'Уменьшаемое',
          range2: [],
          range2Name: 'Вычитаемое',
          minValue1: 10,
          maxValue1: 100,
          minValue2: 1,
          maxValue2: 50
        },
        {
          id: 'multiplication',
          name: 'Умножение',
          value: false,
          range1: [],
          range1Name: 'Первый множитель',
          range2: [],
          range2Name: 'Второй множитель',
          minValue1: 1,
          maxValue1: 12,
          minValue2: 1,
          maxValue2: 12
        },
        {
          id: 'division',
          name: 'Деление',
          value: false,
          range1: [],
          range1Name: 'Делимое',
          range2: [],
          range2Name: 'Делитель',
          minValue1: 12,
          maxValue1: 144,
          minValue2: 2,
          maxValue2: 12
        }
      ]
    }
  },
  computed: {
    ...mapState(['useOperations', 'theme'])
  },
  created() {
    for (const [name, value] of Object.entries(this.useOperations)) {
      this.operations.forEach(element => {
        if (element.id === name) {
          element.value = value.enabled
          element.range1 = [value.number1from, value.number1to]
          element.range2 = [value.number2from, value.number2to]
        }
      })
    }
  },
  methods: {
    saveSettings() {
      const settings = this.operations.reduce((acc, el) => {
        acc[el.id] = {
          enabled: el.value,
          number1from: el.range1[0],
          number1to: el.range1[1],
          number2from: el.range2[0],
          number2to: el.range2[1]
        }
        return acc
      }, {})
      this.$store
        .dispatch('saveSettings', settings)
        .then(() => this.$router.push({ name: 'home' }))
    }
  }
}
</script>

<style scoped>
.range-not-active {
  opacity: 0.5;
  color: #aaa;
  pointer-events: none;
}
.operation-block {
  @apply text-base font-semibold tracking-wider mb-3;
}
.text-light {
  @apply text-green-800;
}
.text-dark {
  @apply text-green-500;
}
.form-checkbox {
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  color-adjust: exact;
  -webkit-print-color-adjust: exact;
  display: inline-block;
  vertical-align: middle;
  background-origin: border-box;
  user-select: none;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  flex-shrink: 0;
  height: 1.2em;
  width: 1.2em;
  color: #4299e1;
  background-color: #fff;
  border-color: #4299e1;
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
