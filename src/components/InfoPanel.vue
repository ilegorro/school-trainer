<template>
  <section class="w-full h-full max-w-md mx-auto pt-3">
    <div class="flex justify-center">
      <p
        class="mx-2 "
        :class="theme === 'dark' ? 'text-green-500' : 'text-green-800'"
      >
        Правильно: {{ gameStatus.correct }}
      </p>
      <p
        class="mx-2 "
        :class="theme === 'dark' ? 'text-red-500' : 'text-red-800'"
      >
        Ошибки: {{ gameStatus.mistakes }}
      </p>
    </div>

    <div class="flex justify-center mt-4 h-14">
      <HeartIcon v-for="n in heartsCount" :key="n" />
    </div>
    <div
      v-show="gameStatus.strike > 2"
      class="mt-3 text-xl font-semibold tracking-wider"
      :class="theme === 'dark' ? 'text-green-500' : 'text-green-800'"
    >
      <div class="flex flex-wrap items-center justify-center ">
        <p class="mr-2 text-3xl">
          {{ gameStatus.strike }}
        </p>
        <p>
          подряд! Молодец!
        </p>

        <SmileIcon />
      </div>
    </div>
  </section>
</template>

<script>
import HeartIcon from '@/components/HeartIcon.vue'
import SmileIcon from '@/components/SmileIcon.vue'
import { mapState } from 'vuex'
export default {
  components: {
    HeartIcon,
    SmileIcon
  },
  computed: {
    ...mapState(['gameStatus', 'theme']),
    heartsCount() {
      return Math.min(Math.floor(this.gameStatus.correct / 5), 10)
    }
  }
}
</script>

<style></style>
