<template>
  <div
    class="mx-auto tight-container"
    :class="theme === 'dark' ? 'bg-gray-800' : 'bg-white'"
  >
    <header class="fixed top-0 z-20 h-10 tight-container">
      <NavBar />
    </header>
    <main class="px-4 pt-10">
      <router-view></router-view>
    </main>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import NavBar from '@/components/NavBar.vue'
export default {
  components: {
    NavBar
  },
  computed: {
    ...mapState(['theme'])
  },
  created() {
    this.$store.dispatch('readSettings')
  }
}
</script>

<style src="@/assets/tailwind.css"></style>
