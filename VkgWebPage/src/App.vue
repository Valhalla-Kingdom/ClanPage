<script setup>
import NavBar from './components/NavBar.vue'
import SiteFooter from './components/SiteFooter.vue'
</script>

<template>
  <div class="min-h-screen bg-[#0a0a0a] text-[#e5e5e5]">
    <NavBar />
    
    <!-- O Router vai injetar aqui ou o HomeView ou o GuideView -->
    <router-view></router-view>
    
    <SiteFooter />
  </div>
</template>