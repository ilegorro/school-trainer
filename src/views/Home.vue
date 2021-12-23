<template>
  <div class="grid gap-3 h-content-area grid-rows-1_1_1">
    <InfoPanel />
    <section class="w-full max-w-md mx-auto">
      <div
        class="flex items-center justify-center py-2 mb-3 border-t-2 border-b-2 border-green-400 border-solid"
      >
        <p class="text-5xl font-semibold tracking-wide text-yellow-800">
          {{ firstTerm }} {{ sign }} {{ secondTerm }} =
        </p>
        <p
          class="inline-block w-20 ml-2 text-5xl font-semibold tracking-wider text-green-700"
        >
          {{ userAnswer }}
        </p>
      </div>
      <section v-show="showSuccess" class="text-center">
        <p class="text-xl font-bold text-red-600">Правильно!</p>
        <p class="text-xl font-bold text-red-600">
          Продолжай решать!
        </p>
      </section>
      <section v-show="showMistake" class="text-center">
        <p class="text-xl font-bold text-green-800">Ошибочка!</p>
        <p class="text-xl font-bold text-blue-800">
          {{ lastProblem }}
        </p>
        <p class="text-xl font-bold text-yellow-800">
          Ничего страшного!
        </p>
      </section>
    </section>
    <section class="self-center max-w-xs mx-auto text-center">
      <div class="grid grid-cols-4 gap-3 justify-items-center">
        <div
          v-for="n in 10"
          :key="n"
          class="flex items-center justify-center h-10 text-xl font-semibold text-blue-900 bg-gray-200 rounded-md shadow-md w-14 active:bg-green-500 cursor-pointer"
          @click="pickDigit(n === 10 ? 0 : n)"
        >
          {{ n === 10 ? 0 : n }}
        </div>

        <button
          class="h-10 border-2 border-green-600 border-solid rounded-md shadow-md w-14 active:bg-green-400 focus:outline-none"
          @click="checkAnswer"
        >
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
        <button
          class="h-10 border-2 border-red-600 border-solid rounded-md shadow-md w-14 active:bg-red-400 focus:outline-none"
          @click="undoSymbol"
        >
          <svg
            style="width:24px;height:24px"
            viewBox="0 0 24 24"
            class="mx-auto text-red-800"
          >
            <path
              fill="currentColor"
              d="M12.5,8C9.85,8 7.45,9 5.6,10.6L2,7V16H11L7.38,12.38C8.77,11.22 10.54,10.5 12.5,10.5C16.04,10.5 19.05,12.81 20.1,16L22.47,15.22C21.08,11.03 17.15,8 12.5,8Z"
            />
          </svg>
        </button>
      </div>
    </section>
  </div>
</template>

<script>
import InfoPanel from '@/components/InfoPanel.vue'
import { mapState } from 'vuex'
export default {
  components: {
    InfoPanel
  },
  data() {
    return {
      showSuccess: false,
      showMistake: false,
      firstTerm: 0,
      secondTerm: 0,
      sign: '',
      userAnswer: '',
      correctAnswer: 0,
      lastProblem: '',
      gameAvailable: true
    }
  },
  computed: {
    ...mapState(['useOperations'])
  },
  created() {
    this.startGame()
  },
  methods: {
    startGame() {
      this.userAnswer = ''
      this.gameAvailable = true
      const operations = []
      this.useOperations.addition.enabled && operations.push('addition')
      this.useOperations.subtraction.enabled && operations.push('subtraction')
      this.useOperations.multiplication.enabled &&
        operations.push('multiplication')
      this.useOperations.division.enabled && operations.push('division')

      if (operations.length) {
        const currentOperation = Math.floor(Math.random() * operations.length)
        this.getNewProblem(operations[currentOperation])
      } else {
        this.gameAvailable = false
      }
    },
    getNewProblem(currentOperation) {
      if (currentOperation === 'addition') {
        this.getAddition()
      } else if (currentOperation === 'subtraction') {
        this.getSubtraction()
      } else if (currentOperation === 'multiplication') {
        this.getMultiplication()
      } else if (currentOperation === 'division') {
        this.getDivision()
      }
    },
    getAddition() {
      const range1 =
        this.useOperations.addition.number1to -
        this.useOperations.addition.number1from +
        1
      const range2 =
        this.useOperations.addition.number2to -
        this.useOperations.addition.number2from +
        1
      const t1 =
        Math.floor(Math.random() * range1) +
        this.useOperations.addition.number1from

      const t2 =
        Math.floor(Math.random() * range2) +
        this.useOperations.addition.number2from

      this.sign = '+'
      this.firstTerm = t1
      this.secondTerm = t2
      this.correctAnswer = this.firstTerm + this.secondTerm
    },
    getSubtraction() {
      const range1 =
        this.useOperations.subtraction.number1to -
        this.useOperations.subtraction.number1from +
        1
      const range2 =
        this.useOperations.subtraction.number2to -
        this.useOperations.subtraction.number2from +
        1

      const t1 =
        Math.floor(Math.random() * range1) +
        this.useOperations.subtraction.number1from
      const t2 =
        Math.floor(Math.random() * range2) +
        this.useOperations.subtraction.number2from

      this.sign = '-'
      this.firstTerm = Math.max(t1, t2)
      this.secondTerm = Math.min(t1, t2)
      this.correctAnswer = this.firstTerm - this.secondTerm
    },
    getMultiplication() {
      const range1 =
        this.useOperations.multiplication.number1to -
        this.useOperations.multiplication.number1from +
        1
      const range2 =
        this.useOperations.multiplication.number2to -
        this.useOperations.multiplication.number2from +
        1

      const t1 =
        Math.floor(Math.random() * range1) +
        this.useOperations.multiplication.number1from
      const t2 =
        Math.floor(Math.random() * range2) +
        this.useOperations.multiplication.number2from

      this.sign = '*'
      this.firstTerm = t1
      this.secondTerm = t2
      this.correctAnswer = this.firstTerm * this.secondTerm
    },
    getDivision() {
      const range2 =
        this.useOperations.division.number2to -
        this.useOperations.division.number2from +
        1
      const t2 =
        Math.floor(Math.random() * range2) +
        this.useOperations.division.number2from

      const range1 =
        this.useOperations.division.number1to -
        Math.max(t2, this.useOperations.division.number1from) +
        1
      let t1 =
        Math.floor(Math.random() * range1) +
        Math.max(t2, this.useOperations.division.number1from)

      while (t1 % t2 !== 0) {
        t1--
      }

      this.sign = '/'
      this.firstTerm = t1
      this.secondTerm = t2
      this.correctAnswer = Math.floor(t1 / t2)
    },
    pickDigit(digit) {
      if (this.gameAvailable && this.userAnswer.length < 3) {
        this.userAnswer += digit
      }
    },
    checkAnswer() {
      if (!this.gameAvailable) {
        return
      }
      this.showSuccess = false
      this.showMistake = false
      if (this.userAnswer.length > 0) {
        if (this.correctAnswer == this.userAnswer) {
          this.$store.dispatch('handleRightAnswer')
          this.showSuccess = true
        } else {
          this.$store.dispatch('handleWrongAnswer')
          this.showMistake = true
        }
        this.lastProblem = `${this.firstTerm} ${this.sign} ${this.secondTerm} = ${this.correctAnswer}`
        this.startGame()
      }
    },
    undoSymbol() {
      if (this.gameAvailable && this.userAnswer) {
        this.userAnswer = this.userAnswer.slice(0, -1)
      }
    }
  }
}
</script>

<style></style>
