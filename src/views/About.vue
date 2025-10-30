<template>
  <div class="min-h-screen bg-gradient-to-br from-purple-50 to-pink-100 dark:from-gray-900 dark:to-gray-800">
    <div class="container mx-auto px-4 py-16">
      <div class="max-w-3xl mx-auto">
        <!-- Header -->
        <div class="text-center mb-12">
          <div class="flex items-center justify-center mb-4">
            <Info class="w-16 h-16 text-purple-600 dark:text-purple-400" />
          </div>
          <h1 class="text-5xl font-bold text-gray-900 dark:text-white mb-4">
            About This Project
          </h1>
          <p class="text-xl text-gray-600 dark:text-gray-300">
            A modern Vue 3 application with powerful tools
          </p>
        </div>

        <!-- Tech Stack -->
        <div class="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-8 mb-8">
          <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
            <Code class="w-6 h-6 mr-2 text-indigo-600" />
            Tech Stack
          </h2>
          <div class="space-y-4">
            <div class="flex items-start">
              <CheckCircle class="w-6 h-6 text-green-500 mr-3 mt-1 flex-shrink-0" />
              <div>
                <h3 class="font-semibold text-gray-900 dark:text-white">Vue 3</h3>
                <p class="text-gray-600 dark:text-gray-300">Progressive JavaScript framework with Composition API</p>
              </div>
            </div>
            <div class="flex items-start">
              <CheckCircle class="w-6 h-6 text-green-500 mr-3 mt-1 flex-shrink-0" />
              <div>
                <h3 class="font-semibold text-gray-900 dark:text-white">TypeScript</h3>
                <p class="text-gray-600 dark:text-gray-300">Type-safe development with better IDE support</p>
              </div>
            </div>
            <div class="flex items-start">
              <CheckCircle class="w-6 h-6 text-green-500 mr-3 mt-1 flex-shrink-0" />
              <div>
                <h3 class="font-semibold text-gray-900 dark:text-white">Tailwind CSS</h3>
                <p class="text-gray-600 dark:text-gray-300">Utility-first CSS framework for rapid UI development</p>
              </div>
            </div>
            <div class="flex items-start">
              <CheckCircle class="w-6 h-6 text-green-500 mr-3 mt-1 flex-shrink-0" />
              <div>
                <h3 class="font-semibold text-gray-900 dark:text-white">Vue Router</h3>
                <p class="text-gray-600 dark:text-gray-300">Official router for Vue.js with SPA navigation</p>
              </div>
            </div>
            <div class="flex items-start">
              <CheckCircle class="w-6 h-6 text-green-500 mr-3 mt-1 flex-shrink-0" />
              <div>
                <h3 class="font-semibold text-gray-900 dark:text-white">Lucide Icons</h3>
                <p class="text-gray-600 dark:text-gray-300">Beautiful & consistent icon toolkit</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Icon Showcase -->
        <div class="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-8 mb-8">
          <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
            <Star class="w-6 h-6 mr-2 text-yellow-500" />
            Icon Showcase
          </h2>
          <div class="grid grid-cols-4 md:grid-cols-8 gap-4">
            <div v-for="(icon, index) in iconList" :key="index" 
                 class="flex flex-col items-center p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
              <component :is="icon.component" class="w-8 h-8 text-indigo-600 dark:text-indigo-400 mb-2" />
              <span class="text-xs text-gray-600 dark:text-gray-400 text-center">{{ icon.name }}</span>
            </div>
          </div>
        </div>

        <!-- Back Button -->
        <div class="text-center">
          <router-link
            to="/"
            class="inline-flex items-center px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-lg shadow-md transition-colors"
          >
            <ArrowLeft class="w-5 h-5 mr-2" />
            Back to Home
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { 
  Info, 
  Code, 
  CheckCircle, 
  Star, 
  ArrowLeft,
  Heart,
  Bookmark,
  Bell,
  Mail,
  Search,
  Settings,
  User,
  Download
} from 'lucide-vue-next'

const iconList = [
  { name: 'Heart', component: Heart },
  { name: 'Bookmark', component: Bookmark },
  { name: 'Bell', component: Bell },
  { name: 'Mail', component: Mail },
  { name: 'Search', component: Search },
  { name: 'Settings', component: Settings },
  { name: 'User', component: User },
  { name: 'Download', component: Download },
]
</script>

