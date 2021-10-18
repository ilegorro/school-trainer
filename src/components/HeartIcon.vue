<template>
  <svg
    class="mx-1 text-red-700 transform scale-150"
    :class="{ 'animate-spin': animateHeart }"
    style="width:24px;height:24px"
    viewBox="0 0 24 24"
    @click="animateHeart = true"
  >
    <path
      fill="currentColor"
      d="M12,21.35L10.55,20.03C5.4,15.36 2,12.27 2,8.5C2,5.41 4.42,3 7.5,3C9.24,3 10.91,3.81 12,5.08C13.09,3.81 14.76,3 16.5,3C19.58,3 22,5.41 22,8.5C22,12.27 18.6,15.36 13.45,20.03L12,21.35Z"
    />
  </svg>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'HeartIcon',
  data() {
    return {
      animateHeart: true
    }
  },
  computed: {
    ...mapState(['gameStatus'])
  },
  watch: {
    animateHeart(newVal) {
      if (newVal) {
        this.turnOffAnimation()
      }
    }
  },
  mounted() {
    this.turnOffAnimation()
  },
  methods: {
    turnOffAnimation() {
      setTimeout(() => {
        this.animateHeart = false
      }, 2000)
    }
  }
}
</script>

<style></style>
