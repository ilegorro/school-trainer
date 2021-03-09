<template>
  <div class="grid gap-3 h-content-area grid-rows-1_1_1">
    <section class="w-full h-full max-w-md mx-auto">
      <div class="flex justify-center">
        <p class="mx-2 text-green-800">Правильно: {{ correct }}</p>
        <p class="mx-2 text-red-800">Ошибки: {{ mistakes }}</p>
      </div>

      <div class="flex justify-center mt-4 h-14">
        <svg
          v-for="n in heartsCount"
          :key="n"
          class="mx-1 text-red-700 transform scale-150"
          :class="{ 'animate-spin': animateHearts }"
          style="width:24px;height:24px"
          viewBox="0 0 24 24"
          @click="animateHearts = true"
        >
          <path
            fill="currentColor"
            d="M12,21.35L10.55,20.03C5.4,15.36 2,12.27 2,8.5C2,5.41 4.42,3 7.5,3C9.24,3 10.91,3.81 12,5.08C13.09,3.81 14.76,3 16.5,3C19.58,3 22,5.41 22,8.5C22,12.27 18.6,15.36 13.45,20.03L12,21.35Z"
          />
        </svg>
      </div>
      <div
        v-show="strike > 2"
        class="mt-3 text-xl font-semibold tracking-wider text-green-800"
      >
        <div class="flex flex-wrap items-center justify-center ">
          <p class="mr-2 text-3xl">
            {{ strike }}
          </p>
          <p>
            подряд! Молодец!
          </p>

          <svg
            class="w-6 ml-2 text-yellow-400 transform scale-150 fill-current"
            viewBox="0 0 24 24"
            :class="{ 'animate-bounce': animateSmile }"
            @click="animateSmile = true"
          >
            <path
              d="M12,17.5C14.33,17.5 16.3,16.04 17.11,14H6.89C7.69,16.04 9.67,17.5 12,17.5M8.5,11A1.5,1.5 0 0,0 10,9.5A1.5,1.5 0 0,0 8.5,8A1.5,1.5 0 0,0 7,9.5A1.5,1.5 0 0,0 8.5,11M15.5,11A1.5,1.5 0 0,0 17,9.5A1.5,1.5 0 0,0 15.5,8A1.5,1.5 0 0,0 14,9.5A1.5,1.5 0 0,0 15.5,11M12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4A8,8 0 0,1 20,12A8,8 0 0,1 12,20M12,2C6.47,2 2,6.5 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z"
            />
          </svg>
        </div>
      </div>
    </section>
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
          class="flex items-center justify-center h-10 text-xl font-semibold text-blue-900 bg-gray-200 rounded-md shadow-md w-14 active:bg-green-500"
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
import { mapState } from 'vuex'
export default {
  data() {
    return {
      showSuccess: false,
      showMistake: false,
      firstTerm: 0,
      secondTerm: 0,
      sign: '',
      userAnswer: '',
      correctAnswer: 0,
      strike: 0,
      mistakes: 0,
      correct: 0,
      animateHearts: false,
      animateSmile: false,
      lastProblem: '',
      gameAvailable: true
    }
  },
  computed: {
    ...mapState(['useOperations', 'gameStatus']),
    heartsCount() {
      return Math.min(Math.floor(this.correct / 5), 10)
    }
  },
  watch: {
    heartsCount() {
      this.animateHearts = true
    },
    animateHearts(newVal) {
      if (newVal) {
        setTimeout(() => {
          this.animateHearts = false
        }, 2000)
      }
    },
    animateSmile(newVal) {
      if (newVal) {
        setTimeout(() => {
          this.animateSmile = false
        }, 2000)
      }
    }
  },
  created() {
    this.strike = this.gameStatus.strike
    this.mistakes = this.gameStatus.mistakes
    this.correct = this.gameStatus.correct
    this.startGame()
  },
  beforeDestroy() {
    const gameStatus = {
      strike: this.strike,
      mistakes: this.mistakes,
      correct: this.correct
    }
    this.$store.dispatch('setGameStatus', gameStatus)
  },
  methods: {
    startGame() {
      this.userAnswer = ''
      this.gameAvailable = true
      const currentOperation = Math.floor(Math.random() * 4) + 1
      this.getNewProblem(currentOperation)
    },
    getNewProblem(currentOperation) {
      if (this.useOperations.addition && currentOperation === 1) {
        this.getAddition()
      } else if (this.useOperations.subtraction && currentOperation === 2) {
        this.getSubtraction()
      } else if (this.useOperations.multiplication && currentOperation === 3) {
        this.getMultiplication()
      } else if (this.useOperations.division && currentOperation === 4) {
        this.getDivision()
      } else if (
        this.useOperations.addition ||
        this.useOperations.subtraction ||
        this.useOperations.multiplication ||
        this.useOperations.division
      ) {
        let newOperation = currentOperation + Math.floor(Math.random() * 3) + 1
        newOperation = newOperation > 4 ? 1 : newOperation
        this.getNewProblem(newOperation)
      } else {
        this.gameAvailable = false
      }
    },
    getAddition() {
      const t1 = Math.floor(Math.random() * 28) + 2
      const t2 = Math.floor(Math.random() * 28) + 2

      this.sign = '+'
      this.firstTerm = t1
      this.secondTerm = t2
      this.correctAnswer = this.firstTerm + this.secondTerm
    },
    getSubtraction() {
      const t1 = Math.floor(Math.random() * 58) + 2
      const t2 = Math.floor(Math.random() * 58) + 2

      this.sign = '-'
      this.firstTerm = Math.max(t1, t2)
      this.secondTerm = Math.min(t1, t2)
      this.correctAnswer = this.firstTerm - this.secondTerm
    },
    getMultiplication() {
      const t1 = Math.floor(Math.random() * 11) + 1
      const t2 = Math.floor(Math.random() * 11) + 1

      this.sign = '*'
      this.firstTerm = t1
      this.secondTerm = t2
      this.correctAnswer = this.firstTerm * this.secondTerm
    },
    getDivision() {
      const t1 = Math.floor(Math.random() * 11) + 1
      const t2 = Math.floor(Math.random() * 11) + 1

      this.sign = '/'
      this.firstTerm = t1 * t2
      this.secondTerm = t1
      this.correctAnswer = t2
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
          this.correct++
          this.strike++
          this.showSuccess = true
        } else {
          this.mistakes++
          this.strike = 0
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
