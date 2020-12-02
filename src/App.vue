<template>
  <div class="container mx-auto">
    <header class="container fixed top-0 z-20 h-16">
      <NavBar />
    </header>
    <main class="px-4 pt-16">
      <router-view></router-view>
    </main>
  </div>
</template>

<script>
import NavBar from '@/components/NavBar.vue'
export default {
  components: {
    NavBar
  }
}
</script>

<style src="@/assets/tailwind.css"></style>
